import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InputComponent } from '../../shared/components/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule,InputComponent,ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  frm!:FormGroup;

    constructor(
        private fb:FormBuilder,
        private router:Router
    ){}

    ngOnInit(): void {
        this.frm = this.fb.group({
            username:['', [Validators.required]],
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
            this.router.navigate(['/home'])
            console.log("login success");
        }
    }

  onBackHome(){
    this.router.navigate(['/home'])
  }
}
