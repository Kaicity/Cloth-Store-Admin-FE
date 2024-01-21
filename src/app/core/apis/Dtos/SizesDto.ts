

export class SizesDto {
  id!: String | null;
  name!: String | null;
  addition!: number | null;
  productDto!: String | null;


  constructor(data : SizesDto) {
    const size = data == null ? this : data;
    this.id = size.id;
    this.name = size.name;
    this.addition = size.addition;
    this.productDto = size.productDto;
  }
}
