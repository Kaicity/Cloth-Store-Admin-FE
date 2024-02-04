import {CateloryDto} from "./CateloryDto";
import {CompanyDto} from "./CompanyDto";
import {ColorsDto} from "./ColorsDto";
import {SizesDto} from "./SizesDto";


export class ProductDto {
  id!: string | null;
  code!: string | null;
  price!: number | null;
  name!: string | null;
  description!: string | null;
  status!: string | null;
  cateloryDto!: CateloryDto | null;
  companyDto!: CompanyDto | null;
  image!: string | null;
  specification!: String | null;
  colors!: ColorsDto[] | null;
  sizes!: SizesDto[] | null;
}
