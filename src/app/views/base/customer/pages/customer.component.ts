import {AfterViewInit, Component, Input, OnInit, Output, ViewChild} from "@angular/core";
import {BaseSearchModel} from "../../../../core/apis/dtos/base-search-model";
import {AppAddCustomerComponent} from "../components/app-add-customer/app-add-customer.component";
import {ResponseModel} from "../../../../core/apis/dtos/ResponseModel";
import {Router} from "@angular/router";
import {Sex} from "../../../../core/constanst/Sex";
import {CustomerModel} from "../../../../core/apis/dtos/Customer.model";
import {CustomerService} from "../../../../core/Services/warehouse/CustomerService";

interface SpecificationCustomer {
  value: Sex;
  display: string;
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})

export class CustomerComponent implements OnInit, AfterViewInit {
  @ViewChild("AddWrapper") addWrapper!: AppAddCustomerComponent;
  tableFormat: string = "table table-bordered table-striped";
  public search: BaseSearchModel<CustomerModel[]> = new BaseSearchModel<CustomerModel[]>();
  customers: CustomerModel[] = []; // Tao danh sach cac khach hang
  isShowLoading: boolean = false;
  CustomerId: string = '';
  specificationCustomer: SpecificationCustomer[] = [
    {value: Sex.MALE, display: 'Nam'},
    {value: Sex.FEMALE, display: 'Nữ'},
    {value: Sex.ORTHER, display: 'Khác'}
  ];
  genderValue = this.specificationCustomer[0]!.display;
  constructor(private customerService: CustomerService, private router: Router) {
  }
  resetChildData() {
    this.addWrapper.resetData();
  }
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.getAllCustomer();
  }

  isBtnName: ({ display: string; value: number } | { display: string; value: number })[] = [{
    display: '', value: 0
  }, {display: '', value: 1}];
  customerInformation: CustomerModel = new CustomerModel();



  showSeachForm() {

  }

  showInsertForm() {
    this.isBtnName[0].value = 0;
    this.isBtnName[0].display = "Thêm";
    this.addWrapper.isInsertChose = true;
    this.resetChildData();
  }


  updateCustomer() {
    this.showInsertForm();
    this.isBtnName[0].value = 1;
    this.isBtnName[0].display = "Cập nhật";
    this.addWrapper.isInsertChose = true;
    //Cap nhat khach hang theo id
    this.customerService.getCustomerById(this.CustomerId).subscribe(
      res => {
        console.log(res.result);
        this.customerInformation = res.result;
        if(this.customerInformation.gender){
          const maleItem = this.specificationCustomer.find(item => item.value === res.result.gender);
          console.log(maleItem);
          this.genderValue = maleItem?.display ?? 'Giá trị mặc định nếu maleItem không tồn tại hoặc không có thuộc tính display';
          console.log(this.genderValue);
        }
      }
    )
  }

  getCustomerData(id: string, customer: CustomerModel) {
    console.log("Product id: " + id);
    this.CustomerId = id;
    //APIs get product by id
    this.customerService.getCustomerById(id).subscribe((res) => {
      customer = res;
    })
  }

  deteleCustomer() {
    console.log("helo",this.CustomerId);
    if (this.CustomerId) {
      this.customerService.deleteCustomer(this.CustomerId).subscribe((res) => {
        alert("Đã xóa sản phẩm");
        this.resetPage();
      }, error => {
        alert("Lỗi khi xóa sản phẩm này");
      })
    }
  }

  resetPage() {
    // Get url
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  private getAllCustomer() {
    this.isShowLoading = true;
    this.customerService.getAllCustomer().subscribe(res => {
      this.getAllCustomerComplete(res)
    });
  }

  async getAllCustomerComplete(res: ResponseModel<BaseSearchModel<CustomerModel[]>>) {
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
        this.customers.push(this.search.result[i]);
      }
    }
    setTimeout(() => {
      this.isShowLoading = false;
    },1500)
  }
}
