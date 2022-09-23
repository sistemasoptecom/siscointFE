import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SiscointService } from './siscoint.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtModule } from "@auth0/angular-jwt";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './guards/auth.interceptor';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { UsuariosComponent } from './views/usuarios/usuarios.component';
import { SidebarComponent } from './controls/sidebar/sidebar.component';
import { NavbarComponent } from './controls/navbar/navbar.component';
import { ToolbarComponent } from './controls/toolbar/toolbar.component';
import { VentanabusquedaComponent } from './controls/ventanabusqueda/ventanabusqueda.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EmpleadosComponent } from './views/empleados/empleados.component';
import { BusquedarapidaComponent } from './controls/busquedarapida/busquedarapida.component';
import { VentanabusquedarapidaComponent } from './controls/ventanabusquedarapida/ventanabusquedarapida.component';
import { ArticulosComponent } from './views/articulos/articulos.component';
import { InputsBusquedaComponent } from './controls/inputs-busqueda/inputs-busqueda.component';
import { BusqArticuloDevolucionComponent } from './controls/busquedasRapidas/busq-articulo-devolucion/busq-articulo-devolucion.component';
import { BusqArticuloActivoFijoComponent } from './controls/busquedasRapidas/busq-articulo-activo-fijo/busq-articulo-activo-fijo.component';
import { GestionEntradasComponent } from './views/gestion-entradas/gestion-entradas.component';
import { BusqEmpleadoComponent } from './controls/busquedasRapidas/busq-empleado/busq-empleado.component';
import { ReportesEntregasComponent } from './views/reportes-entregas/reportes-entregas.component';

import { GenerarPedidosComponent } from './views/generar-pedidos/generar-pedidos.component';
import { BusqProvedorComponent } from './controls/busquedasRapidas/busq-provedor/busq-provedor.component';
import { BusquedaCentroCostoComponent } from './controls/busquedasRapidas/busqueda-centro-costo/busqueda-centro-costo.component';

export function tokenGetter() { 
  return localStorage.getItem("jwt"); 
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UsuariosComponent,
    SidebarComponent,
    NavbarComponent,
    ToolbarComponent,
    VentanabusquedaComponent,
    EmpleadosComponent,
    BusquedarapidaComponent,
    VentanabusquedarapidaComponent,
    ArticulosComponent,
    InputsBusquedaComponent,
    BusqArticuloDevolucionComponent,
    BusqArticuloActivoFijoComponent,
    GestionEntradasComponent,
    BusqEmpleadoComponent,
    ReportesEntregasComponent,
    GenerarPedidosComponent,
    BusqProvedorComponent,
    BusquedaCentroCostoComponent,
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    ToastrModule.forRoot({
      progressBar: true
    }),
    NgbModule,
    // JwtModule.forRoot({
    //   config: {
    //     tokenGetter: tokenGetter,
    //     allowedDomains: ["localhost:5001"],
    //     disallowedRoutes: []
    //   }
    // })
  ],
  providers: [SiscointService, 
              AuthGuard, 
              {provide : RECAPTCHA_SETTINGS, useValue : {siteKey : environment.recaptcha.siteKey} as RecaptchaSettings},
              {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor,multi: true} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
