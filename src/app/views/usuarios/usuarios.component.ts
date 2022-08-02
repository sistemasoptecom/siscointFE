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
  // private onCompare(_left: KeyValue<any, any>, _right : KeyValue<any, any>):number{
  //   return -1;
  // }
  //public disabledCampos = this.siscointService.getCampos();
  public disabled : boolean = true;
  dataviews : any[] = [];
   //dataviews : ViewsModels[] = [{id: 0, module_name: '', module: '', icon:'', url: '', visible: '', routeurl:'', fechaCreacion: null}]
   //public arr : Array<ViewsModels> = [];
  //public dataViews = new Array<ViewsModels>();
  
  constructor(private router : Router, private siscointService : SiscointService) { }

  ngOnInit(): void {
    this.getMenuViews();
    //console.log(this.disabled);
    this.siscointService.disabled.subscribe(valor => {
      this.disabled = valor;
    })
  }

  getMenuViews(){
    this.siscointService.getViews().subscribe((res : ViewsModels[]) => {
      console.log(res);
      this.dataviews = res;
    });
  }

}
