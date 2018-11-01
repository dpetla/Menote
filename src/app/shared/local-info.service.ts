import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs/internal/operators/finalize';
import { environment } from './../../environments/environment';

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

  constructor(private http: HttpClient) {
    // capture browser position when service is created
    const geolocation = window.navigator.geolocation;
    if (geolocation) {
      geolocation.getCurrentPosition(this.setPosition.bind(this));
    }
  }

  // store lat and long in one sing string variable
  setPosition(position) {
    this.position = position.coords;
    this.latlng = `lat=${this.position['latitude']}&lon=${
      this.position['longitude']
    }`;
  }

  // use position and api call to get weather and location data
  getLocalInfo(callback: Function) {
    this.url =
      environment.openWeatherMap.url +
      this.latlng +
      '&APPID=' +
      environment.openWeatherMap.appId +
      '&units=metric';

    // openweathermap.org api call
    this.http
      .get(this.url)
      .pipe(finalize(() => callback()))
      .subscribe(
        data => {
          this.weatherDesc = data['weather'][0]['description'];
          this.temp =
            Math.round(data['main']['temp']) + String.fromCharCode(176) + 'C';
          this.city = data['name'];
          this.country = data['sys']['country'];
        },
        // TODO handle weather request error
        error => console.log(error)
      );
  }
}
