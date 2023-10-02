import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { BasketComponent } from './basket/basket.component';
import { FromsComponent } from './froms/froms.component';
import { AdminViewGuard } from './guard/admin-view.guard';
import { TripDetailsGuard } from './guard/trip-details.guard';
import { TripMenagerGuard } from './guard/trip-menager.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OwnedTripsComponent } from './owned-trips/owned-trips.component';
import { RegisterComponent } from './register/register.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { TripsMenagerComponent } from './trips-menager/trips-menager.component';
import { TripsComponent } from './trips/trips.component';
const routes: Routes = [{path:'trips', component:TripsComponent},
                        {path:'', component:HomeComponent},
                        {path:'addTrip',component:FromsComponent},
                        {path:'basket',component:BasketComponent},
                        {path:'trips/:id',component:TripDetailsComponent, canActivate:[TripDetailsGuard]},
                        {path:'profile',component:OwnedTripsComponent},
                        {path:'register',component:RegisterComponent},
                        {path:'login',component:LoginComponent},
                        {path:'admin-panel',component:AdminPanelComponent, canActivate:[AdminViewGuard]},
                        {path:'trips-menager', component:TripsMenagerComponent,canActivate:[TripMenagerGuard]} ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
