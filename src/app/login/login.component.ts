import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthenticatedResponse } from '../_inteface/authenticated-response.model';
import { LoginModel } from '../_inteface/login.model';
import { NgForm, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder,Validators, FormControl } from '@angular/forms';
import { SiscointService } from '../siscoint.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean = false;
  token: string|undefined;
  credenciales: LoginModel = {Username:'', Password:''};
  usuario : string = '';
  password : string = '';
  //addCredeniales : FormGroup;
  constructor(private fb: FormBuilder,
              private router: Router, 
              private http: HttpClient, 
              private siscointService : SiscointService,
              private aRouter : ActivatedRoute,
              private toastr: ToastrService
              ) {  this.token = undefined; }

  ngOnInit(): void {
  }

  login(){
    
      
      this.credenciales = {
        Username : this.usuario,
        Password : this.password
      }

      //console.log(this.credenciales);
      this.siscointService.Authenticated(this.credenciales)
      .subscribe(data => {
        //console.log(data);
        localStorage.setItem('jwt', data);
        this.router.navigateByUrl('/home')
      })
      
  }

}
