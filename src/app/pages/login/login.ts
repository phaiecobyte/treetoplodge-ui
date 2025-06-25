import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InputComponent } from '../../shared/components/input';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../helper/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule,InputComponent,ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  frm!:FormGroup;

    constructor(
        private fb:FormBuilder,
        private router:Router,
        private authService:AuthService
    ){}

    ngOnInit(): void {
        this.frm = this.fb.group({
            phoneNumber:['', [Validators.required]],
            password:['', [Validators.required]]
        });
    }

    isFieldInvalid(field:string):boolean{
        const control = this.frm.get(field);
        return control ? (control.invalid && control.touched) :false;
    }

    onSubmit(){
        if(this.frm.invalid){
            this.frm.markAllAsTouched();
            return;
        }else{
            this.authService.login(this.frm.value).subscribe((res:any)=>{
              this.authService.saveToken(res);
              this.router.navigate(['/admin/dashboard'])
              console.log("login success");
            })
        }
    }

  onBackHome(){
    this.router.navigate(['/home'])
  }
}
