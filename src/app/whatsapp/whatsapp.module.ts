import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightConfirmationComponent } from './pages/flight-confirmation/flight-confirmation.component';
import { HappyHourAnnouncComponent } from './pages/happy-hour-announc/happy-hour-announc.component';
import { MovieConfirmationComponent } from './pages/movie-confirmation/movie-confirmation.component';



@NgModule({
  declarations: [
    FlightConfirmationComponent,
    HappyHourAnnouncComponent,
    MovieConfirmationComponent
  ],
  imports: [
    CommonModule
  ]
})
export class WhatsappModule { }
