import { Component, SimpleChanges } from '@angular/core';
import { Output,EventEmitter,Input } from '@angular/core';
import { trip,dataTrip, filter } from '../models/trip';
@Component({
  selector: 'app-filter-trip',
  templateUrl: './filter-trip.component.html',
  styleUrls: ['./filter-trip.component.css']
})
export class FilterTripComponent {
  @Input() tripsToFilter:trip[] = [];
  countries:string[] = []; 
  stars:number[] = [];
  date:string[] = [];
  price:string[] = [];
  country:string = "";
  star:number=0;
  numOfFilters:number = 0;
  filters:filter|undefined;
  @Output() newItemEvent = new EventEmitter<trip[]>();



  ngOnChanges(changes: SimpleChanges): void {
      this.filterAll();
  }

  
  filterAll() {
    let filteredTrips = [];
    let filteredStar = 0;
    let filteredMinPrice = 0;
    let filteredMaxPrice = Infinity;
  
    if (this.stars.length > 0) {
      filteredStar = Math.max(...this.stars);
    }
  
    if (this.price.length == 2) {
      if (this.price[0] != "") {
        filteredMinPrice = parseInt(this.price[0]);
      }
      if (this.price[1] != "") {
        filteredMaxPrice = parseInt(this.price[1]);
      }
    }
  
    if (this.countries.length == 0) {
      for (let i = 0; i < this.tripsToFilter.length; i++) {
        if (this.tripsToFilter[i].price >= filteredMinPrice &&
            this.tripsToFilter[i].price <= filteredMaxPrice &&
            this.tripsToFilter[i].star >= filteredStar) {
          filteredTrips.push(this.tripsToFilter[i]);
        }
      }
    } else {
      for (let i = 0; i < this.tripsToFilter.length; i++) {
        if (this.countries.includes(this.tripsToFilter[i].country) &&
            this.tripsToFilter[i].price >= filteredMinPrice &&
            this.tripsToFilter[i].price <= filteredMaxPrice &&
            this.tripsToFilter[i].star >= filteredStar) {
          filteredTrips.push(this.tripsToFilter[i]);
        }
      }
    }
    this.newItemEvent.emit(filteredTrips);
  }
  
  choosedCountry()
  {
    this.countries.push(this.country);
    this.numOfFilters+=1;
    this.filterAll();
  }

  chooseStar()
  {
    this.stars.push(this.star);
    this.numOfFilters+=1;
    this.filterAll();

  }

  removeCountryEvent(i:number)
  {
      this.countries.splice(i,1);
      this.numOfFilters-=1;
      this.filterAll();
      console.log(this.countries);
  }

  removeStarEvent(i:number)
  {
      this.stars.splice(i,1);
      this.numOfFilters-=1;
      this.filterAll();
   
  }




}
