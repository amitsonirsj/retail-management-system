import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { CatalogBranch, CatalogLocation } from 'src/app/entities/catalog';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Input() locations: CatalogLocation[];
  @Output() showLocationCatagories: EventEmitter<CatalogLocation> = new EventEmitter<CatalogLocation>();
  @Output() showBranchCatagories: EventEmitter<CatalogBranch> = new EventEmitter<CatalogBranch>();
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  constructor() { }

  /** This method will close the opened menu bar and emit selected location to parent component */
  showLocation(location: CatalogLocation) {
    this.trigger.closeMenu();
    this.showLocationCatagories.emit(location);
  }
}
