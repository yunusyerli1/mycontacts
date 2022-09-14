import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, finalize, map, shareReplay, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { IUser, IUsers } from "../models/UserModel";
import { ErrorMessageService } from "./error-message.service";
import { LoadingService } from "./loading.service";

@Injectable({
  providedIn: 'root'
})
export class DataStore {

  private usersSubject = new BehaviorSubject<IUser[]>([]);
  private usersSubjectTemp = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]>= this.usersSubjectTemp.asObservable();

  constructor(private http: HttpClient,
    private loadingService: LoadingService,
    private errorMessageService: ErrorMessageService) {
    this.loadAllUsers()
  }

  private loadAllUsers() {
    this.loadingService.loadingOn()
    const loadUsers$ = this.http.get<IUsers>(environment.fakeDataUrl + "/uses").pipe(
      map(data => data.users),
      catchError(err => {
        const message = "Could not load users";
        this.errorMessageService.showErrors(message)
        console.log(message, err)
        return throwError(()=> err)
      }),
      tap(users => this.usersSubject.next(users)),
      tap(users => this.usersSubjectTemp.next(users)),
      finalize(()=> this.loadingService.loadingOff())
    ).subscribe()

  }

  addUser(user: IUser) {
    const users = this.usersSubject.getValue();
    const newUser: IUser = user;
    const newUsers: IUser[] = users.slice(0);
    newUsers.push(newUser);
    this.usersSubject.next(newUsers);
  }

  filterByLastName(lastname:string){
    this.clearFilter();
    this.users$.pipe(
      map(users => users.filter(user => user.lastName == lastname)),
      tap(users => this.usersSubjectTemp.next(users)),
    ).subscribe()
  }

  clearFilter() {
    const users = this.usersSubject.getValue();
    this.usersSubjectTemp.next(users)
  }

}
