import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HabilidadesService {

  constructor( private http: HttpClient) { }

     private URL = `http://ec2-52-14-157-172.us-east-2.compute.amazonaws.com/v1/`;

  
  



  getQuery( query:string){
  
    const url =this.URL+query

    return this.http.get(url);
  }



  postQuery(query:string, formulario){

    
    const url =this.URL+query
 
    return this.http.post(url, formulario);

  }

  deleteQuery(query:string){
   
    const url =this.URL+query
 
    return this.http.delete(url);

  }



  getHabilidades(){

    return this.getQuery( 'skills')
    .pipe(map( (respuesta:any)=>{
      return respuesta.data;
    }
    ))

  }


  getHabilidad(id){

    return this.getQuery( `skills/${id}`)
    .pipe(
      map( (respuesta:any)=>{
        return respuesta.data;
      })
    )

  }



  /*
  createHabilidades(formulario){

  return this.postQuery('skills',formulario)
    .pipe(
      map( respuesta=>{
        return respuesta;
      }));

  }

  */


  createHabilidades(formulario){

    return this.postQuery('skills',formulario)
      .pipe(
        map( respuesta=>{
          return respuesta;
        }),
        catchError (this.manejarError)
        );
  
    }




    //########  MANEJO DEL ERROR DESDE EL SERVICIO SIN USAR LOS INTERCEPTORES
    //centralizar el manejo de errores de la peticion para no llenarla de codigo 
    manejarError( err: HttpErrorResponse){
             //catch error necesita retornar un observable tambien, para solucionarlo se utiliza el throwError
             console.log("Sucedio un error");
             console.warn(err);
             
   
             return throwError('Error personalizado')

    }
///###################################################################






  updateHabilidad(formulario,id){

    return this.postQuery(`skills/${id}`,formulario)
    .pipe(
      map( (respuesta:any)=>{
        return respuesta;
      })
    )

  }

  deleteHabilidad(id){
    return this.deleteQuery(`skills/${id}`)
    .pipe(
      map( (respuesta:any)=>{
        return respuesta;
      })
    )
  }




  /* SERVICIOS CONFIGURADOS PARA SOLUCIONAR ERROR DE CORS

  constructor( private http: HttpClient) { }





  private url=`/v1`;

  getHabilidades(){

    const headers = new HttpHeaders({
      'Authorization':'Bearer b0d8a82-94c8-47fd-8814-624e39c52f2a'
    });

    return this.http.get(`${this.url}/skills`, {headers})
    .pipe(map( (respuesta:any)=>{
      return respuesta.data;
    }
    ))
  }

  getHabilidad(id){

    console.log("imprimiendo desde el get", id);
   

    const headers = new HttpHeaders({
      'Authorization':'Bearer b0d8a82-94c8-47fd-8814-624e39c52f2a'
    });

    return this.http.get(`${this.url}/skills/${id}`, {headers})
    .pipe(
      map( (respuesta:any)=>{
        return respuesta.data;
      })
    )
  

  }



  createHabilidades(formulario){

    const headers = new HttpHeaders({
      'Authorization':'Bearer b0d8a82-94c8-47fd-8814-624e39c52f2a'
    });

    return this.http.post(`${this.url}/skills`,formulario,{headers})
    .pipe(
      map( respuesta=>{
        return respuesta;
      }));

  }

  updateHabilidad(formulario,id){

    console.log("formulario desde el servicio", formulario);
    

    const headers = new HttpHeaders({
      'Authorization':'Bearer b0d8a82-94c8-47fd-8814-624e39c52f2a'
    });
    return this.http.post(`${this.url}/skills/${id}`,formulario, {headers} )
    .pipe(
      map( (respuesta:any)=>{
        return respuesta;
      })
    )


  }


  deleteHabilidad(id){


    const headers = new HttpHeaders({
      'Authorization':'Bearer b0d8a82-94c8-47fd-8814-624e39c52f2a'
    });
    return this.http.delete(`${this.url}/skills/${id}`, {headers} )
    .pipe(
      map( (respuesta:any)=>{
        return respuesta;
      })
    )

    
  }


  */


}


  /* 
  private url ="https://portafolio-d1d55-default-rtdb.firebaseio.com";

  constructor( private http: HttpClient) { }

  getHabilidades(){

    return this.http.get(`${this.url}/habilidades.json`)
       .pipe(
         map( respuesta=> this.crearArreglo(respuesta) )
       );
  }


  // Metodo para convertir la respuesta de firebase en un arreglo porque no es posible leerla con un *ngfor
 private crearArreglo( habilidadesObj:Object ){

    const habilidades: HabilidadesModel[] = [];

  

    //barriendo las llaves de un objeto en javascript
    Object.keys( habilidadesObj ).forEach( key=>{

      //nueva referencia de tipo HabilidadesModel
      const habilidad: HabilidadesModel = habilidadesObj[key];
      habilidad.id = key; // key es el id creado por firebase
      habilidades.push( habilidad )

    } )

    //en caso de que este vacia la base de datos
    if ( habilidadesObj === null){ return []; }
    
    return habilidades;

  
  }



*/