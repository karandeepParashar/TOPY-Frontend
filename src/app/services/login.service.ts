import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  registerURL: string = 'http://localhost:3000/register';
  loginURL: string = 'http://localhost:3000/register?email=';
  backendLoginUrl: string = 'http://127.0.0.1:8000/login/';
  backendRegisterUrl: string = 'http://127.0.0.1:8000/add-user/';
  getMatchsPastUrl: string = 'http://127.0.0.1:8000/get-matchs-past/';
  getMatchsOutgoingUrl: string = 'http://127.0.0.1:8000/get-matchs-outgoing/';
  addMatchUrl: string = 'http://127.0.0.1:8000/add-match/';
  getAllChildrenUrl: string = 'http://127.0.0.1:8000/get-my-childs/';
  getChildActivitiesUrl: string = 'http://127.0.0.1:8000/get-activity-child';
  postAddChildUrl: string = 'http://127.0.0.1:8000/add-child/';
  getMyPetUrl: string = 'http://127.0.0.1:8000/get-my-pets/';
  getPetActivityUrl: string = 'http://127.0.0.1:8000/get-activity-pet';
  postPetDetails: string = 'http://127.0.0.1:8000/add-pet/';
  getTOPYLocationsUrl: string = 'http://127.0.0.1:8000/get-topystations';
  getAllSeniorCitizenUrl: string =
    'http://127.0.0.1:8000/get-all-senior-citizens';

  getRecommendationsParentUrl: string =
    'http://127.0.0.1:8000/get-recommendation-for-child/';

  postNewMeeting: string = 'http://127.0.0.1:8000/add-match/';

  getIncomingRequestsUrl: string = 'http://127.0.0.1:8000/get-matchs-incoming/';
  putMeetingUrl = 'http://127.0.0.1:8000/match-details/';

  user_data: any = { user_id: 10, name: 'Karandeep' };

  registerUser(user: any) {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(user);

    return this.http.post(this.backendRegisterUrl, body, { headers: headers });
  }

  login(user: any) {
    let authenticate = false;
    return this.http.get<any>(
      this.backendLoginUrl + user['email'] + '/' + user['password']
    );
  }

  addChildDetails(childDetails: any) {
    const headers = { 'content-type': 'application/json' };
    childDetails['user'] = this.user_data['user_id'];
    const body = JSON.stringify(childDetails);

    return this.http.post(this.postAddChildUrl, body, {
      headers: headers,
    });
  }
  setUserData(user_data: any) {
    this.user_data = user_data;
  }

  getCurrentMeetingRequests(user: any) {
    return this.http.get<any>(this.getMatchsOutgoingUrl + user['user_id']);
  }

  getPastMeetingRequests(user: any) {
    return this.http.get<any>(this.getMatchsPastUrl + user['user_id']);
  }

  getAllChildren() {
    return this.http.get<any>(
      this.getAllChildrenUrl + this.user_data['user_id']
    );
  }

  getChildActivities() {
    return this.http.get<any>(this.getChildActivitiesUrl);
  }

  getAllPet() {
    return this.http.get<any>(this.getMyPetUrl + this.user_data['user_id']);
  }

  getPetActivities() {
    return this.http.get<any>(this.getPetActivityUrl);
  }

  addPetDetails(petDetails: any) {
    const headers = { 'content-type': 'application/json' };
    petDetails['user'] = this.user_data['user_id'];
    const body = JSON.stringify(petDetails);

    return this.http.post(this.postPetDetails, body, {
      headers: headers,
    });
  }

  getRecommendationsParent(child: any) {
    return this.http.get<any>(
      this.getRecommendationsParentUrl + child['child_id']
    );
  }
  getAllSeniorCitizens() {
    return this.http.get<any>(this.getAllSeniorCitizenUrl);
  }

  getTOPYLocations() {
    return this.http.get<any>(this.getTOPYLocationsUrl);
  }

  addNewMeeting(meetingDetails: any) {
    meetingDetails['user'] = this.user_data['user_id'];
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(meetingDetails);

    return this.http.post(this.postNewMeeting, body, {
      headers: headers,
    });
  }

  getIncomingRequest() {
    return this.http.get<any>(
      this.getIncomingRequestsUrl + this.user_data['user_id']
    );
  }

  putMeetingUpdate(meeting: any) {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(meeting);

    return this.http.put(this.putMeetingUrl + meeting['match_id'] + '/', body, {
      headers: headers,
    });
  }

  getUserData() {
    return this.user_data;
  }
}
