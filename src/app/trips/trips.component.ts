import { Component } from '@angular/core';
import { trip,dataTrip } from '../models/trip';
import { LogicService } from '../logic.service';
import { BasketService } from '../basket.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})

export class TripsComponent {
  info:trip[] = [];
  Alltrips:trip[] = [];
  FilteredTrips:trip[] = [];
  standardData:dataTrip[] = [];
  highestPriceCardId:number = 0;
  lowestPriceCardId:number = 0;
  allBoughtTrips:number = 0;
  showForm:boolean = false;
  rating:number = 3;
  FilteredCountries:trip[] = [];
  tripsSub: Subscription | undefined;
  constructor(private  logicservice:LogicService,private  basket:BasketService,private auth:AuthService){}
  ngOnInit( ): void {
    this.tripsSub = this.logicservice.getTrips().subscribe((data:any) =>{
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

        for(let j=0; j<this.basket.getBasket().length; j++)
        {
          if (this.basket.getBasket()[j].id == data[i].id)
            this.Alltrips[i].availableSpots-=1;


        }

        this.standardData.push({id:data[i].id,availableSpots:data[i].AvailableSpots})
      }
    

      

    });
    this.highestPriceCardId =  this.findHighestPrice();
    this.lowestPriceCardId = this.findLowestPrice();
  }
  onMinusClick(singleTrip:number)
  {
    if (this.Alltrips[singleTrip].availableSpots < this.standardData[singleTrip].availableSpots)
    {
        this.Alltrips[singleTrip].availableSpots+=1;
        this.allBoughtTrips--;
        this.basket.removeFromBasket(this.Alltrips[singleTrip]);
    }

  }

  onPlusClick(singleTrip:number)
  {


    
    if (this.Alltrips[singleTrip].availableSpots >0)
    {
        this.Alltrips[singleTrip].availableSpots-=1;
        this.allBoughtTrips++;
        this.basket.addToBasket(this.Alltrips[singleTrip]);
        
    }

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

  onRemoveTrip(index:number)
  {
    const trip = this.Alltrips[index];
     this.Alltrips.splice(index,1);
     this.standardData.splice(index,1);
    this.logicservice.removeTrip(trip.id);
     this.basket.removeAllOccurenceOfTrip(trip);
  }

  reciveFilteredArray(filtered:trip[])
  {

    this.FilteredTrips = filtered;

  

  }


  reciveRate(i:number,$event:any){

    this.Alltrips[i].star = Math.floor($event);
    console.log(this.Alltrips);

  }
}
