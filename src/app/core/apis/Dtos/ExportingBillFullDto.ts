import { ExportingBillDto } from "./ExportingBillDto";
import { ExportingBillTransactionDto } from "./ExportingBillTransactionDto";

export class ExportingBillFullDto {
    exportingBillDto! : ExportingBillDto | null;
    exportingBillTransactionDtos! : ExportingBillTransactionDto[] | null;
}
