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
