import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-btn-trigger',
  imports: [CommonModule],
  template: `
  <!-- Button trigger modal -->
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" [attr.data-bs-target]="target">
    <span class="me-2"><i class={{icon}}></i></span>{{txtBtnOpenModal}}
  </button>
  `,
})
export class BtnTriggerComponent {
  @Input() txtBtnOpenModal = "Open Modal";
  @Input() icon = "";
  @Input() target="";
}
