import { Component, OnInit } from '@angular/core';
import { DialogButtonModel, DialogWindowModel } from 'src/app/models/DialogModel';
import { DialogStorageService } from 'src/app/services/dialog-storage.service';

@Component({
  selector: 'app-dialog-window',
  templateUrl: './dialog-window.component.html',
  styleUrls: ['./dialog-window.component.scss']
})
export class DialogWindowComponent {
  public visible: boolean = false;

  model: DialogWindowModel;

  constructor(
      private readonly _dialogStorageService :DialogStorageService
  ) {
      this._dialogStorageService.observableDataForWindow().subscribe(
          data =>{
              if(data){
                  this.visible = true;
                  this.model = data;
              }
              else
              {
                  this.visible = false;
              }
          });
  }


  public buttonClick(btn: DialogButtonModel): void {
      this.visible = false;

      if(btn.clickHandler) {
          btn.clickHandler(btn);
      }
  }

}
