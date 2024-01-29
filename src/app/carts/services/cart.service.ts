import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  item:any;
  constructor(private http: HttpClient) {}

  addCart(data: any) {
    return this.http.post(environment.baseUrl + 'carts', data);
  }
}
