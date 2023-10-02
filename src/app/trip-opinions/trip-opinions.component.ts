import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { LogicService } from '../logic.service';
import { SingleComment } from '../models/comments';
import { trip } from '../models/trip';
@Component({
  selector: 'app-trip-opinions',
  templateUrl: './trip-opinions.component.html',
  styleUrls: ['./trip-opinions.component.css']
})
export class TripOpinionsComponent {
  opinions:any[] = [];
  form: FormGroup;
  comments:SingleComment[] = []
  boughtTripsByUser:number[] = []
  @Input() idOfTrip;
  rate:number = 1;

  constructor(private logicservice:LogicService, private auth:AuthService){
    this.form = new FormGroup({
      name: new FormControl(''),
      review: new FormControl('', [
        Validators.minLength(50),
        Validators.maxLength(500),
        (control: FormControl) => {
          let commented = false;
          for(let i=0;i<this.comments.length;i++)
          {
            if (this.comments[i].id == this.auth.currentUser.uid){
              commented = true
            } 
          }
          if (commented) {
            return { commented: true };
          }
          return null;
        },
        (control:FormControl) =>{
   
            for(let i=0; i < this.boughtTripsByUser.length; i++)
            {
              if (this.idOfTrip == this.boughtTripsByUser[i]){
                return null
              }
            }
              return {notBought: true};

        },
        (control:FormControl) =>{
      
          if (auth.currentUser.roles.banned)
            return {banned: true};
          else
            return null;

      }

        





    
      ])
    })


  }
  ngOnChanges() {
    this.logicservice.getComments(this.idOfTrip).subscribe((info:any) => {
      this.comments = []
      for(let i =0; i<info.length; i++)
      {
        for (let key in info[i]) {
        this.comments.push(info[i][key])
        }
      }
      //this.onRate();
    });

    this.logicservice.getBoughtTrips(this.auth.currentUser.uid).subscribe((trips:any) =>{
        this.boughtTripsByUser = []
        for(let i=0; i < trips.length; i++)
        {
               this.boughtTripsByUser.push(trips[i].id)

              
          }
        

    })

  

  
  }

  onRate()
{
 
  const counterPeopleWhoRated = this.comments.length;
  let value = 0
  //sprawdz komenty
  for(let i=0; i < this.comments.length;i++)
  {
    value+=this.comments[i].rate
  }
  let average = (value/counterPeopleWhoRated).toFixed(2);
  console.log("srednia");
  console.log(average);
  this.logicservice.updateRate(this.idOfTrip,average);
  

}

  onClickEvent(f:any){
    this.form.controls['review'].updateValueAndValidity();
    if (this.form.invalid) {
      return;
    }

  
    let com:SingleComment  = {
      id: this.auth.currentUser.uid,
      nick: f.value.name,
      comment: f.value.review,
      rate:this.rate
    }
    this.logicservice.addComment(this.idOfTrip,this.auth.currentUser.uid,com);
    let counterPeopleWhoRated = this.comments.length
    let value = 0
    for(let i=0; i < this.comments.length;i++)
    {
      value+=this.comments[i].rate
    }
    console.log("Do usuniecia!");
    console.log(value + this.rate)
    let average = ((value + this.rate)/(counterPeopleWhoRated + 1)).toFixed(2);
    console.log(average);
    this.logicservice.updateRate(this.idOfTrip,average);



    

  }

  receiveRate($event){
    this.rate = $event;
    console.log(this.rate);
  
  }

}
