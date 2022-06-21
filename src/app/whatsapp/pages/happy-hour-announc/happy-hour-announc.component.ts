import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TEMPLATE_NAME, TEMPLATE_LANGUAGE, COMPONENT_TYPE, PARAMETER_TYPE, MESSAGING_PRODUCT, TEMPLATE_TYPE } from '../../../common/api-resource';
import { WhatsappCloudApiService } from '../../services/whatsapp-cloud-api.service';
import { HappyHourAnnounc } from '../../interfaces/happy-hour-announc.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-happy-hour-announc',
  templateUrl: './happy-hour-announc.component.html',
  styleUrls: []
})
export class HappyHourAnnouncComponent implements OnInit {

  videoUrl: string = "";
  dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZoneName: 'short' } as const;
  dateTime: Date = new Date();
  place: string = "";

  constructor(private whatsappCloudApiService: WhatsappCloudApiService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
  }

  send() {
    const data: HappyHourAnnounc = {
      messaging_product: MESSAGING_PRODUCT.whatsapp,
      to: environment.toNumber,
      type: TEMPLATE_TYPE.type,
      template: {
        name: TEMPLATE_NAME.sampleHappyHourAnnouncement,
        language: {
          code: TEMPLATE_LANGUAGE.es,
        },
        components: [
          {
            type: COMPONENT_TYPE.header,
            parameters: [
              {
                type: PARAMETER_TYPE.video,
                video: {
                  link: this.videoUrl
                }
              }
            ]
          },
          {
            type: COMPONENT_TYPE.body,
            parameters: [
              {
                type: PARAMETER_TYPE.text,
                text: this.place
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
    this.videoUrl = '';
    this.dateTime = new Date();
    this.place = '';
  }
}
