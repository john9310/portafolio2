import { Component, Input, OnInit } from '@angular/core';
import { AdministradorService } from "../../services/administrador.service";
import { HabilidadesModel } from "../../models/habilidades.model";
import { HabilidadesService } from "../../services/habilidades.service";
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrar',
  templateUrl: './administrar.component.html',
  styleUrls: ['./administrar.component.css'],
})


export class AdministrarComponent implements OnInit {

  habilidades:HabilidadesModel[]=[];
  muestraHabilidades:boolean=false;
  verOpciones:boolean=true;
  //@Input()mostrarHabilidades;

accion:boolean=true;

  //anchoPantalla: MediaQueryList = window.matchMedia('(max-width: 768px)');

  mostrarBarra(valor:boolean){

    if (this.accion===valor) {
      document.getElementById('sidebar').classList.add('ocultarNav');
      document.getElementById('sidebar').classList.remove('mostrarNav')

      document.getElementById('content').classList.add('ampliarcontent')
      document.getElementById('content').classList.remove('reducircontent')
      



      this.accion=false;
      console.log(this.accion);
      
      
    }

    else{

      document.getElementById('sidebar').classList.add('mostrarNav');
      document.getElementById('sidebar').classList.remove('ocultarNav');

      document.getElementById('content').classList.remove('ampliarcontent')
      document.getElementById('content').classList.add('reducircontent')
      this.accion=true;
      console.log(this.accion);
      
    }

    

    
    //let variable:Boolean=true;

    //console.log("clickeando");

   // document.getElementById("sidebar").className='prueba';
  // document.getElementById("sidebar").style.animation
  
  

  

  }

  



  

  constructor( private administradorService:AdministradorService,
               private habilidadesService:HabilidadesService,
               private login:LoginService,
               private route:Router) { 

               
                

               // console.log("mostrar habilidades es =", this.mostrarHabilidades);
                
               }

  ngOnInit( ){
    



  }

  verHabilidades(){

    Swal.fire({
      title: 'Espere',
      text: 'Cargando Habilidades',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();


this.muestraHabilidades=true;

this.habilidadesService.getHabilidades()
.subscribe(respuesta=>{

  this.habilidades=respuesta;


  Swal.close();
  

});

  }

  eliminarHabilidad(idHabilidad){


    Swal.fire({
      title: 'Espere',
      text: 'Eliminando Habilidad',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();


    

    this.habilidadesService.deleteHabilidad(idHabilidad)
    .subscribe( respuesta=>{
      console.log(respuesta);


      if (respuesta) {

        Swal.fire(
          'Acción Correcta',
          'La habilidad ha sido eliminada',
          'success'
        );
        
      }



      this.verHabilidades();
      
    });

   


  }


verAcerca(){
  this.muestraHabilidades=false;
}

verPrincipal(){
  this.muestraHabilidades=false;
}

verEditar(valor){
  this.muestraHabilidades=valor;
}
verContacto(){
  this.muestraHabilidades=false;
}


verCrear(){
  this.muestraHabilidades=false; 

}


salir(){

  this.login.logout();

this.route.navigateByUrl('/login');
}


}
