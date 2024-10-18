import { Component, OnInit } from '@angular/core';
import { SiscointService } from '../../siscoint.service';
import { Router } from '@angular/router';
import { UsuariosModels } from 'src/app/_inteface/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  userDetails : string = "";
  usuario : string = "";
  Ocultar : boolean = true;
  btnVisualizar : boolean = true;
  btnOcultar : boolean = false;
  arrayMenuPadre : any[] = [];
  arrayMenuHijo : any[] = [];
  public idUsuario : number = 0;
  arrMenuPadre : any[] = [];

  constructor(private router : Router, private siscointService : SiscointService) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.siscointService.showsUserValues.subscribe(valor => {
      this.idUsuario = valor;
    })
  }

  getCurrentUser(){
    this.siscointService.getCurrentUser().subscribe(data => 
      { const dat = JSON.parse(data);
        this.userDetails = dat.username; 
        
        console.log("El usuario es : "+this.userDetails);
        this.getListarMenuPadre(this.userDetails);
        this.getListarMenuHijo(this.userDetails);
      })
      //console.log("Entro!")
      //console.log("el usuario es antes del metodo : "+this.userDetails);
  }

  getListarMenuPadre(username : string){
    const usuarios : UsuariosModels =  {id: this.idUsuario, username :username, codigo : '', nombre_usuario : '', password:'', pssword:'', id_tipo_usuario:0, estado:0, cargo:'',area:'', modulo:0 }
    this.siscointService.getMenuPadre(usuarios).subscribe((res : any[]) => {
      console.log("la data es : "+res);
      this.arrMenuPadre = res;
    })
  }

  getListarMenuHijo(username : string){
    const usuariosH : UsuariosModels =  {id: this.idUsuario, username :username, codigo : '', nombre_usuario : '', password:'', pssword:'', id_tipo_usuario:0, estado:0, cargo:'',area:'', modulo:0 }
    this.siscointService.getMenuHijo(usuariosH).subscribe((res : any[]) =>{
      console.log("menu hijo es : "+res);
      this.arrayMenuHijo = res;
    })
  }

  getCodigoUser(codigo : string){
    return codigo;
  }
  
  onLogout(){
    localStorage.removeItem('jwt');
    this.router.navigate(['/']);
  }
  
  listarMenus(codigoUser : string ){

  }

  sidebarHidden(){
    this.btnVisualizar = false;
    this.btnOcultar = true;
    this.Ocultar = true;
    
  }
  sidebarShow()
  {
    this.btnOcultar = false;
    this.btnVisualizar = true;
    this.Ocultar = false;
    
  }

}
