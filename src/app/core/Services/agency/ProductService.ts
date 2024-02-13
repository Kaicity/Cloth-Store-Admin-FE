import {Observable} from "rxjs";
import {HttpClient} from '@angular/common/http';

import {Injectable} from "@angular/core";
import {environment} from "../../environment/Environment";
import {BaseSearchModel} from "../../apis/dtos/Base-search.model";
import {ProductModel} from "../../apis/dtos/Product.model";

@Injectable({
  providedIn: 'root'
}) @Injectable()
export class ProductService {

  baseUrl: string = environment.warehouseBaseUrl;

  constructor(private http: HttpClient) {
  }

  public getAllProduct(): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/Food/findAll`, {});
  }

  public advanceSearch(search: BaseSearchModel<ProductModel[]>): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/Food/searchAdvance`, search, {});
  }

  public addProduct(product: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/Food/addProduct`, product)
  }

  public updateProduct(product: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/Food/updateProduct`, product)
  }

  public deleteProduct(productId: String): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/v1/Food/deleteProduct/${productId}`,)
  }

  public getProductId(id: String): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/v1/Food/${id}`,)
  }

  public getProductPrice(priceMin: number, priceMax: number): Observable<any> {
    const body = {priceMin, priceMax};
    return this.http.post(`${this.baseUrl}/api/v1/Food/seachPrice`, body)
  }

  public getProductCode(code: String): Observable<any> {
    const body = {code};
    return this.http.post(`${this.baseUrl}/api/v1/Food/seachCode`, body)
  }

  public getProductName(name: String): Observable<any> {
    const body = {name};
    return this.http.post(`${this.baseUrl}/api/v1/Food/seachName`, body)
  }
}
