import { Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';
import { Router } from '@angular/router';
import { SiscointService } from 'src/app/siscoint.service';
import { ViewsModels } from 'src/app/_inteface/views.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  
  public disabled : boolean = true;
  dataviews : any[] = [];
  public idusuario : number = 0;
  
  
  constructor(private router : Router, private siscointService : SiscointService) { }

  ngOnInit(): void {
    this.getMenuViews();
    
    this.siscointService.disabled.subscribe(valor => {
      this.disabled = valor;
    });
    this.siscointService.showsUserValues.subscribe(valor => {
      this.idusuario = valor;
      console.log("El id del usuario es : ", this.idusuario)
    })
  }

  getMenuViews(){
    this.siscointService.getViews().subscribe((res : ViewsModels[]) => {
      console.log(res);
      this.dataviews = res;
    });
  }

}
