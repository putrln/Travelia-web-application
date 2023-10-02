import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { BasketService } from '../basket.service';
import { LogicService } from '../logic.service';
import { trip } from '../models/trip';
@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent {

  
  trips =[]

  constructor(private  basket:BasketService, private  logicservice:LogicService,private auth:AuthService)
  {

    logicservice.getTrips().subscribe((data:any) =>
      {
        console.log("znowu");
        for(let i = 0; i< data.length;i++ )
      {
        
        this.trips.push({
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



      })

  }

  getBasket()
  {
    return this.basket.getBasket();

  }

  removeTripFromBasket(TripToBeRemoved:trip)
  {
      this.basket.removeFromBasket(TripToBeRemoved);
      //this.logicservice.increaseAvaliablePlaces(TripToBeRemoved);

  }


  getFullPrice()
  {
    let price = 0;
      for(let item of this.basket.getBasket() )
      {
          price+=item.price;
      }
      return price;
  }

  onBuyEvent()
  {

    this.logicservice.addBoughtTrips(this.auth.currentUser.uid, this.basket.tripsInBasket);

    for(let i=0; i<this.trips.length;i++)
    {

      let avp = this.trips[i].availableSpots;

      for(let j=0; j<this.basket.tripsInBasket.length;j++)
      {
          if (this.trips[i].id == this.basket.tripsInBasket[j].id)
          {
            avp-=1
          }
      }

      // console.log("wykonuje sie!")
      // console.log(this.basket.tripsInBasket[i])
      // let avp = this.trips[this.basket.tripsInBasket[i].id].availableSpots;
      this.logicservice.changeTripPlace(this.trips[i].id,avp);

    }
    this.basket.clearBasket();



  }

}
