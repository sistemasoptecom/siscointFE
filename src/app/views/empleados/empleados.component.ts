import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SiscointService } from 'src/app/siscoint.service';
import { empresaModel } from 'src/app/_inteface/empresas.model';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  public disabled : boolean = true;
  cedula : string = "";
  pNombre : string = "";
  sNombre : string = "";
  pApellido : string = "";
  sApellido : string = "";
  empEmpleado : number = 0;
  empresas : empresaModel[] = [];
  cCostos : string = "";
  cargo : string = "";
  permisoE : boolean = false;
  constructor(private router : Router, private siscointService : SiscointService) { }

  ngOnInit(): void {
    this.siscointService.disabled.subscribe(valor => {
      this.disabled = valor;
    })
    this.getEmpresas();
  }

  getEmpresas(){
    this.siscointService.getEmpresas().subscribe((res : empresaModel[]) => {
      this.empresas = res;
    })
  }



}
