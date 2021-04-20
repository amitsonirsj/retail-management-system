import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CatalogResponse } from '../entities/catatog';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(private http: HttpClient) { }

  public getCatalogJSON(): Observable<CatalogResponse> {
    return this.http.get<CatalogResponse>("./assets/catalog.json");
  }
}
