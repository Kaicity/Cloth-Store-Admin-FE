import {Observable} from "rxjs";

import {Injectable} from "@angular/core";
import {environment} from "../../Environment/Environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  baseUrl: string = environment.warehouseBaseUrl;

  constructor(private http: HttpClient) {
  }

  public addCustomer(customerUser: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/Customer/create`, customerUser);
  }
  public updateCustomer(customerUser: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/Customer/updateCustomer`, customerUser);
  }
  public deleteCustomer(id: String): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/v1/Customer/${id}`,)
  }
  public getCustomerById(id: String): Observable<any> {
    const body = {id};
    return this.http.post(`${this.baseUrl}/api/v1/Customer/getCustomerById`, body)
  }
  public getAllCustomer(): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/Customer/getAllCustomer`, {});
  }
  public getUser(username: String, password: String) {
    const body = {username, password};
    return this.http.post("/api/v1/Customer/login", body);
  }

  public addUserInfo(customerUserInfo: any): Observable<any> {
    return this.http.post('/api/v1/Customer/createInfo', customerUserInfo)
  }
}
