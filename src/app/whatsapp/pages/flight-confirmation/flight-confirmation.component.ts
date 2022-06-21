import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TEMPLATE_NAME, TEMPLATE_LANGUAGE, COMPONENT_TYPE, PARAMETER_TYPE, MESSAGING_PRODUCT, TEMPLATE_TYPE } from '../../../common/api-resource';
import { WhatsappCloudApiService } from '../../services/whatsapp-cloud-api.service';
import { FligthConfirmation } from '../../interfaces/fligth-confirmation.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-flight-confirmation',
  templateUrl: './flight-confirmation.component.html',
  styleUrls: []
})
export class FlightConfirmationComponent implements OnInit {

  documentUrl: string = "";
  fileName: string = "";
  dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZoneName: 'short' } as const;
  dateTime: Date = new Date();
  origin: string = "";
  destination: string = "";

  constructor(private whatsappCloudApiService: WhatsappCloudApiService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
  }

  send() {
    const data: FligthConfirmation = {
      messaging_product: MESSAGING_PRODUCT.whatsapp,
      to: environment.toNumber,
      type: TEMPLATE_TYPE.type,
      template: {
        name: TEMPLATE_NAME.sampleFlightConfirmation2,
        language: {
          code: TEMPLATE_LANGUAGE.es,
        },
        components: [
          {
            type: COMPONENT_TYPE.header,
            parameters: [
              {
                type: PARAMETER_TYPE.document,
                document: {
                  link: this.documentUrl,
                  filename: this.fileName
                }
              }
            ]
          },
          {
            type: COMPONENT_TYPE.body,
            parameters: [
              {
                type: PARAMETER_TYPE.text,
                text: this.origin
              },
              {
                type: PARAMETER_TYPE.text,
                text: this.destination
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
              }
            ]
          }
        ]
      }
    }

    this.whatsappCloudApiService.sendMessage(data).subscribe(
      resp => {
        this.clearForm();
        console.log(resp);
      },
      error => {
        console.log(error);
      }
    )
  }

  transformSafeUrl(url: string) : SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  clearForm() {
    this.documentUrl = '';
    this.fileName = "";
    this.dateTime = new Date();
    this.origin = '';
    this.destination = '';
  }
}
