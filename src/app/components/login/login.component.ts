import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
;
import { LoginModel } from "../../models/login.model";
import { LoginService } from ".././../services/login.service";
import Swal from "sweetalert2"
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

usuario: LoginModel = new LoginModel;
forma:FormGroup;
  

  constructor( private loginService:LoginService,
               private fb:FormBuilder,
               private route:Router ) { 

                this.crearFormulario();
               }

  ngOnInit(  ) {


    //verificando si existe un usuario guardado
    if (localStorage.getItem('username')) {

      //this.usuario.username=localStorage.getItem('username');
      this.forma.get('username').setValue(localStorage.getItem('username'));
      this.forma.get('recordar').setValue(true);

    }
  }


  entrar(){
    this.usuario=this.forma.value;
    console.log("usuario copiado", this.usuario.username);
    

    this.loginService.login(this.usuario)
    .subscribe(respuesta=>{
      console.log("respuesta del login component",respuesta);


      //grabando el username en el localstorage al iniciar sesion
      if (this.forma.get('recordar').value==true) {
        localStorage.setItem('username', this.usuario.username)
      }


      if (respuesta.data.token) {

        this.route.navigateByUrl('administrar');
        
      }

      if( respuesta.error){
        console.log("contraseña incorrecta");
        
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Contraseña o usuario incorrecto',
          footer: 'Ingrese de nuevo con datos correctos'
        })
      }
      
    })
    

  }


  crearFormulario(){

    this.forma = this.fb.group({

      username:[],
      password:[],
      recordar:[false]

    })
  }

}
