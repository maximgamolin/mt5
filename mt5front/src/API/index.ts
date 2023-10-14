import offices from "./data/offices.json";
import { Office } from "./types";

export class API {
  constructor() {}
  async getOffices(): Promise<Office[]> {
    return offices;
  }
}
