import {CateloryDto} from "./CateloryDto";
import {CompanyDto} from "./CompanyDto";
import {ColorsDto} from "./ColorsDto";
import {SizesDto} from "./SizesDto";


export class ProductDto {
    id!:String | null;
    code!: String | null;
    price!:number | null;
    name!:String | null;
    discription!: string | null;
    status!: string | null;
    cateloryDto!:CateloryDto | null;
    companyDto!:CompanyDto | null;
    image!: String | null;
    specification!: String | null;
    colors! : ColorsDto[] | null;
    sizes! : SizesDto[] | null;

  constructor(data? : ProductDto) {
    const product = data == null ? this : data;
    this.id = product.id;
    this.code = product.code;
    this.price = product.price;
    this.name = product.name;
    this.discription = product.discription;
    this.status = product.status;
    this.cateloryDto = product.cateloryDto;
    this.companyDto = product.companyDto;
    this.image = product.image;
    this.specification = product.specification;
    let sizes :SizesDto[]=[];
      if (product.sizes) {
          for (let i of product.sizes!) {
            sizes.push(new SizesDto(i));
          }
          this.sizes = sizes;
      }

    let colors :ColorsDto[]=[];
    if (product.colors) {
      for (let i of product.colors!) {
        colors.push(new ColorsDto(i));
      }
      this.colors = colors;
    }
  }
}
