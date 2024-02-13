import {DatePipe} from "@angular/common";
import {TypePaymentReceiptModel} from "./TypePaymentReceipt.model";

export class PaymentModel {
  id! : string | null;
  code! : string | null;
  dateUpdated! : DatePipe | null;
  dateCreated! : DatePipe | null;
  total! : number | null;
  status!: string | null;
  typePaymentReceiptDto! : TypePaymentReceiptModel | null;
  note! : string | null;
}
