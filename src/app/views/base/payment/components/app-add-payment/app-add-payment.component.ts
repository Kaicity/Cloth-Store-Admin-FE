import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PaymentService} from "../../../../../core/Services/agency/PaymentService";
import {formatCurrency} from "@angular/common";
import {PaymentFullModel} from "../../../../../core/apis/dtos/Payment-full.model";
import {PaymentModel} from "../../../../../core/apis/dtos/Payment.model";
import {PaymentTransactionModel} from "../../../../../core/apis/dtos/Payment-transaction.model";

interface SpecificationProduct {
  value: number;
  display: string;
}

@Component({
  selector: 'app-add-payment',
  templateUrl: './app-add-payment.component.html',
})

export class AppAddPaymentComponent implements OnInit, AfterViewInit {

  //Table color is show
  showTableColor: boolean = false;
  @Input() btnName: ({ display: string; value: number } | { display: string; value: number })[] =
    [{display: '', value: 0}, {display: '', value: 1}];

  isInsertChose: boolean = false;

  paymentFull: PaymentFullModel
  payment: PaymentModel;
  paymentTracsaction: PaymentTransactionModel[];

  constructor(private paymentService: PaymentService, private router: Router) {
    this.paymentFull = new PaymentFullModel();
    this.payment = new PaymentModel();
    this.paymentTracsaction = [];
  }

  ngAfterViewInit(): void {
  }

  onSubmit() {

  }

  ngOnInit(): void {
  }

  closeModal() {
    this.isInsertChose = false;
  }

  validateInput(event: any): void {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) event.preventDefault();
  }

  //Table size is show
  showTableSize: boolean = false;
  isLoading: boolean = false;


  addProduct() {
    //2 option them sua dua vao value[0,1]
    if (this.btnName[0].value == 0) {

    } else if (this.btnName[0].value == 1) {

    } else return;
  }

  resetPage() {
    // Get url
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  formatCurrency(){
  }
}
