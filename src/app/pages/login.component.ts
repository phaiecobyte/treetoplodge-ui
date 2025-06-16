import { Component, OnInit } from "@angular/core";
import { InputComponent } from "../shared/components/input.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

@Component({
    selector:'app-login',
    standalone:true,
    imports: [InputComponent, ReactiveFormsModule, CommonModule],
    template:`
    <div class="container d-flex align-items-center justify-content-center min-vh-100">
        <div class="row justify-content-center w-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                <div class="card shadow-lg border-0 rounded-4">
                    <div class="card-header bg-primary text-light text-center p-4">
                        <h2 class="mb-0">Tree Top Lodge</h2>
                        <p class="mb-0">Please sign in to continue</p>
                    </div>
                    <div class="card-body p-4">
                        <form [formGroup]="frm" (ngSubmit)="onSubmit()">
                            <app-input
                                formControlName="username"
                                label="Username"
                                placeholder="Enter your username"
                                type="text"
                                prefixIcon="bi bi-person"
                                [showErr]="isFieldInvalid('username')"
                                errMsg="Username is required!"
                            />
                            <app-input
                                formControlName="password"
                                label="Password"
                                placeholder="Enter your password"
                                type="password"
                                prefixIcon="bi bi-lock"
                                [showErr]="isFieldInvalid('password')"
                                errMsg="Password is required!"
                            />
                            <div class="d-grid gap-2 d-md-flex mt-4">
                                <button class="btn btn-primary py-2 flex-grow-1" type="submit">
                                    <i class="bi bi-box-arrow-in-right me-2"></i>Login
                                </button>
                                <button class="btn btn-outline-secondary py-2" type="reset">Cancel</button>
                            </div>
                        </form>
                    </div>
                    <div class="card-footer text-center py-3 bg-light text-muted">
                        <small>Copyright © 2025 Tree Top Lodge</small>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
})

export class LoginComponent implements OnInit{
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
}