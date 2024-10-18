import { Component } from '@angular/core';
import { SiscointService } from 'src/app/siscoint.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { VentanaConfigLiqTecComponent } from 'src/app/controls/ventana-config-liq-tec/ventana-config-liq-tec.component';
import { tec_liq_conf_penalizacion } from 'src/app/_inteface/tec_liq_conf_penalizacion.model';

@Component({
  selector: 'app-conf-puntaje',
  templateUrl: './conf-puntaje.component.html',
  styleUrls: ['./conf-puntaje.component.css']
})
export class ConfPuntajeComponent {
  modalRef : MdbModalRef<VentanaConfigLiqTecComponent> |null = null;
  arrListCiudad : any = [];
  Index :any;
  hideme : any = [];
  hideme2 : any = [];
  hideme3 : any = [];
  arrConfBono : any = [];
  arrConfPenaliza : any = [];
  arrConfItems : any = [];
  userUsuario : string = "";
  nombreUsuario : string = "";
  showConfBonos : boolean = false;
  showConfpenal : boolean = false;
  showConfvalores : boolean = false;
  constructor(private modalService : MdbModalService, public siscointService : SiscointService){}
  
  ngOnInit()
  {
    this.nombreUsuario = JSON.parse(JSON.stringify(localStorage.getItem('nombreCompleto'))) || '';
    this.userUsuario =  JSON.parse(JSON.stringify(localStorage.getItem('usuario'))) || '';
    this.getListarCiudades(this.userUsuario);
  }
  openModal(parametroVentana : string){
    this.modalRef = this.modalService.open(VentanaConfigLiqTecComponent,{
      modalClass : 'modal-lg'
    })
    let data = {
      prop1 : parametroVentana
    }
    this.modalRef.component.fromParent = data
  }

  getListarCiudades(usuario : string)
  {
    this.siscointService.getListarCiudades(usuario).subscribe(val => {
      this.arrListCiudad = val;
    })
  }
  showSubTable1(index : any, item : any)
  {
    this.siscointService.getListarConfBonoCiudad(item.cod_ciudad).subscribe(valor => {
      this.arrConfBono = valor;
    })
    this.hideme[index] = !this.hideme[index];
    this.Index = index;
  }

  showSubTable2(index : any, item : any)
  {
    this.siscointService.getListarConfPenalizaCiudad(item.cod_ciudad).subscribe(valor => {
      this.arrConfPenaliza = valor;
    })
    this.hideme2[index] = !this.hideme2[index];
    this.Index = index;
  }
  editarConfPuntos(item : any)
  {
    this.siscointService.editConfBono(
      item.id,
      item.rango_puntaje,
      item.valor,
      this.userUsuario
    ).subscribe(data => {
      alert(data);
    })
  }

  editarConfPenalizacion(item : any)
  {
    let id = item.id;
    const data : tec_liq_conf_penalizacion = {
      porcentaje_afectacion : item.porcentaje_afectacion,
      porcentaje_infancia : item.porcentaje_infancia,
      cod_ciudad : item.cod_ciudad,
      usuario : this.userUsuario
    }
    this.siscointService.setEditConfPenalizacion(id,data).subscribe(valor => {
      console.log(valor)
    })
  }

  validateForm(e : any)
  {
    //console.log("data es : "+e.target.value)
    let tipo : string = e.target.value;
    switch(tipo){
      case "CUMPLIMIENTO":
        this.showConfBonos = true;
        this.showConfpenal = false;
        this.showConfvalores = false;
        break;
      case "PENALIZACIONES":
        this.showConfBonos = false;
        this.showConfpenal = true;
        this.showConfvalores = false;
        break;
      case "VALORES":
        this.showConfBonos = false;
        this.showConfpenal = false;
        this.showConfvalores = true;
        break;
    }
  }

  showSubTable3(index :any, item : any)
  {
    this.siscointService.getListarItemsCiudad(item.cod_ciudad).subscribe(valor => {
      this.arrConfItems = valor;
    })
    this.hideme3[index] = !this.hideme3[index];
    this.Index = index;
  }
}
