import { Component, OnInit, ViewChild } from '@angular/core';
import { SiscointService } from 'src/app/siscoint.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { liq_tipo_esquema } from 'src/app/_inteface/liq_tipo_esquema.model';
import { liq_periodo } from 'src/app/_inteface/liq_periodo.model';
import { escalaXperiodo } from 'src/app/_inteface/escalaXperiodo.models';
import { getOptenerSupervisoresEscalaXPerido } from 'src/app/_inteface/supervisoresEsquemaPeriodo.models';
import { asesorSuperEsquemaPeriodo } from 'src/app/_inteface/asesorSuperEsquemaPeriodo.models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { VentanaDetalleLiquidadorComponent } from 'src/app/controls/ventana-detalle-liquidador/ventana-detalle-liquidador.component';
import { liq_importes } from 'src/app/_inteface/liq_importes.models';
import { archivos_data } from 'src/app/_inteface/archivos_data.models';
import { saveAs } from 'file-saver';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-importe-carta-meta',
  templateUrl: './importe-carta-meta.component.html',
  styleUrls: ['./importe-carta-meta.component.css']
})
export class ImporteCartaMetaComponent {
  modalRef: MdbModalRef<VentanaDetalleLiquidadorComponent> | null = null;
  archivoExcel : string = '';
  archivoExcelPeriodo : string = '';
  arrayBuffer:any;
  file : any;
  file_periodo : any;
  userUsuario : string = "";
  nombreUsuario : string = "";
  arrayJsonExcel : any = [];
  arrayJsonExcelPeriodo : any = [];
  arrLiqTipoEsquema : liq_tipo_esquema[] = [];
  arrLiqImportes : liq_importes [] = [];
  arrArchivosImportes : archivos_data [] = [];
  arrLiqTipoEsquema_aux : liq_tipo_esquema[] = [];
  arrLiqPeriodos : liq_periodo[] = [];
  arrEsquemaXperiodo : escalaXperiodo[] = [];
  arrSuperEsquemaPerido : getOptenerSupervisoresEscalaXPerido[] = [];
  arrAsesorSuperEsquemaPerido : asesorSuperEsquemaPeriodo[] = [];
  codigoLiqTipoEaquema : number = 0;
  codigoLiqImporte : number|string = 0;
  codigoIdArchivo : number = 0;
  editRowId: any;
  editRowId2 : any;
  expanded : boolean = false;
  subExpanded : boolean = false;
  item_id : number = 0;
  item_aux : liq_tipo_esquema = {id:0,nombre_tipo_esquema:'',codigo_valor:0,subexpanded:false, periodo :'' };
  Index : any;
  hideme : any = [];
  IndexSub1 : any;
  himedeSub1 : any = [];
  fecha : Date = new Date();
  pipe = new DatePipe('en-US');
  

  constructor(
    private router : Router, 
    private siscointServive : SiscointService, 
    private ModalService : NgbModal, 
    private modalService: MdbModalService
    ) { }
  ngOnInit(): void {
    this.nombreUsuario = JSON.parse(JSON.stringify(localStorage.getItem('nombreCompleto'))) || '';
    this.userUsuario =  JSON.parse(JSON.stringify(localStorage.getItem('usuario'))) || '';
    this.listarTipoEsquema();
    this.listarPeriodos();
    this.listarTipoImporte();
    this.listarArchivosData();

  }
  onFileSelected(e : any){
    this.file = e.target.files[0];
  }
  onFileSelected_periodo(e : any){
    this.file_periodo = e.target.files[0];
  }
  suburExcelPeriodo(perido : string){
    if(this.codigoLiqImporte > "0"){
      this.siscointServive.ConvertirExcelToJson(this.file_periodo).then(valor =>{
       
        this.arrayJsonExcelPeriodo = valor;
        this.enviarArchivoImporteServicio(this.codigoLiqImporte.toString(),this.arrayJsonExcelPeriodo,perido);
      })
      
    }else{
      alert("DEBE SELECCIONAR UN TIPO DE IMPORTE")
    }
  }

  subirExcel(){
    if(this.codigoLiqTipoEaquema > 0){
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
        //enviar metodo para el servicio
        this.enviarArchivoServicio()
      }
      fileReader.readAsArrayBuffer(this.file);
    }else{
      alert("DEBE SELECCIONAR UN ESQUEMA DE COMISION")
    }
    
  }
  enviarArchivoImporteServicio(tipo : string, array : any[], periodo : string){
    
    switch(tipo){
      case "1" :
        this.siscointServive.enviarArchivoBaseCierre(this.userUsuario, this.nombreUsuario,periodo,array,1).subscribe(valor => {
          alert(JSON.stringify(valor));
        })
        break;
      case "2":
        this.siscointServive.enviarArchivoAltasMigracionMegas(this.userUsuario, this.nombreUsuario,periodo,array).subscribe(valor => {
          alert(JSON.stringify(valor));
        })
        break;
      case "3":
        this.siscointServive.enviarArchivoNuncaPagosMegas(this.userUsuario, this.nombreUsuario,periodo,array).subscribe(valor => {
          alert(JSON.stringify(valor));
        })
        break;  
      case "4":
        this.siscointServive.enviarArchivoPenalizacionesPap(this.userUsuario, this.nombreUsuario,periodo,array,1).subscribe(valor => {
          alert(JSON.stringify(valor));
        })
        break;
      case "5":
        this.siscointServive.enviarArchivoAltasMoviles(this.userUsuario, this.nombreUsuario,periodo,array).subscribe(valor => {
          alert(JSON.stringify(valor));
        })
        break;
      case "6":
        this.siscointServive.enviarArchivoPenalizacionesMoviles(this.userUsuario, this.nombreUsuario,periodo,array).subscribe(valor => {
          alert(JSON.stringify(valor));
        })
        break;
      case "8":
        this.siscointServive.enviarArchivoBaseCierre(this.userUsuario, this.nombreUsuario,periodo,array,2).subscribe(valor => {
          alert(JSON.stringify(valor));
        })
        break;
      case "9":
        this.siscointServive.enviarArchivoPenalizacionesPyme(this.userUsuario, this.nombreUsuario,periodo,array,2).subscribe(valor => {
          alert(JSON.stringify(valor));
        })
        break;
        
      default :
        //console.log("Entro aqui al default")
        break;
    }
  }

  enviarArchivoServicio(){
    this.arrayJsonExcel.forEach(function(item : any){
      //console.log("El array es  : "+item.RETIRO)
      item.FECHA_DE_INGRESO = new Date((item.FECHA_DE_INGRESO - (25567 + 2)) * 86400 * 1000).toLocaleDateString();
      if(typeof item.RETIRO === 'undefined'){
        item.RETIRO = new Date('December 31, 2099').toLocaleDateString();
      }else{
        item.RETIRO = new Date((item.RETIRO - (25567 + 2)) * 86400 * 1000).toLocaleDateString();
      }
    })
     this.siscointServive.enviarArchivoCartaMeta(this.arrayJsonExcel, 
                                                this.userUsuario, 
                                                 this.nombreUsuario, 
                                                 this.codigoLiqTipoEaquema)
     .subscribe(valor => {
      
     
      alert(valor[0]);
      this.listarPeriodos();
     }) 
  }

  listarTipoEsquema(){
    this.siscointServive.getLiqTipoEsquema().subscribe(valor => {
      this.arrLiqTipoEsquema = valor;
    })
  }

  listarTipoImporte(){
    this.siscointServive.getListarTipoImporte().subscribe(valor => {
      this.arrLiqImportes = valor;
    })
  }

  listarArchivosData(){
    this.siscointServive.getListarArchivosLiq().subscribe(valor => {
      this.arrArchivosImportes = valor;
    })
  }

  listarPeriodos(){
    this.siscointServive.getLiqPeriodos().subscribe(valor => {
      this.arrLiqPeriodos = valor;
    })
  }
  validarRow(val : number | undefined){
    this.editRowId = val;
  }

  showBuildingDetails(value : any){

  }
  ocultar(value : boolean, item : any){
    this.expanded = value;
  }
  mostrar(value : boolean , item : any){
    this.expanded = value;
    
    //se le adiciona el periodo al array 
    this.siscointServive.getLiqTipoEsquema().subscribe(valor => {
      this.arrLiqTipoEsquema_aux = valor;
      this.arrLiqTipoEsquema_aux.forEach(function(i_tem : any){
        
        i_tem.periodo = item.periodo;
 
       })
    })
  }
  
  mostrarSub1(item : any){
    //this.subExpanded = value;
    this.editRowId2 = item.id;
    this.item_aux.id = item.id;
    this.item_aux.nombre_tipo_esquema = item.nombre_tipo_esquema;
    this.item_aux.subexpanded = true;
  }

  showSubTable1(index : any, item : any){
    //console.log("la data para esta consulta es : "+item.codigo_valor+" y el periodo es : "+item.periodo);
    this.siscointServive.getOptenerSupervisoresEscalaXPerido(item.codigo_valor, item.periodo).subscribe(valor => {
      this.arrSuperEsquemaPerido = valor;
    })
    this.hideme[index] = !this.hideme[index];
    this.Index = index;
  }
  showSubTable2(index : any, item : any){
    
    
    this.siscointServive.getObtenerAsesoresSupervisoresEscalaXPerido(item.codigo_tipo_escala, item.periodo, item.cedula_supervisor)
    .subscribe(valor => {
      this.arrAsesorSuperEsquemaPerido = valor;
    })
    this.himedeSub1[index] = !this.himedeSub1[index];
    this.IndexSub1 = index;
  }

  openModalDetalleComisionAsesor(item : any){
    
    this.modalRef = this.modalService.open(VentanaDetalleLiquidadorComponent,{
      modalClass: 'modal-xl'
    });
    this.modalRef.component.fromParent = item;
    
    
    
  }
  openModal(){
   
    this.modalRef = this.modalService.open(VentanaDetalleLiquidadorComponent);
  }

  selectedTipoImporte(a : any){
    //console.log("El value es : "+a.target.value)
  }

  descargarArchivo(){
    const now = Date.now();
    const myFormattedDate = this.pipe.transform(now, 'short');
    this.siscointServive.descargarArchivosLiq(this.codigoIdArchivo).subscribe(valor => {
      saveAs(valor,'FORMATO EXCEL CARTA METAS MODELO_'+myFormattedDate+'.xlsx')
    })
  }



}
