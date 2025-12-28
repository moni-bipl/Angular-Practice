import { Component } from "@angular/core";
@Component({
    selector:'app-profile',
    // template:`<h1>Profile Component</h1>`
      templateUrl: './profile.html',
     // styleUrl: './profile.css'
      styleUrls:['./profile.css','./profilebtn.css']
     // styles:['h1{background-color: white}']

})
export class Profile{
  display=true
  x=10
  hide(){
    this.display=!this.display
  }
  color=1
  handleChange(val:number){
     this.color=val;
  }
  handleInput(event:Event){
      this.color=parseInt((event.target as HTMLInputElement).value)
  }
}