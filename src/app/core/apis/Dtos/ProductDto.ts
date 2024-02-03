import {CateloryDto} from "./CateloryDto";
import {CompanyDto} from "./CompanyDto";
import {ColorsDto} from "./ColorsDto";
import {SizesDto} from "./SizesDto";


export class ProductDto {
    id!:String | null;
    code!: String | null;
    price!:number | null;
    name!:String | null;
    description!: string | null;
    status!: string | null;
    cateloryDto!:CateloryDto | null;
    companyDto!:CompanyDto | null;
    image!: String | null;
    specification!: String | null;
    colors! : ColorsDto[] | null;
    sizes! : SizesDto[] | null;
}
