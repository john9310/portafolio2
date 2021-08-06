import { Component, OnInit } from '@angular/core';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document'
import {FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { HabilidadesService } from '../../../../services/habilidades.service';
import Swal from 'sweetalert2';
import {Router } from '@angular/router';

@Component({
  selector: 'app-habilidad-crear',
  templateUrl: './habilidad-crear.component.html',
  styleUrls: ['./habilidad-crear.component.css']
})
export class HabilidadCrearComponent implements OnInit {

  public Editor = DecoupledEditor;
  imagenes:any[]=[];
  url;

  public onReady( editor ) {
      editor.ui.getEditableElement().parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
      );
  }


  public model =  { 
    editorData :  '' 
} 

  imprimir(  ) {
    console.log(this.model.editorData);
}
  

  constructor( private fb:FormBuilder,
               private habilidadesService:HabilidadesService,
               private router:Router) { 
    this.crearFormulario();
  }

  ngOnInit(): void {

   
    
  }



  forma:FormGroup;


  crearFormulario(){

    this.forma= this.fb.group({
      title:[],
      content:[]
    });

    
  }



  guardar(){
   

    const formularioDatos = new FormData();

    this.imagenes.forEach( archivo=>{
      console.log(archivo);
      formularioDatos.append('image', archivo);
      formularioDatos.append('title', this.forma.get('title').value);
      formularioDatos.append('content', this.forma.get('content').value);
      console.log("formulario datos",formularioDatos.getAll) ;
      
    });

    this.habilidadesService.createHabilidades(formularioDatos)
      .subscribe( respuesta=>{
    console.log(respuesta);
    
if (respuesta) {

  Swal.fire(
    'Acción Correcta',
    'La habilidad ha sido creada',
    'success'
  );
  
}


//this.router.navigate(['/administrar/habilidades']);
  
    


  
}, (err)=>{

  //ejemplo de error al hacer peticion  ( se centralizo todo en el interceptor)
  console.log("error en la peticion");


  

})

    console.log("creando",this.forma.value);


    this.router.navigate(['/administrar/habilidades']);
  }

  /*

  subirImagen(event){
    const imagenCapturada=event.target.files[0];
    this.imagenes.push(imagenCapturada);

  }  */


//metodo que se llama cuando el usuario selecciona un archivo
  subirImagen(event) {
    const imagenCapturada= event.target.files[0];

    this.imagenes.push(imagenCapturada);

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
  
      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result;
      }
  
      reader.readAsDataURL(event.target.files[0]);
    }
   

}

}