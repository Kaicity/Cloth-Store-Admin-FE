export class ColorsDto {
  id!: String | null;
  name!: String | null;
  addition!: number | null;
  productDto!: String | null;
  image!: String | null;

  constructor(data : ColorsDto) {
    const size = data == null ? this : data;
    this.id = size.id;
    this.name = size.name;
    this.addition = size.addition;
    this.image = size.image;
    this.productDto = size.productDto;

  }
}
