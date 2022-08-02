import { Component, OnInit } from '@angular/core';
import { SiscointService } from '../siscoint.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  


  constructor(private router : Router, private siscointServive : SiscointService) { }

  ngOnInit(): void {
    //this.getCurrentUser();
  }

  

  
  

}
