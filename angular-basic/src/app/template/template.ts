import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-template',
  imports: [CommonModule],
  templateUrl: './template.html',
  styleUrl: './template.css',
})
export class Template {
 current = '';
  read(val: string) { this.current = val ?? ''; }

  user:{profile?:{email?:string}} | undefined=undefined;
  toggle(){
    this.user=this.user? undefined: {profile:{email:'a@b.com'}};
  }

  ok=true;
  items=['A','B','C'];
  type:'info' | 'warning' | 'success'='info';
  msg='Hello';


  today=new Date();
  name='Moni Chaurasiya'
  ratio= 0.756;
  amount=100

  wide=true;
  get label(){
    return this.wide?'Table is wide':'Table is narrow';
  }

  toggleWide(){
    this.wide=!this.wide
  }
}

