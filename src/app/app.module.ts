import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AcercaComponent } from './components/acerca/acerca.component';
import { AdministrarComponent } from './components/administrar/administrar.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { HabilidadesComponent } from './components/habilidades/habilidades.component';
import { LoginComponent } from './components/login/login.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { TarjetasComponent } from './components/tarjetas/tarjetas.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';

import {ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import { HabilidadEditarComponent } from './components/administrar/habilidades/habilidad-editar/habilidad-editar.component';


import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { HabilidadCrearComponent } from './components/administrar/habilidades/habilidad-crear/habilidad-crear.component';
import { HabilidadesInterceptorService } from './interceptors/habilidades-interceptor.service';
import { Tarjeta3DComponent } from './components/tarjeta3-d/tarjeta3-d.component';




@NgModule({
  declarations: [
    AppComponent,
    AcercaComponent,
    AdministrarComponent,
    ContactoComponent,
    HabilidadesComponent,
    LoginComponent,
    PrincipalComponent,
    TarjetasComponent,
    NavbarComponent,
    HabilidadEditarComponent,
    HabilidadCrearComponent,
    Tarjeta3DComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,
    CKEditorModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HabilidadesInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
