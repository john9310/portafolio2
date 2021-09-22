import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { ContactoModel } from '../models/contacto.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  //private url="http://ec2-3-16-109-163.us-east-2.compute.amazonaws.com/v1"
  private url="/v1"


  postquery(query:string,message){

    const url = `http://john-api.kevocde.co/v1/${query}`;

    const  headers = new HttpHeaders({
       'Authorization':'Bearer b9abd2d3-9b94-42fd-9906-a281c52dee3f'
     });

     return this.http.post(url, message, {headers});
  }


  constructor( private http:HttpClient) { }

createMessage(message:ContactoModel){

  //return this.http.post(`${this.url}/messages`,message)
  return this.postquery(`messages`,message)
  .pipe(
    map( (respuesta:any)=>{
    message=respuesta.data;
    return respuesta
  }))

}





}
