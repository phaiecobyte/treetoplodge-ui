import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { HttpClient } from '@angular/common/http';
import { Accommodation } from '../shared/models/accommodation';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService extends BaseApiService<Accommodation>{

  constructor(http:HttpClient) { 
    super(http,'accommodations')
  }

}
