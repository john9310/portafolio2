import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { LoginModel } from "../models/login.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  usuario:LoginModel;
  userToken:string;
  

  constructor( private http:HttpClient ) { 
    this.leerToken();
  }





  private url="http://ec2-52-14-157-172.us-east-2.compute.amazonaws.com/v1/"

  login( datos:LoginModel){

  
this.usuario=datos;

    return this.http.post(
      `${this.url}security/login`,this.usuario
      
    ).pipe(
      map( (respuesta:any)=>{
        console.log("respuesta desde el servicio login",respuesta.data.token);

        this.guardarToken(respuesta.data.token);
        return respuesta;
        
        
      })
    );

  }


//metodo para guardar token en el localStorage
private guardarToken(idToken:string){

  this.userToken=idToken;

  //almacenando el token en una llave llamada token
  localStorage.setItem('token', idToken);

  console.log("imprimiendo token desde el guardarToken()", idToken);
  

}


//metodo para leer token del localStorage

leerToken(){
  if (localStorage.getItem('token')) {

    this.userToken=localStorage.getItem('token');
  }else{


    //si no existe token se inicializa con string vacio
    this.userToken=''; 
  }
  return this.userToken;
}


estaAutenticado():boolean{

return this.userToken.length>2;
 

}


logout(){

  localStorage.removeItem('token');
  this.userToken='';
}

}
