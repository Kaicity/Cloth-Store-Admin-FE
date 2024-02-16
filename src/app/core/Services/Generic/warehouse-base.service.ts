import {Injectable} from "@angular/core";
import {environment} from "../../environment/Environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {JwtAuthenticationResponseModel} from "../../apis/dtos/Jwt-Authentication-Response.model";

@Injectable({
  providedIn: 'root'
})
export class WarehouseBaseService {
  baseUrl: string = environment.warehouseBaseUrl;

  constructor(private http: HttpClient) {
  }

  public post(url: string, body: any): Observable<any> {
    let authentication = new JwtAuthenticationResponseModel();
    const authResponseString = localStorage.getItem("authentication");
    console.log("Cb vo neeee");
    console.log(authResponseString)
    if (authResponseString) {
      const authResponseData = JSON.parse(authResponseString);
      // Map the data from localStorage to JwtAuthenticationResponseModel
      authentication.token = authResponseData.token;
      authentication.timeStart = authResponseData.timeStart;
      authentication.timeEnd = authResponseData.timeEnd;
    }
    console.log(authentication);
    console.log("Ket qua o tren");
    let token = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + authentication.token // Include the token here
    });
    return this.http.post(this.baseUrl + url, body, {headers: token});
  }

  public delete(url: string, id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}${url}/${id}`);
  }

  public get(url: string, id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}${url}/${id}`);
  }

  public getToken(): HttpHeaders {
    let authentication = new JwtAuthenticationResponseModel();
    const authResponseString = localStorage.getItem("authentication");

    if (authResponseString) {
      const authResponseData = JSON.parse(authResponseString);
      // Map the data from localStorage to JwtAuthenticationResponseModel

      authentication.token = authResponseData.token;
      authentication.timeStart = authResponseData.timeStart;
      authentication.timeEnd = authResponseData.timeEnd;
    }
    console.log(authentication);
    console.log("Ket qua o tren");
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + authentication.token // Include the token here
    });
  }
}
