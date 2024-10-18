import { Component, Input } from '@angular/core';
import { SiscointService } from 'src/app/siscoint.service';
import { Router } from '@angular/router';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { saveAs } from 'file-saver';
import { DatePipe } from '@angular/common';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-ventana-detalle-esquema',
  templateUrl: './ventana-detalle-esquema.component.html',
  styleUrls: ['./ventana-detalle-esquema.component.css']
})
export class VentanaDetalleEsquemaComponent {
  @Input() fromParent:any;
  userUsuario : string = "";
  altasMegas : number = 0;
  altasMovil : number = 0;
  procesadosNp : number = 0;
  procesadosOc : number = 0;
  PenalizaMegas : number = 0;
  penalizaMovil : number = 0;
  noProcesadoNp : number = 0;
  noProcesadoOc : number = 0;
  migracionMegas : number = 0;
  migracionMovil : number = 0;
  noProcesaMegas : number = 0;
  noProcesaMovil : number = 0;
  TotalMegas : number = 0;
  TotalMovil : number = 0;
  TotalNp : number = 0;
  TotalOc : number = 0;
  periodo : string = "";
  tipo_esquema : number = 0;
  pipe = new DatePipe('en-US');
  constructor(public modalRef : MdbModalRef<VentanaDetalleEsquemaComponent>,
    private router : Router,
    private siscointServive : SiscointService
     ){}
  ngOnInit(){
    this.userUsuario =  JSON.parse(JSON.stringify(localStorage.getItem('usuario'))) || '';
    //listar conteo de los tipos de procesos
    console.log("El parent es  : "+this.fromParent)
    this.periodo = this.fromParent.prop2
    this.tipo_esquema = this.fromParent.prop1
    console.log("El periodo es "+this.periodo)
    console.log("El esquema es "+this.tipo_esquema)
    this.validateCantidadProcesos(this.tipo_esquema,this.periodo);
  }
  
  close() : void{
    const closeMessage = 'Modal closed';
    this.modalRef.close(closeMessage)
  }
  validate(){
    alert("Hola")
  }

  validateCantidadProcesos(codigoTipoEsquema : number, periodo : string){
    this.siscointServive.consultaCantidadProcesos(codigoTipoEsquema, periodo).subscribe((valor) => {
      console.log("El valor es : "+valor[0])
      this.altasMegas = valor[0];
      this.altasMovil = valor[1];
      this.procesadosNp = valor[2];
      this.procesadosOc = valor[3];
      this.PenalizaMegas = valor[4];
      this.penalizaMovil = valor[5];
      this.noProcesadoNp = valor[6];
      this.noProcesadoOc = valor[7];
      this.migracionMegas = valor[8];
      this.migracionMovil = valor[9];
      this.noProcesaMegas = valor[10];
      this.noProcesaMovil = valor[11];
      this.TotalMegas = valor[12];
      this.TotalMovil = valor[13];
      this.TotalNp = valor[14];
      this.TotalOc = valor[15];
      // var obj = JSON.stringify(valor);
      // console.log("el valor 2 es : "+obj)
      // var ress = JSON.parse(obj);
      // console.log("El resultado es : "+ress.Resultado);
      // ress.Resultado.forEach((value : any) => {
      //   console.log("Value es : "+value)
      // })
    })
  }

  descargarEsquemas(proc : any, tipoProceso : string){
    const now = Date.now();
    const myFormattedDate = this.pipe.transform(now, 'short');
    
    if(proc.target.value > 0){
       this.siscointServive.descargarCantidadProcesos(tipoProceso, this.periodo, this.tipo_esquema).subscribe(valor => {
        
         let nombre_archivo : string = "";
         let tipo_esquema_srt : string = "";
         if(this.tipo_esquema == 1){
          tipo_esquema_srt = "PAP";
         }
         if(this.tipo_esquema == 2){
          tipo_esquema_srt = "PYMES";
         }
         if(this.tipo_esquema == 3){
          tipo_esquema_srt = "CALL OUT";
         }
         if(this.tipo_esquema == 5){
          tipo_esquema_srt = "PAP II";
         }
         const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
         const EXCEL_EXTENSION = '.xlsx';
         nombre_archivo = "ARCHIVO "+tipoProceso.toUpperCase()+" "+tipo_esquema_srt+" ";
         
         const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(valor);
         const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
         const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
         const data: Blob = new Blob([excelBuffer], {
            type: EXCEL_TYPE
         });
         saveAs(data,nombre_archivo+myFormattedDate+EXCEL_EXTENSION)
       
       })
    }else{
      alert("NO TIENE DATOS A PROCESAR")
    }
  }

}
