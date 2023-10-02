import { trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { map, Observable, take, tap } from 'rxjs';
import { dataTrip, trip } from './models/trip';

@Injectable({
  providedIn: 'root'
})
export class LogicService {

  daneRef: AngularFireObject<any>;

  
  trips: trip[] = [];
  standardData:dataTrip[] = [];
  Trips: Observable<any[]>; 
  private _url: string = './assets/data/trip.json'
  private nextId: number | undefined;
  constructor(private http: HttpClient,private db: AngularFireDatabase) {
  this.Trips = this.db.list('Trips').valueChanges();

  

   }
  
  
  getTrips()
  {

    return this.db.list('Trips').valueChanges();

  }



  removeTrip(idOfTrip:number)
  {
    
    this.db.list('Trips').remove(idOfTrip.toString())
  
    
  }






  addNewUser(user) {
    

    this.db.object('/users/' + user.uid).set({

      email: user.email,
      roles: user.roles,


    });


  }

  addBoughtTrips(uid,boughtTrip)
  {

    for(let i=0;i<boughtTrip.length;i++)
    {
      
      this.db.list('/boughtTrips/' + uid).push(boughtTrip[i]);

    }
    
  }
  
  setPersistance(persistance)
  {
    this.db.object('/Server-options/').set({persistance: persistance});
  }
  getPersistance()
  {

    return this.db.object('/Server-options/').valueChanges();

  }
  getBoughtTrips(uid)
  {

    return this.db.list('/boughtTrips/' + uid).valueChanges();
  }

  getUserRole(uid:string)
  {
    
    return this.db.object('/users/' + uid + '/roles').valueChanges();
  }
  getUsers()
  {
    return this.db.object('/users/').valueChanges();
  }

  getUser(uid:string)
  {

    return this.db.object('/users/' + uid).valueChanges();
  }
  changeTripPlace(idOfTrip:number,availableSpots)
  {
    console.log("Miejsce" + availableSpots)
    this.db.list('Trips').update(idOfTrip.toString(),{AvailableSpots: availableSpots });

  
  }


  setRole(uid:string,newRole)
  {
    this.db.object('/users/' + uid + '/roles').update(newRole);

  }
  addComment(idOfTrip, uid,comment)
  {
    this.db.list('/comments/' + idOfTrip + '/' + uid).push(comment);

  }

  getComments(idOfTrip)
  {
    return this.db.list('/comments/' + idOfTrip).valueChanges();


  }
  removeComment(idOfTrip:number)
  {
    this.db.list('/comments/').remove(idOfTrip.toString())
  }

  updateRate(idOfTrip:number, rate)
  {

    
    
      this.db.list('Trips').update(idOfTrip.toString(),{Star:rate})
          
   

  }
  editTrip(idOfTrip:number,trip:trip)
  {
    this.db.list('Trips').update(idOfTrip.toString(), trip)
  }

  addTrips(trip: trip){
    
    console.log(trip.id);

    this.db.list('Trips').set(trip.id.toString(),{
          id: trip.id,
          Name:trip.name,
          Country:trip.country,
          StartDate:trip.startDate,
          EndDate:trip.endDate,
          Price:trip.price,
          Star:trip.star,
          AvailableSpots:trip.availableSpots,
          ShortDescription:trip.shortDescription,
          ImageLink:trip.imageLink
    })
  }
}
