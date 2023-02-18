import { render, screen, act } from "@testing-library/react";
import React from "react";
import { Joke } from "./Joke";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        icon_url: "https://image.png",
        value: "Joke text",
      }),
  })
);

describe("App", () => {
  test("loads the joke on mount", async () => {
    await act(async () => render(<Joke />));
    expect(screen.getByText("Joke text")).toBeInTheDocument();
  });
});
