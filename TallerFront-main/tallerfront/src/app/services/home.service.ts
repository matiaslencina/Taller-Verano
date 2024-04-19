import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }
  getDatos(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/api/v1/home');
  }
}
