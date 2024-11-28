import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({providedIn:'root'})
export class CustomHttpClient 
{
    constructor(private http: HttpClient) {}

    get<T>(url: string) {
      return this.http.get<T>(url);
    }
  
    post<T>(url: string, body: any) {
      return this.http.post<T>(url, body);
    }

    
}