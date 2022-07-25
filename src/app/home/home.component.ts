import { Component, OnInit } from '@angular/core';
import { SiscointService } from '../siscoint.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userDetails : string = "";
  usuario : string = "Usuario";

  constructor(private router : Router, private siscointServive : SiscointService) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(){
    this.siscointServive.getCurrentUser().subscribe(data => { this.userDetails = data; })
  }
  onLogout(){
    localStorage.removeItem('jwt');
    this.router.navigate(['/']);
  }

}
