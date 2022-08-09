import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SiscointService } from 'src/app/siscoint.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VentanabusquedaComponent } from '../ventanabusqueda/ventanabusqueda.component';

@Component({
  selector: 'app-busquedarapida',
  templateUrl: './busquedarapida.component.html',
  styleUrls: ['./busquedarapida.component.css']
})
export class BusquedarapidaComponent implements OnInit {
  required_name : string = "";
  constructor(private siscointService : SiscointService, private modalService : NgbModal, private router:Router) { }

  ngOnInit(): void {
  }

  openModal(){
    this.modalService.open(VentanabusquedaComponent)
    this.siscointService.enabledModal.emit(true);
    
    
  }

}
