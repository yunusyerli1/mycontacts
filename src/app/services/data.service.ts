import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUsers } from '../models/UserModel';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public searchSubject = new BehaviorSubject<string>('');
  searchQuery$: Observable<string>= this.searchSubject.asObservable();

  USER_DATA: IUsers | undefined;

  constructor(private http: HttpClient) { }

  setSearchTerm(term:string){
    console.log(term)
    this.searchSubject.next(term);
  }

  getSearchTerm() {
    return this.searchSubject.getValue();
  }

  public getUsers(){
    if (this.USER_DATA != undefined) {
      return this.USER_DATA;
    } else {
      return  this.http.get<IUsers>(environment.fakeDataUrl + "/users").toPromise();
    }

  }
}


