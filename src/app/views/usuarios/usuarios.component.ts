import { Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';
import { Router } from '@angular/router';
import { SiscointService } from 'src/app/siscoint.service';
import { ViewsModels } from 'src/app/_inteface/views.model';
import { UsuariosModels } from 'src/app/_inteface/usuario.model';
import { permisosUsuII } from 'src/app/_inteface/permisosUsuII.model';
import { elementAt } from 'rxjs';
import { tipoUsuario } from 'src/app/_inteface/tipoUsuario.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  
  public disabled : boolean = true;
  dataviews : any[] = [];
  dataPermisos : any[] = [];
  tipoUsuarios : any[] = [];
  dataviewsAux : any[] = [];
  permismoViews : any[] = [];
  public idusuario : number = 0;
  id : number =0;
  codigo : string = "";
  nombre_usuario : string = ""; 
  username : string = "";
  password : string = "";
  pssword : string ="";
  pssword2 : string = "";
  passwordAux : string = "";
  arrayString : string[] = [];
  id_tipo_usuario : number = 0;
  estado : number = 0;
  cargo : string = "";
  area : string = "";
  modulo : number = 0;
  arr : string[] = [];
  mensajePassword : string = "";
  

  EsEditar : boolean = false;
  EsAgregar : boolean = false;
  EsFormularioValido : boolean = false;
  //userModel: UsuariosModels = {} as UsuariosModels;
  
  constructor(private router : Router, private siscointService : SiscointService) { }

  ngOnInit(): void {
    this.getMenuViews();
    this.getTipoUsuarios();
    this.siscointService.disabled.subscribe(valor => {
      this.disabled = valor;
    });
    this.siscointService.showsUserValues.subscribe(valor => {
      this.idusuario = valor;
      //console.log("El id del usuario es : ", this.idusuario)
      if(this.idusuario > 0){
        this.cargarDataUsuario(this.idusuario);
      }
    })
    this.siscointService.esActualizarFormUser.subscribe(valor => {
      this.EsEditar = valor;
      if(this.EsEditar == true){
        this.EsEditarFormUser();
      }
    })
    this.siscointService.esGuardarFromUser.subscribe(valor => {
      this.EsAgregar = valor;
      if(this.EsAgregar == true){
        this.EsAgregarFormUser();
      }else{
        console.log("nada no entra actualizar")
      }
    })
  }

  getMenuViews(){
    this.siscointService.getViews().subscribe((res : ViewsModels[]) => {
      //console.log(res);
      this.dataviews = res;
      localStorage.setItem('dataviews', JSON.stringify(this.dataviews));
    });
  }

  getTipoUsuarios(){
    this.siscointService.getTipoUsuario().subscribe((res : tipoUsuario[]) => {
      this.tipoUsuarios = res;
    })
  }


  cargarDataUsuario(idUsuario : number){
    //alert("hola id usuario "+ idUsuario);
    const usuariosM : UsuariosModels = {id: idUsuario, username :'', codigo : '', nombre_usuario : '', password:'', pssword:'', id_tipo_usuario:0, estado:0, cargo:'',area:'', modulo:0 }
    this.siscointService.getUsuariosID(usuariosM).subscribe((res : UsuariosModels[]) => {
      this.cargarHeaders(res)
      this.cargarDataPermisos(res[0].username)
    });
  }

  cargarDataPermisos(usurname : string){
    const permisosUsuario : permisosUsuII = {id_permiso: 0, id_view:0, cod_usuario:'', id_usuario:0, usuario:usurname, autorizacion:"", pe1:"", pe2:"", usuario_crea:'', Fecha_creacion : new Date(), fecha_modificacion: new Date(), Estado :0 }
    this.siscointService.getPermisosUsuario(permisosUsuario).subscribe((res : permisosUsuII[]) => {
      
      this.dataviews = res;
      localStorage.setItem('dataviews', JSON.stringify(this.dataviews));
      this.disabled = false;
    })
  }
  cargarHeaders(res : any){
    if(res.length > 0){
      this.id = res[0].id
      this.codigo = res[0].codigo
      this.nombre_usuario = res[0].nombre_usuario
      this.username = res[0].username
      this.id_tipo_usuario = res[0].id_tipo_usuario
     
    }
  }
  keyup(e:any){
    
    this.pssword2 = "";
    this.pssword2 += e.target.value + '|';
    this.arrayString = this.pssword2.split('|')
    
    let position : number  = this.arrayString.length
    this.pssword2 = this.arrayString[position-2]
    
    if(this.pssword != this.pssword2){
      this.mensajePassword = "las contraseñas no son iguales"
      
    }else{
      this.mensajePassword = ""
      
      this.EsFormularioValido = true;
    }
  }
  
  EsEditarFormUser(){
    if(this.EsFormularioValido){
      const usuariosA : UsuariosModels = {
        id: this.id, 
        username :this.username, 
        codigo : this.codigo, 
        nombre_usuario : this.nombre_usuario, 
        password:'', 
        pssword:this.pssword, 
        id_tipo_usuario:this.id_tipo_usuario, 
        estado:1, 
        cargo:'',
        area:'', 
        modulo:0  } 
      this.siscointService.updateUsuario(this.id, usuariosA).subscribe(valor => {
        
        this.dataviews.forEach((item) => {
          
          const permisoUsuario : permisosUsuII = {
            id_permiso : 0,
            id_view : item.id,
            cod_usuario : this.codigo,
            id_usuario : 0,
            usuario : this.username,
            autorizacion : item.autorizacion,
            pe1 : item.pe1,
            pe2 : item.pe2,
            usuario_crea : 'string',
            Fecha_creacion : new Date(),
            fecha_modificacion : new Date(),
            Estado : 1
          }
          this.dataPermisos.push(permisoUsuario)
        })
       
        this.siscointService.updatePermisosUsuarios(this.dataPermisos).subscribe(valor => {
          
          alert("Datos Actulizados")

          
          this.dataPermisos = []
          this.router.navigateByUrl('/usuarios');
        })
      })
    }
  }

  EsAgregarFormUser(){
    if(this.EsFormularioValido){
      const usuariosA : UsuariosModels = {
        
        username :this.username, 
        codigo : this.codigo, 
        nombre_usuario : this.nombre_usuario, 
        password:'', 
        pssword:this.pssword, 
        id_tipo_usuario:this.id_tipo_usuario, 
        estado:1, 
        cargo:'',
        area:'', 
        modulo:0  } 
        this.siscointService.addUsuario(usuariosA).subscribe(valor => {
          this.dataviews.forEach((item) => {
          
            const permisoUsuario : permisosUsuII = {
              id_permiso : 0,
              id_view : item.id,
              cod_usuario : this.codigo,
              id_usuario : 0,
              usuario : this.username,
              autorizacion : item.autorizacion,
              pe1 : item.pe1,
              pe2 : item.pe2,
              usuario_crea : JSON.stringify(localStorage.getItem('usuario')),
              Fecha_creacion : new Date(),
              fecha_modificacion : new Date(),
              Estado : 1
            }
            this.dataPermisos.push(permisoUsuario)
          })

          this.siscointService.updatePermisosUsuarios(this.dataPermisos).subscribe(valor => {
          
            alert("Datos Actulizados")
            this.dataPermisos = []
            this.router.navigateByUrl('/usuarios');
          })
        })
    }else{
      console.log("nada no agrega")
    }
  }

}
