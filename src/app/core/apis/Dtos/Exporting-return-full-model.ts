import {ExportingReturnModel} from "./Exporting-return-model";
import {ExportingReturnTransactionBillModel} from "./Exporting-return-transaction-model";


export class ExportingReturnFullModel {
  exportingReturn! : ExportingReturnModel | null;
  exportingReturnTransactions! : ExportingReturnTransactionBillModel[] | null;
}
