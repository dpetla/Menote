import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { WeatherApiResponse } from './WeatherApiResponse.model';

@Injectable({
  providedIn: 'root'
})
export class LocalInfoService {
  position = {};
  latlng: string;
  url: string;
  weatherDesc: string;
  temp: string;
  city: string;
  country: string;
  urlRoot: string;
  apiKey: string;

  constructor(private http: HttpClient) {
    const geolocation = window.navigator.geolocation;
    if (geolocation) {
      geolocation.getCurrentPosition(this.setPosition.bind(this));
    }
    this.urlRoot = environment.openWeatherMap.url;
    this.apiKey = environment.openWeatherMap.appId;
  }

  setPosition(position) {
    this.position = position.coords;
    this.latlng = `lat=${this.position['latitude']}&lon=${
      this.position['longitude']
    }`;
  }

  getLocalInfo(): Observable<WeatherApiResponse> {
    this.url =
      this.urlRoot + this.latlng + '&APPID=' + this.apiKey + '&units=metric';

    // openweathermap.org api call
    return this.http.get<WeatherApiResponse>(this.url);
  }
}
