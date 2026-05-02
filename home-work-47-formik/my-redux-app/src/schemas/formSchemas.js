import * as yup from 'yup';

export const contactSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Ім'я занадто коротке")
    .required("Ім'я обов'язкове"),

  email: yup
    .string()
    .email("Невірний email")
    .required("Email обов'язковий"),

    phone: yup
    .string()
    .matches(/^[0-9]+$/, "Тільки цифри")
    .min(9, "Номер занадто короткий")
    .max(9, "Номер занадто довгий")
    .required("Телефон обов'язковий"),

  message: yup
    .string()
    .min(10, "Повідомлення занадто коротке")
    .required("Повідомлення обов'язкове"),
});