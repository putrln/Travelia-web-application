import { Injectable } from '@angular/core';
import { trip } from './models/trip';
@Injectable({
  providedIn: 'root'
})
export class BasketService {

  tripsInBasket:trip[] = []
  constructor() { }



  addToBasket(tripToAdd:trip)
  {
    this.tripsInBasket.push(tripToAdd);

 }

 removeAllOccurenceOfTrip(tripToBeRemoved:trip)
 {

  this.tripsInBasket = this.tripsInBasket.filter(i=> i!=tripToBeRemoved);

 }

 removeFromBasket(tripToRemove:trip)
 {


  for(let i =0; i < this.tripsInBasket.length; i++)
  {
    if (tripToRemove.id == this.tripsInBasket[i].id)
    {
      this.tripsInBasket.splice(i,1)
      break;
    }
  }
  // const index = this.tripsInBasket.indexOf(tripToRemove);
  // if (index != -1)
  // {
  //   this.tripsInBasket.splice(index,1);
  // }

 }


 getBasket()
 {

  return this.tripsInBasket;

 }

 clearBasket()
 {
  this.tripsInBasket =  []

 }
}
