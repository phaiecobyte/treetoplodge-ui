import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="form-group mb-3">
      <label *ngIf="label" [for]="id" class="form-label">{{ label }}</label>
      <div class="input-group" [class.is-invalid]="showErr">
        <span *ngIf="prefixIcon" class="input-group-text">
          <i [class]="prefixIcon"></i>
        </span>
        <input
          class="form-control"
          [type]="type"
          [multiple]="mulitple"
          [id]="id"
          [formControl]="inputControl"
          [class.has-validation]="showErr"
          [placeholder]="placeholder"
          [disabled]="disabled"
          (blur)="onTouched()"
        />

        <span *ngIf="suffixIcon" class="input-group-text">
          <i [class]="suffixIcon"></i>
        </span>
      </div>

      <div *ngIf="showErr" class="invalid-feedback">
        {{ errMsg }}
      </div>
      <small *ngIf="helpText && !showErr" class="form-text text-muted">{{
        helpText
      }}</small>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor, OnInit {
  @Input() id: string = 'input-' + Math.random().toString(36).substring(2, 9);
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() prefixIcon: string = '';
  @Input() suffixIcon: string = '';
  @Input() helpText: string = '';
  @Input() errMsg: string = 'This field is required';
  @Input() showErr: boolean = false;
  @Input() disabled: boolean = false;
  @Input() mulitple: boolean = false;
  inputControl = new FormControl('');

  onChange: any = () => {};
  onTouched: any = () => {};

  ngOnInit(): void {
    this.inputControl.valueChanges.subscribe((value) => {
      this.onChange(value);
    });
  }

  writeValue(value: any): void {
    this.inputControl.setValue(value, { emitEvent: false });
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.inputControl.disable();
    } else {
      this.inputControl.enable();
    }
  }
}
