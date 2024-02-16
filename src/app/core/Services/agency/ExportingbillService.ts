import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AgencyBaseService} from "../generic/agency-base-service";

@Injectable({
  providedIn: 'root'
})
export class ExportingbillService extends AgencyBaseService{

  public getAllBill(): Observable<any> {
    return this.post("/api/v1/Exportingbill/getAllExportingBill", {});
  }
}
