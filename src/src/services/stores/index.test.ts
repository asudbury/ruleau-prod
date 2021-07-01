import { store } from ".";

test("Test Store", () => {
  const newStore = store;

  expect(newStore.getState()).not.toBeNull();
});
