import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  // Common validation patterns
  private patterns = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    phone: /^(\+\d{1,3})?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
    name: /^[a-zA-Z'\s-]{2,50}$/,
    zipCode: /^\d{5}(-\d{4})?$/
  };

  // Error messages
  private errorMessages = {
    required: 'This field is required',
    email: 'Please enter a valid email address',
    minlength: (params: any) => `Minimum length is ${params.requiredLength} characters`,
    maxlength: (params: any) => `Maximum length is ${params.requiredLength} characters`,
    pattern: {
      email: 'Please enter a valid email address',
      password: 'Password must contain at least 8 characters, including uppercase, lowercase, number and special character',
      phone: 'Please enter a valid phone number',
      name: 'Please enter a valid name',
      zipCode: 'Please enter a valid ZIP code'
    },
    passwordMismatch: 'Passwords do not match',
    invalidDate: 'Please enter a valid date',
    futureDate: 'Date cannot be in the future',
    pastDate: 'Date cannot be in the past',
    custom: {}
  };

  constructor() { }

  // Check if field is invalid and touched/dirty
  isFieldInvalid(form: FormGroup, fieldName: string): boolean {
    const field = form.get(fieldName);
    return field !== null && field.invalid && (field.dirty || field.touched);
  }

  // Get error message for a specific field
  getErrorMessage(form: FormGroup, fieldName: string): string {
    const field = form.get(fieldName);
    
    if (!field || field.valid || (!field.dirty && !field.touched)) {
      return '';
    }

    const errors = field.errors;
    if (!errors) {
      return '';
    }

    // Return the first error message
    if (errors['required']) {
      return this.errorMessages.required;
    }
    if (errors['email']) {
      return this.errorMessages.email;
    }
    if (errors['minlength']) {
      return this.errorMessages.minlength(errors['minlength']);
    }
    if (errors['maxlength']) {
      return this.errorMessages.maxlength(errors['maxlength']);
    }
    if (errors['pattern']) {
      const patternName = Object.keys(this.patterns).find(
        key => this.patterns[key as keyof typeof this.patterns].toString() === errors['pattern'].requiredPattern
      );
      return patternName ? 
        this.errorMessages.pattern[patternName as keyof typeof this.errorMessages.pattern] : 
        'Invalid format';
    }
    if (errors['passwordMismatch']) {
      return this.errorMessages.passwordMismatch;
    }
    
    // For custom errors
    const errorKey = Object.keys(errors)[0];
    return this.errorMessages.custom[errorKey as keyof typeof this.errorMessages.custom] || 'Invalid value';
  }

  // Custom validators
  emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || this.patterns.email.test(control.value)) {
        return null;
      }
      return { email: true };
    };
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || this.patterns.password.test(control.value)) {
        return null;
      }
      return { pattern: { requiredPattern: this.patterns.password.toString() } };
    };
  }

  phoneValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || this.patterns.phone.test(control.value)) {
        return null;
      }
      return { pattern: { requiredPattern: this.patterns.phone.toString() } };
    };
  }

  nameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || this.patterns.name.test(control.value)) {
        return null;
      }
      return { pattern: { requiredPattern: this.patterns.name.toString() } };
    };
  }

  zipCodeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || this.patterns.zipCode.test(control.value)) {
        return null;
      }
      return { pattern: { requiredPattern: this.patterns.zipCode.toString() } };
    };
  }

  // Password match validator for use in form group
  passwordMatchValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);

      if (!control || !matchingControl || !control.value || !matchingControl.value) {
        return null;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        // If there was a passwordMismatch error, clear it
        const errors = matchingControl.errors;
        if (errors && errors['passwordMismatch']) {
          delete errors['passwordMismatch'];
          matchingControl.setErrors(Object.keys(errors).length ? errors : null);
        }
        return null;
      }
    };
  }

  // Date validators
  dateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      
      const date = new Date(control.value);
      return isNaN(date.getTime()) ? { invalidDate: true } : null;
    };
  }

  futureDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      
      const date = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      return date < today ? { futureDate: true } : null;
    };
  }

  pastDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      
      const date = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      return date > today ? { pastDate: true } : null;
    };
  }

  // Add custom error message
  addCustomErrorMessage(errorKey: string, errorMessage: string): void {
    this.errorMessages.custom = {
      ...this.errorMessages.custom,
      [errorKey]: errorMessage
    };
  }
}