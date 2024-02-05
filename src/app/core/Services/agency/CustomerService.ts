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

  public addUser(customerUser: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/Customer/create`, customerUser);
  }

  public getUser(username: String, password: String) {
    const body = {username, password};
    return this.http.post("/api/v1/Customer/login", body);
  }

  public addUserInfo(customerUserInfo: any): Observable<any> {
    return this.http.post('/api/v1/Customer/createInfo', customerUserInfo)
  }
}
