import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/UserModel';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() userList: IUser[] = [];

  constructor() { }

  ngOnInit(): void {}



}
