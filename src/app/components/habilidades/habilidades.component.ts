import { Component, OnInit } from '@angular/core';
import { HabilidadesService } from "../../services/habilidades.service";
import { HabilidadesModel } from "../../models/habilidades.model";
import Swal from "sweetalert2";


@Component({
  selector: 'app-habilidades',
  templateUrl: '././habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {

  
  habilidades:HabilidadesModel[]=[];
  verOpciones:boolean=false;


 

// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field



 // habilidad = new HabilidadesModel();


 

  constructor( private habilidadesService:HabilidadesService ) { }



  ngOnInit() {
    this.mostrarHabilidades();

  }

  mostrarHabilidades(){


    Swal.fire({
      title: 'Espere',
      text: 'Cargando Habilidades',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();
    return this.habilidadesService.getHabilidades()
    .subscribe(respuesta=>{

      this.habilidades=respuesta;
      console.log("imprimiendo habilidades",this.habilidades);

      Swal.close();
      


    });
    
  }















  

}
