import { Component, Input } from '@angular/core';
import { SiscointService } from 'src/app/siscoint.service';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { tec_liq_config_semana_comision } from 'src/app/_inteface/tec_liq_config_semana_comision.model';
import { tec_liq_config_bono_puntaje } from 'src/app/_inteface/confBonos.models';
import { tec_liq_conf_penalizacion } from 'src/app/_inteface/tec_liq_conf_penalizacion.model';
@Component({
  selector: 'app-ventana-config-liq-tec',
  templateUrl: './ventana-config-liq-tec.component.html',
  styleUrls: ['./ventana-config-liq-tec.component.css']
})
export class VentanaConfigLiqTecComponent {
  @Input() fromParent:any;
  userUsuario : string = "";
  nombreUsuario : string = "";
  arrPeriodoSemanal : tec_liq_config_semana_comision[] = [];
  arrListCiudad : any[] = [];
  cod_ciudad : string = "";
  puntos : string = "";
  valor : number = 0;
  esVentanaPuntaje : boolean = false;
  esVentanaPenaliza : boolean = false;
  esVentanaValores : Boolean = false;
  porcentaje_infancia : string = "";
  porcentaje_afectacion : string = "";
  arrayItems : any = [];
  file_items : any;
  
  constructor(private modalRef : MdbModalRef<VentanaConfigLiqTecComponent>, 
              private siscointService : SiscointService){}
  ngOnInit()
  {

    this.nombreUsuario = JSON.parse(JSON.stringify(localStorage.getItem('nombreCompleto'))) || '';
    this.userUsuario =  JSON.parse(JSON.stringify(localStorage.getItem('usuario'))) || '';
    this.listarCiudades(this.userUsuario);
    //console.log("El parametro es : "+this.fromParent.prop1)
    this.validateTipoVentana(this.fromParent.prop1)
  }

  validateTipoVentana(validate : string){
    switch(validate)
    {
      case "PUNTAJE":
        this.esVentanaPuntaje = true;
        this.esVentanaPenaliza = false;
        this.esVentanaValores = false;
        break;
      case "PENALIZACION":
        this.esVentanaPuntaje = false;
        this.esVentanaPenaliza = true;
        this.esVentanaValores = false;
        break;
      case "VALORES":
        this.esVentanaPuntaje = false;
        this.esVentanaPenaliza = false;
        this.esVentanaValores = true;
        break;
    }
  }

  listarCiudades(usuario : string){
    this.siscointService.getListarCiudades(usuario).subscribe(val => {
      this.arrListCiudad = val;
    })
  }

  enviarConfiguracionBono()
  {
    let data : string[] = this.puntos.split(" ");
    this.puntos = data[0]+";"+data[1];
    const formConfig : tec_liq_config_bono_puntaje = {
      cod_ciudad : this.cod_ciudad,
      rango_puntaje : this.puntos,
      valor : this.valor,
      usuario : this.userUsuario
    }
    this.siscointService.enviarConfigPuntos(formConfig).subscribe(valor => {
      alert(valor);
    })
  }

  enviarConfiguaracionPenalizacion()
  {
    const data : tec_liq_conf_penalizacion = {
      porcentaje_infancia : this.porcentaje_infancia,
      porcentaje_afectacion : this.porcentaje_afectacion,
      cod_ciudad : this.cod_ciudad,
      usuario : this.userUsuario
    }
    this.siscointService.setEnviarConfPenalizacion(data).subscribe(valor => {
      console.log("Data es : "+valor);
    })
  }

  onSelectedItems(e : any)
  {
    this.file_items = e.target.files[0];
  }
  subirExcelItems()
  {
    if(this.file_items.type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    {
      this.siscointService.ConvertirExcelToJson(this.file_items).then(valor => {
        this.arrayItems = valor;
        this.enviarArchivoItems(this.arrayItems,this.userUsuario);
      })
    }
    else
    {
      alert("ARCHIVO INVALIDO")
    }
  }

  enviarArchivoItems(data : any[], usuario : string)
  {
    this.siscointService.setEnviarItemsValores(data, usuario).subscribe(valor => {
      alert(valor);
    })
  }

  close() : void 
  {
    const closeMessage = 'Modal closed';
    this.modalRef.close(closeMessage);
  }
}
