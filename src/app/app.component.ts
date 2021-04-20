import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Subscription } from 'rxjs';
import { CatalogBranch, CatalogCategory, CatalogLocation, CatalogResponse } from './entities/catatog';
import { CatalogService } from './services/catalog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(300)),
    ]),
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  locations: CatalogLocation[];
  categories: CatalogCategory[];
  breadcrumbData = {
    home: null,
    category: null
  };
  getCatalogJSONSubscription: Subscription;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  constructor(private catalogService: CatalogService) { }

  ngOnInit() {
    this.getCatalogJSONSubscription = this.catalogService.getCatalogJSON().subscribe((result: CatalogResponse) => {
      if (result.data) {
        this.locations = [...result.data.locations];
      }
    })
  }

  showLocationCatagories(location: CatalogLocation) {
    this.trigger.closeMenu();
    let categories = [];
    location.branches.forEach(branch => {
      categories = [...categories, ...branch.categories]
    })
    this.categories = [...categories];
    this.resetBreadcrumb();
  }

  showBranchCatagories(branch: CatalogBranch) {
    this.categories = [...branch.categories];
    this.resetBreadcrumb();
  }

  showSubCategories(category: CatalogCategory) {
    if (category.subcategories) {
      this.breadcrumbData.category = category;
      this.categories = [...category.subcategories];
    }
  }

  resetBreadcrumb() {
    this.breadcrumbData.home = this.categories;
    this.breadcrumbData.category = null;
  }

  home() {
    this.categories = this.breadcrumbData.home;
    this.breadcrumbData.category = null;
  }

  ngOnDestroy() {
    this.getCatalogJSONSubscription.unsubscribe();
  }
}
