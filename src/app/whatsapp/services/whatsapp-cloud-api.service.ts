import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/app/common/api-resource';
import { environment } from 'src/environments/environment'
import { WhatsappCloudApiRequest } from '../interfaces/whatsapp-cloud-api-request.interface';
import { WhatsappCloudAPIResponse } from '../interfaces/whatsapp-cloud-api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class WhatsappCloudApiService {

  private apiUrl = environment.apiUrl + API.consumeTemplate;

  constructor(private http: HttpClient) { }

  sendMessage(whatsappCloudApiRequest: WhatsappCloudApiRequest): Observable<WhatsappCloudAPIResponse> {
    console.log(whatsappCloudApiRequest);
    return this.http.post<WhatsappCloudAPIResponse>(this.apiUrl, whatsappCloudApiRequest);
  }
}
