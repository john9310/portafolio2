import { Routes } from '@angular/router';
import { HabilidadEditarComponent } from "./habilidades/habilidad-editar/habilidad-editar.component";
import { HabilidadCrearComponent } from "./habilidades/habilidad-crear/habilidad-crear.component";
import { LoginGuard } from 'src/app/guards/login.guard';

export const ADMINISTRAR_ROUTES: Routes = [
    { path: 'habilidades',
      children:[
          {path:'editar/:id', component: HabilidadEditarComponent,canActivate:[LoginGuard]},
          {path:'crear', component: HabilidadCrearComponent,canActivate:[LoginGuard]}
      ]}
]