import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseSearchModel} from "../../../../core/apis/dtos/Base-search.model";
import {PaymentService} from "../../../../core/Services/agency/PaymentService";
import {ResponseModel} from "../../../../core/apis/dtos/Response.model";
import {PaymentFullModel} from "../../../../core/apis/dtos/Payment-full.model";
import {PaymentSearchModel} from "../../../../core/apis/dtos/Payment-search.model";
import {AppSearchPaymentComponent} from "../components/app-search-payment/app-search-payment.component";
import {AppAddPaymentComponent} from "../components/app-add-payment/app-add-payment.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {
  isShowLoading: boolean = false;
  //Format table
  tableFormat: string = "table table-bordered table-striped";
  @ViewChild("searchWrapper") searchWrapper!: AppSearchPaymentComponent;
  @ViewChild("AddWrapper") addWrapper!: AppAddPaymentComponent;

  //DTO Payment
  paymentSeach: PaymentSearchModel = new PaymentSearchModel();
  payments: PaymentFullModel[] = [];
  //Gan tra tri payment o day


  isBtnName: ({ display: string; value: number } | { display: string; value: number })[] = [{
    display: '', value: 0
  }, {display: '', value: 1}];
  private paymentId!: string;

  constructor(private paymentService: PaymentService, private router: Router) {
  }

  //custom after
  simulateLoading() {
    this.isShowLoading = true;
    setTimeout(() => {
      this.isShowLoading = false;
    }, 1500)
  }

  ngOnInit(): void {
    this.getAllProduct();
  }

  showSeachForm() {
    this.searchWrapper.isSeachChose = true;
  }

  showInsertForm() {
    this.isBtnName[0].value = 0;
    this.isBtnName[0].display = "Thêm";
    this.addWrapper.isInsertChose = true;
  }

  getPaymentData(id: string, payment: PaymentFullModel) {
    this.paymentId = id;
    //APIs get product by id
  }

  updatePayment() {

  }

  deletePayment() {
    this.paymentService.deletePayment(this.paymentId).subscribe((res) => {
        alert("Đã xóa phiếu chi");
        this.resetPage();
      },
      error => {
        alert("Lỗi khi xóa phiếu chi");
      }
    )
  }

  resetPage() {
    // Get url
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }


  private getAllProduct() {
    this.isShowLoading = true;
    this.paymentService.getAllPayment().subscribe(res => {
      this.getAllProductComplete(res)
    });
  }

  getAllProductComplete(res: ResponseModel<BaseSearchModel<PaymentFullModel[]>>) {
    if (res.status !== 200) {
      if (res.message) {
        res.message.forEach(value => {
          var t: any;
          t.error.message(value);
        });
        return;
      }
    }
    this.paymentSeach.result = res.result.result;
    this.paymentSeach.recordOfPage = 25;
    for (let i = 0; i < this.paymentSeach.recordOfPage; i++) {
      if (this.paymentSeach.result[i] != undefined)
        this.payments.push(this.paymentSeach.result[i]);
    }
    setTimeout(() => {
      this.isShowLoading = false;
    }, 1000)
  }
}
