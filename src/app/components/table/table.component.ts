import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/models/UserModel';
import { DataService } from 'src/app/services/data.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  users:IUser[] | undefined;

  constructor(
    private dataService: DataService,
    private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    this.loadingService.loadingOn()
    this.users = await this.dataService.getUsers();
    this.loadingService.loadingOff()
    console.log(this.users)
  }

}
