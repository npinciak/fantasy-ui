import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
   */
  public get<T>(endpoint: string, options?: any): Observable<T> {
    return this.http.get<T>(endpoint, options).pipe(map((res: any) => res as T));
  }

  /**
   * POST request
   *
   * @param endpoint Request endpoint
   * @param data Request payload
   * @param options Request headers, query params, etc.
   */
  public post<T>(endpoint: string, postData: any, options?: any): Observable<T> {
    return this.http.post<T>(endpoint, postData, options).pipe(map((res: any) => res as T));
  }

  /**
   * PUT request
   *
   * @param endpoint Request endpoint
   * @param data Request payload
   * @param options Request headers, query params, etc.
   */
  public put<T, U>(endpoint: string, putData: U, options?: any): Observable<T> {
    return this.http.put<T>(endpoint, putData, options).pipe(map((res: any) => res as T));
  }

  /**
   * DELETE request
   *
   * @param endpoint Request endpoint
   * @param data Request payload
   */
  public delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(endpoint).pipe(map((res: any) => res as T));
  }
}
