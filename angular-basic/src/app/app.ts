import { Component, signal,inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from './login/login';
import { Profile } from './profile/profile';
import { Template } from './template/template';
import { Form } from './form/form';
import {provideHttpClient,HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http'
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { Errorhandling } from './errorhandling/errorhandling';
import { Injectable } from '@angular/core';
import { LoggingInterceptor } from './logging-interceptor';
import { headersInterceptor } from './headers-interceptor';

@Injectable({providedIn:'root'})
export class CounterService{
  
  value=0;
  inc(){this.value++;}
   
  dec(){this.value--;}

  reset(){this.value=0}
}



@Component({
  selector: 'counter-a',
  standalone: true,
  template: `
    <h4>Counter A</h4>
    <p>Value: {{ counter.value }}</p>
    <button (click)="counter.inc()">+1</button>
    <button (click)="counter.dec()">-1</button>
  `
})
export class CounterA {
  constructor(public counter: CounterService) {}
}

@Component({
  selector: 'counter-b',
  standalone: true,
  template: `
    <h4>Counter B</h4>
    <p>Value: {{ counter.value }}</p>
    <button (click)="counter.inc()">+1</button>
    <button (click)="counter.dec()">-1</button>
  `
})
export class CounterB {
  constructor(public counter: CounterService) {}
}

@Component({
  selector: 'app-root',
  imports: [Login, Profile,Template,Form,CommonModule,Errorhandling,CounterA,CounterB],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  constructor(public counter:CounterService){}
  protected readonly title = signal('angular-basic');//signal() is a reactive state container.  [A variable that Angular automatically tracks and updates the UI whenever its value changes.]
  name = "Moni Chaurasiya"  // these are properties of class 
  hello() {
    let a = 1;  // we can define variable inside function but not directly inside class 
  }
  a = 1
  b = 2
  c = "2"
  names: String = "Moni"
  data: string | number = 8
  handleClickEvent() {
    alert("Function called");
    this.otherFunction() // this refer to this class 
    console.log(this.name);
    console.log(this.data);
  }
  otherFunction() {
    console.log("otherFunction");
  }


  count = 0
  handleIncrement() {
    this.count = this.count + 1
  }
  handleDecrement() {
    this.count--
  }
  handleReset() {
    this.count = 0
  }

  handleCounter(val: string) {
    if (val == 'plus') {
      this.count++
    } else if (val == 'minus') {
      this.count--
    } else {
      this.count = 0
    }
  }
  
  handleEvent(event:any){
    console.log("function called", event.type);
    console.log("function called", (event.target as HTMLElement).classList);
    console.log("function called", (event.target as HTMLElement).className);

  }

  //httpClient
  http=inject(HttpClient);
  users: any[]=[];
  loading=false;
  error='';

  load(){
    this.loading=true;
    this.error='';
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/users').subscribe({
      next:(data:any)=>{this.users=data;this.loading=false;},
      error:(err:any)=>{this.error='failed to load users'; this.loading=false;}

  
    });
    
  }
  result:any=null;
  createPost(){
    this.loading=true;
    this.error='';
    this.result=null;
    this.http.post<any>('https://jsonplaceholder.typicode.com/posts',{
      title:'profile',
      body:'Moni Chaurasiya',
      userId:1
    }).subscribe({
      next:(res)=>{this.result=res;this.loading=false;},
      error:()=>{this.error='failed to create post'; this.loading=false}
    })
  }
/*
What is an HTTP Interceptor?
· HTTP Interceptors are a concept in web development and server-side programming, typically associated with web frameworks and libraries.

· These interceptors allow developers to intercept and handle HTTP requests and responses globally within an application.
  
HTTP Interceptors in Angular are classes that implement the HttpInterceptor interface.

· They can be used to perform various tasks related to HTTP requests and responses, such as adding headers, handling errors, modifying the request or response data, logging, authentication, etc.

· HttpInterceptor defines a single method called intercept, which takes two parameters: the HttpRequest and the HttpHandler.

read more on -->> https://medium.com/@jaydeepvpatil225/http-interceptors-in-angular-6e9891ae0538
*/
}

bootstrapApplication(App,{providers:[
  provideHttpClient(),
 {
  provide:HTTP_INTERCEPTORS,
  useClass:LoggingInterceptor,
  multi:true
 },
 {
  provide:HTTP_INTERCEPTORS,
  useClass:headersInterceptor,
  multi:true
 }
]});