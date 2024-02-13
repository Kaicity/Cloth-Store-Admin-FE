import {Observable} from "rxjs";
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environment/Environment";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
}) @Injectable()
export class PaymentService {
  baseUrl: string = environment.agencyBaseUrl;

  constructor(private http: HttpClient) {
  }

  public getAllPayment(): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/Payment/getAllPayment`, {});
  }
  public deletePayment(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/v1/Payment/${id}`,);
  }
  public addPayment(paymentFull: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/Payment/createPayment`, paymentFull);
  }
  public updatePayment(paymentFull: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/Payment/updatePayment`, paymentFull);
  }
}
