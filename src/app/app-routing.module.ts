import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HabilidadesComponent } from './components/habilidades/habilidades.component';
import { PrincipalComponent } from "./components/principal/principal.component";
import { AcercaComponent } from "./components/acerca/acerca.component";
import { ContactoComponent } from "./components/contacto/contacto.component";
import { AdministrarComponent } from ".//components/administrar/administrar.component";
import { LoginComponent } from ".//components/login/login.component";
import { ADMINISTRAR_ROUTES } from "./components/administrar/administrar.routes";
import { LoginGuard } from './guards/login.guard';
import { Tarjeta3DComponent } from './components/tarjeta3-d/tarjeta3-d.component';

const APP_ROUTES: Routes = [

  { path: 'principal', component:  PrincipalComponent},
  { path: 'acerca', component: AcercaComponent},
  { path: 'habilidades', component: HabilidadesComponent},
  { path: 'contacto', component: ContactoComponent},
  { path: 'administrar', 
    component: AdministrarComponent,canActivate:[LoginGuard],
    children:ADMINISTRAR_ROUTES
   
},
  { path: 'login', component: LoginComponent},
  { path: '3d', component: Tarjeta3DComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'principal' },
  

];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
