/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from "axios";
import { API_URL } from "../constants/Endpoints";
import { logDebug } from "../../utils/Logger";

class API {
  public endpoint = "";

  private static domain: string = API_URL;

  public tokens: string[] = [];

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  public tokenise = (token: string | number): API => {
    this.tokens.push(token.toString());
    return this;
  };

  public tokeniseEndpoint = (): string => {
    if (this.tokens.length === 0) {
      return this.endpoint;
    }
    let newEndpoint = this.endpoint;
    const re = /\{\d+\}/g;

    const matches = this.endpoint.match(re);

    if (matches) {
      matches.forEach((v, i) => {
        newEndpoint = newEndpoint.replace(v, this.tokens[i]);
      });
    }

    return newEndpoint;
  };

  public fetch = () => {
    const url = API.domain + this.tokeniseEndpoint();
    logDebug("api", `fetch url=${url}`);
    return axios.get(url);
  };

  public post = (params: any) => {
    const url = API.domain + this.tokeniseEndpoint();
    logDebug("api", `post url=${url} params=${params}`);
    return axios.post(url, params);
  };

  public patch = (params: any) => {
    const url = API.domain + this.tokeniseEndpoint();
    logDebug("api", `patch url=${url} params=${params}`);
    return axios.patch(url, params);
  };
}

export default API;
