import {Observable} from "rxjs";
import {HttpClient} from '@angular/common/http';
import {Environment} from "@angular/cli/lib/config/workspace-schema";
import {environment} from "../../Environment/Environment";
import {Injectable, Injector} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class ExportingbillService {
  baseUrl: string = environment.agencyBaseUrl;

  constructor(private http: HttpClient) {
  }

  public getAllBill(): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/Exportingbill/getAllExportingBill`, {});
  }
}
