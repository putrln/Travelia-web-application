import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LogicService } from '../logic.service';
import { trip } from '../models/trip';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent {
  constructor(private route: ActivatedRoute,private  logicservice:LogicService){}

  idOfTrip:number= 0;
  tripToShow:trip;
  slides:any[]= [
    {url: "assets/img/test.jpg"},
    {url: "assets/img/test.jpg"},
    {url: "assets/img/test.jpg"},
  ]
  randomIndex = Math.floor(Math.random() * this.slides.length);
  ngOnInit():void {
    this.route.paramMap.subscribe(data =>{
      this.idOfTrip = parseInt(data.get('id'));
      console.log(this.idOfTrip);

      this.logicservice.getTrips().subscribe((data:any) =>
        {
          
          for(let i = 0; i< data.length;i++ )
          {
            if(data[i].id == this.idOfTrip)
            {
              this.tripToShow ={
                
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
    
              }
            }
    
          }
        

        })
      console.log(this.tripToShow);
      //this.tripToShow = this.logicservice.getTrips()[this.idOfTrip];
      //console.log(this.logicservice.getTrips());
  
    })
  
  }
  
  getRandomImage()
  {
  
  //console.log(`url('${this.slides[this.randomIndex].url}')`)
  //return `url('${this.slides[0].url}')`
  
  return `url('${this.slides[0].url}')`
  
  }
  // @HostListener('window:scroll', ['$event'])
  // onScroll(event)
  // {
  // const bg= document.getElementById('bgImage');
  
  // bg.style.backgroundSize = 160 - + window.pageYOffset/18 + '%';
  
  // }
  
  
}
