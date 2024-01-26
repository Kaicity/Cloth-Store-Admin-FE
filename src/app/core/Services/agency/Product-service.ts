import {Observable} from "rxjs";
import {HttpClient} from '@angular/common/http';
import {Environment} from "@angular/cli/lib/config/workspace-schema";
import {environment} from "../../Environment/Environment";
import {Injectable, Injector} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class ProductService {

  baseUrl: string = environment.agencyBaseUrl;

  constructor(private http: HttpClient) {
  }

  public getAllProduct(): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/Food/findAll`, {});
  }


  // public getAllProductByAgencyID(agencyId: string): Observable<any> {
  //   let param = "";
  //   if (agencyId !== null) param = "?agencyId=" + agencyId;
  //   let s = new Date();
  //   return this.http.post(`${this.baseUrl}/api/v1/Food/findAll` + param, {});
  // }

  // public getProductById(id: String): Observable<any> {
  //   const body = {id: id}
  //   return this.get('/api/v1/Food/getFoodId/', body);
  // }
}
