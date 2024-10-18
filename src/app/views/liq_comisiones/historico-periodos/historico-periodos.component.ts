import { Component } from '@angular/core';
import { SiscointService } from 'src/app/siscoint.service';
import { Router } from '@angular/router';
import { liq_tipo_esquema } from 'src/app/_inteface/liq_tipo_esquema.model';
import { liq_periodo } from 'src/app/_inteface/liq_periodo.model';
import { getOptenerSupervisoresEscalaXPerido } from 'src/app/_inteface/supervisoresEsquemaPeriodo.models';
import { asesorSuperEsquemaPeriodo } from 'src/app/_inteface/asesorSuperEsquemaPeriodo.models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { VentanaDetalleLiquidadorComponent } from 'src/app/controls/ventana-detalle-liquidador/ventana-detalle-liquidador.component';
@Component({
  selector: 'app-historico-periodos',
  templateUrl: './historico-periodos.component.html',
  styleUrls: ['./historico-periodos.component.css']
})
export class HistoricoPeriodosComponent {
  modalRef: MdbModalRef<VentanaDetalleLiquidadorComponent> | null = null;
  userUsuario : string = "";
  nombreUsuario : string = "";
  Index : any;
  hideme : any = [];
  hideme2 : any = [];
  hideme3 : any = [];
  hideme4 : any = [];
  IndexSub1 : any;
  himedeSub1 : any = [];
  arrLiqPeriodos : liq_periodo[] = [];
  arrLiqTipoEsquema_aux : liq_tipo_esquema[] = [];
  arrSuperEsquemaPerido : getOptenerSupervisoresEscalaXPerido[] = [];
  arrAsesorSuperEsquemaPerido : asesorSuperEsquemaPeriodo[] = [];
  expanded : boolean = false;
  validateFormSub : boolean = false;
  mostrarOpcionesValPeriodo : boolean = false;

  constructor(
    private router : Router, 
    private siscointServive : SiscointService,
    private ModalService : NgbModal, 
    private modalService: MdbModalService
   
    ) { }
    ngOnInit(){
      this.nombreUsuario = JSON.parse(JSON.stringify(localStorage.getItem('nombreCompleto'))) || '';
      this.userUsuario =  JSON.parse(JSON.stringify(localStorage.getItem('usuario'))) || '';
      this.listarPeriodos();
    }

    listarPeriodos(){
      this.siscointServive.getLiqPeriodosAll().subscribe(valor => {
        this.arrLiqPeriodos = valor;
      })
    }
    ocultar(value : boolean, item : any){
      this.expanded = value;
    }

    showSubTable1(index : any , item : any){
      
      this.siscointServive.getLiqTipoEsquema(1).subscribe(valor => {
        this.arrLiqTipoEsquema_aux = valor;
        this.arrLiqTipoEsquema_aux.forEach(function(i_tem : any){
          i_tem.periodo = item.periodo;
        })
      })
      //se le adiciona el periodo al array 
      this.hideme[index] = !this.hideme[index];
      this.Index = index;
    }
    showSubTable2(index : any , item : any){
      this.siscointServive.getOptenerSupervisoresEscalaXPerido(item.codigo_valor, item.periodo).subscribe(valor => {
        this.arrSuperEsquemaPerido = valor;
      })
      this.hideme2[index] = !this.hideme2[index];
      this.Index = index;
    }

    showSubTable3(index : any , item : any){
      this.siscointServive.getObtenerAsesoresSupervisoresEscalaXPerido(item.codigo_tipo_escala, item.periodo, item.cedula_supervisor)
      .subscribe(valor => {
        this.arrAsesorSuperEsquemaPerido = valor;
      })
      this.hideme3[index] = !this.hideme3[index];
      this.Index = index;
    }
    openModalDetalleComisionAsesor(item: any){
      this.modalRef = this.modalService.open(VentanaDetalleLiquidadorComponent,{
        modalClass: 'modal-xl'
      });
      this.modalRef.component.fromParent = item;
    }

    
}
