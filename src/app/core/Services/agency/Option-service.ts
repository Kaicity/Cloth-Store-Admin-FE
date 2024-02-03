import {Injectable} from "@angular/core";
import {environment} from "../../Environment/Environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {OptionDto} from "../../apis/Dtos/OptionDto";
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
