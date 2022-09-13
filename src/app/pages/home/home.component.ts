import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { IUser, IUsers } from 'src/app/models/UserModel';
import { DataService } from 'src/app/services/data.service';
import { DataStore } from 'src/app/services/data.store';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  users$!:Observable<IUser[]>;
  sortOrder:string='asc';
  errorMessage:string='';

  constructor(
    private dataService: DataService,
    private dataStore: DataStore,
    private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.getData();
    //this.dataService.getSearchTerm();
  }

  getData() {
   // this.loadingService.loadingOn()
    // this.dataService.getUsers().subscribe({
    //     next: (response) => {
    //       console.log(response)
    //       this.users$ = of(response);
    //     },
    //     error: (error) => {
    //       console.error('Request failed with error')
    //       this.errorMessage = error.statusText;
    //     },
    //     complete: () => {
    //       this.loadingService.loadingOff();
    //     }
    //   }
    // );
    this.users$ = this.dataStore.users$;

    this.dataService.searchQuery$.pipe(
      tap(val => this.dataStore.filterByLastName(val))
    ).subscribe()
  }

}
