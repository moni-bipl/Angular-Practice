import { HttpInterceptorFn } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,

} from '@angular/common/http' // for handling httprequest and httpresponse
import { Observable,tap } from 'rxjs';  //used for asynchronous operations

@Injectable()

export class LoggingInterceptor implements HttpInterceptor{
  constructor(){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Outgoing HTTP request',req)
      return next.handle(req).pipe(
        tap((event:HttpEvent<any>)=>{
          console.log('Incoming HTTP response',event);
        })
      )
  }
}
/*

· We call next.handle(request) to pass the request to the next interceptor in the chain, or the backend server.

· Then, we use the pipe method along with the tap operator to intercept the incoming response.

· The tap operator allows us to execute a side effect (in this case, log the response) without modifying the response itself.

*/