import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SiscointService } from 'src/app/siscoint.service';
import { centroCosto } from 'src/app/_inteface/centroCosto.model';
import { empleado } from 'src/app/_inteface/empleado.model';
import { empresaModel } from 'src/app/_inteface/empresas.model';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  public disabled : boolean = true;
  public disabled2 : boolean = true;
  empleado : empleado | undefined;
  cedula : string = "";
  pNombre : string = "";
  sNombre : string = "";
  pApellido : string = "";
  sApellido : string = "";
  area : string = "";
  empEmpleado : number = 0;
  empresas : empresaModel[] = [];
  cCostos : string = "";
  cargo : string = "";
  permisoE : boolean = false;
  idCentroCosto : number = 0;
  EsGuardar : boolean = false;
  EsFormularioValido : boolean = false;
  
  // EmpleadoForm = new FormGroup({
  //   cedula: new FormControl(''),
  //   pNombre: new FormControl(''),
  //   sNombre: new FormControl(''),
  //   pApellido: new FormControl(''),
  //   sApellido: new FormControl(''),
  //   empEmpleado: new FormControl(''),
  //   cCostos: new FormControl(''),
  //   cargo: new FormControl(''),
  //   permisoE: new FormControl('')
  // });
  constructor(private router : Router, private siscointService : SiscointService, private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.siscointService.disabled.subscribe(valor => {
      this.disabled = valor;
    })
    this.getEmpresas();
    this.valueCentroCosto();
    this.validateAddEmpleado();
  }

  validateAddEmpleado(){
    this.siscointService.esGuardarFormEmpleado.subscribe(valor => {
      this.EsGuardar = valor;
      if(this.EsGuardar){
        this.EsGuardarEmpleado();
      }
    })
  }

  EsGuardarEmpleado(){
    if(this.cedula != "" &&
      this.pNombre != "" &&
      this.pApellido != "" &&
      this.sApellido != "" &&
      this.empEmpleado > 0 &&
      this.cCostos != "" &&
      this.cargo != "")
      {
        //alert("Se prepara para Guardar empleado")
        this.agregarEmpleado();
      }
  }
  agregarEmpleado(){
    const empleado : empleado = { 
                      cedula_emp:this.cedula,
                      nombre : this.pNombre,
                      snombre : this.sNombre,
                      ppellido : this.pApellido,
                      spellido : this.sApellido,
                      area     : this.area,
                      cargo : this.cargo,
                      estado : 1,
                      permiso : this.permisoE ? 1 : 0,
                      ccosto : parseInt(this.cCostos),
                      empresa : +this.empEmpleado}
    this.empleado = empleado;
    this.siscointService.addEmpleados(this.empleado).subscribe(valor => {
      this.empleado = undefined;
      console.log(valor);
      if(valor == 1){
        this.limpiarCampos();
        alert("Empleado Creado de forma satisfactoria!")
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
  
  limpiarCampos(){
    this.cedula = "";
    this.pNombre = "";
    this.sNombre = "";
    this.pApellido = "";
    this.sApellido = "";
    this.empEmpleado = 0;
    this.cCostos = "";
    this.area = "";
    this.permisoE = false;
    this.siscointService.showValor1BusquedaRapida.emit("");
    this.siscointService.showValor2BusquedaRapida.emit("");
  }

  getCentroCostos(id:number){
    const area_cCosto : centroCosto = {id : id, ccosto : 0, area: '', area_funcional: ''}
    this.siscointService.getAreaCentroCosto(area_cCosto).subscribe((res : any) => {
      //console.log("area_costos : ",res);
      //console.log(res[0].ccosto);
      this.setValuesAreaCCosto(res);
      
    })
  }

  setValuesAreaCCosto(res: any){
    this.cCostos = res[0].ccosto;
    this.area = res[0].area;
    this.siscointService.showValor1BusquedaRapida.emit(res[0].ccosto);
    this.siscointService.showValor2BusquedaRapida.emit(res[0].area);
  }
  getEmpresas(){
    this.siscointService.getEmpresas().subscribe((res : empresaModel[]) => {
      this.empresas = res;
    })
  }




}
