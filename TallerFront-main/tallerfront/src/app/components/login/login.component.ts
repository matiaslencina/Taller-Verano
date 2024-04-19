import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { RestService } from 'src/app/services/rest.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit{
  form:FormGroup;
  loading = false;

  constructor(
    private fb:FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private rest:RestService,
    private authService: AuthService
    ){
      this.form=this.fb.group({
        usuario:['',Validators.required],
        contrasenia:['',Validators.required]
      })
     }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

      ingresar() {

        console.log(this.form.value.usuario)
        const user = {
            username: this.form.value.usuario,
            password: this.form.value.contrasenia
        };
    
        console.log(user);
        
        const params = new HttpParams()
          .set('username', user.username)
          .set('password', user.password); 

        this.rest.login(params).subscribe(
          (data: any) => {
            localStorage.setItem('token', data.access_token);
            console.log('Ingreso correcto');
            this.router.navigate(['home'])
        });
    }

    logout() {
      this.authService.logout();
    }
  
     fakeloading(){
      this.loading=true;
      setTimeout(() => {
        this.router.navigate(['dashboard'])

      }, 1500);
     }

     error(){
      this._snackBar.open('Usuario y/o contraseña incorrecta', '', {
        duration:5000,
        horizontalPosition:'center',
        verticalPosition:'bottom'
      })
     }

     onSuccessfulLogin(userId: number) {
      this.authService.login(userId); // Llama al método login del servicio AuthService con el ID de usuario
      // Otras acciones después del inicio de sesión, como redireccionar al usuario a otra página
    }
}