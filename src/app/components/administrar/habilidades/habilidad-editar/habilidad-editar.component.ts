import { Component, OnInit, Output } from '@angular/core';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document'
import {FormArray, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { HabilidadesService } from "../../../../services/habilidades.service";
import { ActivatedRoute, Router } from '@angular/router';
import { HabilidadesModel } from 'src/app/models/habilidades.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-habilidad-editar',
  templateUrl: './habilidad-editar.component.html',
  styleUrls: ['./habilidad-editar.component.css']
})
export class HabilidadEditarComponent implements OnInit {

  idHabilidad;
  habilidad:HabilidadesModel;
  imagen; 
  imagenes:any[]=[];



  metodo:string;
  contenido:string;


  public Editor = DecoupledEditor;

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
  console.log("imprimir");
  
  console.log(" imprimiendo ckeditor",this.model.editorData);
}



  constructor( private fb:FormBuilder,
               private habilidadesService:HabilidadesService,
               private route: ActivatedRoute,
               private router:Router) { 

                this.idHabilidad = this.route.snapshot.paramMap.get("id");

      this.mostrarHabilidad(this.idHabilidad);
    this.crearFormulario('');
    
  }

  ngOnInit() {

    console.log("on init");

  }

  mostrarHabilidad(idskill){


    Swal.fire({
      title: 'Espere',
      text: 'Cargando Datos',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading()
    
    this.habilidadesService.getHabilidad(idskill)
    .subscribe( respuesta=>{
      this.habilidad=respuesta;
      this.imagen=this.habilidad.image;
      this.crearFormulario(this.habilidad);

      Swal.close();
  
      
    })

  }



  forma:FormGroup;

  crearFormulario(habilidad){

    this.forma= this.fb.group({
      title:[habilidad.title,[Validators.required, Validators.pattern('[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$'), Validators.minLength(3)]],
      content:[habilidad.content],
      metodo:["PUT"]
      
    })
  }


  guardar(){

  
/*
    if (this.forma.invalid) {

      return Object.values(this.forma.controls).forEach(
        control=>{//console.log(control);

          if (control instanceof FormGroup) {
            Object.values(control.controls).forEach(  control=>{ control.markAllAsTouched()})
            
          }else{
            control.markAsTouched();
          }
        }
      )
      
    }
*/



Swal.fire({
  title: 'Espere',
  text: 'Actualizando información',
  icon: 'info',
  allowOutsideClick: false
});
Swal.showLoading();


//Enviar informacion al servidor 

    console.log("guardando");
    
    var formularioDatos = new FormData();

    this.imagenes.forEach( archivo=>{
      console.log("imprimiendo archivo", archivo);

      formularioDatos.append('image',archivo)
      
      
    });

    formularioDatos.append('title', this.forma.get('title').value);
    formularioDatos.append('content', this.forma.get('content').value);
    formularioDatos.append('_method', this.forma.get('metodo').value);

  

    console.log("imprimiendo formdata");
    
    console.log("metodo", formularioDatos.get('_method') );
    console.log("contenido", formularioDatos.get('content') );
    console.log("imagen", formularioDatos.get('image') );



   

    console.log("formulario datos despues", formularioDatos);
    

    this.habilidadesService.updateHabilidad(formularioDatos, this.idHabilidad)
      .subscribe( respuesta=>{
    console.log(respuesta)


    if (respuesta) {
      Swal.fire(
        'Acción Correcta',
        'La información ha sido actualizada',
        'success'
      );

      
      
    }




 
});




    console.log("actualizando",this.forma.value);

this.router.navigate(['/administrar/habilidades']);

//this.router.navigateByUrl('administrar/habilidades')


  }

  subirImagen(event){

    const imagenCapturada= event.target.files[0];

    this.imagenes.push(imagenCapturada);

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
  
      reader.onload = (event: ProgressEvent) => {
        this.imagen = (<FileReader>event.target).result;
      }
  
      reader.readAsDataURL(event.target.files[0]);
    }

  }


}
