import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { WeatherApiResponse } from '../types/WeatherApiResponse.model';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LocalInfoService {
  private latlng: string;
  private urlRoot = environment.openWeatherMap.url;

  constructor(private http: HttpClient) {
    const { geolocation } = window.navigator;
    if (geolocation) {
      geolocation.getCurrentPosition(this.setPosition.bind(this));
    }
  }

  public setPosition(position) {
    const { coords } = position;
    this.latlng = `lat=${coords['latitude']}&lon=${coords['longitude']}`;
  }

  public getLocalInfo(): Observable<WeatherApiResponse> {
    const apiKey = environment.openWeatherMap.appId;
    const url = `${this.urlRoot}${this.latlng}&APPID=${apiKey}&units=metric`;
    return this.http.get<WeatherApiResponse>(url);
  }
}
