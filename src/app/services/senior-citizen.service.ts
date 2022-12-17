import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class SeniorCitizenService {
  senior_citizen: any = {};

  getMatchsPastUrl: string = 'http://127.0.0.1:8000/get-matchs-past/';
  getMatchsOutgoingUrl: string = 'http://127.0.0.1:8000/get-matchs-outgoing/';
  getIncomingMeetingUrl: string = 'http://127.0.0.1:8000/get-matchs-incoming/';
  putMeetingUrl: string = 'http://127.0.0.1:8000/match-details/';
  putSeniorCitizenDetailsUrl: string =
    'http://127.0.0.1:8000/senior-citizen-details/';
  getSeniorCitizenUrl: string = 'http://127.0.0.1:8000/get-my-senior-citizen/';

  getAllChildrenUrl: string = 'http://127.0.0.1:8000/get-all-children';
  getMyPetsUrl: string = 'http://127.0.0.1:8000/get-my-pets/';
  getRecommendationsSeniorCitizenUrl: string =
    'http://127.0.0.1:8000/get-recommendation-for-senior/';

  constructor(private http: HttpClient) {}
  getCurrentMeetingRequests(user: any) {
    return this.http.get<any>(this.getMatchsOutgoingUrl + user['user_id']);
  }

  getPastMeetingRequests(user: any) {
    return this.http.get<any>(this.getMatchsPastUrl + user['user_id']);
  }

  getIncomingMeetings(user: any) {
    console.log(this.getIncomingMeetingUrl + user['user_id']);

    return this.http.get<any>(this.getIncomingMeetingUrl + user['user_id']);
  }

  putSeniorCitizenDetails(details: any) {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(details);

    return this.http.put(
      this.putSeniorCitizenDetailsUrl + details['senior_citizen_id'] + '/',
      body,
      {
        headers: headers,
      }
    );
  }

  getSeniorCitizen(user: any) {
    return this.http
      .get<any>(this.getSeniorCitizenUrl + user['user_id'])
      .subscribe((response) => {
        this.senior_citizen = response[0];
      });
  }

  sendSeniorCitizenData() {
    return this.senior_citizen;
  }
  putMeetingUpdate(meeting: any) {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(meeting);

    return this.http.put(this.putMeetingUrl + meeting['match_id'] + '/', body, {
      headers: headers,
    });
  }

  getAllChildren() {
    return this.http.get<any>(this.getAllChildrenUrl);
  }

  getRecommendationSeniorCitizen(senior: any) {
    return this.http.get<any>(
      this.getRecommendationsSeniorCitizenUrl + senior['senior_citizen_id']
    );
  }

  getPetsList(user_id: any) {
    return this.http.get<any>(this.getMyPetsUrl + user_id);
  }
}
