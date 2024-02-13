import {DatePipe} from "@angular/common";

export class TypePaymentReceiptModel {
  id! : string;
  dateUpdated! : DatePipe;
  dateCreated! : DatePipe;
  type! : string;
  name! : string;
  description! :string;
}
