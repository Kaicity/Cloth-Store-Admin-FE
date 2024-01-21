import {AfterViewInit, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';


interface SpecificationProduct{
  value: number;
  display: string;
}

@Component({
  selector: 'app-add-product',
  templateUrl: './app-add-product.component.html',

})

export class AppAddProductComponent implements OnInit, AfterViewInit {

  isInsertChose: boolean = false;
  specificationProducts: SpecificationProduct[] = [{value: 0, display: 'LOW'}, {value: 1, display: 'NORMAL'},
                                                    {value: 2, display: 'HIGH'}, {value: 3, display: 'LIMITED'}];

  categoryProducts: SpecificationProduct[] = [{value: 0, display: 'Áo Thun'}, {value: 1, display: 'Áo khoác'},
    {value: 2, display: 'Quần Jean'}, {value: 3, display: 'Áo Couple'},  {value: 3, display: 'Quần short'}];
  specName!: string
  cateName!: string

  constructor() {}

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
}
