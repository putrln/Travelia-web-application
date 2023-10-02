import { Component, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { BasketService } from '../basket.service';
import { LogicService } from '../logic.service';
import { dataTrip, trip } from '../models/trip';

@Component({
  selector: 'app-trips-menager',
  templateUrl: './trips-menager.component.html',
  styleUrls: ['./trips-menager.component.css']
})
export class TripsMenagerComponent {
  info:trip[] = [];
  Alltrips:trip[] = [];
  standardData:dataTrip[] = [];
  highestPriceCardId:number = 0;
  lowestPriceCardId:number = 0;

  showForm:boolean = false;
  editForm:boolean = false;
  rating:number = 3;
  tripToEdit = null;
  @Output() messageEventExit = new EventEmitter<any>();
  constructor(private  logicservice:LogicService,private  basket:BasketService,private auth:AuthService){}
  ngOnInit( ): void {
    this.logicservice.getTrips().subscribe((data:any) =>{

      this.Alltrips = [];
      this.standardData = [];
      for(let i = 0; i< data.length;i++ )
      {
        
        this.Alltrips.push({
          id: data[i].id,
          name:data[i].Name,
          country:data[i].Country,
          startDate:data[i].StartDate,
          endDate:data[i].EndDate,
          price:data[i].Price,
          star:data[i].Star,
          availableSpots:data[i].AvailableSpots,
          shortDescription:data[i].ShortDescription,
          imageLink:data[i].ImageLink
        })


      }
    

    });
   
  }
  onMinusClick(singleTrip:number)
  {
    


  }

  onPlusClick(singleTrip:number)
  {


    let spots = this.Alltrips[singleTrip].availableSpots + 1
    this.logicservice.changeTripPlace(this.Alltrips[singleTrip].id,  spots);

  }



  findHighestPrice() :number
  {
      let max:number = 0;
      let idOfHighestValue:number = 0;
      for(let i=0; i<this.Alltrips.length;i++)
      {
        if (max < this.Alltrips[i].price)
        {
            max = this.Alltrips[i].price;
            idOfHighestValue = this.Alltrips[i].id;

        }

       

      }
      return idOfHighestValue;
   


  }

  findLowestPrice() :number
  {
      let min:number = this.Alltrips[0].price;
      let idOfLowestValue:number = 0;
      for(let i=0; i<this.Alltrips.length;i++)
      {
        if (min > this.Alltrips[i].price)
        {
            min = this.Alltrips[i].price;
            idOfLowestValue = this.Alltrips[i].id;

        }

      }
      return idOfLowestValue;
   
  }

  changeStateOfForm()
  {
    this.showForm = true;


  }

  reciveNewTrip($event:any){
    console.log("Dodałem");
    this.logicservice.addTrips( $event['trip']);
    this.showForm= false;
    this.highestPriceCardId = this.findHighestPrice();
    this.lowestPriceCardId = this.findLowestPrice();
    console.log(this.Alltrips);
    console.log(this.standardData);
  

  }

  ExitForm($event:any)
  {

    this.showForm= false;
  }

  onRemoveTrip(tripToBeDeleted:trip)
  {
    console.log("WDASADJADADSJKJKADSADSewrerADS");
    
     //this.Alltrips.splice(index,1);
     //this.standardData.splice(index,1);
     this.logicservice.removeComment(tripToBeDeleted.id);
    this.logicservice.removeTrip(tripToBeDeleted.id);


  }

  changeStateOfEditForm(trip)
  {
    console.log(trip);
    this.tripToEdit= trip;
    this.editForm = true;



  }


  reciveRate(i:number,$event:any){

    this.Alltrips[i].star = Math.floor($event);
    console.log(this.Alltrips);

  }

  ExitEditForm()
  {
    this.editForm = false;
  }
}
