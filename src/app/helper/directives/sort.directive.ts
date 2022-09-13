import { Directive, Input, ElementRef, HostListener } from '@angular/core';
import { Sort } from '../utils/sort';


@Directive({
  selector: '[appSort]'
})
export class SortDirective {

  @Input() appSort!: Array<any>;
  constructor(private elRef: ElementRef) { }

  @HostListener("click")
  sortData() {
    // Create Object of Sort Class
    const sort = new Sort();
    // Get Reference Of Current Clicked Element
    const el = this.elRef.nativeElement;
    // Get In WHich Order list should be sorted by default it should be set to desc on element attribute
    const order = el.getAttribute("data-order");

    // Get The Property Name from Element Attribute
    const property = el.getAttribute("data-name");
    if (order === "desc") {
      this.appSort.sort(sort.startSort(property, order));
      el.setAttribute("data-order", "asc");
    }
    else {
      this.appSort.sort(sort.startSort(property, order));
      el.setAttribute("data-order", "desc");
    }
  }
}
