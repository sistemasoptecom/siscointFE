import { Component,Input } from '@angular/core';
import { SiscointService } from 'src/app/siscoint.service';
import { Route } from '@angular/router';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-ventana-liq-detalle-supervisor',
  templateUrl: './ventana-liq-detalle-supervisor.component.html',
  styleUrls: ['./ventana-liq-detalle-supervisor.component.css']
})
export class VentanaLiqDetalleSupervisorComponent {
  @Input() fromParent:any;

  public nombre_supervisor : string = "";
  public zona_supervisor : string = "";
  public cedula_supervisor : string = "";
  public periodo : string = "";
  public idDetalleComisionSupervisor : number = 0;
  public arrLiqComisionSupervisor : any;
  constructor(private siscointService: SiscointService, public modalRef :  MdbModalRef<VentanaLiqDetalleSupervisorComponent>){}
  
  ngOnInit(){
    this.nombre_supervisor = this.fromParent.nombre_supervisor;
    this.zona_supervisor = this.fromParent.zona;
    this.cedula_supervisor = this.fromParent.cedula_supervisor;
    this.periodo = this.fromParent.periodo;
    this.idDetalleComisionSupervisor = this.fromParent.id;
    this.getLiquidadorSupervisor(this.cedula_supervisor, this.periodo);
    this.siscointService.validarEstadoPerido(this.periodo).subscribe(valor => {
      console.log("El valor del estado es : "+valor)
    })
  }

  getLiquidadorSupervisor(cedula_supervisor : string, periodo : string){
    this.siscointService.getObtenerLiquidadorComisionSupervisor(cedula_supervisor, periodo).subscribe(valor => {
      this.arrLiqComisionSupervisor = valor;
      //console.log("El supervisor es : "+this.arrLiqComisionSupervisor);
      //this.cedula_supervisor = this.arrLiqComisionSupervisor.cedula_supervisor;
    })
  }



  close(): void {
    const closeMessage = 'Modal closed';
    this.modalRef.close(closeMessage)
  }
}


