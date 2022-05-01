import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  /**
   * GET request
   *
   * @param endpoint Request endpoint
   * @param options Request headers, query params, etc.
   * @param mock Substitute mock data for real http
   */
  public get<T>(endpoint: string, options?: any) {
    return this.http.get<T>(endpoint, options).pipe(map((res: any) => res as T));
  }

  /**
   * POST request
   *
   * @param endpoint Request endpoint
   * @param data Request payload
   * @param options Request headers, query params, etc.
   */
  public post<T>(endpoint: string, postData: any, options?: any) {
    return this.http.post<T>(endpoint, postData, options).pipe(map((res: any) => res as T));
  }

  /**
   * PUT request
   *
   * @param endpoint Request endpoint
   * @param data Request payload
   * @param options Request headers, query params, etc.
   */
  public put<T>(endpoint: string, putData: any, options?: any) {
    return this.http.put<T>(endpoint, putData, options).pipe(map((res: any) => res as T));
  }
}
