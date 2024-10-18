import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { tmp_data_empleado } from 'src/app/_inteface/tmp_data_empleado.model';
import { SiscointService } from 'src/app/siscoint.service';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-importe-planitlla',
  templateUrl: './importe-planitlla.component.html',
  styleUrls: ['./importe-planitlla.component.css']
})
export class ImportePlanitllaComponent {
  archivoExcel : string = "";
  file_archivo : any;
  userUsuario : string = "";
  nombreUsuario : string = "";
  arrayJsonExcel : any = [];
  arrDataTmpEmpleados : tmp_data_empleado[] = [];
  constructor(private router : Router, private siscointService : SiscointService){}
  ngOnInit() : void {
    this.nombreUsuario = JSON.parse(JSON.stringify(localStorage.getItem("nombreCompleto"))) || '';
    this.userUsuario = JSON.parse(JSON.stringify(localStorage.getItem('usuario'))) || '';
  }

  onFileSelected_archivo(e : any){
    this.file_archivo = e.target.files[0];
    console.log("el archivo es : "+this.file_archivo)
  }

  enviaDataExcel(){
   
      this.siscointService.ConvertirExcelToJson(this.file_archivo).then(valor => {
        this.arrayJsonExcel = valor;
        this.arrayJsonExcel.forEach((dat : any) => {
          //const aux : tmp_data_empleado = 
          const tmp_data_empleado_e = {} as tmp_data_empleado;
          //console.log(dat)
          if(typeof dat.cedula != 'undefined'){
            tmp_data_empleado_e.cedula = dat.cedula;
          }else{
            tmp_data_empleado_e.cedula = "n/a";
          }
          if(typeof dat.sedeprinicipal != 'undefined'){
            tmp_data_empleado_e.sedeprinicipal = dat.sedeprinicipal
          }else{
            tmp_data_empleado_e.sedeprinicipal = "n/a";
          }
          if(typeof dat.nombrecompleto != 'undefined'){
            tmp_data_empleado_e.nombrecompleto = dat.nombrecompleto;
          }else{
            tmp_data_empleado_e.nombrecompleto = "n/a";
          }
          if(typeof dat.codigocargo != 'undefined'){
            tmp_data_empleado_e.codigocargo = dat.codigocargo;
          }else{
            tmp_data_empleado_e.codigocargo = "n/a";
          }
          if(typeof dat.cargo != 'undefined'){
            tmp_data_empleado_e.cargo = dat.cargo;
          }else{
            tmp_data_empleado_e.cargo = "n/a";
          }
          if(typeof dat.contrato != 'undefined'){
            tmp_data_empleado_e.contrato = dat.contrato;
          }else{
            tmp_data_empleado_e.contrato = "n/a";
          }
          if(typeof dat.centrodecostos != 'undefined'){
            tmp_data_empleado_e.centrodecostos = dat.centrodecostos;
          }else{
            tmp_data_empleado_e.centrodecostos = "n/a";
          }
          if(typeof dat.nombrececo != 'undefined'){
            tmp_data_empleado_e.nombrececo = dat.nombrececo;
          }else{
            tmp_data_empleado_e.nombrececo = "n/a";
          }
          if(typeof dat.area != 'undefined'){
            tmp_data_empleado_e.area = dat.area;
          }else{
            tmp_data_empleado_e.area = "n/a";
          }
          if(typeof dat.subarea != 'undefined'){
            tmp_data_empleado_e.subarea = dat.subarea;
          }else{
            tmp_data_empleado_e.subarea = "n/a";
          }
          if(typeof dat.cupo != 'undefined'){
            tmp_data_empleado_e.cupo = dat.cupo;
          }else{
            tmp_data_empleado_e.cupo = "n/a";
          }
          if(typeof dat.empresacontratante != 'undefined'){
            tmp_data_empleado_e.empresacontratante = dat.empresacontratante;
          }else{
            tmp_data_empleado_e.empresacontratante = "n/a";
          }
          if(typeof dat.tipodecontratolaboral != 'undefined'){
            tmp_data_empleado_e.tipodecontratolaboral = dat.tipodecontratolaboral;
          }else{
            tmp_data_empleado_e.tipodecontratolaboral = "n/a";
          }
          if(typeof dat.ciudadprestacionservicios != 'undefined'){
            tmp_data_empleado_e.ciudadprestacionservicios = dat.ciudadprestacionservicios;
          }else{
            tmp_data_empleado_e.ciudadprestacionservicios = "n/a";
          }
          if(typeof dat.rangosalarial != 'undefined'){
            tmp_data_empleado_e.rangosalarial = dat.rangosalarial;
          }else{
            tmp_data_empleado_e.rangosalarial = "n/a";
          }
          if(typeof dat.salario != 'undefined'){
            tmp_data_empleado_e.salario = dat.salario;
          }else{
            tmp_data_empleado_e.salario = "n/a";
          }
          if(typeof dat.fechadeingreso != 'undefined'){
            tmp_data_empleado_e.fechadeingreso =  new Date((dat.fechadeingreso -(25567 + 2)) * 86400 * 1000)    //dat.salario;
          }else{
            tmp_data_empleado_e.fechadeingreso = new Date('December 31, 1899')
          }
          if(typeof dat.fechaderetiro != 'undefined'){
            tmp_data_empleado_e.fechaderetiro =  new Date((dat.fechaderetiro -(25567 + 2)) * 86400 * 1000)    //dat.salario;
          }else{
            tmp_data_empleado_e.fechaderetiro = new Date('December 31, 1899')
          }
          if(typeof dat.causalderetiro != 'undefined'){
            tmp_data_empleado_e.causalderetiro = dat.causalderetiro;
          }else{
            tmp_data_empleado_e.causalderetiro = "n/a";
          }
          if(typeof dat.observaciones != 'undefined'){
            tmp_data_empleado_e.observaciones = dat.observaciones;
          }else{
            tmp_data_empleado_e.observaciones = "n/a";
          }
          if(typeof dat.plandebeneficios != 'undefined'){
            tmp_data_empleado_e.plandebeneficios = dat.plandebeneficios;
          }else{
            tmp_data_empleado_e.plandebeneficios = "n/a";
          }
          if(typeof dat.fechainicioplandebeneficios != 'undefined'){
            tmp_data_empleado_e.fechainicioplandebeneficios =  new Date((dat.fechainicioplandebeneficios -(25567 + 2)) * 86400 * 1000)    //dat.salario;
          }else{
            tmp_data_empleado_e.fechainicioplandebeneficios = new Date('December 31, 1899')
          }
          if(typeof dat.sintraoptecom != 'undefined'){
            tmp_data_empleado_e.sintraoptecom = dat.sintraoptecom;
          }else{
            tmp_data_empleado_e.sintraoptecom = "n/a";
          }
          if(typeof dat.fechaingresoSOp != 'undefined'){
            tmp_data_empleado_e.fechaingresoSOp =  new Date((dat.fechaingresoSOp -(25567 + 2)) * 86400 * 1000)    //dat.salario;
          }else{
            tmp_data_empleado_e.fechaingresoSOp = new Date('December 31, 1899')
          }
          if(typeof dat.fecharetiroSOp != 'undefined'){
            tmp_data_empleado_e.fecharetiroSOp =  new Date((dat.fecharetiroSOp -(25567 + 2)) * 86400 * 1000)    //dat.salario;
          }else{
            tmp_data_empleado_e.fecharetiroSOp = new Date('December 31, 1899')
          }
          if(typeof dat.sintrainducom != 'undefined'){
            tmp_data_empleado_e.sintrainducom = dat.sintrainducom;
          }else{
            tmp_data_empleado_e.sintrainducom = "n/a";
          }
          if(typeof dat.fechaingresoSintra != 'undefined'){
            tmp_data_empleado_e.fechaingresoSintra =  new Date((dat.fechaingresoSintra -(25567 + 2)) * 86400 * 1000)    //dat.salario;
          }else{
            tmp_data_empleado_e.fechaingresoSintra = new Date('December 31, 1899')
          }
          if(typeof dat.fecharetiroSintra != 'undefined'){
            tmp_data_empleado_e.fecharetiroSintra =  new Date((dat.fecharetiroSintra -(25567 + 2)) * 86400 * 1000)    //dat.salario;
          }else{
            tmp_data_empleado_e.fecharetiroSintra = new Date('December 31, 1899')
          }
          if(typeof dat.sindicatoSNTC != 'undefined'){
            tmp_data_empleado_e.sindicatoSNTC = dat.sindicatoSNTC;
          }else{
            tmp_data_empleado_e.sindicatoSNTC = "n/a";
          }
          if(typeof dat.fechaingresoSNTC != 'undefined'){
            tmp_data_empleado_e.fechaingresoSNTC =  new Date((dat.fechaingresoSNTC -(25567 + 2)) * 86400 * 1000)    //dat.salario;
          }else{
            tmp_data_empleado_e.fechaingresoSNTC = new Date('December 31, 1899')
          }
          if(typeof dat.fecharetiroSNTC != 'undefined'){
            tmp_data_empleado_e.fecharetiroSNTC =  new Date((dat.fecharetiroSNTC -(25567 + 2)) * 86400 * 1000)    //dat.salario;
          }else{
            tmp_data_empleado_e.fecharetiroSNTC = new Date('December 31, 1899')
          }
          if(typeof dat.nivelriesgoarl != 'undefined'){
            tmp_data_empleado_e.nivelriesgoarl = dat.nivelriesgoarl;
          }else{
            tmp_data_empleado_e.nivelriesgoarl = "n/a";
          }
          if(typeof dat.fechanacimiento != 'undefined'){
            tmp_data_empleado_e.fechanacimiento =  new Date((dat.fechanacimiento -(25567 + 2)) * 86400 * 1000)    //dat.salario;
          }else{
            tmp_data_empleado_e.fechanacimiento = new Date('December 31, 1899')
          }
          if(typeof dat.lugarnacimiento != 'undefined'){
            tmp_data_empleado_e.lugarnacimiento = dat.lugarnacimiento;
          }else{
            tmp_data_empleado_e.lugarnacimiento = "n/a";
          }
          if(typeof dat.departamentonacimiento != 'undefined'){
            tmp_data_empleado_e.departamentonacimiento = dat.departamentonacimiento;
          }else{
            tmp_data_empleado_e.departamentonacimiento = "n/a";
          }
          if(typeof dat.lugarexpedicioncedula != 'undefined'){
            tmp_data_empleado_e.lugarexpedicioncedula = dat.lugarexpedicioncedula;
          }else{
            tmp_data_empleado_e.lugarexpedicioncedula = "n/a";
          }
          if(typeof dat.departamentoexpidicioncedula != 'undefined'){
            tmp_data_empleado_e.departamentoexpidicioncedula = dat.departamentoexpidicioncedula;
          }else{
            tmp_data_empleado_e.departamentoexpidicioncedula = "n/a";
          }
          if(typeof dat.sexo != 'undefined'){
            tmp_data_empleado_e.sexo = dat.sexo;
          }else{
            tmp_data_empleado_e.sexo = "n/a";
          }
          if(typeof dat.tipodesangre != 'undefined'){
            tmp_data_empleado_e.tipodesangre = dat.tipodesangre;
          }else{
            tmp_data_empleado_e.tipodesangre = "n/a";
          }
          if(typeof dat.direccionresidencia != 'undefined'){
            tmp_data_empleado_e.direccionresidencia = dat.direccionresidencia;
          }else{
            tmp_data_empleado_e.direccionresidencia = "n/a";
          }
          if(typeof dat.ciudadresidencia != 'undefined'){
            tmp_data_empleado_e.ciudadresidencia = dat.ciudadresidencia;
          }else{
            tmp_data_empleado_e.ciudadresidencia = "n/a";
          }
          if(typeof dat.telefono != 'undefined'){
            tmp_data_empleado_e.telefono = dat.telefono;
          }else{
            tmp_data_empleado_e.telefono = "n/a";
          }
          if(typeof dat.correoelectronico != 'undefined'){
            tmp_data_empleado_e.correoelectronico = dat.correoelectronico;
          }else{
            tmp_data_empleado_e.correoelectronico = "n/a";
          }
          if(typeof dat.correocorporativo != 'undefined'){
            tmp_data_empleado_e.correocorporativo = dat.correocorporativo;
          }else{
            tmp_data_empleado_e.correocorporativo = "n/a";
          }
          if(typeof dat.entidadbancaria != 'undefined'){
            tmp_data_empleado_e.entidadbancaria = dat.entidadbancaria;
          }else{
            tmp_data_empleado_e.entidadbancaria = "n/a";
          }
          if(typeof dat.nocuentabancaria != 'undefined'){
            tmp_data_empleado_e.nocuentabancaria = dat.nocuentabancaria;
          }else{
            tmp_data_empleado_e.nocuentabancaria = "n/a";
          }
          if(typeof dat.eps != 'undefined'){
            tmp_data_empleado_e.eps = dat.eps;
          }else{
            tmp_data_empleado_e.eps = "n/a";
          }
          if(typeof dat.fondopension != 'undefined'){
            tmp_data_empleado_e.fondopension = dat.fondopension;
          }else{
            tmp_data_empleado_e.fondopension = "n/a";
          }
          if(typeof dat.fondocesantias != 'undefined'){
            tmp_data_empleado_e.fondocesantias = dat.fondocesantias;
          }else{
            tmp_data_empleado_e.fondocesantias = "n/a";
          }
          if(typeof dat.estadocivil != 'undefined'){
            tmp_data_empleado_e.estadocivil = dat.estadocivil;
          }else{
            tmp_data_empleado_e.estadocivil = "n/a";
          }
          if(typeof dat.ndehijos != 'undefined'){
            tmp_data_empleado_e.ndehijos = dat.ndehijos;
          }else{
            tmp_data_empleado_e.ndehijos = "n/a";
          }
          if(typeof dat.auxiliorodamiento != 'undefined'){
            tmp_data_empleado_e.auxiliorodamiento = dat.auxiliorodamiento;
          }else{
            tmp_data_empleado_e.auxiliorodamiento = "n/a";
          }
          if(typeof dat.auxiliomovilidad != 'undefined'){
            tmp_data_empleado_e.auxiliomovilidad = dat.auxiliomovilidad;
          }else{
            tmp_data_empleado_e.auxiliomovilidad = "n/a";
          }
          if(typeof dat.auxilioportatil != 'undefined'){
            tmp_data_empleado_e.auxilioportatil = dat.auxilioportatil;
          }else{
            tmp_data_empleado_e.auxilioportatil = "n/a";
          }
          if(typeof dat.auxiliocelular != 'undefined'){
            tmp_data_empleado_e.auxiliocelular = dat.auxiliocelular;
          }else{
            tmp_data_empleado_e.auxiliocelular = "n/a";
          }
          if(typeof dat.auxilioteletrabajo != 'undefined'){
            tmp_data_empleado_e.auxilioteletrabajo = dat.auxilioteletrabajo;
          }else{
            tmp_data_empleado_e.auxilioteletrabajo = "n/a";
          }
          if(typeof dat.modalidateletrabajo != 'undefined'){
            tmp_data_empleado_e.modalidateletrabajo = dat.modalidateletrabajo;
          }else{
            tmp_data_empleado_e.modalidateletrabajo = "n/a";
          }
          if(typeof dat.otrosi != 'undefined'){
            tmp_data_empleado_e.otrosi = dat.otrosi;
          }else{
            tmp_data_empleado_e.otrosi = "n/a";
          }
          if(typeof dat.fechainicioOTROSI != 'undefined'){
            tmp_data_empleado_e.fechainicioOTROSI =  new Date((dat.fechainicioOTROSI -(25567 + 2)) * 86400 * 1000)    //dat.salario;
          }else{
            tmp_data_empleado_e.fechainicioOTROSI = new Date('December 31, 1899')
          }
          if(typeof dat.tipodeempleado != 'undefined'){
            tmp_data_empleado_e.tipodeempleado = dat.tipodeempleado;
          }else{
            tmp_data_empleado_e.tipodeempleado = "n/a";
          }
          if(typeof dat.concatenado != 'undefined'){
            tmp_data_empleado_e.concatenado = dat.concatenado;
          }else{
            tmp_data_empleado_e.concatenado = "n/a";
          }
          if(typeof dat.validadorsalario != 'undefined'){
            tmp_data_empleado_e.validadorsalario = dat.validadorsalario;
          }else{
            tmp_data_empleado_e.validadorsalario = "n/a";
          }
          if(typeof dat.salarioantes != 'undefined'){
            tmp_data_empleado_e.salarioantes = dat.salarioantes;
          }else{
            tmp_data_empleado_e.salarioantes = "n/a";
          }
          if(typeof dat.salariototal != 'undefined'){
            tmp_data_empleado_e.salariototal = dat.salariototal;
          }else{
            tmp_data_empleado_e.salariototal = "n/a";
          }
          console.log(tmp_data_empleado_e)
          this.arrDataTmpEmpleados.push(tmp_data_empleado_e);
        })
        //

         this.siscointService.enviarArchivoExcelEmpleados(this.arrDataTmpEmpleados, this.userUsuario, this.nombreUsuario).subscribe(valor => {
           console.log(valor)
         })
      })
    
  }
}
