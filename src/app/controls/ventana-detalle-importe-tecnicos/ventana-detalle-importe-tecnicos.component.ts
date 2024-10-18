import { Component,Input, Renderer2 } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { SiscointService } from 'src/app/siscoint.service';

@Component({
  selector: 'app-ventana-detalle-importe-tecnicos',
  templateUrl: './ventana-detalle-importe-tecnicos.component.html',
  styleUrls: ['./ventana-detalle-importe-tecnicos.component.css']
})
export class VentanaDetalleImporteTecnicosComponent {
  @Input() fromParent:any;
  userUsuario : string = "";
  nombreUsuario : string = "";
  paramsVentana : any = [];
  tituloVentana : string = "";
  arrayImportTec : any[] = [];
  ShowImporteTec : boolean = false;
  constructor(private siscointService : SiscointService, public modalRef : MdbModalRef<VentanaDetalleImporteTecnicosComponent>, private renderer : Renderer2){}

  ngOnInit()
  {
    this.nombreUsuario = JSON.parse(JSON.stringify(localStorage.getItem('nombreCompleto'))) || '';
    this.userUsuario =  JSON.parse(JSON.stringify(localStorage.getItem('usuario'))) || '';
    this.paramsVentana = this.fromParent.prop1.split(';');
    //console.log("El parametro es : "+this.paramsVentana);
    this.tituloVentana = this.paramsVentana[0];
    this.validateOperacionVentana(this.paramsVentana[1])
  }

  validateOperacionVentana(operacion : string)
  {
    switch(operacion)
    {
      case "DETALLE_IMPORTE_TECNICO":
        let periodo : string = this.fromParent.prop2;
        let cod_ciudad : string = this.fromParent.prop3;
        let cod_semana : number = this.fromParent.prop4;
        let dia_semana :  any = this.fromParent.prop5;
        this.getListarImporteTecnicos(periodo,cod_ciudad,cod_semana,dia_semana)
        this.ShowImporteTec = true;
        break;
    }
  }

  getListarImporteTecnicos(periodo: string, cod_ciudad : string, cod_semana : number, dia_comision : any)
  {
    this.siscointService.getListarDetalleImporteTecnicos(periodo,cod_ciudad,cod_semana,dia_comision).subscribe(valor => {
      valor.forEach(function(x) {
        console.log(x)
      })
      this.arrayImportTec = valor;
    })
  }

  
  close() : void
  {
    const closeMessage = 'Modal closed';
    this.modalRef.close(closeMessage);
  }
}
