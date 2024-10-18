import { Component, Input } from '@angular/core';
import { SiscointService } from 'src/app/siscoint.service';
import { Route } from '@angular/router';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-ventana-recalcula-super',
  templateUrl: './ventana-recalcula-super.component.html',
  styleUrls: ['./ventana-recalcula-super.component.css']
})
export class VentanaRecalculaSuperComponent {
  @Input() fromParent : any;
  public nombre_esquema : string = "";
  public periodo : string = "";
  public codigo_valor_esquema : number = 0
  arrSupervisores : any[] = [];
  numero_meta_ftth : number = 0;
  numero_ejecucion_ftth : number = 0;
  numero_meta_movil : number = 0;
  numero_ejecucion_movil : number = 0;
  cedula_supervisor : string = "";
  userUsuario : string = "";
  nombreUsuario : string = "";
  p: number = 1;
  constructor(private siscointService :  SiscointService, 
              public modalRef : MdbModalRef<VentanaRecalculaSuperComponent>){}

  ngOnInit()
  {
    this.nombre_esquema = this.fromParent.nombre_tipo_esquema;
    this.periodo = this.fromParent.periodo;
    this.codigo_valor_esquema = this.fromParent.codigo_valor;
    this.getSupervisores(this.periodo, this.codigo_valor_esquema);
    this.nombreUsuario = JSON.parse(JSON.stringify(localStorage.getItem('nombreCompleto'))) || '';
    this.userUsuario =  JSON.parse(JSON.stringify(localStorage.getItem('usuario'))) || '';
  }


  getSupervisores(periodo : string, codigo_tipo_esquema : number){
    this.siscointService.getSupervisores(codigo_tipo_esquema,periodo ).subscribe(valor => {
      //console.log(valor)
      this.arrSupervisores = valor;
      
    })
  }
  close(): void
  {
    const closeMessage = 'Modal closed';
    this.modalRef.close(closeMessage);
  }

  recalcular(item : any){
    this.numero_ejecucion_ftth = item.numero_meta_ftth;
    this.numero_ejecucion_ftth = item.numero_cumplimiento_asesor_ftth;
    this.numero_meta_movil = item.numero_meta_movil;
    this.numero_ejecucion_movil = item.numero_cumpliento_asesor_movil;
    this.cedula_supervisor = item.cedula_supervisor;
    this.siscointService.recalcularComisionSuper(this.periodo, 
                                                 this.userUsuario, 
                                                 this.cedula_supervisor,
                                                 this.codigo_valor_esquema, 
                                                 this.numero_ejecucion_ftth,
                                                 this.numero_ejecucion_ftth,
                                                 this.numero_meta_movil,
                                                 this.numero_ejecucion_movil).subscribe(valor =>{
        console.log(valor);                                          
    })
  }
}
