import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../service/user.service';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  @Input() user: User | null = null;
  @Output() formSubmit = new EventEmitter<User>();
  @Output() cancel = new EventEmitter<void>();
  userForm: FormGroup;
  isSubmitting = false;
  constructor(private fb: FormBuilder) {
    this.userForm = this.createForm();
  }
  ngOnInit() {
    if (this.user) {
      this.userForm.patchValue(this.user);
    }
  }
  createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(120)]],
      city: ['', Validators.required],
    });
  }
  onSubmit() {
    if (this.userForm.valid) {
      this.isSubmitting = true;
      const userData = this.userForm.value;
      if (this.user?.id) {
        userData.id = this.user.id;
      }
      this.formSubmit.emit(userData);
    } else {
      this.markFormGroupTouched(this.userForm);
    }
  }
  onCancel() {
    this.cancel.emit();
  }
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }
  // Getter methods for template
  get name() {
    return this.userForm.get('name');
  }
  get email() {
    return this.userForm.get('email');
  }
  get age() {
    return this.userForm.get('age');
  }
  get city() {
    return this.userForm.get('city');
  }
}
