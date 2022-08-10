import { Component, OnInit, Input } from '@angular/core';
import { NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { genericTable } from 'src/app/_inteface/genericTable.model';
import { busquedaRapida } from 'src/app/_inteface/busquedaRapida.model';
import { SiscointService } from 'src/app/siscoint.service';

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

  esTablaUsuario : boolean = false;
  tituloColumnaHidden : string = "";
  titulocolumna1 : string = "";
  titulocolumna2 : string = "";
  titulocolumna3 : string = "";
  titulocolumna4 : string = "";
  titulocolumna5 : string = "";
  valueBuscar : string = "";
  arrayGeneric : genericTable[] = [];
  busqueda : busquedaRapida[] = [];
  constructor(public activeModal: NgbActiveModal, private siscointService : SiscointService) { }

  ngOnInit(): void {
    console.log("from parent : ",this.fromParent);
    this.tituloVentanaRapida = this.fromParent.prop1
    this.armarVentana()
  }

  armarVentana(){
    switch(this.fromParent.prop2){
      case 'area_ccosto':
        this.armarVentanaAreaCcosto();
    }
  }
  closeModal(sendData:any) {
    this.activeModal.close(sendData);
  }
  valorBuscar(e:any){
    this.valueBuscar = e.target.value;
    const busquedarapida : busquedaRapida = { valor : this.valueBuscar, entidad : this.fromParent.prop2 }
    this.busqueda.push(busquedarapida);
    console.log("data buscar : ", this.busqueda);
    this.siscointService.getDataBusquedaRapida(this.busqueda).subscribe((res : any[]) =>{
      console.log("data devuelto : ",res);
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

  armarArrayGeneric(data : any){
    for (var i = 0; i < data.length; i++){
      const arrayGeneric = {id : data[i].id,
        valor1 : data[i].valor1, 
        valor2 : data[i].valor2,
        valor3 : "",
        valor4 : "",
        valor5 : ""}
      this.arrayGeneric.push(arrayGeneric)   
    }
  }
  validarRow(id: string){
    this.siscointService.ShowsCcostosValues.emit(parseInt(id));
    this.closeModal('dismiss');
  }

}
