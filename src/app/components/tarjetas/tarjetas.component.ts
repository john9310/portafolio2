
//TARJETAS PORTAFOLIO
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AdministrarComponent } from "../administrar/administrar.component";
@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css']
})
export class TarjetasComponent implements OnInit {


  @Input()items;
  @Input() index:number;
  @Input()verOpciones:boolean;

  @Output () ocultarHabilidades: EventEmitter<boolean> = new EventEmitter();
  @Output () eliminarHabilidad: EventEmitter<number> = new EventEmitter();

hideHabilidades(){
  this.ocultarHabilidades.emit(false);
}

borraHabilidad(id){

  console.log("habilidad a borrar",id);
  this.eliminarHabilidad.emit(id)
  


}
  

  constructor() { 
    this.ocultarHabilidades=new EventEmitter();
    this.eliminarHabilidad= new EventEmitter();
  }

  ngOnInit() {

    
  }




}
