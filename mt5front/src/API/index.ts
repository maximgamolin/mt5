import { GetBranchParams, GetBranchesParams, Office } from "./types";

const API_BASE_URL = "http://127.0.0.1:8000/apiv1";
export class API {
  constructor() {}
  async getBranches(params: GetBranchesParams = {}): Promise<Office[]> {
    const queryParams = new URLSearchParams(params).toString();
    const response = await fetch(API_BASE_URL + "/branches?" + queryParams);
    const data = await response.json();
    return data;
  }
  async getBranch({ id, ...params }: GetBranchParams) {
    const queryParams = new URLSearchParams(params).toString();

    const response = await fetch(
      API_BASE_URL + "/branches/" + `${id}/?` + queryParams
    );
    const data = await response.json();
    return data;
  }
}
