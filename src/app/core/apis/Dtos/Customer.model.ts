import {DatePipe} from "@angular/common";

export class CustomerModel {
  id!: string | null;
  eid!: string | null;
  fullName!: string | null;
  email!: string | null;
  phone!: string | null;
  address!: string | null;
  password!: string | null;
  birthday!: DatePipe | null;
  gender!: string | null;
  dateCreate!: DatePipe | null;
  dateUpdate!: DatePipe | null;
  ranking!: string | null;
}
