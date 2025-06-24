import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';


declare var bootstrap:any;

@Component({
  selector: 'app-modal',
  imports: [],
  template: `
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
      @if(icon){}
      {{txtBtnOpenModal}}
    </button>
    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">{{title}}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <ng-content></ng-content>
          </div>
          <div class="modal-footer">
            <button type="button" class={{classBtnClose}} data-bs-dismiss="modal">{{txtBtnClose}}</button>
            <button type="button" class={{classbtnSave}} (click)="onSaveClick()" >{{txtBtnSave}}</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class StaticBackDropModal {
  @Input() txtBtnOpenModal = "Open Modal";
  @Input() icon = "";
  @Input() title = "Modal Title";
  @Input() txtBtnClose = "Close";
  @Input() txtBtnSave = "Save";
  @Input() classBtnClose = "btn btn-secondary";
  @Input() classbtnSave ="btn btn-success";

  @ViewChild('modalElement') modalElementRef!:ElementRef;
  @Output() saveClicked = new EventEmitter<void>();
  
  onSaveClick=()=>this.saveClicked.emit();

  close=()=>{
    const modalEl = this.modalElementRef.nativeElement;
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    modalEl.hide();
  }

}