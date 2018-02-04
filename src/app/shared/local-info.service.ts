// modules
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LocalInfoService {
  position = {};
  latlng: string;
  appId = '0472660f4ad72389269180541cc26370';
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
    this.latlng = this.position['latitude'] + '&lon=' + this.position['longitude'];
  }

  // use position and api call to get weather and location data
  getLocalInfo(callback: Function) {
    this.url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + this.latlng +
      '&APPID=' + this.appId + '&units=metric';

    // openweathermap.org api call
    this.http.get(this.url).subscribe(
      data => {
        this.weatherDesc = data['weather'][0]['description'];
        this.temp = Math.round(data['main']['temp']) + String.fromCharCode(176) + 'C';
        this.city = data['name'];
        this.country = data['sys']['country'];
      },
      err => {
        // TODO handle weather request error
        console.log(err);
      },
      () => {
        callback();
      }
    );
  }

}
