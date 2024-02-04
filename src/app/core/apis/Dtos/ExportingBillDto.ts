import {CustomerDto} from "./CustomerDto";
import {agencyDto} from "./AgencyDto";
import {BillStatus} from "../../constanst/BillStatus";
import {DatePipe} from "@angular/common";

export class ExportingBillDto {
  id!: string | null;
  code!: string | null;
  dateExport!: DatePipe | null;
  dateCreated!: DatePipe | null;
  total!: number | null;
  status!: BillStatus | null;
  customerDto!: CustomerDto | null;
  agencyDto!: agencyDto | null;
}
