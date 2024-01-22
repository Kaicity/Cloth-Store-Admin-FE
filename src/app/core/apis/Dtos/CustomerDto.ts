import {DatePipe} from "@angular/common";

export class CustomerDto {
    id!: string | null;
    eid!: string | null;
    fullName!: string | null;
    email!: string | null;
    phone!: string | null;
    address!: string | null;
    password!: string | null;
    birthday!: DatePipe | null;
    gender!: string | null;
    date_create!: DatePipe | null;
    date_update!: DatePipe | null;
    ranking!: string | null;

}
