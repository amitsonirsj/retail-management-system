import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CatalogResponse } from '../entities/catalog';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(private http: HttpClient) { }

  /** This method will do a http call to get catalog JSON and return */
  public getCatalogJSON(): Observable<CatalogResponse> {
    return this.http.get<CatalogResponse>("./assets/catalog.json");
  }
}
