import { Component, OnInit } from '@angular/core';
import { LoginModel } from 'src/app/_inteface/login.model';
import { SiscointService } from 'src/app/siscoint.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  invalidLogin: boolean = false;
  usuario : string = '';
  password : string = '';
  password_re : string = '';
  mensajePassword : string  = '';
  arrayString : string[] = [];
  EsFormularioValido : boolean = false;
  credenciales: LoginModel = {Username:'', Password:''};
  constructor(private siscointService : SiscointService) { }

  ngOnInit(): void {
  }

  reset(){
    if(this.EsFormularioValido){
      
      if(this.password == this.password_re){
        this.credenciales = {
          Username : this.usuario,
          Password : this.password
        }
        this.siscointService.ResetPassword(this.credenciales).subscribe(data => {
          console.log(data);
        })
        //alert("paso!")
      }else{
        alert("Las Contraseñas no son Iguales!");
      }
    }else{
      alert("Las Contraseñas nos son Iguales!")
    }
  }

  keyup(e:any){
    this.password_re = "";
    this.password_re += e.target.value + '|';
    this.arrayString = this.password_re.split('|')
    
    let position : number  = this.arrayString.length
    this.password_re = this.arrayString[position-2]
    
    if(this.password != this.password_re){
      this.mensajePassword = "las contraseñas no son iguales"
      
    }else{
      this.mensajePassword = ""
      
      this.EsFormularioValido = true;
    }
  }

}
