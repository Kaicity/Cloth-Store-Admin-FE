import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AppAddProductComponent} from "../components/app-add-product/app-add-product.component";
import {AppSeachProductComponent} from "../components/app-seach-product/app-seach-product.component";
import {ProductService} from "../../../../core/Services/agency/ProductService";
import {ResponseModel} from "../../../../core/apis/Dtos/ResponseModel";
import {BaseSearchModel} from "../../../../core/apis/Dtos/base-search-model";
import {OptionDto} from "../../../../core/apis/Dtos/OptionDto";
import {OptionService} from "../../../../core/Services/agency/OptionService";
import {ProductDto} from "../../../../core/apis/Dtos/ProductDto";
import {Router} from "@angular/router";

interface btnFunction {
  value: number;
  display: string;
}

@Component({
  selector: 'app-product', templateUrl: './product.component.html', styleUrl: './product.component.scss'
})

export class ProductComponent implements OnInit, AfterViewInit {
  //Format table
  tableFormat: string = "table table-bordered table-striped";
  @ViewChild("searchWrapper") searchWrapper!: AppSeachProductComponent;
  @ViewChild("AddWrapper") addWrapper!: AppAddProductComponent;

  //DTO Product
  productDtos: ProductDto[] = []; // Tao danh sach chua cac mon an
  public search: BaseSearchModel<ProductDto[]> = new BaseSearchModel<ProductDto[]>();

  optionSizes: OptionDto[] = [];
  optionColors: OptionDto[] = [];

  sizesName: any[] = []; //Lưu danh sách Size có tên
  colorsName: any[] = []; //Lưu danh sách Color có tên

  isShowLoading: boolean = false;
  productId: String = '';

  isBtnName: ({ display: string; value: number } | { display: string; value: number })[] = [{
    display: '', value: 0
  }, {display: '', value: 1}];

  constructor(private productService: ProductService, private optionService: OptionService, private router: Router) {
  }

  //custom after
  simulateLoading() {
    this.isShowLoading = true;
    setTimeout(() => {
      this.isShowLoading = false;
    },1500)
  }

  showInsertForm() {
    this.isBtnName[0].value = 0;
    this.isBtnName[0].display = "Thêm";
    this.addWrapper.isInsertChose = true;
  }

  showSeachForm() {
    console.log(this.searchWrapper);
    this.searchWrapper.isSeachChose = true;
  }

  ngOnInit(): void {
    this.getAllProduct();
    //console.log(this.getAllProduct());
    this.getAllOptionSizes();
    this.getAllOptionColors();
  }

  ngAfterViewInit(): void {

  }

  private getAllProduct() {
    this.isShowLoading = true;
    setTimeout(() => {
      this.productService.getAllProduct().subscribe(res => {
        this.getAllProductComplete(res)
      });
      this.isShowLoading = false;
    }, 1500);
  }

  private getAllProductComplete(res: ResponseModel<BaseSearchModel<ProductDto[]>>) {
    if (res.status !== 200) {
      if (res.message) {
        res.message.forEach(value => {
          var t: any;
          t.error.message(value);
        });
        return;
      }
    }
    this.search = res.result;
    this.search.recordOfPage = 25;
    for (let i = 0; i < this.search.recordOfPage; i++) {
      if (this.search.result[i] != undefined) this.productDtos.push(this.search.result[i]);
    }
  }

  getAllOptionSizes() {
    this.optionService.getAllOptionSizes().subscribe(res => {
      this.optionSizes = res.result;
      this.sizesName = this.optionSizes;
    });
  }

  getAllOptionColors() {
    this.optionService.getAllOptionColors().subscribe(res => {
      this.optionColors = res.result;
      this.colorsName = this.optionColors;
    });
  }

  getProductData(id: String, product: ProductDto) {
    console.log("Product id: " + id);
    this.productId = id;
    //APIs get product by id
    this.productService.getProductId(id).subscribe((res) => {
      product = res;
    })
  }

  resetPage() {
    // Get url
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  deleteProduct() {
    if (this.productId) {
      this.productService.deleteProduct(this.productId).subscribe((res) => {
        alert("Đã xóa sản phẩm");
        this.resetPage();
      }, error => {
        alert("Lỗi khi xóa sản phẩm này");
      })
    }
  }

  updateProduct() {
    this.showInsertForm();
    this.isBtnName[0].value = 1;
    this.isBtnName[0].display = "Cập nhật"
  }

  receiveDataFromChildForId(productId: string) {
    if (productId) {
      this.productService.getProductId(productId).subscribe((res) => {
        this.productDtos = [];
        this.productDtos.push(res.result);
      })
    } else {
      this.getAllProduct();
    }
  }

  receiveDataFromChildForCode(productCode: string) {
    if (productCode) {
      this.productService.getProductCode(productCode).subscribe((res) => {
        this.productDtos = [];
        this.productDtos.push(res.result);
      })
    } else {
      this.getAllProduct();
    }
  }

  receiveDataFromChildForName(productName: string) {
    if (productName) {
      this.productService.getProductName(productName).subscribe((res) => {
        this.productDtos = [];
        this.productDtos = res.result.result;
      })
    } else {
      this.getAllProduct();
    }
  }
}
