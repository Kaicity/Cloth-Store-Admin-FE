import {Observable} from "rxjs";
import {HttpClient} from '@angular/common/http';
import {environment} from "../../Environment/Environment";
import {Injectable} from "@angular/core";

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

  public addProduct(product: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/Food/addProduct`, product)
  }

  public deleteProduct(productId: String): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/v1/Food/deleteProduct/${productId}`,)
  }

  public getProductId(id: String): Observable<any> {
    const body = {id};
    return this.http.post(`${this.baseUrl}/api/v1/Food/seachId`, body)
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
