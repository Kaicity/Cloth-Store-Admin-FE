import {Injectable} from "@angular/core";
import {environment} from "../../environment/Environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AgencyBaseService} from "../generic/agency-base-service";

@Injectable(
  {providedIn: "root"}
)
export class TypePaymentService extends AgencyBaseService{

  public getAllOptionSizes(): Observable<any>{
    return this.post("/api/v1/typePaymentReceipt/getAllPayments", {});
  }

  public getAllOptionColors(): Observable<any>{
    return this.post("/api/v1/typePaymentReceipt/getAllReceipts", {});
  }
}
