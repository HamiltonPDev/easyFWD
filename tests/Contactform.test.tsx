import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "app/components/contact-form/ContactForm";

describe("ContactForm", () => {
  beforeAll(() => {
    // Mock the fetch function to prevent actual network requests
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: "Success" }),
      })
    ) as jest.Mock;
  });

  beforeEach(() => {
    render(<ContactForm />);
  });

  // Test:1
  test("Foutmelding als naam niet is ingevuld", async () => {
    const submitButton = screen.getByRole("button", { name: /submit/i });

    await userEvent.click(submitButton);

    const errorMessage = screen.getByText(/please enter your name/i);
    expect(errorMessage).toBeInTheDocument();
  });
  // Test:2
  test("Foutmelding als e-mailadres niet is ingevuld", async () => {
    const submitButton = screen.getByRole("button", { name: /submit/i });

    await userEvent.click(submitButton);

    const errorMessage = screen.getByText(
      /please enter a valid email address/i
    );
    expect(errorMessage).toBeInTheDocument();
  });
  // Test:3
  test("Foutmelding als bericht niet is ingevuld", async () => {
    const submitButton = screen.getByRole("button", { name: /submit/i });

    await userEvent.click(submitButton);

    const errorMessage = screen.getByText(/please enter a message/i);
    expect(errorMessage).toBeInTheDocument();
  });
  // Test:4
  test("Foutmelding als de voorwaarden niet zijn geaccepteerd", async () => {
    const submitButton = screen.getByRole("button", { name: /submit/i });

    await userEvent.click(submitButton);

    const errorMessage = screen.getByText(
      /you must accept the terms to proceed/i
    );
    expect(errorMessage).toBeInTheDocument();
  });
  // Test:5
  test("Succesvol als alle verplichte velden correct zijn ingevuld", async () => {
    const nameInput = screen.getByPlaceholderText(/enter your name/i);
    const emailInput = screen.getByPlaceholderText(/enter your email/i);
    const messageInput = screen.getByPlaceholderText(/type your message/i);
    const termsCheckbox = screen.getByLabelText(/i accept the terms/i);
    const submitButton = screen.getByRole("button", { name: /submit/i });

    await userEvent.type(nameInput, "John Doe");
    await userEvent.type(emailInput, "john@test.com");
    await userEvent.type(messageInput, "Hallo, dit is een testbericht.");
    await userEvent.click(termsCheckbox);

    await userEvent.click(submitButton);

    const successMessage = await screen.findByText(
      /thank you for your message! we will get back to you as soon as possible./i
    );
    expect(successMessage).toBeInTheDocument();
  });
  // Test:6
  test("Reset de invoervelden na succesvolle verzending", async () => {
    // met Type Assertion om de types van de invoervelden te specificeren
    // Weet typescript in test omgeving wat voor elemente het zijn zodat juiste properties kunnen worden gebruikt

    const nameInput = screen.getByPlaceholderText(
      /enter your name/i
    ) as HTMLInputElement;
    const emailInput = screen.getByPlaceholderText(
      /enter your email/i
    ) as HTMLInputElement;
    const messageInput = screen.getByPlaceholderText(
      /type your message/i
    ) as HTMLTextAreaElement;
    const termsCheckbox = screen.getByLabelText(
      /i accept the terms/i
    ) as HTMLInputElement;
    const submitButton = screen.getByRole("button", { name: /submit/i });

    await userEvent.type(nameInput, "John Doe");
    await userEvent.type(emailInput, "john@test.com");
    await userEvent.type(messageInput, "Test message");
    await userEvent.click(termsCheckbox);
    await userEvent.click(submitButton);

    await screen.findByText(
      /thank you for your message! we will get back to you as soon as possible./i
    );

    expect(nameInput.value).toBe("");
    expect(emailInput.value).toBe("");
    expect(messageInput.value).toBe("");
    expect(termsCheckbox.checked).toBe(false);
  });

  // Test:7
  test("Foutmelding verdwijnt nadat een verplichte inputveld correct is ingevuld, in dit geval input veld naam", async () => {
    const nameInput = screen.getByPlaceholderText(/enter your name/i);
    const submitButton = screen.getByRole("button", { name: /submit/i });

    await userEvent.click(submitButton);

    const errorMessage = await screen.findByText(/please enter your name/i);
    expect(errorMessage).toBeInTheDocument();

    await userEvent.type(nameInput, "john doe");

    expect(
      screen.queryByText(/please enter your name/i)
    ).not.toBeInTheDocument();
  });

  // Test:8
  test("Formulier wordt succesvol verzonden zonder verplichte inputveld, in dit gevan input veld bedrijfsnaam", async () => {
    const nameInput = screen.getByPlaceholderText(
      /enter your name/i
    ) as HTMLInputElement;
    const emailInput = screen.getByPlaceholderText(
      /enter your email/i
    ) as HTMLInputElement;
    const messageInput = screen.getByPlaceholderText(
      /type your message/i
    ) as HTMLTextAreaElement;
    const termsCheckbox = screen.getByLabelText(
      /i accept the terms/i
    ) as HTMLInputElement;
    const submitButton = screen.getByRole("button", { name: /submit/i });

    await userEvent.type(nameInput, "John Doe");
    await userEvent.type(emailInput, "john@test.com");
    await userEvent.type(messageInput, "Dit is een test.");
    await userEvent.click(termsCheckbox);

    await userEvent.click(submitButton);

    const successMessage = await screen.findByText(
      /thank you for your message! we will get back to you as soon as possible./i
    );
    expect(successMessage).toBeInTheDocument();
  });
  // Test:9
  test("Foutmelding als het verzenden van het formulier mislukt", async () => {
    // Mock fetch om een fout te simuleren
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: "Something went wrong" }),
      })
    ) as jest.Mock;

    const nameInput = screen.getByPlaceholderText(/enter your name/i);
    const emailInput = screen.getByPlaceholderText(/enter your email/i);
    const messageInput = screen.getByPlaceholderText(/type your message/i);
    const termsCheckbox = screen.getByLabelText(/i accept the terms/i);
    const submitButton = screen.getByRole("button", { name: /submit/i });

    await userEvent.type(nameInput, "John Doe");
    await userEvent.type(emailInput, "john@test.com");
    await userEvent.type(messageInput, "Test error");
    await userEvent.click(termsCheckbox);

    await userEvent.click(submitButton);

    const errorMessage = await screen.findByText(
      /Oops! Something went wrong. Please try again later./i
    );
    expect(errorMessage).toBeInTheDocument();
  });
  // Test:10
  test("Foutmeldingen voor alle verplichte velden wanneer geen enkel verplicht veld is ingevuld.", async () => {
    const submitButton = screen.getByRole("button", { name: /submit/i });

    await userEvent.click(submitButton);

    const nameError = screen.getByText(/please enter your name/i);
    const emailError = screen.getByText(/please enter a valid email address/i);
    const messageError = screen.getByText(/please enter a message/i);
    const termsError = screen.getByText(
      /you must accept the terms to proceed/i
    );

    expect(nameError).toBeInTheDocument();
    expect(emailError).toBeInTheDocument();
    expect(messageError).toBeInTheDocument();
    expect(termsError).toBeInTheDocument();
  });
});
