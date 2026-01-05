import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  // name = new FormControl("moni");
  name = new FormControl();
  password = new FormControl();

  DisplayValue() {
    console.log(this.name.value);
    console.log(this.password.value)
  }
  setValue() {
    this.name.setValue('moni');
    this.password.setValue('Chaurasiya');
  }


  profileForm = new FormGroup({
    namee: new FormControl('moni', [Validators.required]),
    passwords: new FormControl('', [Validators.required, Validators.minLength(5)]),
    emaill: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
  })
  onSubmit() {
    console.log(this.profileForm.value)
  }
  get names() {
    return (this.profileForm.get('namee'))
  }
  get email() {
    return (this.profileForm.get('emaill'))
  }
  get passwords() {
    return (this.profileForm.get('passwords'))
  }
  setValues() {
    this.profileForm.setValue({
      namee: 'Moni',
      passwords: 'password',
      emaill: 'moni@gmail.com'

    })
  }
  @Input() user: string = '';
}
