import {DatePipe} from "@angular/common";


export class SupplierModel{
  id! : string | null;
  code! : string | null;
  name! : string | null;
  phone! : string | null;
  address! : string | null;
  status!: string | null;
  dateCreate! : DatePipe | null;
  dateUpdate! : DatePipe | null;
}

