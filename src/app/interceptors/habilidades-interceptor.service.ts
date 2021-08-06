import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class HabilidadesInterceptorService implements HttpInterceptor {

  constructor( private router:Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token: string = localStorage.getItem('token');
    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${ token }`
        }
      });
    }

    return next.handle(request).pipe(
      catchError( (err:HttpErrorResponse)=>{
        if ( err.status===401 ) {

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El token es incorrecto o expiró',
            footer: 'Debe iniciar sesión'
          });



          this.router.navigateByUrl('/login');
        }



        if ( err.error.message==="La contraseña es incorrecta") {

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Contraseña incorrecta',
          });
        }

        if ( err.error.message==="No existe ningún usuario con este nombre de usuario o email") {

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No existe ningún usuario con este nombre de usuario o email',
          });
        }



        

        return throwError( err );
        
      } )
    )



    
  }
}
