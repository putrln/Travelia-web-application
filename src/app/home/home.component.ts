import { Component } from '@angular/core';
import { slideInterface } from '../models/trip';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  slides:slideInterface[]= [
    {url: "assets/img/bcg_img4.jpg", title:"Przeżyj <span class=\"color\">niezapomnianą</span> przygodę razem z nami"},
    {url: "assets/img/bcg_img2.jpg", title:"Podróżuj z nami, odkrywaj i ciesz się życiem"},
    {url: "assets/img/bcg_img3.jpg", title:"Dołącz do nas i zwiedzaj świat bez ograniczeń"}
  
  
  
  ]



}
