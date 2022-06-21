import { Component, OnInit } from '@angular/core';
import { TEMPLATE_NAME, TEMPLATE_LANGUAGE, COMPONENT_TYPE, PARAMETER_TYPE, MESSAGING_PRODUCT, TEMPLATE_TYPE } from '../../../common/api-resource';
import { WhatsappCloudApiService } from '../../services/whatsapp-cloud-api.service';
import { MovieConfirmation } from '../../interfaces/movie-confirmation.interface';
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-movie-confirmation',
  templateUrl: './movie-confirmation.component.html'
})
export class MovieConfirmationComponent implements OnInit {

  imageUrl: string = "";
  dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZoneName: 'short' } as const;
  dateTime: Date = new Date();
  movie: string = "";
  cinema: string = "";
  seats: string = "";

  constructor(private whatsappCloudApiService: WhatsappCloudApiService) { }

  ngOnInit(): void {
  }

  send() {
    const data: MovieConfirmation = {
      messaging_product: MESSAGING_PRODUCT.whatsapp,
      to: environment.toNumber,
      type: TEMPLATE_TYPE.type,
      template: {
        name: TEMPLATE_NAME.sampleMovieTicketConfirmation,
        language: {
          code: TEMPLATE_LANGUAGE.es,
        },
        components: [
          {
            type: COMPONENT_TYPE.header,
            parameters: [
              {
                type: PARAMETER_TYPE.image,
                image: {
                  link: this.imageUrl
                }
              }
            ]
          },
          {
            type: COMPONENT_TYPE.body,
            parameters: [
              {
                type: PARAMETER_TYPE.text,
                text: this.movie
              },
              {
                type: PARAMETER_TYPE.dateTime,
                date_time: {
                  fallback_value: new Date(this.dateTime.toString()).toLocaleString("es", this.dateOptions),
                  day_of_month: new Date(this.dateTime.toString()).getDate(),
                  year: new Date(this.dateTime.toString()).getFullYear(),
                  month: new Date(this.dateTime.toString()).getMonth() + 1,
                  hour: new Date(this.dateTime.toString()).getHours(),
                  minute: new Date(this.dateTime.toString()).getMinutes()
                }
              },
              {
                type: PARAMETER_TYPE.text,
                text: this.cinema
              },
              {
                type: PARAMETER_TYPE.text,
                text: this.seats
              }
            ]
          }
        ]
      }
    }

    this.whatsappCloudApiService.sendMessage(data).subscribe(
      resp => {
        this.clearForm();
      },
      error => {
        console.log(error);
      }
    )

  }

  clearForm() {
    this.imageUrl = '';
    this.dateTime = new Date();
    this.movie = '';
    this.cinema = '';
    this.seats = '';
  }

}
