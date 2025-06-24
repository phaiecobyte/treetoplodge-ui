import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorService } from '../../shared/services/validator.service';
import { InputComponent } from "../../shared/components/input";
import { AuthService } from '../../helper/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
  imports: [InputComponent, ReactiveFormsModule]
})
export class RegisterComponent implements OnInit {
  frm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private validatorService: ValidatorService,
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.frm = this.fb.group({
      username: ['', [Validators.required, this.validatorService.emailValidator()]],
      password: ['', [
        Validators.required, 
        Validators.minLength(3), 
        this.validatorService.passwordValidator()
      ]],
      confirmPassword: ['', [Validators.required]],
      firstName: ['', [Validators.required, this.validatorService.nameValidator()]],
      lastName: ['', [Validators.required, this.validatorService.nameValidator()]],
      phoneNumber: ['', [this.validatorService.phoneValidator()]]
    }, {
      validators: [this.validatorService.passwordMatchValidator('password', 'confirmPassword')]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    return this.validatorService.isFieldInvalid(this.frm, fieldName);
  }
  
  getErrorMessage(fieldName: string): string {
    return this.validatorService.getErrorMessage(this.frm, fieldName);
  }

  onSubmit(): void {
    if (this.frm.valid) {
      // Form submission logic
      console.log('Form submitted:', this.frm.value);
      this.authService.login(this.frm.value).subscribe(
        (res:any)=>{
          
        }
      )
      
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.frm.controls).forEach(key => {
        const control = this.frm.get(key);
        control?.markAsTouched();
      });
    }
  }

  onBackHome(): void {
    this.router.navigate(['/']);
  }
}
