import { Component, Input, ViewChild } from '@angular/core';
import { SiscointService } from 'src/app/siscoint.service';
import { Router } from '@angular/router';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ImporteCartaMetaComponent } from 'src/app/views/liq_comisiones/importe-carta-meta/importe-carta-meta.component';

@Component({
  selector: 'app-ventana-token',
  templateUrl: './ventana-token.component.html',
  styleUrls: ['./ventana-token.component.css']
})
export class VentanaTokenComponent {
  @Input() fromParent:any;
  public token : number = 0
  userUsuario : string = "";
  usersToken : any[] = [];
  codigoValorUser : number = 0;
  correoEnviar : string = "";
  //@ViewChild(ImporteCartaMetaComponent)
  //private importMetas! : ImporteCartaMetaComponent
  constructor(public modalRef : MdbModalRef<VentanaTokenComponent>,
              private router : Router,
              private siscointServive : SiscointService
               ){}
  ngOnInit(){
    this.userUsuario =  JSON.parse(JSON.stringify(localStorage.getItem('usuario'))) || '';
    this.ListarUsuariosToken();
    //console.log("item es : "+this.fromParent.pro1)
  } 
  close() : void{
    const closeMessage = 'Modal closed';
    this.modalRef.close(closeMessage)
  }
  validarKeyToken(){
    //console.log("proceso es : "+this.fromParent.prop1+ " y "+this.fromParent.prop2)
    this.siscointServive.validarTokenAutizacion(this.userUsuario, 
                                                this.token, 
                                                this.fromParent.prop1, 
                                                this.fromParent.prop2, 
                                                this.fromParent.prop3).subscribe(valor => {
        alert(valor);
        
        //this.importMetas.listarPeriodos();
        this.close();
        //this.getLiqPeriodos();                                          
    })
  }

  EnviarKeyToken(){
    this.siscointServive.enviarCorreo( this.userUsuario, this.fromParent.prop1, this.correoEnviar).subscribe(valor => {
      if(valor.length > 0){
        alert("Enviado")
      }
    })
  }

  selectUserToken(e : any){
    let codigoConsulta = e.target.value;
    //console.log("El codigo consulta es : "+codigoConsulta)
    const correo_usuario = this.usersToken.find(({id}) => id == codigoConsulta);
    //console.log("El usuario es : "+correo_usuario?.correo)
    this.correoEnviar = correo_usuario?.correo;
  }

  ListarUsuariosToken(){
    this.siscointServive.getUsuariosToken().subscribe(valor => {
      this.usersToken = valor;
    })
  }

}

