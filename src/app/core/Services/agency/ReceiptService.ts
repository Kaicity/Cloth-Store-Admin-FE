import {Observable} from "rxjs";
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environment/Environment";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
}) @Injectable()
export class ReceiptService {
  baseUrl: string = environment.agencyBaseUrl;

  constructor(private http: HttpClient) {
  }

  public getAllReceipt(): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/Receipt/getAllReceipt`, {});
  }
  public deleteReceipt(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/v1/Receipt/${id}`,);
  }
  public addReceipt(receiptFull: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/Receipt/createReceipt`, receiptFull);
  }
  public updatePayment(receiptFull: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/Receipt/updateReceipt`, receiptFull);
  }
}
