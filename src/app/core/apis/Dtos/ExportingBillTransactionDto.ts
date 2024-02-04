import {ExportingBillDto} from "./ExportingBillDto";
import {ProductDto} from "./ProductDto";

export class ExportingBillTransactionDto {
  id!: string | null;
  bill!: ExportingBillDto | null;
  product!: ProductDto | null;
  quantity: number = 1;
  amount!: number | null;
}
