import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private baseUrl = environment.apiUrl;

  get(endpoint: string) {
    return this.http.get(`${this.baseUrl}/${endpoint}`);
  }

  post(endpoint: string, data: any) {
    return this.http.post(`${this.baseUrl}/${endpoint}`, data);
  }

  put(endpoint: string, data: any) {
    return this.http.put(`${this.baseUrl}/${endpoint}`, data);
  }

  delete(endpoint: string) {
    return this.http.delete(`${this.baseUrl}/${endpoint}`);
  }
}
