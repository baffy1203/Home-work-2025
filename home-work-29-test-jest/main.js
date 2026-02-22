

// Завдання #1
// Напишіть функцію ageClassification, яка приймає один аргумент num — вік людини (число).
// Напишіть для неї тести. Протестуйте не тільки правильні варіанти

// Функція повинна повертати рядок з назвою вікової категорії відповідно до таких умов:
// меньше 0 - null
// від 0 до 24 - "Дитинство"
// від 25 до 44 - "Молодість"
// від 45 до 65 - "Зрілість"
// від 66 до 75 - "Старість"
// від 76 до 90 - "Довголіття"
// від 91 до 122 - "Рекорд"
// більше 122 - "Неможливо"
 export function ageClassification(amount){
  if (typeof amount !== "number" || Number.isNaN(amount)) return null;
  if (amount < 0) return null;

  if (amount >= 0 && amount <= 24) {
    return "Дитинство";
  } else if (amount >= 25 && amount <= 44) {
    return "Молодість";
  } else if (amount >= 45 && amount <= 65) {
    return "Зрілість";
  } else if (amount >= 66 && amount <= 75) {
    return "Старість";
  } else if (amount >= 76 && amount <= 90) {
    return "Довголіття";
  } else if (amount >= 91 && amount <= 122) {
    return "Рекорд";
  } else if (amount > 122) {
    return "Неможливо";
  }


 }
console.log(ageClassification(123));

// Завдання #2
// Напишіть функцію getWeekDay, яка приймає один аргумент num — порядок дня тижня. 1 - Понеділок, 7 - Неділя
// І повертає назву дня українською
// Напишіть для неї тести. Протестуйте не тільки правильні варіанти

// 1 - 'Понеділок'
// 2 - 'Вівторок'
// 3 - 'Середа'
// 4 - 'Четвер'
// 5 - 'Пʼятниця'
// 6 - 'Субота'
// 7 - 'Неділя'
// Усе інше - null
export function getWeekDay(num) {
  if (typeof num !== "number" || Number.isNaN(num)) {
    return null;
  }

  if (num === 1) {
    return "Понеділок";
  } else if (num === 2) {
    return "Вівторок";
  } else if (num === 3) {
    return "Середа";
  } else if (num === 4) {
    return "Четвер";
  } else if (num === 5) {
    return "Пʼятниця";
  } else if (num === 6) {
    return "Субота";
  } else if (num === 7) {
    return "Неділя";
  } else {
    return null;
  }
}
console.log(getWeekDay(6));