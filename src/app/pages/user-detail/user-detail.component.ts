import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/models/UserModel';
import { DialogWindowService } from 'src/app/services/dialog-window.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user: IUser;
  public title = "Dialog Window Title";
  public message = "Dialog Message";

  constructor(private route: ActivatedRoute,  private readonly _dialogService: DialogWindowService) { }

  ngOnInit(): void {
    this.user = this.route.snapshot.data["user"];
    console.log(this.user)
  }

  public showModalOkWindow():void{
    this._dialogService.showDialogOk(this.title, this.message).subscribe(btn =>{
      console.log(btn);
    });
  }

  public showModalCancelOkWindow():void{
    this._dialogService.showDialogCancelOK(this.title, this.message).subscribe(btn =>{
      console.log(btn);
    });
  }

  public showModalAndCloseWindow():void{
    this._dialogService.showDialogOk(this.title, this.message);

    setTimeout(() =>
      this._dialogService.closeDialog()
    , 2000);
  }

}
