import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {CustomerDto} from "../../../../core/apis/Dtos/CustomerDto";
import {BaseSearchModel} from "../../../../core/apis/Dtos/base-search-model";
import {AppAddCustomerComponent} from "../components/app-add-customer/app-add-customer.component";
import {ResponseModel} from "../../../../core/apis/Dtos/ResponseModel";
import {Router} from "@angular/router";
import {CustomerService} from "../../../../core/Services/agency/CustomerService";


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})

export class CustomerComponent implements OnInit, AfterViewInit {
  @ViewChild("AddWrapper") addWrapper!: AppAddCustomerComponent;
  tableFormat: string = "table table-bordered table-striped";
  public search: BaseSearchModel<CustomerDto[]> = new BaseSearchModel<CustomerDto[]>();
  customers: CustomerDto[] = []; // Tao danh sach cac khach hang
  isShowLoading: boolean = false;
  customerDto!: CustomerDto;
  specName!: string
  CustomerId: String = '';
  genderValue!: string;

  constructor(private customerService: CustomerService, private router: Router) {
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.getAllCustomer();
  }

  isBtnName: ({ display: string; value: number } | { display: string; value: number })[] = [{
    display: '', value: 0
  }, {display: '', value: 1}];
  customerInformation: CustomerDto = new CustomerDto();



  showSeachForm() {

  }

  showInsertForm() {
    this.isBtnName[0].value = 0;
    this.isBtnName[0].display = "Thêm";
    this.addWrapper.isInsertChose = true;
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
          this.genderValue = this.customerInformation.gender;
        }
      }
    )
  }

  getCustomerData(id: String, customer: CustomerDto) {
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
    this.isShowLoading = false;
  }

  async getAllCustomerComplete(res: ResponseModel<BaseSearchModel<CustomerDto[]>>) {
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
  }
}
