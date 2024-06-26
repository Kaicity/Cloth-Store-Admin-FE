import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AppAddProductComponent} from "../components/app-add-product/app-add-product.component";
import {AppSeachProductComponent} from "../components/app-seach-product/app-seach-product.component";
import {ProductService} from "../../../../core/Services/agency/ProductService";
import {ResponseModel} from "../../../../core/apis/Dtos/Response.model";
import {BaseSearchModel} from "../../../../core/apis/Dtos/Base-search.model";
import {OptionService} from "../../../../core/Services/agency/OptionService";
import {ProductModel} from "../../../../core/apis/Dtos/Product.model";
import {Router} from "@angular/router";
import {firebaseConfig} from "../../../../core/Environment/environnemtFireBase";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {OptionModel} from "../../../../core/apis/Dtos/Option.model";

interface btnFunction {
  value: number;
  display: string;
}

interface IMageInFirebase {
  pathInDB: string;
  PathInFirebase: string;
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
  productDtos: ProductModel[] = []; // Tao danh sach chua cac mon an
  public search: BaseSearchModel<ProductModel[]> = new BaseSearchModel<ProductModel[]>();

  optionSizes: OptionModel[] = [];
  optionColors: OptionModel[] = [];

  sizesName: any[] = []; //Lưu danh sách Size có tên
  colorsName: any[] = []; //Lưu danh sách Color có tên

  isShowLoading: boolean = false;
  productId: String = '';
  imageUrls: { [key: string]: string } = {};

  isBtnName: ({ display: string; value: number } | { display: string; value: number })[] = [{
    display: '', value: 0
  }, {display: '', value: 1}];

  // pathInDB sẽ là image trong csdl , PathInFirebase là image trên firebase

  ImageInFirebase: IMageInFirebase[] = [
    {pathInDB: 'assets/food_default.jpg', PathInFirebase: 'assets/food_default.jpg'},
  ];

  constructor(private productService: ProductService, private optionService: OptionService,
              private router: Router, private firebaseStorage: AngularFireStorage) {
  }

  //custom after
  simulateLoading() {
    this.isShowLoading = true;
    setTimeout(() => {
      this.isShowLoading = false;
    }, 1500)
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
    this.productService.getAllProduct().subscribe(res => {
      this.getAllProductComplete(res)
    });
    this.isShowLoading = false;
  }

  async getAllProductComplete(res: ResponseModel<BaseSearchModel<ProductModel[]>>) {
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

    // lấy lấy hết địa chỉ hình ảnh trong csdl
    let imagePath: string[] = [];
    for (let i = 0; i < this.search.result.length; i++) {
      if (!imagePath.includes(this.search.result[i].image)) {
        imagePath.push(this.search.result[i].image);
      }
    }

    //cập nhật địa chỉ hình anh firebase cho từng sản phẩm
    await this.loadImages(imagePath);
    for (let i = 0; i < this.search.result.length; i++) {
      if (this.search.result[i] != undefined) {
        try {
          const foundElement = this.ImageInFirebase.find(element =>
            element.pathInDB === this.search.result[i].image);

          if (foundElement) this.search.result[i].image = foundElement!.PathInFirebase;
          else this.search.result[i].image = this.ImageInFirebase[0].PathInFirebase;
        } catch (error) {
          // Xử lý lỗi nếu cần
          console.error('Error loading image:', error);
        }
      }
    }

    // thêm 25 sản phẩm đầu tiên để show
    this.search.recordOfPage = 25;
    for (let i = 0; i < this.search.recordOfPage; i++) {
      if (this.search.result[i] != undefined) {
        // lấy địa chỉ hinh` ảnh trên firetore
        this.productDtos.push(this.search.result[i]);
      }
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

  getProductData(id: String, product: ProductModel) {
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

  async loadImages(imagePath: string[]) {
    const promises = imagePath.map(async (path) => {
      const storagePath = firebaseConfig.pre_imagePath + path;
      const storageRef = this.firebaseStorage.refFromURL(storagePath);

      try {
        const url = await new Promise<string>((resolve, reject) => {
          storageRef.getDownloadURL().subscribe(
            (downloadUrl: string) => {
              resolve(downloadUrl);
            },
            (error: any) => {
              console.error('Error getting download URL:', error);
              reject(error);
            }
          );
        });
        this.ImageInFirebase.push({pathInDB: path, PathInFirebase: url});
      } catch (error) {
        // Xử lý lỗi nếu cần
        console.error('Error loading image:', error);
      }
    });
    await Promise.all(promises);
  }
}
