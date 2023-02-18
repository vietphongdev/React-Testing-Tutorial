import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import User from "./User";
import { usersData } from "./mocks/handlers";

describe("login", () => {
  const emailInput = screen.getByPlaceholderText("email");
  const passWordInput = screen.getByPlaceholderText("password");
  const submitButton = screen.getByRole("button", { name: "Submit" });

  test("user login will render list of users", async () => {
    render(<User />);

    userEvent.type(emailInput, "john.doe@gmail.com");
    userEvent.type(passWordInput, "12345");
    userEvent.click(submitButton);

    await waitFor(() => {
      const logoutButton = screen.getByRole("button", { name: "Logout" });
      expect(logoutButton).toBeInTheDocument();
    });

    await waitFor(() => {
      usersData.forEach((user) => {
        expect(screen.getByText(user.first_name)).toBeInTheDocument();
      });
    });
  });

  test("error on login will show an error message", async () => {
    render(<User />);

    userEvent.type(emailInput, "michael.doe@gmail.com");
    userEvent.type(passWordInput, "12345");

    userEvent.click(submitButton, { name: "Submit" });

    await waitFor(() => {
      const errorElement = screen.getByText("Something went wrong");
      expect(errorElement).toBeInTheDocument();
    });
  });
});
