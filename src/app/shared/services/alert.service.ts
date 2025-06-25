import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn:'root'
})

export class AlertService {
  constructor(
    private toastr:ToastrService,
  ){}

  showAddSuccess(message="Insert successfully!" ,title= "Success"):void{
    this.toastr.success(message,title);
  }
  
}
