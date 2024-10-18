import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { liqConsultas } from 'src/app/_inteface/liqConsultas.model';
import { SiscointService } from 'src/app/siscoint.service';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-consultas-comisiones',
  templateUrl: './consultas-comisiones.component.html',
  styleUrls: ['./consultas-comisiones.component.css']
})
export class ConsultasComisionesComponent {
  arrLiqComisionConsultas : liqConsultas [] = [];
  userUsuario : string = "";
  nombreUsuario : string = "";
  periodoConsulta : string = "";
  pipe = new DatePipe('en-US');
  EsConsulta : number = 1;
  archivoExcel : string = "";
  file_archivo : any;


  codigoTipoComisionConsulta : number = 0;
  constructor(private router : Router, 
              private siscointService : SiscointService ){}
  ngOnInit() : void {
    this.nombreUsuario = JSON.parse(JSON.stringify(localStorage.getItem('nombreCompleto'))) || '';
    this.userUsuario =  JSON.parse(JSON.stringify(localStorage.getItem('usuario'))) || '';
    this.ListarLiqComisionConsultas();
  }
  ListarLiqComisionConsultas(){
    this.siscointService.ListarLiqConsultas().subscribe(valor => {
      this.arrLiqComisionConsultas = valor;
    })
  }
  
  onFileSelected_archivo(e:any){
    this.file_archivo = e.target.files[0];
  }

  ValidoTipoConsulta(){
    //alert("El tipo consulta es : "+this.codigoTipoComisionConsulta+" y el periodo es : "+this.periodoConsulta)
    this.siscointService.descargarArchivoConsulta(this.codigoTipoComisionConsulta, this.periodoConsulta).subscribe(valor => {
      console.log(valor);
      var obj = JSON.stringify(valor);
      var ress = JSON.parse(obj);
      if(ress.Valor == 1){
        const nombre_arch = this.arrLiqComisionConsultas.find(({codigo}) => codigo == this.codigoTipoComisionConsulta);
        //console.log("El nombre archivo es : "+nombre_arch?.descripcion)
        this.convertirDescargarExcel(ress.Resultado,nombre_arch?.descripcion)
      }else{
        alert("EL PERIODO NO EXISTE")
      }
    })
  }

  validaCambioTipoConsulta(e : any){
    let codigo_tipo_consulta = e.target.value;
    const tipo_consulta  = this.arrLiqComisionConsultas.find(({codigo}) => codigo == codigo_tipo_consulta);
    //console.log("El tipo consulta es : "+tipo_consulta?.descripcion)
    //alert("El tipo proceso es : "+tipo_consulta?.tipo_proceso)
    if(tipo_consulta?.tipo_proceso == 1){
      this.EsConsulta = 1
    }else{
      this.EsConsulta = 0;
    }
  }

  convertirDescargarExcel(value : any, nombre : any){
    const now = Date.now();
    const myFormattedDate = this.pipe.transform(now, 'short');
    let binaryWS = XLSX.utils.json_to_sheet(value); 
      var wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, binaryWS, nombre) 
      XLSX.writeFile(wb, nombre+myFormattedDate+'.xlsx');
  }
}
