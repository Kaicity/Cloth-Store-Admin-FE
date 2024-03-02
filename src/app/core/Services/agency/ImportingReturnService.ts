import {Injectable} from "@angular/core";
import {AgencyBaseService} from "../generic/agency-base-service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImportingReturnService extends AgencyBaseService {
  public getAllImportingReturn(): Observable<any> {
    return this.post("", {});
  }

  public getImportingReturnById(id: string): Observable<any> {
    return this.get("", id);
  }

  public deleteImportingReturn(id: string): Observable<any> {
    return this.delete("", id);
  }

  public addImportingReturn(exportingReturnFull: any): Observable<any> {
    return this.post("", exportingReturnFull);
  }

  public updateImportingReturn(exportingReturnFull: any): Observable<any> {
    return this.post("", exportingReturnFull);
  }
}
