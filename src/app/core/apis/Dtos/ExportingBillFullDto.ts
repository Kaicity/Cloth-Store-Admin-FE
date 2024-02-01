import { ExportingBillDto } from "./ExportingBillDto";
import { ExportingBillTransactionDto } from "./ExportingBillTransactionDto";

export class ExportingBillFullDto {
    exportingBill! : ExportingBillDto | null;
    exportingBillTransactions! : ExportingBillTransactionDto[] | null;
}
