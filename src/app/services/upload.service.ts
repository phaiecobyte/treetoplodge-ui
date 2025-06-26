import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

interface UploadResponse {
  data: string;      // The URL will be here
  success: boolean;
  message: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private baseUrl = 'http://localhost:8081/api/v1/upload/'
  constructor(private http: HttpClient) { }

  singleUpload(file: File, directory: string = ''): Observable<{url: string}> {
    const formData = new FormData();
    formData.append('file', file);
    
    return this.http.post<UploadResponse>(
      `${this.baseUrl}single?directory=${directory}`, 
      formData,
      {
        headers: new HttpHeaders({
          'Accept': 'application/json'
        })
      }
    ).pipe(
      map(response => {
        // Transform the response structure to what your component expects
        return { url: response.data };
      }),
      catchError(error => {
        console.error('Upload error:', error);
        return throwError(() => new Error('Upload failed. Please try again.'));
      })
    );
  }

  multipleUpload(file: File, directory: string = ''): Observable<{url: string}> {
    const formData = new FormData();
    formData.append('file', file);
    
    return this.http.post<UploadResponse>(
      `${this.baseUrl}multiple?directory=${directory}`, 
      formData,
      {
        headers: new HttpHeaders({
          'Accept': 'application/json'
        })
      }
    ).pipe(
      map(response => {
        // Transform the response structure to what your component expects
        return { url: response.data };
      }),
      catchError(error => {
        console.error('Upload error:', error);
        return throwError(() => new Error('Upload failed. Please try again.'));
      })
    );
  }
  
}

