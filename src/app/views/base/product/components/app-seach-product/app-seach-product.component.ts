import {AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductService} from "../../../../../core/Services/agency/Product-service";
import {ProductDto} from "../../../../../core/apis/Dtos/ProductDto";
import {Router} from "@angular/router";

declare var toastr: any;

@Component({
  selector: 'app-app-seach-product',
  templateUrl: './app-seach-product.component.html',
})

export class AppSeachProductComponent implements OnInit, AfterViewInit {
  productId: string = '';
  productCode: string = '';
  productName: string = '';

  seachCore: ({ display: string; value: number } | { display: string; value: number } | { display: string; value: number })[] =
    [{display: this.productId, value: 0},
      {display: this.productCode, value: 1},
      {display: this.productName, value: 2}];

  isSeachChose: boolean = false;
  productItem!: ProductDto
  @Output() dataProduct = new EventEmitter<string>;
  isForSeach: boolean = true;

  constructor(private productService: ProductService, private router: Router) {
    this.productItem = new ProductDto();
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
  }

  closeModal() {
    this.isSeachChose = false;
  }

  resetPage() {
    // Get url
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  btnSeachId(productId: string, productCode: string, productName: string) {
    if(this.productId){
      this.dataProduct.emit(this.productId);
    }
    else if(productCode){
      this.dataProduct.emit(this.productCode);
    }
    else if(productName){
      this.dataProduct.emit(this.productName);
    }
    else return;
  }

  loadProductFirst() {
    this.resetPage();
  }
  updateInputs(updatedInput: string) {
    if (this.productId === 'inputId') {
      this.productCode = '';
      this.productName = '';
    } else if (updatedInput === 'inputCode') {
      this.productId = '';
      this.productName = '';
    } else if (updatedInput === 'inputName') {
      this.productId = '';
      this.productCode = '';
    }
  }

  protected readonly Number = Number;
}
