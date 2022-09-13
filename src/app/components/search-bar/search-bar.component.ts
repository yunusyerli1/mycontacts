import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { DataStore } from 'src/app/services/data.store';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  term: string ='';

  constructor(private dataService: DataService, private dataStore: DataStore) { }

  ngOnInit(): void {
  }

  filterByLastName() {
    if(this.term != '') this.dataService.setSearchTerm(this.term.trim());
  }

  clearFilter() {
    this.dataStore.clearFilter();
    this.term='';
  }

}
