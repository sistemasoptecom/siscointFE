import { Component, OnInit } from '@angular/core';
//import * as $ from 'jquery'
declare let $ : any

@Component({
  selector: 'app-ventanabusqueda',
  templateUrl: './ventanabusqueda.component.html',
  styleUrls: ['./ventanabusqueda.component.css']
})
export class VentanabusquedaComponent implements OnInit {
  tituloModal : string = "busqueda";
  constructor() { }

  ngOnInit(): void {
   
  }

}
