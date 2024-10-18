import { Component,Input } from '@angular/core';
import { SiscointService } from 'src/app/siscoint.service';
import { Router } from '@angular/router';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { liq_comision_asesor } from 'src/app/_inteface/liq_comision_asesor.model';
@Component({
  selector: 'app-ventana-detalle-liquidador',
  templateUrl: './ventana-detalle-liquidador.component.html',
  styleUrls: ['./ventana-detalle-liquidador.component.css']
})
export class VentanaDetalleLiquidadorComponent {
  //public EnabledModal : boolean = false;
  @Input() fromParent:any;
  userUsuario : string = "";
  nombreUsuario : string = "";
  public IdDetalleLiqComision : number = 0;
  public valor : string = "";
  public nombre_asesor : string = "";
  public zona_asesor : string = "";
 
  public por_cumplimiento : number = 0;
  public cant_ftth : number = 0;
  public total_bono : number = 0;
  public IsDisabledTotal : boolean = true;
  public IsDisabledCampos : boolean = true;
  public IsDisabledEditar : boolean = true;
  public totalPlanMovil : number = 0;
  public totalPlanMigracion : number = 0;
  public valor_mega_1 : string = "";
  public valor_mega_2 : string = "";
  public valor_mega_3 : string = "";
  public valor_mega_4 : string = "";
  public valor_mega_5 : string = "";
  public EsUltimaColumna : boolean = false;
  public ContendidoGeneral : boolean = false;
  public ContenidoPap : boolean = false;
  public ContenidoPyme : boolean = false;
  public ContenidoCall : boolean = false;
  //public asesorValido : boolean = true;
  public isChecked : boolean = true;
  arrMegas : any[] = [];
  arrLiqComisionAsesor : any;
  liq_comision_asesor : liq_comision_asesor|undefined
  constructor(private route: Router, private siscointService: SiscointService, public modalRef: MdbModalRef<VentanaDetalleLiquidadorComponent>) { }
  ngOnInit() {
    this.IdDetalleLiqComision = this.fromParent.id;
    this.nombre_asesor = this.fromParent.asesor;
    this.zona_asesor = this.fromParent.zona;
    this.getDetalleLiquidadorAsesor(this.IdDetalleLiqComision);
    this.nombreUsuario = JSON.parse(JSON.stringify(localStorage.getItem('nombreCompleto'))) || '';
    this.userUsuario =  JSON.parse(JSON.stringify(localStorage.getItem('usuario'))) || '';
  }



   close(): void {
     const closeMessage = 'Modal closed';
     this.modalRef.close(closeMessage)
   }

   getDetalleLiquidadorAsesor(id: number){
    this.ContendidoGeneral = true;
    this.siscointService.getObtenerLiquidadorComisionAsesor(id).subscribe(valor => {
      //console.log("la data es : "+valor.EsAsesorValido)
      this.arrLiqComisionAsesor = valor as liq_comision_asesor;
      
      this.siscointService.validarEstadoPerido(this.arrLiqComisionAsesor.periodo).subscribe(value => {
        //console.log("El estado del periodo es : "+value)
        if(value == 1){
          this.IsDisabledEditar = false;
        }
      })
      this.por_cumplimiento = ((this.arrLiqComisionAsesor.numero_cant_megas_1 +
                                this.arrLiqComisionAsesor.numero_cant_megas_2 +
                                this.arrLiqComisionAsesor.numero_cant_megas_3 +
                                this.arrLiqComisionAsesor.numero_cant_megas_4) /
                                this.arrLiqComisionAsesor.meta_asesor)

      this.cant_ftth = (this.arrLiqComisionAsesor.numero_cant_megas_1 +
                        this.arrLiqComisionAsesor.numero_cant_megas_2 +
                        this.arrLiqComisionAsesor.numero_cant_megas_3 +
                        this.arrLiqComisionAsesor.numero_cant_megas_4)

      this.total_bono = (this.arrLiqComisionAsesor.total_valor_mega_1+
                         this.arrLiqComisionAsesor.total_valor_mega_2+
                         this.arrLiqComisionAsesor.total_valor_mega_3+
                         this.arrLiqComisionAsesor.total_valor_mega_4)
        this.siscointService.getListarValoresMega(this.arrLiqComisionAsesor.codigo_tipo_escala).subscribe(valor => {
          this.arrMegas = valor;
          //console.log("el array es : "+this.arrMegas[0].valor_mega);
          if(this.arrLiqComisionAsesor.codigo_tipo_escala == 1){
            this.valor_mega_1 = this.arrMegas[0].valor_mega;
            this.valor_mega_2 = this.arrMegas[1].valor_mega;
            this.valor_mega_3 = this.arrMegas[2].valor_mega;
            this.valor_mega_4 = "> "+this.arrMegas[3].valor_mega;
            this.EsUltimaColumna = false;
            this.ContenidoPap = true;
            this.ContenidoCall = false;
            this.ContenidoPyme = false;
          }else if(this.arrLiqComisionAsesor.codigo_tipo_escala == 2){
            this.valor_mega_1 = this.arrMegas[0].valor_mega;
            this.valor_mega_2 = this.arrMegas[1].valor_mega;
            this.valor_mega_3 = this.arrMegas[2].valor_mega;
            this.valor_mega_4 = this.arrMegas[3].valor_mega;
            this.valor_mega_5 = "> "+this.arrMegas[4].valor_mega;
            this.EsUltimaColumna = true;
            this.ContenidoPap = false;
            this.ContenidoCall = false;
            this.ContenidoPyme = true;
          }else if(this.arrLiqComisionAsesor.codigo_tipo_escala == 3){
            this.valor_mega_1 = this.arrMegas[0].valor_mega;
            this.valor_mega_2 = this.arrMegas[1].valor_mega;
            this.valor_mega_3 = this.arrMegas[2].valor_mega;
            this.valor_mega_4 = this.arrMegas[3].valor_mega;
            //this.valor_mega_5 = "> "+this.arrMegas[6].valor_mega;
            this.EsUltimaColumna = true;
            this.ContenidoPap = false;
            this.ContenidoCall = true;
            this.ContenidoPyme = false;
            
          }
        })
      })
      
   }

   calcularMegas(){
    this.arrLiqComisionAsesor.total_valor_mega_1 = (this.arrLiqComisionAsesor.numero_cant_megas_1 * this.arrLiqComisionAsesor.valor_mega_1);
    this.arrLiqComisionAsesor.total_valor_mega_2 = (this.arrLiqComisionAsesor.numero_cant_megas_2 * this.arrLiqComisionAsesor.valor_mega_2);
    this.arrLiqComisionAsesor.total_valor_mega_3 = (this.arrLiqComisionAsesor.numero_cant_megas_3 * this.arrLiqComisionAsesor.valor_mega_3);
    this.arrLiqComisionAsesor.total_valor_mega_4 = (this.arrLiqComisionAsesor.numero_cant_megas_4 * this.arrLiqComisionAsesor.valor_mega_4);
    this.arrLiqComisionAsesor.sub_total_comision = (this.arrLiqComisionAsesor.total_valor_mega_1 +
                                                    this.arrLiqComisionAsesor.total_valor_mega_2 +
                                                    this.arrLiqComisionAsesor.total_valor_mega_3 +
                                                    this.arrLiqComisionAsesor.total_valor_mega_4 +
                                                    this.arrLiqComisionAsesor.total_valor_duos +
                                                    this.arrLiqComisionAsesor.total_valor_trios +
                                                    this.arrLiqComisionAsesor.total_valor_naked +
                                                    this.arrLiqComisionAsesor.total_plan_movil +
                                                    this.arrLiqComisionAsesor.total_migracion);
      this.arrLiqComisionAsesor.total_comision = this.arrLiqComisionAsesor.sub_total_comision;
  }

  calcularMovil(){
    //this.arrLiqComisionAsesor.
    this.arrLiqComisionAsesor.total_plan_movil = (this.arrLiqComisionAsesor.numero_plan_movil * this.arrLiqComisionAsesor.valor_plan_movil);
    this.arrLiqComisionAsesor.total_migracion = (this.arrLiqComisionAsesor.numero_migracion * this.arrLiqComisionAsesor.valor_migracion);
    this.arrLiqComisionAsesor.sub_total_comision = (this.arrLiqComisionAsesor.total_valor_mega_1 +
                                                    this.arrLiqComisionAsesor.total_valor_mega_2 +
                                                    this.arrLiqComisionAsesor.total_valor_mega_3 +
                                                    this.arrLiqComisionAsesor.total_valor_mega_4 +
                                                    this.arrLiqComisionAsesor.total_valor_duos +
                                                    this.arrLiqComisionAsesor.total_valor_trios +
                                                    this.arrLiqComisionAsesor.total_valor_naked +
                                                    this.arrLiqComisionAsesor.total_plan_movil +
                                                    this.arrLiqComisionAsesor.total_migracion);
     this.arrLiqComisionAsesor.total_comision = this.arrLiqComisionAsesor.sub_total_comision;
  }

  calcularAjustes(){
    this.arrLiqComisionAsesor.total_comision = this.arrLiqComisionAsesor.sub_total_comision;
    let sumTotalComision = (this.arrLiqComisionAsesor.total_comision + this.arrLiqComisionAsesor.ajustes)
    if(sumTotalComision > 0){

      this.arrLiqComisionAsesor.total_comision = this.arrLiqComisionAsesor.total_comision + this.arrLiqComisionAsesor.ajustes
    }else{
      alert("EL AJUSTE ES MAYOR AL TOTAL")
    }
  }

  calcularNuncaPago(){
    this.arrLiqComisionAsesor.total_comision = this.arrLiqComisionAsesor.sub_total_comision;
    let sumTotalComisionNp = (this.arrLiqComisionAsesor.total_comision - this.arrLiqComisionAsesor.total_nunca_pago)
    if(sumTotalComisionNp > 0){
      this.arrLiqComisionAsesor.total_comision = this.arrLiqComisionAsesor.total_comision - this.arrLiqComisionAsesor.total_nunca_pago
    }else{
      alert("EL AJUSTE ES MAYOR AL TOTAL")
    }
  }

  EditarFormLiq(){
    this.IsDisabledCampos = false;
  }
  cancelarFormLiq(){
    this.IsDisabledCampos = true;
  }

  guardarFormLiq(){
    //alert("Guardo Formulario")
    //edita los cambios del liquidador asesor , pymes o call out
    // vuelve hacer el calcualo del cumpliemiento
    // dejar dejar el log de eventos
    this.arrLiqComisionAsesor.usuario = this.userUsuario
    const liq_comision_asesor_e : liq_comision_asesor = this.arrLiqComisionAsesor
    this.siscointService.updateLiqComisionAsesor(this.IdDetalleLiqComision, liq_comision_asesor_e).subscribe(valor => {
      alert(valor);
    })
    //console.log("La identidad actualizada es : "+liq_comision_asesor_e.total_comision+" y la cantidad mega1 es : "+liq_comision_asesor_e.numero_cant_megas_1)
  }


}
