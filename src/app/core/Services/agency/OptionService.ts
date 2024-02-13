import {Injectable} from "@angular/core";

import {environment} from "../../environment/Environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
@Injectable(
  {providedIn: "root"}
)
export class OptionService {
  baseUrl: string = environment.warehouseBaseUrl;

  constructor(private http: HttpClient) {}
  public getAllOptionSizes(): Observable<any>{
    return this.http.post(`${this.baseUrl}/api/v1/option/getAllSizes`, {});
  }

  public getAllOptionColors(): Observable<any>{
    return this.http.post(`${this.baseUrl}/api/v1/option/getAllColors`, {});
  }
}
