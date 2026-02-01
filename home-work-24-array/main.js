"use strict";

// Дан масив об'єктів.

const users = [
  {
    index: 0,
    isActive: true,
    balance: "$2,226.60",
    name: "Eugenia Sawyer",
    gender: "female",
    phone: "+1 (840) 583-3207",
    address: "949 John Street, Rose, Puerto Rico, 1857",
  },
  {
    index: 1,
    isActive: true,
    balance: "$2,613.77",
    name: "Pauline Gallegos",
    gender: "female",
    phone: "+1 (985) 593-3328",
    address: "328 Greenpoint Avenue, Torboy, North Dakota, 6857",
  },
  {
    index: 2,
    isActive: false,
    balance: "$3,976.41",
    name: "Middleton Chaney",
    gender: "male",
    phone: "+1 (995) 591-2478",
    address: "807 Fleet Walk, Brutus, Arkansas, 9783",
  },
  {
    index: 3,
    isActive: true,
    balance: "$4,233.78",
    name: "Suzette Lewis",
    gender: "male",
    phone: "+1 (995) 587-3985",
    address: "920 Seba Avenue, Osage, Alabama, 6290",
  },
  {
    index: 4,
    isActive: true,
    balance: "$3,261.65",
    name: "Mcfadden Horne",
    gender: "male",
    phone: "+1 (942) 565-3988",
    address: "120 Scholes Street, Kirk, Michigan, 1018",
  },
  {
    index: 5,
    isActive: false,
    balance: "$1,790.56",
    name: "Suzette Lewis",
    gender: "female",
    phone: "+1 (837) 586-3283",
    address: "314 Dunne Place, Bawcomville, Guam, 9053",
  },
  {
    index: 6,
    isActive: false,
    balance: "$690.56",
    name: "Pauline Gallegos",
    gender: "female",
    phone: "+1 (837) 235-8462",
    address: "212 Seba Avenue, Osage, Alabama, 3234",
  },
  {
    index: 7,
    isActive: true,
    balance: "$1,934.58",
    name: "Burns Poole",
    gender: "male",
    phone: "+1 (885) 559-3422",
    address: "730 Seba Avenue, Osage, Alabama, 6290",
  },
];

// Написати функції для наступних дій:

// #1 Повернути масив телефонних номерів користувачів, у яких баланс менше ніж 2000 доларів.
function SearchNum() {
  return users
    .filter((user) =>
      Number(user.balance.replaceAll("$", "").replaceAll(",", "") < 2000)
    )
    .map((user) => user.phone);
}
console.log(SearchNum());
// #2 Знайти суму всіх балансів користувачів
function getTotalBalance() {
  return users
    .reduce((sum, user) => {
      return sum + Number(user.balance.replaceAll("$", "").replaceAll(",", ""));
    }, 0)
    .toFixed(2);
}

console.log(getTotalBalance());
// #3 Знайти користувача з максімальним балансом, вивести його
function getUserWithMaxBalance() {
  return users.reduce((maxUser, currentUser) => {
    const maxBalance = Number(
      maxUser.balance.replaceAll("$", "").replaceAll(",", "")
    );
    const currentBalance = Number(
      currentUser.balance.replaceAll("$", "").replaceAll(",", "")
    );
    return currentBalance > maxBalance ? currentUser : maxUser;
  });
}
console.log(getUserWithMaxBalance());
// #4 ЗА БАЖАННЯМ Вивести користувачів з повторюючимися іменами
function getUsersWithDuplicateNames() {
  const nameCount = users.reduce((acc, user) => {
    acc[user.name] = (acc[user.name] || 0) + 1;
    return acc;
  }, {});

  return users.filter((user) => nameCount[user.name] > 1);
}
console.log(getUsersWithDuplicateNames());
// ЗАБОРОНЕНО КОРИСТУВАТИСЯ ФОРОМ
