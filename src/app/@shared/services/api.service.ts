import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  /**
   * GET request
   *
   * @param endpoint Request endpoint. Ex: /insights/user
   * @param options Request headers, query params, etc.
   * @param mock Substitute mock data for real http
   */
  public get<T>(endpoint: string, options?: unknown): Observable<T> {
    return this.http.get<T>(endpoint, options);
  }

  /**
   * POST request
   *
   * @param endpoint Request endpoint. Ex: /insights/user
   * @param data Request payload
   * @param options Request headers, query params, etc.
   */
  public post<T>(endpoint: string, postData: unknown, options?: unknown): Observable<T> {
    return this.http.post<T>(endpoint, postData, options);
  }

  /**
   * PUT request
   *
   * @param endpoint Request endpoint. Ex: /insights/user
   * @param data Request payload
   * @param options Request headers, query params, etc.
   */
  public put<T>(endpoint: string, putData: unknown, options?: unknown): Observable<T> {
    return this.http.put<T>(endpoint, putData, options);
  }
}
