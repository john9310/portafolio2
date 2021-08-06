import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {


  constructor( private login:LoginService,
               private route:Router){


  }
  canActivate():boolean {

   if (this.login.estaAutenticado()) {
    //this.route.navigateByUrl('administrar');
     return true;
     
   }else{

    this.route.navigateByUrl('login');
    return false;

   }

   
    
    //console.log("imorimiendo estaautenticado",this.login.estaAutenticado());
    
  

 
    
    
  }
  
}
