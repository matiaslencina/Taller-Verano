import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form:FormGroup;
  loading=false;

  constructor(private rest: RestService, 
    private router:Router, 
    private fb:FormBuilder){ 
    this.form=this.fb.group({
      usuario:['',Validators.required],
      contrasenia:['',Validators.required]
    })
  }
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  ingresar() {
  const user={
    username: this.form.value.usuario,
    password: this.form.value.contrasenia
  };

  const params = new HttpParams()
    .set('username', user.username)
    .set('password', user.password)

  this.rest.login(params).subscribe((data)=>{
    console.log("token:", data);
    localStorage.setItem('token', data.access_token);
    console.log('Ingreso correcto');
    this.router.navigate(['/home'])
  })
  }

}

