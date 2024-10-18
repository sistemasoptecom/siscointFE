import { Component,Input } from '@angular/core';
import { SiscointService } from 'src/app/siscoint.service';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
@Component({
  selector: 'app-ventana-config-liq',
  templateUrl: './ventana-config-liq.component.html',
  styleUrls: ['./ventana-config-liq.component.css']
})
export class VentanaConfigLiqComponent {
  @Input() fromParent:any;
  titulo : string = "";
  ventanaMegas : boolean = false;
  ventanaNivel : boolean = false;
  ventanaEmpaq : boolean = false;
  disabledInput : boolean = false;
  arrMegas : any[] = [];
  arrNivel : any[] = [];
  arrEmpHom : any[] = [];
  disabledButton : boolean = true;
  ocultarIbhanilitar : boolean = false;
  ocultarHabilitar : boolean = false;
  constructor(public modalRef: MdbModalRef<VentanaConfigLiqComponent>, private siscointService: SiscointService){}
  ngOnInit(){
    this.titulo = "CONFIGURAR "+this.fromParent.prop3+" "+this.fromParent.prop1;
    if(this.fromParent.prop3 == 'MEGAS'){
      this.ventanaMegas = true;
    }
    if(this.fromParent.prop3 == 'NIVEL'){
      this.ventanaNivel = true;
    }
    if(this.fromParent.prop3 == 'EMPHOME'){
      this.ventanaEmpaq = true;
    }

    this.validarTipoAccionVentana(this.fromParent.prop1, this.fromParent.prop3);
    this.ocultarHabilitar = true;
  }

  close(): void {
    const closeMessage = 'Modal closed';
    this.modalRef.close(closeMessage)
  }

  validarTipoAccionVentana(tipoEsquema : string, tipoConfiguracion : string){
    let esquema : number = 0;
    if(tipoEsquema == 'PAP'){
      esquema = 1;
    }
    if(tipoEsquema == 'PYMES'){
      esquema = 2;
    }
    if(tipoEsquema == 'CALL OUT'){
      esquema = 3;
    }
    if(tipoEsquema == "PAP II"){
      esquema = 5;
    }
    if(esquema > 0){
      if(tipoConfiguracion == 'MEGAS'){
        this.siscointService.getListarValoresMega(esquema).subscribe(valor => {
          this.arrMegas = valor;
        })
      }
      if(tipoConfiguracion == "NIVEL"){
        this.siscointService.getListarEscalaAltas(esquema).subscribe(valor => {
          this.arrNivel = valor;
        })
      }
      if(tipoConfiguracion == "EMPHOME"){
        this.siscointService.getListarEmpHome(esquema).subscribe(valor => {
          this.arrEmpHom = valor;
        })
      }
    }
  }

  actualizarMegas(item : any){
   
    this.siscointService.actualizarMegas(item.id, item.valor_mega).subscribe(valor => {
      alert(valor);
    })
  }
  actualizarNivel(item : any){
    this.siscointService.actualizarNivel(item.id, item.rango_altas).subscribe(valor => {
      alert(valor)
    })
  }
  actualizarEmpHome(item : any){
    this.siscointService.actualizarEmpHome(item.id, item.valor).subscribe(valor => {
      alert(valor);
    })
  }
  habilitarCampos(){
    this.disabledButton = false;
    this.ocultarHabilitar = false;
    this.ocultarIbhanilitar = true;
  }
  inHabilitarCampos(){
    this.disabledButton = true;
    this.ocultarHabilitar = true;
    this.ocultarIbhanilitar = false;
  }
}
