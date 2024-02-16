import {Injectable} from "@angular/core";
import {environment} from "../../environment/Environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AgencyBaseService {
  baseUrl: string = environment.agencyBaseUrl;

  constructor(private http: HttpClient) {
  }

  public post(url : string,body: any): Observable<any> {
    return this.http.post(this.baseUrl + url, body, );
  }
  public delete(url : string, id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}${url}/${id}`);
  }

  public get(url : string, id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}${url}/${id}`);
  }
}
