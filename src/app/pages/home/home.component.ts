import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IUser } from 'src/app/models/UserModel';
import { DataService } from 'src/app/services/data.service';
import { DataStore } from 'src/app/services/data.store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  users$!:Observable<IUser[]>;

  constructor(
    private dataService: DataService,
    private dataStore: DataStore) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.users$ = this.dataStore.users$;

    this.dataService.searchQuery$.pipe(
      tap(val => this.dataStore.filterByLastName(val))
    ).subscribe()
  }

}
