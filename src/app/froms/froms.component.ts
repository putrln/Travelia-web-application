import { Component,Output,EventEmitter,Input } from '@angular/core';
import { trip,dataTrip } from '../models/trip';
import {FormControl, FormGroup,Validators } from '@angular/forms';
import { LogicService } from '../logic.service';

@Component({
  selector: 'app-froms',
  templateUrl: './froms.component.html',
  styleUrls: ['./froms.component.css']
})
export class FromsComponent {
  newTrip:trip| undefined;
  newDate:dataTrip | undefined;
  @Input() id:number = 10;
  name:string = "";
  country:string = "";
  price:number = 0;
  startDate:string = "";
  endDate:string = "";
  availableSpots:number=0;
  imageLink:string = "";
  shortDescription:string = "";

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


      this.newTrip = {
      id:this.id,
      name:f.value.name,
      country:f.value.country,
      price:parseInt(f.value.price),
      star:0,
      startDate:f.value.startDate,
      endDate:f.value.endDate,
      availableSpots:parseInt(f.value.availableSpots),
      imageLink:f.value.imageLink,
      shortDescription:f.value.shortDescription
    }


    console.log(this.newTrip);
    
    this.logicservice.addTrips(this.newTrip);

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
    this.messageEventExit.emit(false);
  }

}
