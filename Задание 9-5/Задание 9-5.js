/* Написать код приложения, интерфейс которого состоит из двух input и кнопки. В input можно ввести любое число.

Заголовок первого input — «номер страницы».
Заголовок второго input — «лимит».
Заголовок кнопки — «запрос».
При клике на кнопку происходит следующее:

= Если число в первом input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Номер страницы вне диапазона от 1 до 10»;
= Если число во втором input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Лимит вне диапазона от 1 до 10»;
= Если и первый, и второй input не в диапазонах или не являются числами — выводить ниже текст «Номер страницы и лимит вне диапазона от 1 до 10»;
= Если числа попадают в диапазон от 1 до 10 — сделать запрос по URL https://picsum.photos/v2/list?page=1&limit=10, где GET-параметр page — это число из первого input, а GET-параметр limit — это введённое число второго input. 

Пример: если пользователь ввёл 5 и 7, то запрос будет вида https://picsum.photos/v2/list?page=5&limit=7.
После получения данных вывести список картинок на экран.

Если пользователь перезагрузил страницу, то ему должны показываться картинки из последнего успешно выполненного запроса (использовать localStorage). */


const output = document.querySelector('#output');
const storedResult = localStorage.getItem('storedResult');

if (storedResult) {
    insertOutput(storedResult)
}

const btn = document.querySelector('#btn');
btn.addEventListener('click', sendRequest);

function sendRequest() {
    const pageNumber = document.querySelector('#page-number').value;
    const limitValue = document.querySelector('#limit').value;

    if ((pageNumber < 1 || pageNumber > 10) && (limitValue < 1 || limitValue > 10)) {
        insertOutput('<p>Номер страницы и лимит вне диапазона от 1 до 10</p>')
    } else if (limitValue < 1 || limitValue > 10) {
        insertOutput('<p>Лимит вне диапазона от 1 до 10</p>')
    } else if(pageNumber < 1 || pageNumber > 10) {
        insertOutput('<p>Номер страницы вне диапазона от 1 до 10</p>')
    } else {
        fetch(`https://picsum.photos/v2/list?page=${pageNumber}&limit=${limitValue}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            localStorage.setItem('storedResult', displayImages(data));
            insertOutput(displayImages(data));
        })
    }
}

function insertOutput(content) {
    output.innerHTML = content
}

function displayImages(receivedData) {
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