import {DatePipe} from "@angular/common";

export class agencyDto {
  id!: string | null;
  name!: string | null;
  createdDate!: DatePipe | null;
  updatedDate?: DatePipe | null;
  phone!: string | null;
  address!: string | null;
  code!: string | null;
  companyId!: string | null;
}
