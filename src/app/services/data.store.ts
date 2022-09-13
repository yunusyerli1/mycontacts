import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, map, shareReplay, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { IUser, IUsers } from "../models/UserModel";
import { LoadingService } from "./loading.service";

@Injectable({
  providedIn: 'root'
})
export class DataStore {

  private usersSubject = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]>= this.usersSubject.asObservable();

  private usersSubjectTemp = new BehaviorSubject<IUser[]>([]);

  constructor(private http: HttpClient,
    private loadingService: LoadingService) {
    this.loadAllUsers()
  }

  private loadAllUsers() {
    this.loadingService.loadingOn();
    const loadUsers$ = this.http.get<IUsers>(environment.fakeDataUrl + "/users").pipe(
      map(data => data.users),
      catchError(err => {
        const message = "Could not load users"
        console.log(message, err)
        return throwError(()=> err)
      }),
      tap(users => this.usersSubject.next(users)),
      tap(users => this.usersSubjectTemp.next(users)),
    ).subscribe()
    this.loadingService.loadingOff();
  }

  addUser(user: IUser) {
    const users = this.usersSubject.getValue();
    const newUser: IUser = user;
    const newUsers: IUser[] = users.slice(0);
    newUsers.push(newUser);
    this.usersSubject.next(newUsers);
  }

  filterByLastName(lastname:string){
    this.users$
    .pipe(
      //tap(users => this.usersSubjectTemp.next(users)),
      map(users => users.filter(user => user.lastName == lastname)),
      tap(users => this.usersSubject.next(users)),
    ).subscribe()
  }

  clearFilter() {

    const users = this.usersSubjectTemp.getValue();
    console.log(users)
    this.usersSubject.next(users)
  }

}
