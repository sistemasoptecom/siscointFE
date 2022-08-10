import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SiscointService } from 'src/app/siscoint.service';
import { EmpleadosComponent } from 'src/app/views/empleados/empleados.component';
import { genericTable } from 'src/app/_inteface/genericTable.model';
import { UsuariosModels } from 'src/app/_inteface/usuario.model';
import { empleado } from 'src/app/_inteface/empleado.model';

//import * as $ from 'jquery'


@Component({
  selector: 'app-ventanabusqueda',
  templateUrl: './ventanabusqueda.component.html',
  styleUrls: ['./ventanabusqueda.component.css'],
  
})
export class VentanabusquedaComponent implements OnInit {
  
  tituloModal : string = "";
  
  public EnabledModal : boolean = false;
  columnaHidden : boolean = false;
  columna1 : boolean = false;
  columna2 : boolean = false;
  columna3 : boolean = false;
  columna4 : boolean = false;
  columna5 : boolean = false;

  esTablaUsuario : boolean = false;
  tituloColumnaHidden : string = "";
  titulocolumna1 : string = "";
  titulocolumna2 : string = "";
  titulocolumna3 : string = "";
  titulocolumna4 : string = "";
  titulocolumna5 : string = "";
  valueBuscar : string = "";
  htmlTabla : string = "";

  arrayGeneric : genericTable[] = [];
  usuario : any[] = []
  usuariosArray : Array<any> = []
  arrayTabla : any[] = []

  constructor(private route: Router, private siscointService: SiscointService) { }

  ngOnInit(): void {
   
    
    this.setVentanaModal()
    this.siscointService.enabledModal.subscribe(valor => {
      this.EnabledModal = valor;
    })
  }
  
 
  valorBuscar(e : any){
    //console.log(e.target.value);
    switch(this.route.url){
      case '/usuarios':
        this.buscarUsuarios(e)
        break;
      case '/empleados':
        this.buscarEmpleados(e)
        break;
    }
    
  }
  setVentanaModal(){
    this.armarVentana(this.route.url)
  }

  /*BUSQUEDA DE USUARIOS */
  buscarUsuarios(e : any){
    this.valueBuscar = e.target.value;
    const usuariosM : UsuariosModels = {id: 0, username : this.valueBuscar, codigo : this.valueBuscar, nombre_usuario : this.valueBuscar, password:'', pssword:'', id_tipo_usuario:0, estado:0, cargo:'',area:'', modulo:0 }
    
    this.siscointService.getUsuarios(usuariosM).subscribe((res : any[]) => {
      this.arrayTabla = res;
      this.esTablaUsuario = true;
      this.armarArrayGeneric(this.route.url, this.arrayTabla);
    })
  }

  /*BUSQUEDA DE EMPLEADOS */
  buscarEmpleados(e: any){
    this.valueBuscar = e.target.value;
    const empleadosM : empleado = {
            cedula_emp: this.valueBuscar,
            nombre :  this.valueBuscar,
            snombre : this.valueBuscar,
            ppellido : this.valueBuscar,
            spellido : this.valueBuscar,
            area     : '',
            cargo : '',
            estado : 0,
            permiso : 0,
            ccosto : 0,
            empresa : 0
    }
    this.siscointService.getEmpleados(empleadosM).subscribe((res : any[]) => {
      this.arrayTabla = res;
      this.esTablaUsuario = true;
      this.armarArrayGeneric(this.route.url, this.arrayTabla);
    })

  }

  armarArrayGeneric(tipoModel:string, data : any){
    
      for (var i = 0; i < data.length; i++) {
        
        const arrayGeneric = {id : data[i].id,
                              valor1 : data[i].valor1, 
                              valor2 : data[i].valor2,
                              valor3 : data[i].valor3,
                              valor4 : data[i].valor4,
                              valor5 : data[i].valor5
          }
          this.arrayGeneric.push(arrayGeneric)   
        
      }
  }

  armarVentana(valor : any){
    switch(valor){
      case '/usuarios':
        this.tituloModal = 'Busqueda de Usuarios'
        this.tituloColumnaHidden = "";
        this.titulocolumna1 = "Usuario";
        this.titulocolumna2 = "Nombre";
        this.titulocolumna3 = "Documento";
        this.columnaHidden = true;
        this.columna1 = true;
        this.columna2 = true;
        this.columna3 = true;
        this.columna4 = false;
        this.columna5 = false;
        break;
      case '/empleados':
        this.tituloModal = 'Busqueda de Empleados'
        this.tituloColumnaHidden = "";
        this.titulocolumna1 = "cedula";
        this.titulocolumna2 = "Nombre";
        this.titulocolumna3 = "s_Nombre";
        this.titulocolumna4 = "p_Apellido";
        this.titulocolumna5 = "s_Apellido";
        this.columnaHidden = true;
        this.columna1 = true;
        this.columna2 = true;
        this.columna3 = true;
        this.columna4 = true;
        this.columna5 = true;
        break;
        //this.setHtmlTablaVentanaVacia(valor, this.usuario);
    }
  }

  validarRow(data : any){
    //sconsole.log("el id row es ",data)
    this.siscointService.showsUserValues.emit(data);
    this.siscointService.esHabilitarGuardar.emit(true);
    
  }
}
