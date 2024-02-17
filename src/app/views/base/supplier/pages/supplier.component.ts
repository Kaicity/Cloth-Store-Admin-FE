import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {AppAddSupplierComponent} from "../components/app-add-supplier/app-add-supplier.component";
import {SupplierModel} from "../../../../core/apis/Dtos/Supplier.model";
import {BaseSearchModel} from "../../../../core/apis/Dtos/base-search-model";
import {ResponseModel} from "../../../../core/apis/Dtos/ResponseModel";
import {SupplierService} from "../../../../core/Services/warehouse/SupplierService";
import {AppSearchSupplierComponent} from "../components/app-search-supplier/app-search-supplier.component";
import {SupplierStatus} from "../../../../core/constanst/SupplierStatus";
import {Sex} from "../../../../core/constanst/Sex";

interface SpecificationStatus {
  value: SupplierStatus;
  display: string;
}
@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.scss'
})
export class SupplierComponent implements OnInit, AfterViewInit {
  //Format table
  tableFormat: string = "table table-bordered table-striped";
  @ViewChild("searchWrapper") searchWrapper!: AppSearchSupplierComponent;
  @ViewChild("AddWrapper") addWrapper!: AppAddSupplierComponent;

  //DTO Product
  supplierList: SupplierModel[] = []; // Tao danh sach chua cac mon an
  public search: BaseSearchModel<SupplierModel[]> = new BaseSearchModel<SupplierModel[]>();
  supplierInformation: SupplierModel = new SupplierModel();

  isShowLoading: boolean = false;
  supplierId: string = '';

  specificationStatuses: SpecificationStatus[] = [
    {value: SupplierStatus.IsWorking, display: 'đang cung cấp'},
    {value: SupplierStatus.Stop, display: 'Ngừng cung cấp'},
  ];
  statusValue = this.specificationStatuses[0]!.display;

  isBtnName: ({ display: string; value: number } | { display: string; value: number })[] = [{
    display: '', value: 0
  }, {display: '', value: 1}];

  constructor(private supplierService: SupplierService, private router: Router) {
  }

  showInsertForm() {
    this.isBtnName[0].value = 0;
    this.isBtnName[0].display = "Thêm";
    this.addWrapper.isInsertChose = true;
    this.supplierInformation = new SupplierModel();
  }

  // showSeachForm() {
  //   console.log(this.searchWrapper);
  //   this.searchWrapper.isSeachChose = true;
  // }

  ngOnInit(): void {
    this.getAllSupplier();
  }

  ngAfterViewInit(): void {

  }

  private getAllSupplier() {
    this.isShowLoading = true;
    this.supplierService.getAllSupplier().subscribe(res => {
      this.getAllSupplierComplete(res)
      console.log(res.result)
    });
  }

  async getAllSupplierComplete(res: ResponseModel<BaseSearchModel<SupplierModel[]>>) {
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

    // thêm 25 sản phẩm đầu tiên để show
    this.search.recordOfPage = 25;
    for (let i = 0; i < this.search.recordOfPage; i++) {
      if (this.search.result[i] != undefined) {
        // lấy địa chỉ hinh` ảnh trên firetore
        this.supplierList.push(this.search.result[i]);
      }
    }
    setTimeout(() => {
      this.isShowLoading = false;
    }, 1000)
  }


  getSupplierData(id: string, supplier: SupplierModel) {
    //alert("Product id: " + id);
    this.supplierId = id;
    //APIs get product by id
    this.supplierService.getSupplierId(id).subscribe((res) => {
      supplier = res;
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
    if (this.supplierId) {
      this.supplierService.deleteSupplierById(this.supplierId).subscribe((res) => {
        alert("Đã xóa supplier");
        this.resetPage();
      }, error => {
        alert("Lỗi khi xóa supplier này");
      })
    }
  }

  updateSupplier() {
    this.showInsertForm();
    this.isBtnName[0].value = 1;
    this.isBtnName[0].display = "Cập nhật";
    //Lấy sản phẩm theo id được chọn
    this.supplierService.getSupplierId(this.supplierId).subscribe(res => {
      console.log(res);
      this.supplierInformation = res.result;
      console.log(this.supplierInformation + "dshfuwfhu");
    })
  }

  receiveDataFromChildSeach(suppliers: SupplierModel[]) {
    if (suppliers) {
      console.log(suppliers + "fis");
      this.supplierList = [];
      this.supplierList = suppliers;
      console.log(this.supplierList + "after");
    } else {
      this.getAllSupplier();
    }
  }

}
