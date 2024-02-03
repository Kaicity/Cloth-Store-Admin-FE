import {DatePipe} from "@angular/common";

export class OptionDto{
  id!: string | null;
  name!: string | null;
  type!: string | null;
  created_date!: DatePipe | null;
  created_update!: DatePipe | null;
}
