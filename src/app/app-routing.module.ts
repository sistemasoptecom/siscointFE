import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UsuariosComponent } from './views/usuarios/usuarios.component';
import { EmpleadosComponent } from './views/empleados/empleados.component';
import { ArticulosComponent } from './views/articulos/articulos.component';
import { GestionEntradasComponent } from './views/gestion-entradas/gestion-entradas.component';

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'login', component : LoginComponent},
  {path:'home', component : HomeComponent},
  {path:'usuarios', component: UsuariosComponent},
  {path:'empleados', component: EmpleadosComponent},
  {path:'articulos', component : ArticulosComponent},
  {path:'gestionar/activos', component : GestionEntradasComponent},
  {path:'gestionar/devolutivos', component : GestionEntradasComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
