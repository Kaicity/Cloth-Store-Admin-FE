import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {ModalWrapperComponent} from "../../../../shared/components/modal-wrapper/modal-wrapper.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppAddProductComponent} from "../components/app-add-product/app-add-product.component";
import {AppSeachProductComponent} from "../components/app-seach-product/app-seach-product.component";



export interface PeriodicElement {
  id: string;
  code: string;
  name: string;
  price: number;
  status: string;
  image: string;
  description: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {id: '004b058d-f2c2-439a-8aed-047e0b7dea6e', code: 'Product25', name: 'MORE MONEY MORE PROBLEMS T-SHI', price: 104.00, status: 'DONE', image: 'assets/food_5.jpg', description: 'Nhập khẩu từ USA'},
  {id: '004b058d-f2c2-439a-8aed-047e0b7dea6e', code: 'Product33', name: 'KINGELI', price: 102.98, status: 'DONE', image: 'assets/food_5.jpg', description: 'Nhập khẩu từ VIETNAM'},
  {id: '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d', code: 'Product26', name: 'ANOTHER EXAMPLE T-SHIRT', price: 89.99, status: 'IN_PROGRESS', image: 'assets/food_6.jpg', description: 'Mẫu mới từ Italy'},
  {id: '7d8e9f0a-1b2c-3d4e-5f6a-7b8c9d0e1f2', code: 'Product27', name: 'COOL DESIGN HOODIE', price: 120.50, status: 'DONE', image: 'assets/food_7.jpg', description: 'Chất liệu cao cấp'},
  {id: '3g4h5i6j-7k8l9m0n-1o2p3q4r5s6t', code: 'Product28', name: 'FUNKY PATTERN SHORTS', price: 55.00, status: 'IN_PROGRESS', image: 'assets/food_8.jpg', description: 'Phong cách mới lạ'},
  {id: '9u0v1w2x3y4z5a6b7c8d9e0f', code: 'Product29', name: 'RETRO STYLE SNEAKERS', price: 75.99, status: 'DONE', image: 'assets/food_9.jpg', description: 'Đẹp và thoải mái'},
  {id: 'a1b2c3d4-e5f6a7b8-c9d0e1f2-3g4h5i6j', code: 'Product30', name: 'VINTAGE DENIM JACKET', price: 150.00, status: 'IN_PROGRESS', image: 'assets/food_10.jpg', description: 'Sành điệu và phong cách'},
  {id: '7k8l9m0n-1o2p3q4r-5s6t7u8v-9w0x1y2z', code: 'Product31', name: 'SPORTY TRACK PANTS', price: 45.50, status: 'DONE', image: 'assets/food_11.jpg', description: 'Thích hợp cho hoạt động thể thao'},
  ];


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'

})

export class ProductComponent implements OnInit, AfterViewInit{
  dataSource = ELEMENT_DATA;
  //Format table
  tableFormat: string = "table table-bordered table-striped";
  @ViewChild("searchWrapper") searchWrapper!:AppSeachProductComponent;
  @ViewChild("AddWrapper") addWrapper!:AppAddProductComponent;

  constructor(private fb: FormBuilder) {}

 showInsertForm(){
   console.log(this.addWrapper);
   this.addWrapper.isInsertChose = true;
 }

 showSeachForm(){
   console.log(this.searchWrapper);
   this.searchWrapper.isSeachChose = true;
 }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    console.log(this.addWrapper);
    console.log(this.searchWrapper);
  }
}
