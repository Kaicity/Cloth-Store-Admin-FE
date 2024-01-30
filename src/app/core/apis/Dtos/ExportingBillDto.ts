import {CustomerDto} from "./CustomerDto";
import {CustomerInfoDto} from "./CustomerInfoDto";
import {agencyDto} from "./agencyDto";
import {BillStatus} from "../../constanst/bill_Status";

export class ExportingBillDto {
  id!: String | null;
  code!: String | null;
  dateExport!: Date | null;
  dateCreated!: Date | null;
  total!: number | null;
  status!: BillStatus | null;
  customerDto!: CustomerDto | null;
  agencyDto!: agencyDto | null;

}
