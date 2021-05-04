import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth, Carer } from 'src/app/controller/interfaces/carer.interface';
import { map } from 'rxjs/operators';
import { Elderly } from 'src/app/controller/interfaces/elderly.interface';

@Injectable({
  providedIn: 'root',
})
export class VitaappService {
  BASE_URL = 'http://localhost:8080/vitaapp/api/v1';
  httpOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };

  carerInformation: Carer;

  colors = [];

  constructor(private http: HttpClient) {}

  concatURL(subURL: string): string {
    return this.BASE_URL + subURL;
  }

  makePostRequest(
    URL: string,
    data: any,
    headers = this.httpOptions
  ): Observable<any> {
    return this.http.post(URL, data, headers);
  }

  makeGetRequest(URL: string, headers = this.httpOptions): Observable<any> {
    return this.http.get(URL, headers);
  }

  makeDelRequest(URL: string, headers = this.httpOptions): Observable<any> {
    return this.http.delete(URL, headers);
  }

  makePutRequest(
    URL: string,
    data: any,
    headers = this.httpOptions
  ): Observable<any> {
    return this.http.put(URL, data, headers);
  }

  // *-------------------------Login Servicios------------------------
  registerCarer(carer: Carer): Observable<any> {
    const PATH = this.concatURL(`/carer/register`);
    return this.makePostRequest(PATH, carer);
  }

  loginCarer(auth: Auth): Observable<any> {
    const PATH = this.concatURL(`/carer/auth`);
    return this.makePostRequest(PATH, auth);
  }

  // *-------------------------Informacion Usuario------------------------
  validToken(): Observable<any> {
    const PATH = this.concatURL(`/any/valid`);
    return this.makeGetRequest(PATH);
  }

  meInformation(): Observable<any> {
    const PATH = this.concatURL(`/carer/me`);
    if (!this.carerInformation) {
      return this.makeGetRequest(PATH).pipe(
        map((resp: Carer) => {
          this.carerInformation = resp;
          return resp;
        })
      );
    } else {
      return of(this.carerInformation);
    }
  }

  // *-------------------------Adulto Mayor------------------------

  saveElderly(elderly: Elderly): Observable<any> {
    const PATH = this.concatURL(`/elderly/register`);
    return this.makePostRequest(PATH, elderly);
  }

  getAllElderlies(carerId: number): Observable<any> {
    const PATH = this.concatURL(`/elderly/carer/${carerId}`);
    return this.makeGetRequest(PATH);
  }
}
