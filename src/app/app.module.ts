import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TripsComponent } from './trips/trips.component';
import { TripOpinionsComponent } from './trip-opinions/trip-opinions.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { RatingComponent } from './rating/rating.component';
import { OwnedTripsComponent } from './owned-trips/owned-trips.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ImageSliderComponent } from './image-slider/image-slider.component';
import { HomeComponent } from './home/home.component';
import { FromsComponent } from './froms/froms.component';
import { FilterTripComponent } from './filter-trip/filter-trip.component';
import { BasketComponent } from './basket/basket.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment.development';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireModule} from '@angular/fire/compat'
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { TripsMenagerComponent } from './trips-menager/trips-menager.component';
import { EditTripComponent } from './edit-trip/edit-trip.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    TripsComponent,
    TripOpinionsComponent,
    TripDetailsComponent,
    RatingComponent,
    OwnedTripsComponent,
    NavbarComponent,
    ImageSliderComponent,
    HomeComponent,
    FromsComponent,
    FilterTripComponent,
    BasketComponent,
    RegisterComponent,
    LoginComponent,
    AdminPanelComponent,
    TripsMenagerComponent,
    EditTripComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FontAwesomeModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
