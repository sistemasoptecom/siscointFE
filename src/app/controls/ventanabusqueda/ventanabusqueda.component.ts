import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SiscointService } from 'src/app/siscoint.service';
import { genericTable } from 'src/app/_inteface/genericTable.model';
import { UsuariosModels } from 'src/app/_inteface/usuario.model';

//import * as $ from 'jquery'
declare let $ : any

@Component({
  selector: 'app-ventanabusqueda',
  templateUrl: './ventanabusqueda.component.html',
  styleUrls: ['./ventanabusqueda.component.css'],
  providers: [NgbModalConfig, NgbModal]
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

  constructor(config: NgbModalConfig, private modalService: NgbModal, private route: Router, private siscointService: SiscointService) {
    config.backdrop = 'static';
    config.keyboard = false; }

  ngOnInit(): void {
    //console.log(this.route.url)
    this.setVentanaModal()
    this.siscointService.enabledModal.subscribe(valor => {
      this.EnabledModal = valor;
    })
  }
  open(content:any){
    this.modalService.open(content);
  }
  closeModal() {
    
    //this.activeModal.close('Modal Closed');
  }
  valorBuscar(e : any){
    //console.log(e.target.value);
    switch(this.route.url){
      case '/usuarios':
        this.buscarUsuarios(e)
    }
    
  }
  setVentanaModal(){
    this.armarVentana(this.route.url)
  }

  buscarUsuarios(e : any){
    this.valueBuscar = e.target.value;
    const usuariosM : UsuariosModels = {id: 0, username : this.valueBuscar, codigo : this.valueBuscar, nombre_usuario : this.valueBuscar, password:'', pssword:'', id_tipo_usuario:0, estado:0, cargo:'',area:'', modulo:0 }
    
    this.siscointService.getUsuarios(usuariosM).subscribe((res : UsuariosModels[]) => {
      this.arrayTabla = res;
      //localStorage.setItem('usuario', JSON.stringify(this.arrayTabla));
      //console.log(this.arrayTabla)
      this.esTablaUsuario = true;
      //this.setHtmlTablaVentanaVacia(this.route.url, this.usuariosArray)
      this.armarArrayGeneric(this.route.url, this.arrayTabla);
    })
  }

  armarArrayGeneric(tipoModel:string, data : any){
    switch(tipoModel){
      case '/usuarios':
        for (var i = 0; i < data.length; i++) {
          
          const arrayGeneric = {id : data[i].id,
                                valor1 : data[i].username, 
                                valor2 : data[i].nombre_usuario,
                                valor3 : data[i].codigo,
                                valor4: "",
                                valor5: ""
            }
            this.arrayGeneric.push(arrayGeneric)   
         
        }
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
        //this.setHtmlTablaVentanaVacia(valor, this.usuario);
    }
  }

  validarRow(data : any){
    //sconsole.log("el id row es ",data)
    this.siscointService.showsUserValues.emit(data);
    this.siscointService.esHabilitarGuardar.emit(true);
    $("#modal").modal("hide");
  }
}
