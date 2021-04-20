import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CatalogBranch, CatalogCategory, CatalogLocation, CatalogResponse } from './entities/catalog';
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
  getCatalogJSONSubscription: Subscription;
  breadcrumbData = {
    home: null,
    category: null
  };

  constructor(
    private catalogService: CatalogService
  ) { }

  ngOnInit() {
    this.subscribe();
  }

  /** This method is to subscribe the observable to get catalog json from a json file */
  subscribe() {
    this.getCatalogJSONSubscription = this.catalogService.getCatalogJSON().subscribe((result: CatalogResponse) => {
      if (result.data) {
        this.locations = [...result.data.locations];
      }
    })
  }

  /** If a location is selected then this method will show all the categories of selected location  */
  showLocationCatagories(location: CatalogLocation) {
    this.categories = [];
    location.branches.forEach(branch => {
      this.categories = [...this.categories, ...branch.categories]
    })
    this.resetBreadcrumb();
  }

  /** If a branch is selected then this method will show all the categories of selected branch */
  showBranchCatagories(branch: CatalogBranch) {
    this.categories = [...branch.categories];
    this.resetBreadcrumb();
  }

  /** If a category is selected then this method will show all the subcategory of selected category */
  showSubCategories(category: CatalogCategory) {
    if (category.subcategories) {
      this.breadcrumbData.category = category;
      this.categories = [...category.subcategories];
    }
  }

  /** This method is to reset breadcrumb state */
  resetBreadcrumb() {
    this.breadcrumbData.home = [...this.categories];
    this.breadcrumbData.category = null;
  }

  /** This method is to go back to home */
  home() {
    this.categories = [...this.breadcrumbData.home];
    this.breadcrumbData.category = null;
  }

  /** This method will unsubscribe the subscribed observable on destroy */
  ngOnDestroy() {
    this.getCatalogJSONSubscription.unsubscribe();
  }
}
