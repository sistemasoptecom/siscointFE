import { Component, OnInit } from '@angular/core';
import { SiscointService } from 'src/app/siscoint.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { excel_bco_agrario } from 'src/app/_inteface/excel_bco_agrario.models';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-banco-agrario',
  templateUrl: './banco-agrario.component.html',
  styleUrls: ['./banco-agrario.component.css']
})
export class BancoAgrarioComponent implements OnInit {
  archivoExcel : string = '';
  arrayBuffer:any;
  file : any;
  archivoBase64 : string = '';
  archivoBase64Se : string = '';
  userUsuario : string = "";
  nombreUsuario : string = "";
  arrayJsonExcel : any = [];
  arrayExcelListado : excel_bco_agrario[] = [];
  constructor(private router : Router, private siscointServive : SiscointService, private sanitizar : DomSanitizer) { }

  ngOnInit(): void {
    this.nombreUsuario = JSON.parse(JSON.stringify(localStorage.getItem('nombreCompleto'))) || '';
    this.userUsuario =  JSON.parse(JSON.stringify(localStorage.getItem('usuario'))) || '';
    this.listarCreados();
  }

  subirExcel(){
   
    var exceljsonObj = [];
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, {type:"binary"});
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      
      this.arrayJsonExcel = XLSX.utils.sheet_to_json(worksheet,{raw:true})
      
      this.enviarArchivoServicio();
    }
    fileReader.readAsArrayBuffer(this.file);
   
  }
 
  onFileSelected(e : any){
    this.file = e.target.files[0];
  }

  validarRow(consecutivo : number){
    
    this.siscointServive.getObtenerTxt(consecutivo).subscribe(valor => {
     
      this.descargarArchivoTxt(valor)
    })
  }

  descargarArchivoTxt(text : string){
    var filename = "GD2023050809006687221_01.txt";
    var content = text;
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  listarCreados(){
    this.siscointServive.getListadoExcel().subscribe(valor => {
      
      this.arrayExcelListado = valor;
     
    })
  }

  enviarArchivoServicio(){
    
    this.siscointServive.enviarArchivoBcoAgrario(this.arrayJsonExcel, this.userUsuario, this.nombreUsuario)
    .subscribe(valor => {
      this.listarCreados();
    }) 
  }
  
}
