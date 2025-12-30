import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from './login/login';
import { Profile } from './profile/profile';
import { Template } from './template/template';

@Component({
  selector: 'app-root',
  imports: [Login, Profile,Template],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
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
}
