"use strict";

// В цій домашці треба заповнити функції кодом так, щоб подальші виклики в консоль лог давали те, що вказано в коментарях
// Наприклад, функція add має повертати суму двох чисел. В результаті код має виглядати так:
function add(a, b) {
  return a + b;; // зміст функції треба написати тут самому
}

console.log(add(2, 3)); // 5
console.log(add(-1, 1)); // 0

// ==============================================
// Завдання 1:
// Напишіть функцію, яка приймає два числа і повертає числа між ними (включно) однією строкою через пробіл:
function numbersBetween(min, max) {
  let sum ="";
  while (min<=max){
  sum += min +" ";
   min++
  }
  return sum; 
}


console.log(numbersBetween(1, 5)); // "1 2 3 4 5"
console.log(numbersBetween(3, 7)); // "3 4 5 6 7"

// =============================================
// Завдання 2:
// Напишіть функцію, яка приймає рядок і повертає його у зворотньому порядку:
function reverseString(str) {
  let result = "";
  let index= str.length - 1;
 while (index>=0){
  
    result+=str[index] 
    index--
  }
 
return result;
}

console.log(reverseString("hello")); // "olleh"
console.log(reverseString("JavaScript")); // "tpircSavaJ"

// ==============================================
// Завдання 3:
// Реалізуйте функцію яка повертає рядок випадкових символів із набору symbols довжиною keyLength
function generateKey(keyLength, symbols) {
  let result = "";
  
  for (let i = 0; i < keyLength; i++) {
   
    const randomIndex = Math.floor(Math.random() * symbols.length);

    result += symbols[randomIndex];
  }
  
  return result;

}

const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
const key = generateKey(16, characters);
console.log(key); // eg599gb60q926j8i - випадкові символи з набору characters, 16 штук

const numbersOnly = '0123456789';
const numberKey = generateKey(25, numbersOnly);
console.log(numberKey); // 3847501826482930485728394 - випадкові символи з набору numbersOnly, 25 штук

// ==============================================
// Завдання 4 ЗА БАЖАННЯМ:
// Напишіть функцію, яка приймає два числа і виводить усі прості числа між ними (включно):
// Числа які діляться без залишку тільки на 1 і самі на себе
// Зовнішній цикл має проходити по всіх числах в діапазоні
// Внутрішній цикл має перевіряти чи є число простим (чи остаток від ділення на будь-яке число, окрім 1 і самого себе, дорівнює нулю)
function getPrimes(min, max) {
  let result = "";

  // Зробила з допомогою ШІ, дуже складно далося розуміння цього
  for (let i = min; i <= max; i++) {
    if (i < 2) continue;
  let isPrime = true;
  for (let j = 2; j <= Math.sqrt(i); j++) {
    if (i % j === 0) {
      isPrime = false; // Знайшли дільник, число не просте
      break; // Виходимо з внутрішнього циклу
    }
  }

  // Якщо після перевірки число залишилося простим, додаємо його до рядка
  if (isPrime) {
    result += i + " ";
  }
}

return result.trim(); // trim() прибирає зайвий пробіл в кінці
}

console.log(getPrimes(2, 10)); // "2 3 5 7"
console.log(getPrimes(20, 41)); // "23 29 31 37 41"