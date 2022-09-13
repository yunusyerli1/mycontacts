import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser, IUsers } from 'src/app/models/UserModel';
import { DataService } from 'src/app/services/data.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  users: IUser[] = [];
  sortOrder:string='asc';

  constructor(
    private dataService: DataService,
    private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.getData();
    this.dataService.getSearchTerm();
  }

  async getData() {
    this.loadingService.loadingOn()
    const response= await this.dataService.getUsers();
    this.users = response?.users!;
    this.loadingService.loadingOff()
   this.dataService.searchQuery$.subscribe(
      val=> this.filterByLastName(val)
    )

  }

  filterByLastName(val:string) {
    console.log(val)
   this.users.filter(user => user.lastName == val)
  }

}
