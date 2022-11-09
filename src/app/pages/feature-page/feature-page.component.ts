import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs/operators';
import { UserFacade, UserState } from './user.facade';
@Component({
  selector: 'app-feature-page',
  templateUrl: './feature-page.component.html',
  styleUrls: ['./feature-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeaturePageComponent implements OnInit {

  searchTerm: FormControl;
  showButton = true;
  vm$: Observable<UserState> = this.facade.vm$;

  constructor(public facade: UserFacade) { }

  ngOnInit() {
    const {criteria} = this.facade.getStateSnapshot();

    this.searchTerm = this.facade.buildSearchTermControl();
    this.searchTerm.patchValue(criteria, { emitEvent: false });
  }

  getPageSize() {
    this.showButton = false;
  }

}

