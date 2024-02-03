import {ProductDto} from "./ProductDto";
import {OptionDto} from "./OptionDto";

export class SizesDto {
  id!: string | null;
  optionProductDto!: OptionDto | null;
  addition!: number | null;
  productDto!: ProductDto | null;
}
