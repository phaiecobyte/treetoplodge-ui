import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../../shared/services/page-title.service';
import { AccommodationCard } from "../../shared/components/accommodation-card/accommodation-card";
import { AccommodationService } from '../../services/accommodation.service';
import { StaticBackDropModal } from "../../shared/components/static-backdrop-modal";

@Component({
  selector: 'app-accommodation',
  imports: [AccommodationCard, StaticBackDropModal],
  templateUrl: './accommodation.html',
  styleUrl: './accommodation.scss'
})
export class AccommodationComponent implements OnInit{
  constructor(private pageTilteService:PageTitleService, private service:AccommodationService){}
  ngOnInit(): void {
      this.pageTilteService.setPageTitle('Manage Accommodation')
  }
  items:any;
  currentPage = 0;
  totalPages = 0;
  fetchData(page:number){
    return this.service.findAll(page,10,'name,asc').subscribe(res=>{
      this.items = res.content;
      this.currentPage = res.number;
      this.totalPages = res.totalPages;
      console.log("accommodation data", this.items)
    })
  }
  bookAccommodation(id:number){

  }
  viewAccommodationDetails(id:number){

  }

}
