import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from './login/login';
import { Profile } from './profile/profile';

@Component({
  selector: 'app-root',
  imports: [Login,Profile],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-basic');//signal() is a reactive state container.  [A variable that Angular automatically tracks and updates the UI whenever its value changes.]
  name="Moni Chaurasiya"  // these are properties of class 
  hello(){
    let a= 1;  // we can define variable inside function but not directly inside class 
  }
  a=1
  b=2
  c="2"
 names:String="Moni"
 data:string|number=8
  handleClickEvent(){
     alert("Function called");
     this.otherFunction() // this refer to this class 
     console.log(this.name);
     console.log(this.data);
  }
  otherFunction(){
    console.log("otherFunction");
  }
}
