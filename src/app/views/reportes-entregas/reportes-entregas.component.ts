import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SiscointService } from 'src/app/siscoint.service';
import { centroCosto } from 'src/app/_inteface/centroCosto.model';
import { reporteEntregasModel } from 'src/app/_inteface/reporteEntrega.model';
import { tipoReporteModel } from 'src/app/_inteface/tipoReporte.model';

@Component({
  selector: 'app-reportes-entregas',
  templateUrl: './reportes-entregas.component.html',
  styleUrls: ['./reportes-entregas.component.css']
})
export class ReportesEntregasComponent implements OnInit {
  tituloGestion : string = "";
  disabled : boolean = false;
  idTipoActivo : number = 0;
  idTipoDevolutivo : number = 0;
  idCentroCosto : number = 0;
  tipoFormulario : number = 0;
  tipoOpcion : number = 0;
  tipoActivo : any[] = [];
  tipoDevolutivo : any[] = [];
  reporteEntregasForm : any[] = [];
  buscarReporte : string = "";
  centroCosto : any[] = [];
  EsFormularioActivos : boolean = false;
  EsFormularioDevolutivo : boolean = false;
  TipoEntrega : string = "";
  constructor(private router : Router, private siscointService : SiscointService) { }

  ngOnInit(): void {
    this.validarTipoFormulario();
  }

  validarTipoFormulario(){
    switch(this.router.url){
      case '/reportes/activos':
        this.tituloGestion = "Reportes Activos"
        this.tipoFormulario = 1;
        this.getListTipoReporte(this.tipoFormulario)
        this.EsFormularioActivos = true;
        break;
      case '/reportes/devolutivos':
        this.tituloGestion = "Reporte de elementos devolutivos";
        this.tipoFormulario = 2;
        this.getListTipoReporte(this.tipoFormulario)
        this.EsFormularioDevolutivo = true;
        this.getCentroDeCostos();
        break;
    }
  }

  filtrarReporte(e : any){
    
    this.tipoOpcion = e.target.value
    this.siscointService.getTipoReporte(this.tipoFormulario, this.tipoOpcion).subscribe((res : any[]) => {
      this.reporteEntregasForm = res;
      localStorage.setItem('reporteEntregasForm', JSON.stringify(this.reporteEntregasForm));
    })
  }

  getListTipoReporte(idTipoFormulario : number){
    console.log("Id Tipo Formulario : ", idTipoFormulario)
    this.siscointService.getListTipoReporte(idTipoFormulario).subscribe((res : tipoReporteModel[]) => {
      if(idTipoFormulario == 1){
        this.tipoActivo = res;
      }else if(idTipoFormulario == 2){
        this.tipoDevolutivo = res;
      }
    })
  }

  getCentroDeCostos(){
    this.siscointService.getCentroCostos().subscribe((res : centroCosto[]) => {
      this.centroCosto = res;
    })
  }

  tipoEntregaForm(e : any){
    this.TipoEntrega = e.target.value
    let dataFilter = this.TipoEntrega
    console.log(dataFilter)
    console.log(JSON.parse(JSON.stringify(localStorage.getItem('reporteEntregasForm'))))
    var ReporteEntregaTemp  : any[] = [];
    ReporteEntregaTemp = JSON.parse(JSON.stringify(localStorage.getItem('reporteEntregasForm')))
  }

}
