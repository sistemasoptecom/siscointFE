import { Component,Input } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { tec_liq_config_semana_comision } from 'src/app/_inteface/tec_liq_config_semana_comision.model';
import { tec_liq_periodo_comision } from 'src/app/_inteface/tec_liq_periodo_comision.model';
import { SiscointService } from 'src/app/siscoint.service';
@Component({
  selector: 'app-ventana-add-tec-semana',
  templateUrl: './ventana-add-tec-semana.component.html',
  styleUrls: ['./ventana-add-tec-semana.component.css']
})
export class VentanaAddTecSemanaComponent {
  
  public anio : string = "";
  public meses : string[] =["","Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
  public arrDias : string[] = [];
  arrPeriodoSemanal : tec_liq_config_semana_comision[] = [];
  arrListCiudad : any[] = [];
  cod_ciudad : string = "";
  dias : string = "";
  userUsuario : string = "";
  indexSemana : number = 0;
  nombreUsuario : string = "";
  valueMes : string = "";
  periodoMes : string = "";
  fecha1 : Date = new Date();
  fecha2 : Date = new Date();
  fechaF : string = "";
  puntos : number = 0;
  topePuntos : number = 0;
  sumaPuntosTbl : number = 0;
  hayFechaEnTbl : boolean = false;
  
  

  constructor(private siscointService: SiscointService, public modalRef : MdbModalRef<VentanaAddTecSemanaComponent>){}

  ngOnInit():void{
    this.nombreUsuario = JSON.parse(JSON.stringify(localStorage.getItem('nombreCompleto'))) || '';
    this.userUsuario =  JSON.parse(JSON.stringify(localStorage.getItem('usuario'))) || '';
    this.getAAAA();
    this.getTopePuntos();
    this.getListarCiudades(this.userUsuario);
  }

  
  getAAAA()
  {
    this.siscointService.getAnio().subscribe(val => {
      this.anio = val;
    })
  }
  getTopePuntos()
  {
    this.siscointService.getTopePuntos().subscribe(val => {
      this.topePuntos = parseInt(val);
      //console.log("El tope puntos es : "+this.topePuntos)
    })
  }
  getListarCiudades(usuario : string)
  {
    this.siscointService.getListarCiudades(usuario).subscribe(val => {
      this.arrListCiudad = val;
    })
  }

  getSeletedMes(e : any)
  {
    let value = e.target.value
    //alert(value);
    switch(value){
      case "Enero":
        this.valueMes = "01";
        break;
      case "Febrero":
        this.valueMes = "02";
        break;
      case "Marzo":
        this.valueMes = "03";
        break;
      case "Abril":
        this.valueMes = "04";
        break;
      case "Mayo":
        this.valueMes = "05";
        break;
      case "Junio":
        this.valueMes = "06";
        break;
      case "Julio":
        this.valueMes = "07";
        break;
      case "Agosto":
        this.valueMes = "08";
        break;
      case "Septiembre":
        this.valueMes = "09";
        break;
      case "Octubre":
        this.valueMes = "10";
        break;
      case "Noviembre":
        this.valueMes = "11";
        break;
      case "Diciembre":
        this.valueMes = "12";
        break;
      default:
        this.valueMes = "";
        break;
    }
  }

  addItemArray()
  {
   //console.log("El codigo de la ciudad es : "+this.cod_ciudad)
   if(this.cod_ciudad != "" && this.valueMes != "")
   {
    alert("Entro")
    if(this.sumaPuntosTbl <= this.topePuntos)
    {
   
      //validamos que no este la misma fecha en el texto
        if(this.arrPeriodoSemanal.length > 0){
          let aruxArrDias_2 : string[] = this.dias.split(';');
          aruxArrDias_2.forEach((x) => {
            //console.log("LOs dias son : "+x);
            let day_text = x;
            this.arrPeriodoSemanal.forEach((y) => {
                //console.log(y);
                let arr_dias_tbl : string[] = y.dias.split(';');
                //console.log(arr_dias_tbl);
                if(day_text !== ""){
                  const result_c = arr_dias_tbl.filter(h => h == day_text);
                
                  if(result_c.length == 1){
                    //console.log("Entro aqui")
                    this.hayFechaEnTbl = true;
                  }
                }
                
            })
          })
          if(!this.hayFechaEnTbl)
          {
            this.llenarArrayDetalle();
          }else{
            alert("UNA DE LAS FECHAS SE ENCUENTRA YA ASIGADA EN UNA DE LAS SEMANAS")
          }
        
        }
        else
        {
          this.llenarArrayDetalle();
        }
      this.puntos = 0;
      this.dias =  "";
       
    }
    else
    {
      alert("LA SUMA DE LOS PUNTOS SUPERA EL TOPE DE LOS "+this.topePuntos)
    }
   }else
   {
    alert("DEBE ESCOGER EL MES O CIUDAD")
   }
    
    //console.log("Fecha Fin "+this.fechaF)
  }

  llenarArrayDetalle()
  {
    this.periodoMes = this.anio+"-"+this.valueMes;
    this.fechaF = this.fecha1+" && "+this.fecha2;
    this.sumaPuntosTbl = this.sumaPuntosTbl + this.puntos;
    this.indexSemana = this.indexSemana + 1;
    const tec_liq_config_semana_comision_e : tec_liq_config_semana_comision = {
    numero_semana : this.indexSemana,
         mm_comision : this.valueMes,
         cod_ciudad : this.cod_ciudad,
         aaaa_comision : this.anio,
         periodo : this.periodoMes,
         puntaje_semana : this.puntos,
         usuario : this.userUsuario,
         dias : this.dias
     }
     this.arrPeriodoSemanal.push(tec_liq_config_semana_comision_e);
  }

  removeItemArray(item : any)
  {
    const index : number = this.arrPeriodoSemanal.findIndex(x => x.numero_semana == item.numero_semana)
    this.arrPeriodoSemanal.splice(index,1);
    this.sumaPuntosTbl = this.sumaPuntosTbl - item.puntaje_semana;
  
  }

  seleccionarDia(e : any)
  {
   //se valida que la fecha en la caja de texto de los dias no se repita
    let aruxArrDias_1 : string[] = this.dias.split(';');
    //console.log(aruxArrDias.length)
    if(aruxArrDias_1.length == 1){
      this.dias += e+";"
    }else{
      const result_d = aruxArrDias_1.filter(x => x == e);
      //console.log("logintud es : "+result_d.length)
      if(result_d.length == 0){
        this.dias += e+";"
      }else{
        alert("LA FECHA SE ENCUENTRA INGRESADA EN LOS DIAS")
      }
    }
  }

  guardar()
  {
    const tect_liq_periodo_comison : tec_liq_periodo_comision = {
      periodo : this.periodoMes,
      espublicado : 0,
      escerrado : 0,
      usuario : this.userUsuario,
      estado : 1
    }
    this.siscointService.enviarPuntajeComisionTecnica(tect_liq_periodo_comison, this.arrPeriodoSemanal,this.userUsuario ).subscribe(valor => {
      var obj = JSON.stringify(valor);
      var res = JSON.parse(obj);
      alert(res.Mensaje);
      
    })
  }

  close():void{
    const closeMessage = 'Modal closed';
    this.modalRef.close(closeMessage);
  }
}
