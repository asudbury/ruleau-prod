import API from ".";
import * as Endpoints from "../constants/Endpoints";

test("tokenise", () => {
  const api = new API(Endpoints.CASE_OVERRIDES);

  api.tokenise("myToken");

  expect(api.tokens).toContain("myToken");
});

test("tokeniseEndPoint", () => {
  const api = new API(Endpoints.CASE_OVERRIDES);

  api.tokenise("myToken");
  const endPoint = api.tokeniseEndpoint();

  expect(endPoint).toContain("myToken");
});
