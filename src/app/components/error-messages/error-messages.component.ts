import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ErrorMessageService } from 'src/app/services/error-message.service';

@Component({
  selector: 'app-error-messages',
  templateUrl: './error-messages.component.html',
  styleUrls: ['./error-messages.component.scss']
})
export class ErrorMessagesComponent implements OnInit {

  showMessages = false;
  errors$: Observable<string[]>;

  constructor(public errorMessagesService: ErrorMessageService) {}

  ngOnInit() {
    this.errors$ = this.errorMessagesService.errors$
      .pipe(
          tap(() => this.showMessages = true)
      );
  }

  onClose() {
    this.showMessages = false;
  }

}
