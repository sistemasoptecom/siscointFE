import { Component, OnInit } from '@angular/core';
import { SiscointService } from 'src/app/siscoint.service';
import { centroCosto } from 'src/app/_inteface/centroCosto.model';
import { tipoArticulo } from 'src/app/_inteface/tipoArticulo.model';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {
  public disabled : boolean = false;
  af : string = "";
  imei : string = "";
  nuevoImei : string = "";
  tipoArticulo : number = 0;
  cod_articulo : string = "";
  descripcion : string = "";
  tipo : number = 0;
  linea : string = "";
  lineaActiva : string = "";
  factura : string = "";
  causacion : Date = new Date;
  valor : number = 0;
  observacion : string = "";
  mostrarEstados : boolean = false;
  estadoValue : number = 0;
  fechaEstado : Date = new Date;

  cCostos : string = "";
  area : string = "";
  idCentroCosto : number = 0;

  tiposArticulos : tipoArticulo[] = [];
  estados : any[] = [];
  constructor(private siscointService : SiscointService) { }

  ngOnInit(): void {
    this.siscointService.disabled.subscribe(valor => {
      this.disabled = valor;
    });
    this.getTipoArticulo();
    this.valueCentroCosto();
  }

  getTipoArticulo(){
    this.siscointService.getTipoArticulo().subscribe((res : tipoArticulo[]) => {
      this.tiposArticulos = res;
    })
  }
  validarImei(e : any){
    //alert("Este metodo se validara el imei : "+ this.imei)
    this.siscointService.validateImei(this.imei).subscribe((res:string) => {
      var obj = JSON.stringify(res);
      var ress = JSON.parse(obj);
      //console.log(ress.Result)
      if(ress.Result == true){
        alert(ress.Mensaje);
      }
    })
  }

  valueCentroCosto(){
    this.siscointService.ShowsCcostosValues.subscribe(valor => {
      this.idCentroCosto = valor;
      if(this.idCentroCosto > 0){
        this.getCentroCostos(this.idCentroCosto);
      } 
    })
  }

  getCentroCostos(id:number){
    const area_cCosto : centroCosto = {id : id, ccosto : 0, area: '', area_funcional: ''}
    this.siscointService.getAreaCentroCosto(area_cCosto).subscribe((res : any) => {
      
      this.setValuesAreaCCosto(res);
      
    })
  }

  setValuesAreaCCosto(res: any){
    this.cCostos = res[0].ccosto;
    this.area = res[0].area;
    this.siscointService.showValor1BusquedaRapida.emit(res[0].ccosto);
    this.siscointService.showValor2BusquedaRapida.emit(res[0].area);
  }

}
