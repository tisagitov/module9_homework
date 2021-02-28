/* Вам дана заготовка и результат, который вы должны получить. Ваша задача — написать код, который будет преобразовывать XML в JS-объект и выводить его в консоль. 

Заготовка лежит в переменной xmlString.

Итоговый JS-объект должен выглядеть так:

{
  list: [
    { name: 'Ivan Ivanov', age: 35, prof: 'teacher', lang: 'en' },
    { name: 'Петр Петров', age: 58, prof: 'driver', lang: 'ru' },
  ]
}
*/

const parser = new DOMParser();

const xmlString = `<list>
<student>
  <name lang="en">
    <first>Ivan</first>
    <second>Ivanov</second>
  </name>
  <age>35</age>
  <prof>teacher</prof>
</student>
<student>
  <name lang="ru">
    <first>Петр</first>
    <second>Петров</second>
  </name>
  <age>58</age>
  <prof>driver</prof>
</student>
</list>`

const xmlDOM = parser.parseFromString(xmlString, 'text/xml');

const listNode = xmlDOM.querySelector('list')
const studentNodes = listNode.querySelectorAll('student');
const nameNodes = listNode.querySelectorAll('name');
const ageNodes = listNode.querySelectorAll('age');
const profNodes = listNode.querySelectorAll('prof')

const ivanLangAttr = nameNodes[0].getAttribute('lang')
const petrLangAttr = nameNodes[1].getAttribute('lang')

const result = {
    list: [
        {name: `${nameNodes[0].firstElementChild.textContent} ${nameNodes[0].lastElementChild.textContent}`, age: Number(ageNodes[0].textContent), prof: `${profNodes[0].textContent}`, lang: `${ivanLangAttr}`},
        {name: `${nameNodes[1].firstElementChild.textContent} ${nameNodes[1].lastElementChild.textContent}`, age: Number(ageNodes[1].textContent), prof: `${profNodes[1].textContent}`, lang: `${petrLangAttr}`}
    ]
}

console.log(result);