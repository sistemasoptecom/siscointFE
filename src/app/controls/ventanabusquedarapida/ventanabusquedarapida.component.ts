import { Component, OnInit, Input } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { genericTable } from 'src/app/_inteface/genericTable.model';
import { busquedaRapida } from 'src/app/_inteface/busquedaRapida.model';
import { SiscointService } from 'src/app/siscoint.service';
import { ArticulosComponent } from 'src/app/views/articulos/articulos.component';

@Component({
  selector: 'app-ventanabusquedarapida',
  templateUrl: './ventanabusquedarapida.component.html',
  styleUrls: ['./ventanabusquedarapida.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class VentanabusquedarapidaComponent implements OnInit {
  @Input() fromParent:any;
  tituloVentanaRapida : string = "";
  columnaHidden : boolean = false;
  columna1 : boolean = false;
  columna2 : boolean = false;
  columna3 : boolean = false;
  columna4 : boolean = false;
  columna5 : boolean = false;
  columna6 : boolean = false;
  columna7 : boolean = false;
  columna8 : boolean = false;

  esTablaUsuario : boolean = false;
  tituloColumnaHidden : string = "";
  titulocolumna1 : string = "";
  titulocolumna2 : string = "";
  titulocolumna3 : string = "";
  titulocolumna4 : string = "";
  titulocolumna5 : string = "";
  titulocolumna6 : string = "";
  titulocolumna7 : string = "";
  titulocolumna8 : string = "";
  valueBuscar : string = "";
  arrayGeneric : genericTable[] = [];
  
  busqueda : busquedaRapida[] = [];

  
  constructor(public activeModal: NgbActiveModal, private siscointService : SiscointService, private router : Router) { }

  ngOnInit(): void {
    console.log("from parent : ",this.fromParent);
    this.tituloVentanaRapida = this.fromParent.prop1
    this.armarVentana()
  }

  armarVentana(){
    switch(this.fromParent.prop2){
      case 'area_ccosto':
        this.armarVentanaAreaCcosto();
        break;
      case 'ArticuloDevolutivo':
        this.armarVentanaArticuloDevolutivo();
        break;
      case 'ArticuloActivoFijo':
        this.armarVentanaArticuloActivoFijo();
        break;
      case 'ObjetoFijo':
        this.armarVentanaActivoFijoDisponible();
        break;
      case 'BuscarEmpleado':
        this.armarVentanaEmpleados();
        break;
    }
  }
  closeModal(sendData:any) {
    this.activeModal.close(sendData);
  }
  valorBuscar(e:any){
    this.valueBuscar = e.target.value;
    const busquedarapida : busquedaRapida = { valor : this.valueBuscar, entidad : this.fromParent.prop2, parametro : this.fromParent.prop3 }
    this.busqueda.push(busquedarapida);
    //console.log("data buscar : ", this.busqueda);
    this.siscointService.getDataBusquedaRapida(this.busqueda).subscribe((res : any[]) =>{
      //console.log("data devuelto : ",res);
      this.armarArrayGeneric(res);
    });

  }

  armarVentanaAreaCcosto(){
    this.titulocolumna1 = "Ccosto";
    this.titulocolumna2 = "Area";
    this.columnaHidden = true;
    this.columna1 = true;
    this.columna2 = true;
  }

  armarVentanaArticuloDevolutivo(){
    this.titulocolumna1 = "Codigo";
    this.titulocolumna2 = "Descripcion";
    this.columnaHidden = true;
    this.columna1 = true;
    this.columna2 = true;
  }

  armarVentanaActivoFijoDisponible(){
    this.titulocolumna1 = "AF";
    this.titulocolumna2 = "IMEI";
    this.titulocolumna3 = "DESCRIPCION";
    this.columnaHidden = true;
    this.columna1 = true;
    this.columna2 = true;
    this.columna3 = true;
  }

  armarVentanaArticuloActivoFijo(){
    this.titulocolumna1 = "id_ped";
    this.titulocolumna2 = "Codigo";
    this.titulocolumna3 = "Usuario";
    this.titulocolumna4 = "Descripcion";
    this.titulocolumna5 = "Grupo";
    this.titulocolumna6 = "Valor";
    this.titulocolumna7 = "CECO";
    this.titulocolumna8 = "V_util";
    this.columnaHidden = true;
    this.columna1 = true;
    this.columna2 = true;
    this.columna3 = true;
    this.columna4 = true;
    this.columna5 = true;
    this.columna6 = true;
    this.columna7 = true;
    this.columna8 = true;
  }

  armarVentanaEmpleados(){
    this.titulocolumna1 = "Cedula";
    this.titulocolumna2 = "Nombre";
    this.titulocolumna3 = "S_Nombre";
    this.titulocolumna4 = "Apellido";
    this.titulocolumna5 = "S_Apellido";
    this.columnaHidden = true;
    this.columna1 = true;
    this.columna2 = true;
    this.columna3 = true;
    this.columna4 = true;
    this.columna5 = true;
    this.columna6 = false;
    this.columna7 = false;
    this.columna8 = false;
  }

  armarArrayGeneric(data : any){
    for (var i = 0; i < data.length; i++){
      const arrayGenericA : genericTable = {
        id     : data[i].id,
        valor1 : data[i].valor1, 
        valor2 : data[i].valor2,
        valor3 : data[i].valor3,
        valor4 : data[i].valor4,
        valor5 : data[i].valor5,
        valor6 : data[i].valor6,
        valor7 : data[i].valor7,
        valor8 : data[i].valor8
      }
      this.arrayGeneric.push(arrayGenericA)

    }
  }
  validarRow(id: string){
    console.log("ventana actual : ",this.fromParent.prop2);
    switch(this.fromParent.prop2){
      case 'area_ccosto':
        this.siscointService.valorVentanaBusquedaRapida.emit('busquedaCentroCosto');
        this.siscointService.ShowsCcostosValues.emit(parseInt(id));
        break;
      case 'ArticuloActivoFijo':
        //this.siscointService.valorVentanaBusquedaRapida.emit('busquedaArticuloActivoFijo');
        //this.siscointService.ShowsCcostosValues.emit(parseInt(id));
        switch(this.router.url){
          case '/articulos':
            this.siscointService.ShowArticuloActivoFijo.emit(parseInt(id));
            break;
        }
        break;
      case 'ArticuloDevolutivo':
        this.siscointService.valorVentanaBusquedaRapida.emit('busquedaArticuloDevolutivo');
        this.siscointService.ShowsArticuloDevolucion.emit(parseInt(id));
        break;
      case 'BuscarEmpleado':
        this.siscointService.showEmpleadosValuesBusRap.emit(parseInt(id));
        break;
      case 'ObjetoFijo':
        this.siscointService.ShowDescripcionArticuloActivoFijo.emit(parseInt(id));
        break;
    }
    this.closeModal('dismiss');
  }

}
