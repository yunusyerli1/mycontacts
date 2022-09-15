import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IUser } from 'src/app/models/UserModel';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  users$!:Observable<IUser[]>

  constructor(
    private dataService: DataService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.users$ = this.dataService.users$;
  }

}
