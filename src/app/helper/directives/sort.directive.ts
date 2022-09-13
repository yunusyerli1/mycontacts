import { Directive, Input, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { Sort } from '../utils/sort';


@Directive({
  selector: '[appSort]'
})
export class SortDirective {

  @Input() appSort!: Array<any>;
  constructor(private elRef: ElementRef) { }

  @HostListener("click")
  sortData() {
    const sort = new Sort();
    const el = this.elRef.nativeElement;
    const order = el.getAttribute("data-order");
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
