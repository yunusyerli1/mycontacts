import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../models/UserModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  public getUsers(){
    return  this.http.get<IUser[]>(environment.fakeDataUrl + "/users").toPromise();
  }
}
