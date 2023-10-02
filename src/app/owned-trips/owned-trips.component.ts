import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

import { LogicService } from '../logic.service';

@Component({
  selector: 'app-owned-trips',
  templateUrl: './owned-trips.component.html',
  styleUrls: ['./owned-trips.component.css']
})
export class OwnedTripsComponent {
  boughtTrips = []
  constructor(private auth:AuthService,private logicservice:LogicService)
  {
    this.logicservice.getBoughtTrips(this.auth.currentUser.uid).subscribe(items=>
      {

        this.boughtTrips =  items;

        console.log(items);
      }
    )
  }
 

  logout()
  {
    this.auth.logout();
  }
}
