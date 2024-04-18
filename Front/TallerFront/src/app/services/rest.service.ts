import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Registro } from "../components/registro/registro.model";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
 })
export class RestService {
    
    constructor(private http: HttpClient,private router: Router) {
        
     }

    login(params: HttpParams): Observable<any> {
        console.log(params);
        return this.http.post("http://localhost:8080/api/v1/login", params.toString(), {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        });
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('token');
      }
    
    
      logout(): void {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }

      register(registro: Registro): Observable<any> {
        return this.http.post("http://localhost:8080/api/v1/usuario/save", registro);
      }

      getComp(){
        return this.http.get("http://localhost:8080/api/v1/competencias",{
          headers: new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('token')})})
        }
        
        getPart(){
          return this.http.get("http://localhost:8080/api/v1/partidos",{
            headers: new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('token')})})
          } 
    
          getFixture(): Observable<any> {
            return this.http.get<any>('http://localhost:8080/api/v1/fixture', {
              headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})
            });
          }
    
    
}