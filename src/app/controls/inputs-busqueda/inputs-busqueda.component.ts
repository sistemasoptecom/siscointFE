import { Component, Input, OnInit,ViewChild } from '@angular/core';

@Component({
  selector: 'app-inputs-busqueda',
  templateUrl: './inputs-busqueda.component.html',
  styleUrls: ['./inputs-busqueda.component.css']
})
export class InputsBusquedaComponent implements OnInit {
  @Input() value1 : string = "";
  @Input() value2 : string = "";

  value_1 : string = "";
  value_2 : string = "";
  
  constructor() { }

  ngOnInit(): void {
  }

}
