import { Component, Input } from '@angular/core'
import { slideInterface } from '../models/trip';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})
export class ImageSliderComponent {
  @Input() slides: slideInterface[] = [];
  currentIndex:number = 0;
  name:string = "";


  goToNext():void
  {
    const isLastSlide = this.currentIndex === this.slides.length - 1;
    const newIndex = isLastSlide ? 0 : this.currentIndex + 1;
    this.currentIndex = newIndex;

  }

  goToPrevious(): void{
    const isFirstSlide = this.currentIndex === 0;
    const newIndex = isFirstSlide ? this.slides.length - 1: this.currentIndex - 1;

    this.currentIndex = newIndex;

  }
  getCurrentSlideUrl(): string
  {
    this.name = this.slides[this.currentIndex].title;
    return `url('${this.slides[this.currentIndex].url}')`
  }

  goToSlide(slideIndex:number): void
  {
this.currentIndex = slideIndex;
  }
}
