import {Observable} from "rxjs";
import {HttpClient} from '@angular/common/http';

import {environment} from "../../environment/Environment";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
}) @Injectable()
export class ExportingbillService {
  baseUrl: string = environment.agencyBaseUrl;

  constructor(private http: HttpClient) {
  }

  public getAllBill(): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/Exportingbill/getAllExportingBill`, {});
  }
}
