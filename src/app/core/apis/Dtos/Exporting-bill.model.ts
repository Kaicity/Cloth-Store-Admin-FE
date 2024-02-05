import {CustomerModel} from "./Customer.model";
import {BillStatus} from "../../constanst/BillStatus";
import {DatePipe} from "@angular/common";
import {AgencyModel} from "./Agency.model";

export class ExportingBillModel {
  id!: string | null;
  code!: string | null;
  dateExport!: DatePipe | null;
  dateCreated!: DatePipe | null;
  total!: number | null;
  status!: BillStatus | null;
  customer!: CustomerModel | null;
  agency!: AgencyModel | null;
}
