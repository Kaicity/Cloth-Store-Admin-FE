import {CustomerDto} from "./CustomerDto";
import { CustomerInfoDto } from "./CustomerInfoDto";
import {agencyDto} from "./agencyDto";

export class ExportingBillDto {
    id! : String | null;
    dateExport!: Date | null;
    dateCreated!: Date | null;
    total!: number | null;
    status!: String | null;
    customerDto!: CustomerDto | null;
    agencyDto!: agencyDto | null;

}
