import {Injectable} from "@angular/core";
import {environment} from "../../environment/Environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable(
  {providedIn: "root"}
)
export class TypePaymentService {
  baseUrl: string = environment.agencyBaseUrl;

  constructor(private http: HttpClient) {}
  public getAllOptionSizes(): Observable<any>{
    return this.http.post(`${this.baseUrl}/api/v1/typePaymentReceipt/getAllPayments`, {});
  }

  public getAllOptionColors(): Observable<any>{
    return this.http.post(`${this.baseUrl}/api/v1/typePaymentReceipt/getAllReceipts`, {});
  }
}
