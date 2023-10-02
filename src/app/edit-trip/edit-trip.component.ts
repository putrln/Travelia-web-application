import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LogicService } from '../logic.service';
import { dataTrip, trip } from '../models/trip';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent {
  newTrip:trip| undefined;
  newDate:dataTrip | undefined;
  @Input() trip:any;
  name:string = "";
  country:string = "";
  price:number = 0;
  startDate:string = "";
  endDate:string = "";
  availableSpots:number=0;
  imageLink:string = "";
  shortDescription:string = "";
  @Output() showForm:boolean = true;
  exampleValue = 'example';
  @Output() messageEvent = new EventEmitter<any>();
  @Output() messageEventExit = new EventEmitter<any>();
form: FormGroup;
constructor(private  logicservice:LogicService) {
  this.form = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    country: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
    startDate: new FormControl(null, [Validators.required,this.validateDateFormat]),
    endDate: new FormControl(null, [Validators.required,this.validateDateFormat]),
    availableSpots: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
    imageLink: new FormControl(null, [Validators.required]),
    shortDescription: new FormControl(null, [Validators.required, Validators.minLength(5)])
  });
}

  onClickEvent(f:any)
  {
    if (this.form.invalid) {
      return;
    }

      this.trip = {
      id:this.trip.id,
      Name:f.value.name,
      Country:f.value.country,
      Price:f.value.price,
      Star:this.trip.star,
      StartDate:f.value.startDate,
      EndDate:f.value.endDate,
      AvailableSpots:f.value.availableSpots,
      ImageLink:f.value.imageLink,
      ShortDescription:f.value.shortDescription
    }
    


    this.newDate = {
      id:10,
      availableSpots:f.value.availableSpots
    }

    this.logicservice.editTrip(this.trip.id,this.trip);
    this.messageEventExit.emit(false);
  

  }

  validateDateFormat(control: FormControl) {
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.]\d{4}$/;
    if (!dateRegex.test(control.value)) {
      return { invalidDateFormat: true };
    }
    return null;
  }

  OnExitEvent()
  {
    console.log(this.trip);
    this.messageEventExit.emit(false);
  }

}
