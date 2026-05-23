import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import ContactForm from "./ContactForm";

test("renders contact form", () => {
  render(<ContactForm />);

  const buttonElement = screen.getByText(/відправити/i);

  expect(buttonElement).toBeInTheDocument();
});

describe("ContactForm", () => {
  test("renders successfully", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText("Ім'я")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone")).toBeInTheDocument();
    expect(screen.getByLabelText("Повідомлення")).toBeInTheDocument();

    expect(screen.getByText("Відправити")).toBeInTheDocument();
  });

  test("Name validation required should work", async () => {
    render(<ContactForm />);

    const nameInput = screen.getByLabelText("Ім'я");

    fireEvent.focus(nameInput);
    fireEvent.blur(nameInput);

    const errorBlock = await screen.findByText("Ім'я обов'язкове");

    expect(errorBlock).toBeInTheDocument();
  });

  test("Email validation should work", async () => {
    render(<ContactForm />);

    const emailInput = screen.getByLabelText("Email");

    fireEvent.input(emailInput, {
      target: {
        value: "wrongemail",
      },
    });

    fireEvent.blur(emailInput);

    const errorBlock = await screen.findByText("Невірний email");

    expect(errorBlock).toBeInTheDocument();
  });

  test("Phone validation should work", async () => {
    render(<ContactForm />);

    const phoneInput = screen.getByLabelText("Phone");

    fireEvent.input(phoneInput, {
      target: {
        value: "12",
      },
    });

    fireEvent.blur(phoneInput);

    const errorBlock = await screen.findByText("Номер занадто короткий");

    expect(errorBlock).toBeInTheDocument();
  });

  test("Message validation should work", async () => {
    render(<ContactForm />);

    const messageInput = screen.getByLabelText("Повідомлення");

    fireEvent.input(messageInput, {
      target: {
        value: "hey",
      },
    });

    fireEvent.blur(messageInput);

    const errorBlock = await screen.findByText("Повідомлення занадто коротке");

    expect(errorBlock).toBeInTheDocument();
  });
});
