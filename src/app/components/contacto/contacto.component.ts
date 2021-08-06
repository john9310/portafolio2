import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { ContactoModel } from "../../models/contacto.model";
import { ContactoService } from "../../services/contacto.service";
import Swal from 'sweetalert2';




@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  mensaje:ContactoModel = new ContactoModel;

  forma:FormGroup;
  textoNombre;
  tamañoNombre;
  textoApellido;
  tamañoApellido;
  textoCorreo;
  tamañoCorreo;
  tamañoMensaje;
  textoMensaje;

  constructor( private fb:FormBuilder,
               private contactoService:ContactoService) {
    
    this.crearFormulario();
    
  
  }

  ngOnInit( ) {
    
  }



  
  /////////Validaciones nombre///////////////
  get nombreTocado(){
    if (this.tamañoNombre<=0) {
      return this.forma.get('name').touched;
    }
  }

  get nombreNoValido(){
    this.textoNombre=this.forma.get('name').value;
   
    //console.log( this.textoNombre.length);
    this.tamañoNombre=this.textoNombre.length;
    //console.log(this.tamañoNombre=this.textoNombre.length);
    
    
    if (this.tamañoNombre>0) {
      return this.forma.get('name').invalid;
    }
   }
 




 ///////Validaciones apellido//////
  get apellidoTocado(){

    if (this.tamañoApellido<=0) {
      return this.forma.get('lastname').touched;
    }
  }

  get apellidoNoValido(){
    this.textoApellido=this.forma.get('lastname').value;
   
    //console.log( this.textoNombre.length);
    this.tamañoApellido=this.textoApellido.length;
    
    
    
    if (this.tamañoApellido>0) {
      return this.forma.get('lastname').invalid;
    }
   }









   ///////Validaciones correo//////
   get correoTocado(){

    if (this.tamañoCorreo<=0) {
      return this.forma.get('email').touched;
    }
  }

  get correoNoValido(){
    this.textoCorreo=this.forma.get('email').value;
   
    //console.log( this.textoNombre.length);
    this.tamañoCorreo=this.textoCorreo.length;
    
    
    
    if (this.tamañoCorreo>0) {
      return this.forma.get('email').invalid;
    }
   }

    ///////Validaciones mensaje//////
  get mensajeTocado(){


    this.textoMensaje=this.forma.get('content').value;
   
  
    this.tamañoMensaje=this.textoMensaje.length;

    if (this.tamañoMensaje<=0) {
      return this.forma.get('content').touched;
    }
  }


  crearFormulario(){
    this.forma = this.fb.group({
      name  : ['',   [Validators.required, Validators.pattern('[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$'), Validators.minLength(3)]  ],
      lastname  : ['',   [Validators.required, Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$'), Validators.minLength(3)]],
      email  : ['',   [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'), Validators.minLength(3)]],
      content  : ['',   [Validators.required,  Validators.minLength(3)]],
     
    })
  }


  guardar(){

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


    Swal.fire({
      title: 'Espere',
      text: 'Enviando Mensaje',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();



    this.contactoService.createMessage(this.forma.value)
    .subscribe( respuesta=>{

      ///console.log(respuesta);
      this.mensaje=respuesta;

      console.log("mensaje corregido",this.mensaje);

      Swal.fire({
        title: this.mensaje.name,
        text: 'El mensaje se ha enviado correctamente',
        icon: 'success'
  
      });
      
    })



    this.forma.reset({
      name:'',
      lastname:'',
      content:'',
      email:''
    });



    
  }


  




}
