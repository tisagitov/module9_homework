/* Напишите код приложения, интерфейс которого представляет собой input и кнопку. В input можно ввести любое число. При клике на кнопку происходит следующее:

= Если число не попадает в диапазон от 1 до 10 — выводить ниже текст «число вне диапазона от 1 до 10».
= Если число попадает в диапазон от 1 до 10 — сделать запрос c помощью XHR по URL https://picsum.photos/v2/list?limit=10, где get-параметр limit — это введённое число.

Пример: если пользователь ввёл 5, то запрос будет вида https://picsum.photos/v2/list?limit=5.

После получения данных вывести ниже картинки на экран. */

const btn = document.getElementById('btn')
btn.addEventListener('click', sendRequest);

function sendRequest() {
    const inputValue = document.getElementById('input').value;
    if (inputValue > 10 || inputValue < 1) {
        insertOutput('<p>Число вне диапазона от 1 до 10</p>');
    } else {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", `https://picsum.photos/v2/list?limit=${inputValue}`);
        xhr.send();
      
        xhr.onerror = function() {
            insertOutput('<p>При отправке запроса произошла ошибка</p>');
        }
      
        xhr.onload = function() {
            if (xhr.status == 200) {
                let data = JSON.parse(xhr.response);
                insertOutput(displayPictures(data));
            }
      }
    }
}

function insertOutput(content) {
    const output = document.querySelector('#output');
    output.innerHTML = content;
}

function displayPictures(receivedData) {
    let pictureDivs = '';
    
    receivedData.forEach(item => {
      const imageDiv = `
        <div class="picture">
          <img
            src="${item.download_url}"
            class="picture--image"
          />
          <p>${item.author}</p>
        </div>
      `;
      
      pictureDivs = pictureDivs + imageDiv;
    });
    
    return pictureDivs;
}