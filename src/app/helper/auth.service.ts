import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  baseUrl = 'http://192.168.1.5:8081/api/v1'
  constructor(private http:HttpClient) {
    
   }

   login(creditials:{phoneNumber:string; password:string}){
    return this.http.post<{token:string}>(`${this.baseUrl}/auth/login`,creditials);
   }
   saveToken(response:any){
    localStorage.setItem('access_token',response.data.accessToken);
    localStorage.setItem('refresh_token',response.data.refreshToken);
   }
   getToken():string|null{
    return localStorage.getItem('access_token');
   }
   logout(){
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
   }
   isAuthenticated():boolean{
    return !!this.getToken();
   }

}
