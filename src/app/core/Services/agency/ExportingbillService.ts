import { Observable } from "rxjs";
import { baseService } from "../Generic/baseService";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ExportingbillService extends baseService{
    public addBill(exportingbillFull:any): Observable<any> {
        return this.post('/api/v1/Exportingbill/create', exportingbillFull);
    }
}
