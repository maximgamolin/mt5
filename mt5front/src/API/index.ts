import offices from './data/offices.json';
import {Office} from './types';
export const API_KEY = '1e1b39bc-96ad-4297-9808-7264b132b19c';

export class API {
  constructor() {}
  async getOffices(): Promise<Office[]> {
    return offices;
  }
}
