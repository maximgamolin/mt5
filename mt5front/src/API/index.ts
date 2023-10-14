import { GetBranchesParams, Office } from "./types";

// http://127.0.0.1:8000/apiv1/branches/3191
const API_BASE_URL = "http://127.0.0.1:8000/apiv1";
export class API {
  constructor() {}
  async getBranches(params: GetBranchesParams = {}): Promise<Office[]> {
    const queryParams = new URLSearchParams(params).toString();
    const response = await fetch(API_BASE_URL + "/branches?" + queryParams);
    const data = await response.json();
    return data;
  }
}
