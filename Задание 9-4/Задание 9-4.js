/* Напишите код приложения, интерфейс которого представляет собой input и кнопку. В input можно ввести любое число. При клике на кнопку происходит следующее:

= Если оба числа не попадают в диапазон от 100 до 300 или введено не число — выводить ниже текст «одно из чисел вне диапазона от 100 до 300»;
= Если числа попадают в диапазон от 100 до 300 — сделать запрос c помощью fetch по URL https://picsum.photos/200/300, где первое число — ширина картинки, второе — высота.

Пример: если пользователь ввёл 150 и 200, то запрос будет вида https://picsum.photos/150/200.

После получения данных вывести ниже картинку на экран. */

const output = document.getElementById('output');
const btn = document.getElementById('btn')
btn.addEventListener('click', sendRequest);


function sendRequest() {
    const widthValue = document.querySelector('#input--width').value;
    const heightValue = document.querySelector('#input--height').value;

    // Тип инпута - "number", поэтому я не стал включать в валидацию isNaN
    if ((widthValue > 300 || widthValue < 100) || (heightValue > 300 || heightValue < 100)) {
        output.innerHTML = '<p>Одно из чисел вне диапазона от 100 до 300</p>'
    } else {
        fetch(`https://picsum.photos/${widthValue}/${heightValue}`)
            .then(response => {
                output.innerHTML = `<img src=${response.url}>`
            })
            .catch(() => {console.log('Произошла ошибка')});
    }
};