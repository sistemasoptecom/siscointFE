import { Component,Pipe } from '@angular/core';
import { DatePipe } from '@angular/common';
import { liq_tec_conf_puntaje } from 'src/app/_inteface/liq_tec_conf_puntaje.model';
import { SiscointService } from 'src/app/siscoint.service';
import { LiqConfigComponent } from '../../liq_comisiones/liq-config/liq-config.component';
import { tec_liq_config_semana_comision } from 'src/app/_inteface/tec_liq_config_semana_comision.model';
import { tec_liq_periodo_comision } from 'src/app/_inteface/tec_liq_periodo_comision.model';
import { tec_liq_config_semana_comision_detalle } from 'src/app/_inteface/tec_liq_config_semana_comision_detalle.,model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { VentanaAddTecSemanaComponent } from 'src/app/controls/ventana-add-tec-semana/ventana-add-tec-semana.component';
import { tec_liq_ciudad_semana } from 'src/app/_inteface/tec_liq_ciudad_semana.model';
import { VentanaDetalleImporteTecnicosComponent } from 'src/app/controls/ventana-detalle-importe-tecnicos/ventana-detalle-importe-tecnicos.component';
import { FunctionExpr } from '@angular/compiler';

@Component({
  selector: 'app-config-periodos',
  templateUrl: './config-periodos.component.html',
  styleUrls: ['./config-periodos.component.css']
})
export class ConfigPeriodosComponent {
  modalRef : MdbModalRef<VentanaAddTecSemanaComponent> | null = null;
  modalRefT : MdbModalRef<VentanaDetalleImporteTecnicosComponent> | null = null;
  public anio : string = "";
  public meses : string[] =["","Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
  public arrDias : string[] = [];
  dias : string = "";
  userUsuario : string = "";
  indexSemana : number = 0;
  nombreUsuario : string = "";
  valueMes : string = "";
  arrPeriodoSemanal : tec_liq_config_semana_comision[] = [];
  arrPeriodoComision : tec_liq_periodo_comision[] = [];
  arrPeriodoComisionII : tec_liq_periodo_comision[] = [];
  arrListPeriodoSemanal : tec_liq_config_semana_comision[] = [];
  arrListPeriodoSemanal_aux : tec_liq_config_semana_comision[] = [];
  arrListPeriosoSemanaII : tec_liq_config_semana_comision[] = [];
  arrListDiasSemana : tec_liq_config_semana_comision_detalle [] = [];
  arrListCiudadPeriodo : tec_liq_ciudad_semana [] = [];
  arrListCiudadPeriodo_aux : any = [];
  arrListDiasSemana_aux : any[] = [];
  periodoMes : string = "";
  fecha1 : Date = new Date();
  fecha2 : Date = new Date();
  fechaF : string = "";
  puntos : number = 0;
  topePuntos : number = 0;
  sumaPuntosTbl : number = 0;
  hayFechaEnTbl : boolean = false;
  Index : any;
  hideme : any = [];
  hideme2 : any = [];
  hideme3 : any = [];
  pipe = new DatePipe('en-US')
  periodo_comision : string = "";
  cod_semana_comision : number = 0;
  cod_ciudad : string = "";
  fileImporteTec : any;
  arrImporteTec : any = [];
  arrCodCiudadUser : any = [];
  constructor(private siscointService : SiscointService, private modalService : MdbModalService){}

  ngOnInit():void
  {
    this.nombreUsuario = JSON.parse(JSON.stringify(localStorage.getItem('nombreCompleto'))) || '';
    this.userUsuario =  JSON.parse(JSON.stringify(localStorage.getItem('usuario'))) || '';
    this.getCiudadUsuario(this.userUsuario)
    this.listarPeriodosComision();
    
  }

  getCiudadUsuario(usuario : string)
  {
    this.siscointService.setUsuarioCiudad(usuario).subscribe(valor => {
      this.arrCodCiudadUser = valor;
      // valor.forEach(function(x){
      //   console.log("la ciudad es : "+x.cod_ciudad)
      // })
    })
  }

  listarPeriodosComision()
  {
    this.arrCodCiudadUser.forEach(function(x:any){
      console.log("la ciudad es : "+x.cod_ciudad)
    })
    this.siscointService.getlistarPeriodosComisionTec().subscribe(val => {
      var obj = JSON.stringify(val);
      var res = JSON.parse(obj);
      
      this.arrPeriodoComision = res.periodo;
      this.arrPeriodoComisionII = res.periodo;
      this.arrListPeriodoSemanal = res.semana;
      this.arrListPeriosoSemanaII = res.semana;
      this.arrListDiasSemana = res.dias;
      
      //se filtra 
      // let dataFilter : any[] = this.arrListPeriosoSemanaII.filter((x) => x.cod_ciudad == "BAQ")
      // console.log("la ciuda filtrada es : "+dataFilter)
     
    })
   
  }

  showSubTable1(index : any, item : any)
  {
    
    this.arrListCiudadPeriodo = [];
   
    this.siscointService.listarPeriodoCiudad(item.periodo,this.userUsuario).subscribe(valor => {
        this.arrListCiudadPeriodo = valor;
    })
    
    this.hideme[index] = !this.hideme[index];
    this.Index = index;
  }

  showSubTable2(index : any, item : any)
  {
    this.arrListPeriodoSemanal_aux = [];
    this.arrListPeriodoSemanal.forEach(x => {
      if(x.cod_ciudad == item.ciudad && x.periodo == item.periodo)
      {
        const tec_liq_config_semana_comision_e : tec_liq_config_semana_comision = {
          numero_semana : x.numero_semana,
          cod_ciudad : x.cod_ciudad,
          mm_comision : x.mm_comision,
          aaaa_comision : x.aaaa_comision,
          periodo : x.periodo,
          puntaje_semana : x.puntaje_semana,
          usuario : x.usuario,
          dias : x.dias
        }
        this.arrListPeriodoSemanal_aux.push(tec_liq_config_semana_comision_e);
      }
    })
    this.arrListPeriodoSemanal_aux.sort((a,b) => a.numero_semana - b.numero_semana);
    
    this.hideme2[index] = !this.hideme2[index];
    this.Index = index;
  }

  showSubTable3(index : any, item : any)
  {
    this.arrListDiasSemana_aux = [];
    //se capturan las variables
    this.periodo_comision = item.periodo;
    this.cod_semana_comision = item.numero_semana;
    this.cod_ciudad = item.cod_ciudad;

    //alert("El periodo es : "+this.periodo_comision+" "+this.cod_semana_comision+" "+this.cod_ciudad)
    this.arrListDiasSemana.forEach((x) =>{
      if(x.periodo_comision == item.periodo 
         && x.cod_semana_comision == item.numero_semana
         && x.cod_ciudad == item.cod_ciudad){
          
          let date = this.pipe.transform(x.dia_comision,"yyyy-MM-dd")
          this.arrListDiasSemana_aux.push(date);
          
         }
    })

    this.hideme3[index] = !this.hideme3[index];
    this.Index = index;
  }


  onFileSeletedTec(e : any)
  {
    this.fileImporteTec = e.target.files[0];
  }

  enviarImportTec(item :any)
  {
    //aqui se envia el data
    if(this.fileImporteTec.type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    {
      this.siscointService.ConvertirExcelToJson(this.fileImporteTec).then(valor => {
        this.arrImporteTec = valor;
        if(this.arrImporteTec.length > 0)
        {
          this.setEnviarImporteDiaTecnico(this.arrImporteTec,
            this.periodo_comision,
            this.cod_ciudad,
            this.cod_semana_comision,
            item,
            this.userUsuario);
        }else{
          alert("EL ARCHIVO ESTA VACIO");
        }
        
      })
    }else{
      alert("EL ARCHIVO NO ES UN EXCEL")
    }
  }

  setEnviarImporteDiaTecnico(base : any[], 
                             periodo : string, 
                             cod_ciudad : string, 
                             semana_comision : number, 
                             dia_comision : Date, 
                             usuario: string)
  {
    this.siscointService.setEnviarImporteDiaTecnico(base,periodo,cod_ciudad,semana_comision,dia_comision,usuario).subscribe(valor => {
      console.log(valor);
      alert(valor);
    })
  }
  openVentanaAdd()
  {
    this.modalRef = this.modalService.open(VentanaAddTecSemanaComponent,{
      modalClass : 'modal-xl'
    })
  }

  openVentanaDetalle(item : any)
  {
    this.modalRefT = this.modalService.open(VentanaDetalleImporteTecnicosComponent,{
      modalClass : 'modal-xl'
    })
    let parametroVentana : string = "DETALLE IMPORTE TECNICOS;DETALLE_IMPORTE_TECNICO";
    let data = {
      prop1 : parametroVentana,
      prop2 : this.periodo_comision,
      prop3 : this.cod_ciudad,
      prop4 : this.cod_semana_comision,
      prop5 : item
    }
    this.modalRefT.component.fromParent = data;
  }




  
}
