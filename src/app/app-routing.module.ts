import { AuthGuard } from './guards/auth.guard';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UsuariosComponent } from './views/usuarios/usuarios.component';
import { EmpleadosComponent } from './views/empleados/empleados.component';
import { ArticulosComponent } from './views/articulos/articulos.component';
import { GestionEntradasComponent } from './views/gestion-entradas/gestion-entradas.component';
import { ReportesEntregasComponent } from './views/reportes-entregas/reportes-entregas.component';
import { GenerarPedidosComponent } from './views/generar-pedidos/generar-pedidos.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { BancoAgrarioComponent } from './views/banco-agrario/banco-agrario.component';
import { LiqConfigComponent } from './views/liq_comisiones/liq-config/liq-config.component';
import { ImporteCartaMetaComponent } from './views/liq_comisiones/importe-carta-meta/importe-carta-meta.component';
import { ReportesComponent } from './views/reportes/reportes.component';
import { ConsultasComisionesComponent } from './views/liq_comisiones/consultas-comisiones/consultas-comisiones.component';
import { HistoricoPeriodosComponent } from './views/liq_comisiones/historico-periodos/historico-periodos.component';
import { ImportePlanitllaComponent } from './views/importe-planitlla/importe-planitlla.component';
import { ConfigPeriodosComponent } from './views/liq_tecnicas/config-periodos/config-periodos.component';
import { ConfPuntajeComponent } from './views/liq_tecnicas/conf-puntaje/conf-puntaje.component';

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'login', component : LoginComponent},
  {path:'cambiarContrasena', component : ResetPasswordComponent},
  {path:'home', component : HomeComponent},
  {path:'usuarios', component: UsuariosComponent},
  {path:'empleados', component: EmpleadosComponent},
  {path:'articulos', component : ArticulosComponent},
  {path:'gestionar/activos', component : GestionEntradasComponent},
  {path:'gestionar/devolutivos', component : GestionEntradasComponent},
  {path:'reportes/activos', component : ReportesEntregasComponent},
  {path:'reportes/devolutivos', component : ReportesEntregasComponent},
  {path:'pedidos', component: GenerarPedidosComponent},
  {path:'pedidosAF', component : GenerarPedidosComponent},
  {path:'pedidosDiferidos', component : GenerarPedidosComponent},
  {path:'excelbancoagrario', component : BancoAgrarioComponent},
  {path:'liquidadorConfig', component : LiqConfigComponent},
  {path:'importeCartaMeta', component : ImporteCartaMetaComponent},
  {path:'reportes', component : ReportesComponent},
  {path:'ComisionesConsultas', component : ConsultasComisionesComponent},
  {path:'HistoricoComisiones', component: HistoricoPeriodosComponent},
  {path:'ImporteEmpleados', component:ImportePlanitllaComponent},
  {path:'ConfiguracionPeriodosPuntos', component :ConfigPeriodosComponent},
  {path:'ConfiguracionPuntaje', component: ConfPuntajeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
