import { Component, OnInit } from '@angular/core';
import { SiscointService } from '../../siscoint.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  userDetails : string = "";
  usuario : string = "";
  Ocultar : boolean = true;
  btnVisualizar : boolean = true;
  btnOcultar : boolean = false;

  constructor(private router : Router, private siscointService : SiscointService) { }

  ngOnInit(): void {
  }

  getCurrentUser(){
    this.siscointService.getCurrentUser().subscribe(data => 
      { const dat = JSON.parse(data);
        this.userDetails = dat.username; 
        //console.log(this.userDetails) 
      })
    //this.usuario = this.userDetails.substring(0, this.userDetails.indexOf(':')); 
  }

  getCodigoUser(codigo : string){
    return codigo;
  }
  
  onLogout(){
    localStorage.removeItem('jwt');
    this.router.navigate(['/']);
  }

  sidebarHidden(){
    this.btnVisualizar = false;
    this.btnOcultar = true;
    this.Ocultar = true;
    
  }
  sidebarShow()
  {
    this.btnOcultar = false;
    this.btnVisualizar = true;
    this.Ocultar = false;
    
  }

}
