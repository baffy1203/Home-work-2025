import { ageClassification } from "./main.js";
import { getWeekDay } from "./main.js";

describe("функція перевірки віку", () => {
  test("від’ємний вік", () => {
    expect(ageClassification(-5)).toBeNull();
  });

  test("дитинство", () => {
    expect(ageClassification(0)).toBe("Дитинство");
    expect(ageClassification(24)).toBe("Дитинство");
  });

  test("молодість", () => {
    expect(ageClassification(25)).toBe("Молодість");
    expect(ageClassification(44)).toBe("Молодість");
  });

  test("зрілість", () => {
    expect(ageClassification(45)).toBe("Зрілість");
    expect(ageClassification(65)).toBe("Зрілість");
  });

  test("старість", () => {
    expect(ageClassification(66)).toBe("Старість");
    expect(ageClassification(75)).toBe("Старість");
  });

  test("довголіття", () => {
    expect(ageClassification(76)).toBe("Довголіття");
    expect(ageClassification(90)).toBe("Довголіття");
  });

  test("рекорд", () => {
    expect(ageClassification(91)).toBe("Рекорд");
    expect(ageClassification(122)).toBe("Рекорд");
  });

  test("неможливий вік", () => {
    expect(ageClassification(130)).toBe("Неможливо");
  });

  test("некоректні дані", () => {
    expect(ageClassification("25")).toBeNull();
    expect(ageClassification(NaN)).toBeNull();
    expect(ageClassification(undefined)).toBeNull();
  });
});

describe("функція визначення дня тижня", () => {
  test("повертає правильні дні", () => {
    expect(getWeekDay(1)).toBe("Понеділок");
    expect(getWeekDay(2)).toBe("Вівторок");
    expect(getWeekDay(3)).toBe("Середа");
    expect(getWeekDay(4)).toBe("Четвер");
    expect(getWeekDay(5)).toBe("Пʼятниця");
    expect(getWeekDay(6)).toBe("Субота");
    expect(getWeekDay(7)).toBe("Неділя");
  });

  test("числа поза діапазоном", () => {
    expect(getWeekDay(0)).toBeNull();
    expect(getWeekDay(8)).toBeNull();
    expect(getWeekDay(-3)).toBeNull();
  });

  test("некоректні типи", () => {
    expect(getWeekDay("1")).toBeNull();
    expect(getWeekDay(null)).toBeNull();
    expect(getWeekDay(undefined)).toBeNull();
    expect(getWeekDay(NaN)).toBeNull();
  });
});
