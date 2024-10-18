import { Component, OnInit } from '@angular/core';
import { listar_liq_tbl_pap } from 'src/app/_inteface/listar_liq_tbl_pap.model';
import { SiscointService } from 'src/app/siscoint.service';
import { liq_tipo_esquema } from 'src/app/_inteface/liq_tipo_esquema.model';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

import {FormControl} from '@angular/forms';
import { VentanaConfigLiqComponent } from 'src/app/controls/ventana-config-liq/ventana-config-liq.component';
@Component({
  selector: 'app-liq-config',
  templateUrl: './liq-config.component.html',
  styleUrls: ['./liq-config.component.css'],
 
})
export class LiqConfigComponent implements OnInit {
  modalRef: MdbModalRef<VentanaConfigLiqComponent> | null = null;
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
  muestraLiqPapPyme : boolean = false;
  muestraLiqCall : boolean = false;
  muestraLiqMovil : boolean = false;
  muestraColumnaMegas : boolean = false;
  muestraColumnaMovil : boolean = false;
  fileImporte : any;
  arrJsonTipoImport : any = [];
  userUsuario : string = "";
  nombreUsuario : string = "";
  constructor(private siscointService : SiscointService, 
              private modalService: MdbModalService) { }

  ngOnInit(): void 
  {
    this.nombreUsuario = JSON.parse(JSON.stringify(localStorage.getItem('nombreCompleto'))) || '';
    this.userUsuario =  JSON.parse(JSON.stringify(localStorage.getItem('usuario'))) || '';
    //this.listarTablaPap();
    this.listarTipoEsquema();
  }

  listarTablaPap()
  {
    this.siscointService.getObtenerTablaPap().subscribe(valor => {
      //console.log("El array es : "+valor);
      this.arrTblLiqPap = valor;
    })
  }
  validarRow(val : number)
  {
    this.editRowId = val;
    this.isButtonVisibleEdit = false;
    this.isButtonVisibleSave = true;
    this.isButtonVisibleCancel = true;
  }

  guardarRow(val: number)
  {
    this.editRowId = null
    this.isButtonVisibleEdit = true;
    this.isButtonVisibleSave = false;
    this.isButtonVisibleCancel = false;
    
   //const id_row = val;
    const value_obj_tbl_pap = this.arrTblLiqPap.find((ojb) => {
      return ojb.id == val;
    })
    this.valor_numer = value_obj_tbl_pap?.valor
    this.siscointService.actualizarTblPap(val, this.valor_numer!,this.tituloLiquidador).subscribe(valor => {
      console.log("El retorno es : "+valor)
      if(valor > 0){
        this.listarTablaPap();
      }
    })
  }

  seleccionarTipoLiquidador(e : any)
  {
    //alert(e.target.value)
    let value = e.target.value;
    switch(value){
      case "1":
        this.siscointService.getListarTipoLiquidador(value).subscribe(valor => {
          //console.log(valor)
          this.arrTblLiqPap = valor;
          this.tituloLiquidador = "PAP";
          this.muestraLiqPapPyme = true;
          this.muestraLiqMovil = true;
          this.muestraColumnaMegas = true;
          this.muestraColumnaMovil = false;

        })
        break;
      case "2":
        this.siscointService.getListarTipoLiquidador(value).subscribe(valor => {
          //console.log(valor)
          this.arrTblLiqPap = valor;
          this.tituloLiquidador = "PYMES";
          this.muestraLiqPapPyme = true;
          this.muestraLiqMovil = true;
          this.muestraColumnaMegas = true;
          this.muestraColumnaMovil = false;
        })
        break; 
      case "3":
        this.siscointService.getListarTipoLiquidadorCall().subscribe(valor => {
          this.arrTblLiqPap = valor;
          this.tituloLiquidador = "CALL OUT";
          this.muestraLiqPapPyme = true;
          this.muestraLiqMovil = true;
          this.muestraColumnaMegas = true;
          this.muestraColumnaMovil = false;
        })
        break;
      case "4":
        this.siscointService.getListarTipoLiquidadoMovil().subscribe(valor => {
          this.arrTblLiqPap = valor;
          this.tituloLiquidador = "MOVIL";
          this.muestraLiqPapPyme = true;
          this.muestraLiqMovil = false;
          this.muestraColumnaMegas = false;
          this.muestraColumnaMovil = true;
        })
        
        
        break;
      case "5":
        this.siscointService.getListarTipoLiquidador(value).subscribe(valor => {
          //console.log(valor)
          this.arrTblLiqPap = valor;
          this.tituloLiquidador = "PAP II";
          this.muestraLiqPapPyme = true;
          this.muestraLiqMovil = true;
          this.muestraColumnaMegas = true;
          this.muestraColumnaMovil = false;
        })
        break;

    }
    
  }

  cancelarItem(val : number)
  {
    this.editRowId = null
    this.isButtonVisibleEdit = true;
    this.isButtonVisibleSave = false;
    this.isButtonVisibleCancel = false;
  }

  changeTab(event: { index: number; })
  {
    console.log(event.index)
    this.tabIndex = event.index;
  }

  listarTipoEsquema()
  {
    this.siscointService.getLiqTipoEsquema(0).subscribe(valor => {
      this.arrLiqTipoEsquema = valor;
    })
  }

  configurarVentanaLiq(tipo : string, tipoOperacion : number, titulo : string)
  {
    this.modalRef = this.modalService.open(VentanaConfigLiqComponent,{
      modalClass: 'modal-xl'
    });
    let data = {
      prop1 : tipo,
      prop2 : tipoOperacion,
      prop3 : titulo
    }
    this.modalRef.component.fromParent = data;
  }

  onFileSelectedImport(e : any)
  {
    this.fileImporte = e.target.files[0];
  
  }

  subirExcelImporte()
  {
    if(this.fileImporte.type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    {
      //console.log("Entro !!")
      this.siscointService.ConvertirExcelToJson(this.fileImporte).then(valor => {
        this.arrJsonTipoImport = valor;
        this.enviarImporteLiquidador();
        //console.log("El array es : "+this.arrJsonTipoImport);
      })
    }
  }

  enviarImporteLiquidador()
  {
     this.siscointService.enviarImporteLiquidador(this.arrJsonTipoImport,this.userUsuario).subscribe(valor => {
      console.log("El return es : "+valor);
      alert(valor);
     })
  }

}
