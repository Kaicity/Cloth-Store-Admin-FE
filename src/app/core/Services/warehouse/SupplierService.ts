import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
// @ts-ignore
import {WarehouseBaseService} from "../Generic/warehouse-base.service";

@Injectable({
  providedIn: 'root'
}) @Injectable()
export class SupplierService extends WarehouseBaseService {

  public getAllSupplier(): Observable<any> {
    return this.post("/api/v1/Supplier/getAllSupplier", {});
  }

  public deleteSupplierById(id: string): Observable<any> {
    return this.delete("/api/v1/Supplier/", id);
  }

  public createSupplier(supplierModel: any): Observable<any> {
    return this.post("/api/v1/Supplier/create", supplierModel);
  }

  public updateSupplier(supplierModel: any): Observable<any> {
    return this.post("/api/v1/Supplier/updateSupplier", supplierModel);
  }
  public getSupplierId(id: string): Observable<any> {
    return  this.get("/api/v1/Supplier/{{id}}",id)
  }

}
