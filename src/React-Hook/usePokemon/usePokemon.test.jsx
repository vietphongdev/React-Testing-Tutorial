import { act, renderHook } from "@testing-library/react-hooks";

import { usePokemon } from "./usePokemon";

const getControlledPromise = () => {
  let deferred;

  const promise = new Promise((resolve, reject) => {
    deferred = { resolve, reject };
  });

  return { deferred, promise };
};

describe("usePokemon", () => {
  test("function fetch Pokemon should be call", async () => {
    global.fetch = jest.fn();

    await act(async () => renderHook(() => usePokemon("pikachu")));

    expect(global.fetch).toBeCalledWith(
      "https://pokeapi.co/api/v2/pokemon/pikachu"
    );
  });

  describe("while fetching data", () => {
    test("it should be show loading state correctly", async () => {
      const { deferred } = getControlledPromise();

      global.fetch = jest.fn();

      const { result, waitForNextUpdate } = renderHook(usePokemon);

      expect(result.current.isLoading).toBe(true);

      deferred.resolve(); // deferred.reject();

      await waitForNextUpdate();

      expect(result.current.isLoading).toBe(false);
    });
  });

  describe("when got data success", () => {
    test("it should be show data correctly", async () => {
      const { deferred, promise } = getControlledPromise();

      global.fetch = jest.fn(() => promise);

      const { result, waitForNextUpdate } = renderHook(usePokemon);

      deferred.resolve({ json: () => ({ pokemon: "pikachu" }) });

      await waitForNextUpdate();

      expect(result.current.pokemon).toStrictEqual({ pokemon: "pikachu" });
    });
  });

  describe("with an error during request", () => {
    it("it should be show error correctly", async () => {
      const { deferred, promise } = getControlledPromise();

      global.fetch = jest.fn(() => promise);

      const { result, waitForNextUpdate } = renderHook(usePokemon);

      deferred.reject((error) => ({ error: "Fetch error" }));

      await waitForNextUpdate();

      expect(result.current.error).toStrictEqual({ error: "Fetch error" });
    });
  });
});
