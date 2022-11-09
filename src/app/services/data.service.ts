import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser, IUsers } from '../models/UserModel';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { LoadingService } from './loading.service';
import { ErrorMessageService } from './error-message.service';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  private usersSubject = new BehaviorSubject<IUser[]>([]);
  private usersSubjectTemp = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]>= this.usersSubjectTemp.asObservable();

  private searchSubject = new BehaviorSubject<string>('');
  searchQuery$: Observable<string>= this.searchSubject.asObservable();

  constructor(private http: HttpClient,
    private loadingService: LoadingService,
    private errorMessageService: ErrorMessageService) {
    this.loadAllUsers()
  }

  private loadAllUsers() {
    this.loadingService.loadingOn()
    this.http.get<IUsers>(environment.fakeDataUrl + "/users").pipe(
      map(data => data.users),
      catchError(err => {
        const message = "Could not load users";
        this.errorMessageService.showErrors(message)
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
    this.usersSubjectTemp.next(newUsers);
    this.usersSubject.next(newUsers);
  }

  filterByLastName(lastname:string){
    this.clearFilter();
    this.users$.pipe(
      map(users => users.filter(user => user.lastName.toLocaleLowerCase() == lastname)),
      tap(users => this.usersSubjectTemp.next(users)),
    ).subscribe()
  }

  clearFilter() {
    const users = this.usersSubject.getValue();
    this.usersSubjectTemp.next(users)
  }

  loadUser(id) {
    this.loadingService.loadingOn()
   return this.http.get<IUser>(environment.fakeDataUrl + "/users/"+id).pipe(
      map(data => data),
      tap(data => console.log(data)),
      catchError(err => {
        const message = "Could not load user";
        this.errorMessageService.showErrors(message)
        return throwError(()=> err)
      }),
      finalize(()=> this.loadingService.loadingOff())
    )
  }

}


