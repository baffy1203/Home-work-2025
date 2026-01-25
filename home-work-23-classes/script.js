"use strict";

//  Завдання 1

// a) Створити клас Людина.
//   Властивості:
//     імʼя;
//     стать.
//   Методи:
//     конструктор, який приймає два параметри: імʼя та стать.
class Human {
  constructor(name, gender) {
    this.name = name;
    this.gender = gender;
  }
}

// b) Створити клас Квартира.
//   Властивості:
//     конструктор не потрібен;
//     масив жителів, який при створенні пустий.
//   Методи:
//     додати жителя - метод повинен приймати екземпляр класу Людина, та додавати до масиву жителів.
class Flat {
  constructor() {
    this.residents = [];
  }

  addResident(human) {
    this.residents.push(human);
  }
}

// c) Створити клас Будинок.
class Building {
  constructor(maxFlats) {
    this.flats = [];
    this.maxFlats = maxFlats;
  }

  addFlat(flat) {
    if (flat instanceof Flat) {
      if (this.flats.length < this.maxFlats) {
        this.flats.push(flat);
      } else {
        console.log(
          "Неможливо додати квартиру: перевищено максимальну кількість квартир"
        );
      }
    } else {
      console.log("Можна додавати лише екземпляри класу Flat");
    }
  }
}

//   Властивості:
//     масив квартир, який при створенні пустий;
//     максимальна кількість квартир.
//   Методи:
//     конструктор, який приймає один параметр: максимальну кількість квартир;
//     додати квартиру - метод повинен приймати екземпляр класу Квартира, перевіряти, чи не буде кількість перевищувати максимальну кількість квартир,
// і якщо це так, додати квартиру, в іншому випадку виводить у консоль відповідне повідомлення.

// d) В якості демонстраціїї створити:
//   декілька екземплярів класу Людина;
const human1 = new Human("Оля", "жінка");
const human2 = new Human("Андрій", "чоловік");
const human3 = new Human("Марія", "жінка");

const flat = new Flat();

flat.addResident(human1);
flat.addResident(human2);

console.log(flat.residents);
//   декілька екземплярів класу Квартира;
//   екземпляр класу Будинок;
const building = new Building(2);

const flat1 = new Flat();
const flat2 = new Flat();

building.addFlat(flat1);
building.addFlat(flat2);

console.log(building.flats);
//   додадити екземпляри класу Людина до екземплярів класу Квартира;
flat1.addResident(human1);
flat1.addResident(human2);

flat2.addResident(human3);

//   додадити екземпляри класу Квартира до екземплярів класу Будинок.
console.log("Квартира 1:", flat1.residents);
console.log("Квартира 2:", flat2.residents);
console.log("Будинок:", building.flats);

// ==========================================================

/* Завдання 2. ЗА БАЖАННЯМ
Мережа фастфудів пропонує кілька видів гамбургерів:
  маленький (50 тугриків, 20 калорій);
  великий (100 тугриків, 40 калорій).

Гамбургер може бути з одним із декількох видів начинок:
  сиром (+ 10 тугриків, + 20 калорій);
  салатом (+ 20 тугриків, + 5 калорій);
  картоплею (+ 15 тугриків, + 10 калорій).

Можна додати добавки:
  посипати приправою (+15 тугриків, 0 калорій)
  полити майонезом (+ 20 тугриків, +5 калорій).


Напишіть програму, яка розраховує вартість та калорійність гамбургера. Використовуйте ООП підхід.

Підказка: потрібен клас Гамбургер, константи (великими літерами), методи для вибору опцій та розрахунку потрібних величин.
Все що береться від імені класу - це статичні методи або властивості.
*/

// маленький гамбургер з начинкою з сиру
const hamburger = new Hamburger(
  Hamburger.SIZE_SMALL,
  Hamburger.STUFFING_CHEESE
);

// добавка з майонезу
hamburger.addTopping(Hamburger.TOPPING_MAYO);

// запитаємо скільки там калорій
console.log("Calories: ", hamburger.calculate());

// скільки коштує
console.log("Price: ", hamburger.calculatePrice());

// я тут передумав і вирішив додати ще приправу
hamburger.addTopping(Hamburger.TOPPING_SAUCE);

// А скільки тепер коштує?
console.log("Price with sauce: ", hamburger.calculatePrice());
