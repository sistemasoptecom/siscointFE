import { Component, OnInit } from '@angular/core';
import { listar_liq_tbl_pap } from 'src/app/_inteface/listar_liq_tbl_pap.model';
import { SiscointService } from 'src/app/siscoint.service';
import { liq_tipo_esquema } from 'src/app/_inteface/liq_tipo_esquema.model';

import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-liq-config',
  templateUrl: './liq-config.component.html',
  styleUrls: ['./liq-config.component.css'],
 
})
export class LiqConfigComponent implements OnInit {
  disabledInput : boolean = false;
  showEditable: boolean = false;
  editRowId: any;
  arrTblLiqPap : listar_liq_tbl_pap[] = [];
  isButtonVisibleEdit : boolean = true;
  isButtonVisibleSave : boolean = false;
  isButtonVisibleCancel : boolean = false;
  valor_numer : number | undefined;
  p: number = 1;
  tabIndex = 0 ;
  selected = new FormControl(0);
  arrLiqTipoEsquema : liq_tipo_esquema[] = [];
  codigoLiqTipoEaquema : number = 0;
  tituloLiquidador : string = "";
  constructor(private siscointService : SiscointService) { }

  ngOnInit(): void {
    //this.listarTablaPap();
    this.listarTipoEsquema();
  }

  listarTablaPap(){
    this.siscointService.getObtenerTablaPap().subscribe(valor => {
      //console.log("El array es : "+valor);
      this.arrTblLiqPap = valor;
    })
  }
  validarRow(val : number){
    this.editRowId = val;
    this.isButtonVisibleEdit = false;
    this.isButtonVisibleSave = true;
    this.isButtonVisibleCancel = true;
  }

  guardarRow(val: number){
    this.editRowId = null
    this.isButtonVisibleEdit = true;
    this.isButtonVisibleSave = false;
    this.isButtonVisibleCancel = false;
    
   //const id_row = val;
    const value_obj_tbl_pap = this.arrTblLiqPap.find((ojb) => {
      return ojb.id == val;
    })
    this.valor_numer = value_obj_tbl_pap?.valor
    this.siscointService.actualizarTblPap(val, this.valor_numer!).subscribe(valor => {
      console.log("El retorno es : "+valor)
      if(valor > 0){
        this.listarTablaPap();
      }
    })
  }

  seleccionarTipoLiquidador(e : any){
    //alert(e.target.value)
    let value = e.target.value;
    switch(value){
      case "1":
        this.siscointService.getListarTipoLiquidador(value).subscribe(valor => {
          //console.log(valor)
          this.arrTblLiqPap = valor;
          this.tituloLiquidador = "PAP";
        })
        break;
      case "2":
        this.siscointService.getListarTipoLiquidador(value).subscribe(valor => {
          //console.log(valor)
          this.arrTblLiqPap = valor;
          this.tituloLiquidador = "PYMES";
        })
        break; 
      case "3":
        break;

    }
    
  }

  cancelarItem(val : number){
    this.editRowId = null
    this.isButtonVisibleEdit = true;
    this.isButtonVisibleSave = false;
    this.isButtonVisibleCancel = false;
  }

  changeTab(event: { index: number; }){
    console.log(event.index)
    this.tabIndex = event.index;
  }

  listarTipoEsquema(){
    this.siscointService.getLiqTipoEsquema().subscribe(valor => {
      this.arrLiqTipoEsquema = valor;
    })
  }


}
