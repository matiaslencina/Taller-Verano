import {Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
nombre:string = 'Pablo';
    private _login: any;

    private baseUrl = 'http://localhost:8080/api/v1';

    constructor() { }

    imprimirLogin(user:string,pass:string){
        console.log('funcion imprimir login')

        console.log('usuario',user)
        console.log('contrasenia',pass)
    }

    setNombre(valor:string){
        this.nombre = valor
    }

    getNombre():string{
        return this.nombre;
    }

    verNombre(){
        this._login.getNombre();
        console.log( this._login.getNombre())
    }

    cambiarNombre(){
        this._login.setNombre('Franco')
    }
}