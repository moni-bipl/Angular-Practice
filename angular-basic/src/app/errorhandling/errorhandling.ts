import {bootstrapApplication} from '@angular/platform-browser';
import {Component,inject} from '@angular/core'
import { provideHttpClient,HttpClient,withInterceptors,HttpResponse,HttpErrorResponse,HttpRequest,HttpHandlerFn } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {of,throwError} from 'rxjs';

function mockHttp(req:HttpRequest<any>,next:HttpHandlerFn){
  if(req.method==='GET' && req.url.includes('jsonplaceholder.typicode.com/usersx')){
    return throwError(()=>new HttpErrorResponse({
      status:404,statusText:'NOT FOUND',url:req.url
    }))
  }
  if(req.method==='GET' && req.url.includes('jsonplaceholder.typicode.com/users')){
    const body=[
      {id:1,name:'Leanne Grahm', email:'leann@example.com'},

      {id:2,name:'MONI',email:'moni@gmail.com'}
    ];
    return of(new HttpResponse({status:200,body}));
  }
  return next(req);
}
@Component({
  selector: 'app-errorhandling',
  imports: [CommonModule],
  templateUrl: './errorhandling.html',
  styleUrl: './errorhandling.css',
})
export class Errorhandling {
  http=inject(HttpClient);
  loading=false;
  error='';
  data:any[] | null=null;
  lastAction='';
  isArray(value:unknown): value is any[]{return Array.isArray(value as any);}
  fetch(url:string):void{
    this.loading=true;
    this.error='';
    this.data=null;
    this.http.get<any[]>(url).subscribe({
      next:(res)=>{this.data=res;this.loading=false},
      error:(err)=>{
        const status=err?.status ?? 'unknown';
        this.error=`Request failed (status ${status}). Please try again.`;
        this.loading=false;
      }
    })
  }
loadOk(){
  this.lastAction='ok';
  this.fetch('https://jsonplaceholder.typicode.com/users');
}
loadFail(){
  this.lastAction='fail';
  this.fetch('https://jsonplaceholder.typicode.com/usersx')
}
retry(){
  if(this.lastAction==='ok') this.loadOk();
  else if(this.lastAction==='fail') this.loadFail();
}
}
bootstrapApplication(Errorhandling,{providers:[provideHttpClient(withInterceptors([mockHttp]))]})
