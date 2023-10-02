import { Component,Input } from '@angular/core';
import { EventEmitter,Output} from '@angular/core';
@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {
  @Output() sendRate = new EventEmitter<any>(); 
  counterPeopleWhoRated:number = 0;
  currentRate:number = 0;
  average:string = "";
  isNotClicked:Boolean = true;
  rate:number = 1;
  @Input() onlyShow = 0;



  starToVote = ["assets/img/full_star.png","assets/img/star.png","assets/img/star.png","assets/img/star.png","assets/img/star.png"];
  averageVote = ["assets/img/star.png","assets/img/star.png","assets/img/star.png","assets/img/star.png","assets/img/star.png"];


  ngOnChanges() {
    this.AverageRate();
  }

  

  changeRate(index:number)
  {


    for(let i=0;i<=index;i++)
    {
     
      
      this.starToVote[i] = "assets/img/full_star.png"


    }
    this.rate = index+1;
    for(let i=index+1;i<this.starToVote.length;i++)
    {
     

      this.starToVote[i] = "assets/img/star.png"


    }
    console.log("wita");

    this.sendRate.emit(this.rate);
 

  }

removeFullStar()
{
  if(this.isNotClicked)
  {
  for(let i=0;i<this.starToVote.length;i++)
    {
      this.starToVote[i] = "assets/img/star.png"
    }
  }
}

onRate(i:number)
{
 
  this.counterPeopleWhoRated++;
  this.currentRate+=(i+1);
  this.average = (this.currentRate/this.counterPeopleWhoRated).toFixed(2);
  //this.sendRate.emit(this.average);

}

AverageRate()
{

for(let i=0;i<this.averageVote.length;i++)
{

  if (Math.floor(this.onlyShow) > i)
  {

  this.averageVote[i] = "assets/img/full_star.png"


  }
  else{
    this.averageVote[i] = "assets/img/star.png"
  }




}





}




}
