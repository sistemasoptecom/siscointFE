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
  {path:'pedidosDiferidos', component : GenerarPedidosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
