import { MenuItem, Category, FilterState } from '../types';

const API_BASE = '/api/v1';

class ApiClient {
  private token: string | null = localStorage.getItem('gourmet_token');

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('gourmet_token', token);
    } else {
      localStorage.removeItem('gourmet_token');
    }
  }

  getToken(): string | null {
    return this.token;
  }

  private async request<T>(endpoint: string