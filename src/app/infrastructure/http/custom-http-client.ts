import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({providedIn:'root'})
export class CustomHttpClient 
{
    constructor(private http: HttpClient) {}

    get<T>(url: string) {
      return this.http.get<T>(url);
    }

    getWithQuery<T>(url: string,queryParamName:string,queryParamValue:string) {
      let apiParams=new HttpParams();
      apiParams=apiParams.set(queryParamName,queryParamValue);
      return this.http.get<T>(url,{params:apiParams});
    }
  
    post<T>(url: string, body: any) {
      return this.http.post<T>(url, body,{ withCredentials: true });
    }

    postEmpty<T>(url: string) {
      return this.http.post<T>(url,null,{ withCredentials: true });
    }
    
}