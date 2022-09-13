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
  }

  async getData() {
    this.loadingService.loadingOn()
    const response= await this.dataService.getUsers();
    this.users = response?.users!;
    this.loadingService.loadingOff()
    console.log(this.users)
  }

  sortUsers(sortKey:string) {
    // this.users.sort((a:any,b:any)=> {
    //   const nameA = a.firstName.toLowerCase();
    //   const nameB = b.firstName.toLowerCase();
    //   if(nameA < nameB) return -1;
    //   if(nameA > nameB) return 1;
    //   return 0;
    // })
    this.users.sort((a:any,b:any)=> {
      if (a[sortKey] < b[sortKey]) return -1;
          else if (a[sortKey] > b[sortKey]) return 1;
          else return 0;
    })
  }

}
