import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SiscointService } from 'src/app/siscoint.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userDetails : string = "";
  usuario : string = "";
  Ocultar : boolean = false;
  btnVisualizar : boolean = true;
  btnOcultar : boolean = false;
  constructor(private router : Router, private siscointService : SiscointService) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(){
    this.siscointService.getCurrentUser().subscribe(data => 
      { const dat = JSON.parse(data);
        localStorage.setItem('usuario', dat.username);
        this.userDetails = dat.username; 
        //console.log(this.userDetails) 
      })
    
  }
  
  onLogout(){
    localStorage.removeItem('jwt');
    localStorage.removeItem('usuario');
    localStorage.removeItem('dataviews');
    localStorage.removeItem('_grecaptcha');
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
