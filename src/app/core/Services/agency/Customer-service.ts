import {Observable} from "rxjs";
import {baseService} from "../Generic/baseService";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends baseService{

  public addUser(customerUser:any): Observable<any> {
      return this.post('/api/v1/Customer/create', customerUser);
  }

  public getUser(username: String, password: String){
    const body = {username, password};
    return this.post("/api/v1/Customer/login", body);
  }

  public addUserInfo(customerUserInfo: any): Observable<any> {
    return this.post('/api/v1/Customer/createInfo', customerUserInfo)
  }
}
