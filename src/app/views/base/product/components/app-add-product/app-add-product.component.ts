import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SizesDto} from "../../../../../core/apis/Dtos/SizesDto";
import {ColorsDto} from "../../../../../core/apis/Dtos/ColorsDto";
import {NgForm, NgModel} from "@angular/forms";


interface SpecificationProduct{
  value: number;
  display: string;
}

@Component({
  selector: 'app-add-product',
  templateUrl: './app-add-product.component.html',

})

export class AppAddProductComponent implements OnInit, AfterViewInit {
  sizes: SizesDto[] = [];
  itemSize: SizesDto;

  colors: ColorsDto[] = [];
  itemColor: ColorsDto;


  isInsertChose: boolean = false;
  specificationProducts: SpecificationProduct[] = [{value: 0, display: 'LOW'}, {value: 1, display: 'NORMAL'},
                                                    {value: 2, display: 'HIGH'}, {value: 3, display: 'LIMITED'}];

  categoryProducts: SpecificationProduct[] = [{value: 0, display: 'Áo Thun'}, {value: 1, display: 'Áo khoác'},
    {value: 2, display: 'Quần Jean'}, {value: 3, display: 'Áo Couple'},  {value: 3, display: 'Quần short'}];
  specName!: string
  cateName!: string

  constructor() {
    this.itemSize = new SizesDto();
    this.itemColor = new ColorsDto();
  }

  ngAfterViewInit(): void {

  }

  onSubmit() {
    console.log("XXX");
  }

  ngOnInit(): void {
    console.log("XXX");
  }

  closeModal() {
    this.isInsertChose = false;
  }

  optionSpecChose(display: string) {
    this.specName = display;
  }

  cateChose(display: string) {
    this.cateName = display;
  }

  //Check input không cho phép nhập chữ
  feePrice: string = '';
  validateInput(event: any): void {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
       event.preventDefault();
    }
  }

  //Table size is show
  showTableSize: boolean = false;
  addSizeToTable(){
    this.sizes.push(this.itemSize);
    if(this.itemSize){
      this.showTableSize = true;
    }
    this.itemSize = new SizesDto();
  }

  //Table color is show
  showTableColor: boolean = false;
  addColorToTable(){
    this.colors.push(this.itemColor);
    if(this.itemColor){
      this.showTableColor = true;
    }
    //Reset binding two way data
    this.itemColor = new ColorsDto();
  }

  removeItemSize(index: number) {
    this.sizes.splice(index, 1);
    if(!this.sizes){
      this.showTableSize = false;
    }
  }

  removeItemColor(index: number) {
    this.colors.splice(index, 1);
    if(!this.colors){
      this.showTableColor = false;
    }
  }
}
