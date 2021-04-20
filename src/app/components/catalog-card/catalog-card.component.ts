import { Component, Input } from '@angular/core';
import { CatalogCategory } from 'src/app/entities/catalog';

@Component({
  selector: 'app-catalog-card',
  templateUrl: './catalog-card.component.html',
  styleUrls: ['./catalog-card.component.scss']
})
export class CatalogCardComponent {
  @Input() category: CatalogCategory;

  constructor() { }

}
