import {ProductModel} from "./Product.model";
import {ImportingReturnBillModel} from "./Importing-return-bill.model";

export class ImportingReturnTransactionModel {
  id!: string | null;
  bill!: ImportingReturnBillModel | null;
  product!: ProductModel | null;
  quantity!: number | null;
  amount!: number | null;
}
