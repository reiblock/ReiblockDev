import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiPath: any;

  constructor(private httpClient: HttpClient) {
    const env: any = environment;
    this.apiPath = env.apiEndpoint;
  }

  sendSubject(data: any) {
    return this.httpClient.post<Object>(`${this.apiPath}/rei_api/info`, data);
  }
  sendDebt(data: any) {
    return this.httpClient.post<Object>(`${this.apiPath}/rei_api/debt_info`, data);
  }
}
