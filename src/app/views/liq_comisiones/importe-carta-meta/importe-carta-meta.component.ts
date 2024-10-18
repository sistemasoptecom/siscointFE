import { Component, OnInit, ViewChild,Output, EventEmitter } from '@angular/core';
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
import { VentanaLiqDetalleSupervisorComponent } from 'src/app/controls/ventana-liq-detalle-supervisor/ventana-liq-detalle-supervisor.component';
import { VentanaTokenComponent } from 'src/app/controls/ventana-token/ventana-token.component';
import { VentanaDetalleEsquemaComponent } from 'src/app/controls/ventana-detalle-esquema/ventana-detalle-esquema.component';
import { liq_importes } from 'src/app/_inteface/liq_importes.models';
import { archivos_data } from 'src/app/_inteface/archivos_data.models';
import { liq_comision_supervisor } from 'src/app/_inteface/liq_comision_supervisor.models';
import { liq_comision_supervisor_pap } from 'src/app/_inteface/liq_comision_supervisor_pap.model';
import { liq_comision_supervisor_pymes } from 'src/app/_inteface/liq_comision_supervisor_pymes.model';
import { liq_comision_supervisor_call } from 'src/app/_inteface/liq_comision_supervisor_call.model';
import { saveAs } from 'file-saver';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { parse } from '@fortawesome/fontawesome-svg-core';
import { liq_comision_asesor } from 'src/app/_inteface/liq_comision_asesor.model';
import { VentanaRecalculaSuperComponent } from 'src/app/controls/ventana-recalcula-super/ventana-recalcula-super.component';
@Component({
  selector: 'app-importe-carta-meta',
  templateUrl: './importe-carta-meta.component.html',
  styleUrls: ['./importe-carta-meta.component.css']
})
export class ImporteCartaMetaComponent {
  modalRef: MdbModalRef<VentanaDetalleLiquidadorComponent> | null = null;
  modalRefS : MdbModalRef<VentanaLiqDetalleSupervisorComponent> | null = null;
  modalRefT : MdbModalRef<VentanaTokenComponent> | null = null;
  modalRefP : MdbModalRef<VentanaTokenComponent> | null = null;
  modalRefD : MdbModalRef<VentanaDetalleEsquemaComponent> | null = null;
  modalRefRS : MdbModalRef<VentanaRecalculaSuperComponent> | null = null;
  archivoExcel : string = '';
  archivoExcelPeriodo : string = '';
  arrayBuffer:any;
  file : any;
  file_periodo : any;
  userUsuario : string = "";
  nombreUsuario : string = "";
  arrayJsonExcel : any = [];
  arrayJsonExcelPeriodo : any = [];
  arrayExcelSuper_pap : liq_comision_supervisor[] = [];
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
  tipoImporte_meta : number = 0;
  validateFormSub : boolean = false;
  validateFormSub2 : boolean = false;
  timer: number = 0;
  timeoutId!: ReturnType<typeof setTimeout>;
  @Output() onIncrement: EventEmitter<number> = new EventEmitter();
  mostrarPorcentaje : boolean = false;
  mostrarOpcionesValPeriodo : boolean = false;
  porcentaje : number = 0;
  arrLiqComisionAsesor : any;
  liq_comision_asesor : liq_comision_asesor|undefined
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
    //console.log("El tipo de archivo es  : "+this.file.type)
  }
  onFileSelected_periodo(e : any){
    this.file_periodo = e.target.files[0];
  }
  suburExcelPeriodo(perido : string){

    if(this.file_periodo.type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
      this.siscointServive.ConvertirExcelToJson(this.file_periodo).then(valor =>{
     
        this.arrayJsonExcelPeriodo = valor;
        this.enviarArchivoImporteServicio(this.codigoLiqImporte.toString(),this.arrayJsonExcelPeriodo,perido);
      })
    }else{
      alert("NO HAY NINGUN ARCHIVO SELECCIONADO")
    }

    // if(this.codigoLiqImporte > "0"){
    //   if(this.file_periodo.type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
    //     this.siscointServive.ConvertirExcelToJson(this.file_periodo).then(valor =>{
       
    //       this.arrayJsonExcelPeriodo = valor;
    //       this.enviarArchivoImporteServicio(this.codigoLiqImporte.toString(),this.arrayJsonExcelPeriodo,perido);
    //     })
    //   }else{
    //     alert("NO HAY NINGUN ARCHIVO SELECCIONADO")
    //   }
      
      
    // }else{
    //   alert("DEBE SELECCIONAR UN TIPO DE IMPORTE")
    // }
  }

  subirExcel(){
    if(this.tipoImporte_meta > 0){
      //console.log(this.file)
      if(this.file.type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
        this.siscointServive.ConvertirExcelToJson(this.file).then(valor => {
          this.arrayJsonExcel = valor;
          this.enviarArchivoServicio(this.arrayJsonExcel, this.tipoImporte_meta)
        })
      }else{
        alert("NO HAY NINGUN ARCHIVO SELECCIONADO")
      }
      
      /*var exceljsonObj = [];
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
      fileReader.readAsArrayBuffer(this.file);*/

    }else{
      alert("DEBE SELECCIONAR UN ESQUEMA DE COMISION O TIPO DE IMPORTE")
    }
    
  }
  enviarArchivoImporteServicio(tipo : string, array : any[], periodo : string){
    //console.log("El arrey es : "+array.length);
    let array_aux : any = [];
    switch(tipo){
      case "1" :
        array_aux = array.filter((obj) => {
          return obj.UNIDAD > 0;
        });
        this.validateFormSub2 = true;
        //console.log("El Array aux es : "+array_aux);
        this.mostrarPorcentaje = true; 
        this.startTimer("procesarExcelBaseCierrePap")
        this.siscointServive.enviarArchivoBaseCierrePap(this.userUsuario, this.nombreUsuario,periodo,array_aux,1).subscribe(valor => {
           this.validateFormSub2 = false;
           alert(JSON.stringify(valor));
           this.stopTimer("procesarExcelBaseCierrePap");
        })
        break;
      case "2":
        array_aux = array.filter((obj) => {
          return obj.UNIDAD == 0;
        });
        this.validateFormSub2 = true;
        this.mostrarPorcentaje = true; 
        this.startTimer("procesarExcelAltasMigracion")
        this.siscointServive.enviarArchivoAltasMigracionMegasPap(this.userUsuario, this.nombreUsuario,periodo,array_aux,1).subscribe(valor => {
          this.validateFormSub2 = false;
          alert(JSON.stringify(valor));
          this.stopTimer("procesarExcelAltasMigracion");
        })
        break;
      case "3":
        array_aux = array.filter((obj) => {
          return obj.TIPO_OPERACION == 'MEGAS'
        })
        this.validateFormSub2 = true;
        this.mostrarPorcentaje = true; 
        this.startTimer("procesarExcelNuncaPagosMegas")
        this.siscointServive.enviarArchivoNuncaPagosMegas(this.userUsuario, this.nombreUsuario,periodo,array_aux).subscribe(valor => {
          this.validateFormSub2 = false;
          alert(JSON.stringify(valor));
          this.stopTimer("procesarExcelNuncaPagosMegas");
        })
        break;  
      case "4":

        array_aux = array.filter((obj) => {
          return obj.UNIDAD < 0;
        });
        this.validateFormSub2 = true;
        this.mostrarPorcentaje = true; 
        this.startTimer("procesarExcelPenalizacionesMegasPap")
        this.siscointServive.enviarArchivoPenalizacionesPap(this.userUsuario, this.nombreUsuario,periodo,array_aux,1).subscribe(valor => {
          this.validateFormSub2 = false;
          alert(JSON.stringify(valor));
          this.stopTimer("procesarExcelPenalizacionesMegasPap");
        })
        break;
      case "5":
        array_aux = array.filter((obj) => {
          return obj.UNIDAD > 0
        });
        this.validateFormSub2 = true;
        this.mostrarPorcentaje = true; 
        this.startTimer("procesarExcelAltasMovil")
        this.siscointServive.enviarArchivoAltasMoviles(this.userUsuario, this.nombreUsuario,periodo,array_aux).subscribe(valor => {
          this.validateFormSub2 = false;
          alert(JSON.stringify(valor));
          this.stopTimer("procesarExcelAltasMovil");
        })
        break;
      case "6":
        array_aux = array.filter((obj) => {
          return obj.UNIDAD < 0
        });
        this.validateFormSub2 = true;
        this.mostrarPorcentaje = true; 
        this.startTimer("procesarExcelPenalizacionMovil")
        this.siscointServive.enviarArchivoPenalizacionesMoviles(this.userUsuario, this.nombreUsuario,periodo,array_aux).subscribe(valor => {
          this.validateFormSub2 = false;
          alert(JSON.stringify(valor));
          this.stopTimer("procesarExcelPenalizacionMovil");
        })
        break;
      case "7":
        array_aux = array.filter((obj) => {
          return obj.TIPO_OPERACION == 'MOVIL'
        });
        //console.log("El array movil es : "+array_aux.length)
        this.validateFormSub2 = true;
        this.mostrarPorcentaje = true; 
        this.startTimer("procesarNuncaPagosMovil")
        this.siscointServive.enviarArchivoNuncaPagosMovil(this.userUsuario, this.nombreUsuario, periodo, array_aux).subscribe(valor => {
          this.validateFormSub2 = false;
          alert(JSON.stringify(valor));
          this.stopTimer("procesarNuncaPagosMovil");
        })
        break;
      case "8":
        array_aux = array.filter((obj) => {
          return obj.TIPO_ESQUEMA == 'PYMES' && obj.UNIDAD > 0;
        });
        this.validateFormSub2 = true;
        this.mostrarPorcentaje = true; 
        this.startTimer("procesarExcelBaseCierrePyme")
        this.siscointServive.enviarArchivoBaseCierrePymes(this.userUsuario, this.nombreUsuario,periodo,array_aux,2).subscribe(valor => {
          this.validateFormSub2 = false;
          alert(JSON.stringify(valor));
          this.stopTimer("procesarExcelBaseCierrePyme");
        })
        break;
      case "9":
        array_aux = array.filter((obj) => {
          return obj.TIPO_ESQUEMA == 'PYMES' && obj.UNIDAD < 0;
        });
        this.validateFormSub2 = true;
        this.mostrarPorcentaje = true; 
        this.startTimer("procesarExcelPenalizacionesMegasPyme")
        this.siscointServive.enviarArchivoPenalizacionesPyme(this.userUsuario, this.nombreUsuario,periodo,array_aux,2).subscribe(valor => {
          this.validateFormSub2 = false;
          alert(JSON.stringify(valor));
          this.stopTimer("procesarExcelPenalizacionesMegasPyme");
        })
        break;
      case "10":
        array_aux = array.filter((obj) => {
          return obj.TIPO_ESQUEMA == 'CALL OUT' && obj.UNIDAD > 0;
        });
        this.validateFormSub2 = true;
        this.mostrarPorcentaje = true; 
        this.startTimer("procesarExcelBaseCierreCall")
        this.siscointServive.enviarArchivoBaseCierreCall(this.userUsuario, this.nombreUsuario,periodo,array_aux,3).subscribe(valor => {
          this.validateFormSub2 = false;
          alert(JSON.stringify(valor));
          this.stopTimer("procesarExcelBaseCierreCall");
        })
        break;
      case "11":
        array_aux = array.filter((obj) => {
          return obj.TIPO_ESQUEMA == 'CALL OUT' && obj.UNIDAD < 0;
        });
        this.validateFormSub2 = true;
        this.mostrarPorcentaje = true; 
        this.startTimer("procesarPenalizacionesCall")
        this.siscointServive.enviarArchivoPenalizacionesCall(this.userUsuario, this.nombreUsuario,periodo,array_aux,3).subscribe(valor => {
          this.validateFormSub2 = false;
          alert(JSON.stringify(valor));
          this.stopTimer("procesarPenalizacionesCall");
        })
        break;
      case "12":
        array_aux = array.filter((obj) => {
          return obj.TIPO_ESQUEMA == 'PYMES' && obj.UNIDAD == 0;
        });
        this.validateFormSub2 = true;
        this.mostrarPorcentaje = true; 
        this.startTimer("procesarExcelAltasMigracion")
        this.siscointServive.enviarArchivoAltasMigracionMegasPyme(this.userUsuario, this.nombreUsuario,periodo,array_aux,2).subscribe(valor => {
          this.validateFormSub2 = false;
          alert(JSON.stringify(valor))
          this.stopTimer("procesarExcelAltasMigracion");
        })
        break;
      case "13":
        array_aux = array.filter((obj) => {
          return obj.TIPO_ESQUEMA == 'CALL OUT' && obj.UNIDAD == 0;
        });
        this.validateFormSub2 = true;
        this.mostrarPorcentaje = true; 
        this.startTimer("procesarExcelAltasMigracion")
        this.siscointServive.enviarArchivoAltasMigracionMegasCall(this.userUsuario, this.nombreUsuario,periodo,array_aux,3).subscribe(valor => {
          this.validateFormSub2 = false;
          alert(JSON.stringify(valor))
          this.stopTimer("procesarExcelAltasMigracion");
        })
        break;
      case "14":
        array_aux = array.filter((obj) => {
          return obj.TIPO_ESQUEMA == 'PAP II' && obj.UNIDAD > 0;
        });
        //ENVIO EL SERVICIO
        this.validateFormSub2 = true;
        this.mostrarPorcentaje = true; 
        this.startTimer("procesarExcelBaseCierrePap")
        this.siscointServive.enviarArchivoBaseCierrePap(this.userUsuario, this.nombreUsuario,periodo,array_aux,5).subscribe(valor => {
          this.validateFormSub2 = false;
          alert(JSON.stringify(valor));
          this.stopTimer("procesarExcelBaseCierrePap");
        })
        break;
      case "15":
        array_aux = array.filter((obj) => {
          return obj.TIPO_ESQUEMA == 'PAP II' && obj.UNIDAD < 0;
        });
        this.validateFormSub2 = true;
        this.mostrarPorcentaje = true; 
        this.startTimer("procesarExcelPenalizacionesMegasPap")
        this.siscointServive.enviarArchivoPenalizacionesPap(this.userUsuario, this.nombreUsuario,periodo,array_aux,5).subscribe(valor => {
          this.validateFormSub2 = false;
          alert(JSON.stringify(valor));
          this.stopTimer("procesarExcelPenalizacionesMegasPap");
        })
        break;
      case "16":
        array_aux = array.filter((obj) => {
          return obj.TIPO_ESQUEMA == 'PAP II' && obj.UNIDAD == 0;
        });
        this.validateFormSub2 = true;
        this.mostrarPorcentaje = true; 
        this.startTimer("procesarExcelAltasMigracionMegaPap")
        this.siscointServive.enviarArchivoAltasMigracionMegasPap(this.userUsuario, this.nombreUsuario,periodo,array_aux,5).subscribe(valor => {
          this.validateFormSub2 = false;
          alert(JSON.stringify(valor));
          this.stopTimer("procesarExcelAltasMigracionMegaPap");
        })
        break;
      case "17":
        this.validateFormSub2 = true;
        this.mostrarPorcentaje = true; 
        this.startTimer("procesarExcelOtrosConceptos")
        this.siscointServive.enviarArchivoOtrosConceptos(this.userUsuario, this.nombreUsuario, periodo, array).subscribe(valor => {
          this.validateFormSub2 = false;
          alert(JSON.stringify(valor));
          this.stopTimer("procesarExcelOtrosConceptos");
        })
        break;
      case "18":
        this.validateFormSub2 = true;
        this.mostrarPorcentaje = true; 
        //this.startTimer("procesarExcelNoPrecesadosMegas")
        this.siscointServive.enviarAcrchivoNoProcesadosMegas(this.userUsuario, this.nombreUsuario, periodo, array).subscribe(valor =>{
          alert(JSON.stringify(valor));
          this.validateFormSub2 = false;
          //this.stopTimer("procesarExcelNoPrecesadosMegas");
        })
        break;
      
      case "19":
        this.siscointServive.enviarNoProcesadosMovil(array, this.userUsuario, this.nombreUsuario).subscribe(valor => {
          alert(JSON.stringify(valor))
        })

        break
      default :
        //console.log("Entro aqui al default")
        break;
    }
  }

  

  startTimer(proceso : string) {
    if (this.timeoutId) return;
    this.timeoutId = setInterval(() => {
      this.validarPorcentajeProceso(proceso);
      this.onIncrement.emit(this.timer);
    }, 60000);
  }

  stopTimer(proceso : string) {
    console.log("Entro aqui")
    clearInterval(this.timeoutId);
    this.mostrarPorcentaje = false; 
    //mato el proceso
    //console.log(this.timeoutId);
    this.siscointServive.getAnularProceso(proceso).subscribe(valor => {
      console.log(valor);
      this.porcentaje = 0;
    })
  }

  validarPorcentajeProceso(validarProceso : string){
    
    this.siscointServive.getObtenerPorcentaje(validarProceso).subscribe(valor => {
      this.porcentaje = parseInt(valor)
      if(parseInt(valor) >= 100){
        this.stopTimer(validarProceso);
        this.porcentaje = 0;
      }
    })
  }

  enviarArchivoServicio(arrayJsonExcelAux : any[], tipoImporte : number){
    //alert("El tipo de Importe es : "+tipoImporte)
    switch(tipoImporte){
      case 1:
        //console.log("aqui para el primer metodo")
        arrayJsonExcelAux.forEach(function(item : any){
          //console.log("El array es  : "+item.RETIRO)
          item.FECHA_DE_INGRESO = new Date((item.FECHA_DE_INGRESO - (25567 + 2)) * 86400 * 1000).toLocaleDateString("en-GB");
          if(typeof item.RETIRO === 'undefined'){
            item.RETIRO = new Date('December 31, 2099').toLocaleDateString("en-GB");
          }else{
            item.RETIRO = new Date((item.RETIRO - (25567 + 2)) * 86400 * 1000).toLocaleDateString("en-GB");
          }
        })
          this.validateFormSub = true;
         this.siscointServive.enviarArchivoCartaMeta(arrayJsonExcelAux, 
                                                    this.userUsuario, 
                                                     this.nombreUsuario, 
                                                     this.codigoLiqTipoEaquema)
         .subscribe(valor => {
          //console.log("El valor es : "+valor)
          this.validateFormSub = false;
          alert(valor[0]);
          this.listarPeriodos();
         }) 
        break;
      case 2:
        this.validateFormSub = true;
        //console.log("aqui para el segundo metodo")
        this.siscointServive.enviarArchivoCartaMetaSuper(arrayJsonExcelAux, 
          this.userUsuario, 
           this.nombreUsuario, 
           this.codigoLiqTipoEaquema).subscribe(valor => {
            this.validateFormSub = false;
            console.log("El valor es : "+valor)
            alert(valor);
            this.listarPeriodos();
           })
        break;
        case 3:
          this.validateFormSub = false;
          this.siscointServive.enviarArchivoCartaMetaRecuperador(arrayJsonExcelAux,
                                                                this.userUsuario,
                                                                this.nombreUsuario,
                                                                this.codigoLiqTipoEaquema)
          .subscribe(valor => {
            this.validateFormSub = false;
            alert(valor[0]);
            this.listarPeriodos();
          })
          break;
    }
    //aqui se valida el tipo
  }

  listarTipoEsquema(){
    this.siscointServive.getLiqTipoEsquema(1).subscribe(valor => {
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
    this.siscointServive.getLiqTipoEsquema(1).subscribe(valor => {
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

  reprocesarAltasMegas(item: any)
  {
    console.log("item es : "+item.codigo_tipo_escala)
    if(item.codigo_tipo_escala == 1 || item.codigo_tipo_escala == 5)
    {
       this.siscointServive.reprocesarAltasMega(item.codigo_tipo_escala,1,item.cedula_supervisor,item.periodo).subscribe(valor => {
         alert(valor);
       })
    }else if(item.codigo_tipo_escala == 2)
    {
      this.siscointServive.reprocesarAltasMegaPymes(item.codigo_tipo_escala,1,item.cedula_supervisor,item.periodo).subscribe(valor => {
        alert(valor);
      })
    }else if(item.codigo_tipo_escala == 3)
    {
      this.siscointServive.reprocesarAltasMegaCall(item.codigo_tipo_escala,1,item.cedula_supervisor,item.periodo).subscribe(valor => {
        alert(valor);
      })
    }
  }

  reprocesarPenalizacionesMega(item :any)
  {
    if(item.codigo_tipo_escala == 1 || item.codigo_tipo_escala == 5)
    {
      this.siscointServive.reprocesarAltasMega(item.codigo_tipo_escala,0,item.cedula_supervisor,item.periodo).subscribe(valor => {
        alert(valor);
      })
   }else if(item.codigo_tipo_escala == 2)
  {
     this.siscointServive.reprocesarAltasMegaPymes(item.codigo_tipo_escala,0,item.cedula_supervisor,item.periodo).subscribe(valor => {
       alert(valor);
     })
   }else if(item.codigo_tipo_escala == 3)
   {
    this.siscointServive.reprocesarAltasMegaCall(item.codigo_tipo_escala,0,item.cedula_supervisor,item.periodo).subscribe(valor => {
      alert(valor);
    })
   }
  }

  reprocesarAltasMovil(item : any)
  {
    if(item.codigo_tipo_escala == 1 || item.codigo_tipo_escala == 5 || item.codigo_tipo_escala == 3)
    {
      this.siscointServive.reprocesarAltasMovil(item.codigo_tipo_escala,1,item.cedula_supervisor,item.periodo).subscribe(valor => {
        alert(valor);
      })
    }
  }

  reprocesarPenalizacionMovil(item : any)
  {
    if(item.codigo_tipo_escala == 1 || item.codigo_tipo_escala == 5 || item.codigo_tipo_escala == 3)
    {
      this.siscointServive.reprocesarAltasMovil(item.codigo_tipo_escala,0,item.cedula_supervisor,item.periodo).subscribe(valor => {
        alert(valor);
      })
    }
  }


  reprocesarPenalizacionesMovil()
  {

  }

  showSubTable1(index : any, item : any){
    //console.log("el item es "+item.nombre_tipo_esquema)
    //console.log("la data para esta consulta es : "+item.codigo_valor+" y el periodo es : "+item.periodo+" y el nombre es ");
    this.siscointServive.validarEstadoPerido(item.periodo).subscribe(value => {
      if(value == 1){
        this.mostrarOpcionesValPeriodo = true;
      }
    })
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
  //descargar el excel de los supervisores
  descargarExcelSupervisores(item : any){
    //console.log("El item es : "+item.codigo_valor+" Nombre tipo esquema : "+item.nombre_tipo_esquema+" Periodo : "+item.periodo)
    this.siscointServive.ListarComisionSupervisorV2(item.periodo, item.codigo_valor).subscribe(valor => {
      
      //console.log("El array es : "+valor)
      valor.forEach((val : any, index) =>{
        //var aux = {}
        
        //aux.nombre_supervisor = val.nombre_supervisor
        //console.log("El nombre es : "+ aux.nombre_supervisor)
       
          const aux : liq_comision_supervisor = val
          let porcentaje_cumplimiento_asesor_ftth : string = aux.porcentaje_cumplimiento_asesor_ftth
          var aux_porcentaje_Asesor_ftth = porcentaje_cumplimiento_asesor_ftth.split(" ",2)
          aux.porcentaje_cumplimiento_asesor_ftth = aux.homologa_porcentaje_ftth+" "+aux_porcentaje_Asesor_ftth[1]
          var aux_homologa_porcentaje_ftth_peso = aux.peso_cumpliento_ftth.split(":")
          aux.peso_cumpliento_ftth = aux.homologa_peso_ftth+" % : "+aux_homologa_porcentaje_ftth_peso[1]
          // var aux_factor_acelearion_desaceleracion = aux.factor_acelearion_desaceleracion.split(" ")
          // aux.factor_acelearion_desaceleracion = aux.homologa_factor_aceleracion_desaceleracion+" "+aux_factor_acelearion_desaceleracion[1]
          var aux_total_porcentaje_cumplimiento = aux.total_porcentaje_cumplimiento.split(" ")
          aux.total_porcentaje_cumplimiento =  aux.total_homologa_cumplimiento+" "+aux_total_porcentaje_cumplimiento[1]
        
          this.arrayExcelSuper_pap.push(aux)
        

      })
      
      this.convertirDescargarExcel(this.arrayExcelSuper_pap)
      
      //this.convertirDescargarExcel(this)
    })
  }
  openModalDetalleComisionAsesor(item : any){
    
    this.modalRef = this.modalService.open(VentanaDetalleLiquidadorComponent,{
      modalClass: 'modal-xl'
    });
    this.modalRef.component.fromParent = item;
  }
  convertirDescargarExcel(value : any){
    const now = Date.now();
    const myFormattedDate = this.pipe.transform(now, 'short');
    let binaryWS = XLSX.utils.json_to_sheet(value); 
      var wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, binaryWS, 'liquidar comision supervisor') 
      XLSX.writeFile(wb, 'liquidador '+myFormattedDate+'.xlsx');
  }

  openModalDetalleComisionSupervisor(item : any){
    this.modalRefS = this.modalService.open(VentanaLiqDetalleSupervisorComponent,{
      modalClass : 'modal-xl'
    })
    this.modalRefS.component.fromParent = item;
  }

  openModalRecalcularSupervisor(item : any){
    this.modalRefRS = this.modalService.open(VentanaRecalculaSuperComponent,{
      modalClass : 'modal-xl'
    })
    this.modalRefRS.component.fromParent = item;
  }

  openValidateCerrarPeriodo(item : any){
    this.modalRefT = this.modalService.open(VentanaTokenComponent,{
      modalClass : 'modal-lg',
      
      
    })
    //item.observacion = 'CerrarPeriodo'
    let data = {
      prop1 : 'CerrarPeriodo',
      prop2 : item.periodo,
      prop3 : item.estado
    }
    this.modalRefT.component.fromParent = data;
    //creamos el proceso para enviar el token al correo electronico
    //console.log("Item del periodo es "+ item.periodo)
    // this.siscointServive.enviarCorreo( this.userUsuario, "CerrarPeriodo").subscribe(valor => {
    //   if(valor.length > 0){
    //     this.modalRefT = this.modalService.open(VentanaTokenComponent,{
    //       modalClass : 'modal-lg',
          
          
    //     })
    //     //item.observacion = 'CerrarPeriodo'
    //     let data = {
    //       prop1 : 'CerrarPeriodo',
    //       prop2 : item.periodo,
    //       prop3 : item.estado
    //     }
    //     this.modalRefT.component.fromParent = data;
    //     alert(valor);
    //   }
    // })
  }

  openValidatePubPeriodo(item : any){
    this.modalRefP = this.modalService.open(VentanaTokenComponent,{
      modalClass : 'modal-lg',
    })
    let data = {
      prop1 : 'PublicarPeriodo',
      prop2 : item.periodo,
      prop3 : item.estado
    }
    this.modalRefP.component.fromParent = data;
  }

  descargarExcelSupervisorPeriodo(item : any){
    const now = Date.now();
    const myFormattedDate = this.pipe.transform(now, 'short');
    this.siscointServive.getObtenerLiquididadorSupervisorExcel(item.cedula_supervisor, item.periodo).subscribe(valor => {
      
      valor.forEach(function(val : any, index){
        if(val.asesor_cumple === 1){
          delete val.asesor_cumple
          val["cumple"] = "SI"
          
        }else if(val.asesor_cumple === 0){
          delete val.asesor_cumple
          val["cumple"] = "NO"
          
        }
        let number_cumpl = "";
        number_cumpl = val.cumplimiento_asesor.toString();
        val.cumplimiento_asesor = number_cumpl.concat(" % ");

      })

      let binaryWS = XLSX.utils.json_to_sheet(valor); 
      var wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, binaryWS, 'liquidar comision') 
      XLSX.writeFile(wb, 'liquidador '+item.nombre_supervisor+' '+item.periodo+' '+myFormattedDate+'.xlsx');
    })
  }

  openModal(){
   
    this.modalRef = this.modalService.open(VentanaDetalleLiquidadorComponent);
  }

  openModalDetalleLiquidador(item : any){
    console.log("El esquema es : "+item.codigo_valor)
    console.log("El periodo es : "+item.periodo)
    this.modalRefD = this.modalService.open(VentanaDetalleEsquemaComponent,{
      modalClass : 'modal-lg',
    })
    let data = {
      prop1 : item.codigo_valor,
      prop2 : item.periodo
    }
    console.log("la data es : "+data.prop1)
    this.modalRefD.component.fromParent = data;
  }

  selectedTipoImporte(a : any){
    //console.log("El value es : "+a.target.value)
  }

  descargarArchivo(){
    //aqui escojo el nombre del archivo
    const data_arra = this.arrArchivosImportes.find(({id}) => id == this.codigoIdArchivo)
    const now = Date.now();
    const myFormattedDate = this.pipe.transform(now, 'short');
    this.siscointServive.descargarArchivosLiq(this.codigoIdArchivo).subscribe(valor => {
      saveAs(valor,data_arra?.nombre_archivo+'_'+myFormattedDate+'.xlsx')
    })
  }

  CambiarAsesorValido(e: any , id: number)
  {
    this.siscointServive.getObtenerLiquidadorComisionAsesor(id).subscribe(valor => {
      this.arrLiqComisionAsesor = valor as liq_comision_asesor
      //console.log("El item es : "+this.arrLiqComisionAsesor.esAsesorValido)
      if(this.arrLiqComisionAsesor.esAsesorValido){
        this.arrLiqComisionAsesor.esAsesorValido = e.target.checked;
        //console.log("El cambio queda asi : "+this.arrLiqComisionAsesor.esAsesorValido)
        const liq_comision_asesor_e : liq_comision_asesor = this.arrLiqComisionAsesor;
        this.siscointServive.updateLiqComisionAsesor(id, liq_comision_asesor_e).subscribe(valor_2 => {

        })
      }
    })
  }

  reprocesarEsquema(tipoEsquema : string, periodo : string, TipoProceso : number){
    const liq_tipo_esquema = this.arrLiqTipoEsquema_aux.find(({nombre_tipo_esquema}) => nombre_tipo_esquema == tipoEsquema);
    let TipoEsquema_2 : number | undefined = liq_tipo_esquema?.codigo_valor;
    this.siscointServive.reprocesarEsquema(TipoEsquema_2!, TipoProceso, periodo).subscribe(valor => {
      alert(valor)
    })
  }

}
