import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/models/UserModel';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user: IUser;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.user = this.route.snapshot.data["user"];
    console.log(this.user)
  }

}
