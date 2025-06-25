import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Accommodation } from "../shared/models/accommodation";

export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number; 
  size: number;
}


@Injectable({
  providedIn: 'root'
})
export abstract class BaseApiService <T>{
    // protected baseUrl = 'http://localhost:8081/api/v1/'
    protected baseUrl = 'http://192.168.1.5:8081/api/v1/'
    constructor(
        protected http:HttpClient,
        protected endpoint:string
    ){}

   findAll(page: number = 0, size: number = 10, sort: string = ''): Observable<PageResponse<T>> {
    const params: any = {
      page,
      size,
    };
    
    if (sort) params.sort = sort;

    return this.http.get<PageResponse<T>>(`${this.baseUrl}${this.endpoint}`, { params });
  }

  create(data:T){
    return this.http.post(`${this.baseUrl}${this.endpoint}`,data)
  }

}
