import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser, IUsers } from '../models/UserModel';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  private searchSubject = new BehaviorSubject<string>('');
  searchQuery$: Observable<string>= this.searchSubject.asObservable();

  constructor(private http: HttpClient) { }

  setSearchTerm(term:string){
    console.log(term)
    this.searchSubject.next(term);
  }

  getSearchTerm() {
    return this.searchSubject.getValue();
  }

  public getUsers(): Observable<IUser[]> {
    return  this.http.get<IUsers>(environment.fakeDataUrl + "/users").pipe(
      map(data => data.users)
    )
  }
}


