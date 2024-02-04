import {OptionDto} from "./OptionDto";
import {ProductDto} from "./ProductDto";

export class ColorsDto {
  id!: string | null;
  optionProductDto!: OptionDto | null;
  addition!: number | null;
  productDto!: ProductDto | null;
  image!: string | null;
}
