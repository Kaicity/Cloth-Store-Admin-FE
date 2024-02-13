import {Component, OnInit} from '@angular/core';
import {BaseSearchModel} from "../../../../core/apis/dtos/Base-search.model";
import {ResponseModel} from "../../../../core/apis/dtos/Response.model";
import {ReceiptService} from "../../../../core/Services/agency/ReceiptService";
import {ReceiptFullModel} from "../../../../core/apis/dtos/Receipt-full.model";
import {ReceiptSearchModel} from "../../../../core/apis/dtos/Receipt-search.model";

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrl: './receipt.component.scss'
})
export class ReceiptComponent implements OnInit {
  isShowLoading: boolean = false;
  //Format table
  tableFormat: string = "table table-bordered table-striped";

  //DTO Product
  receipts: ReceiptFullModel[] = []; // Tao danh sach chua cac phieu chi
  receiptSearch: ReceiptSearchModel = new ReceiptSearchModel();

  constructor(private receiptService: ReceiptService) {
  }

  ngOnInit(): void {
    this.getAllReceipt();
  }

  showSeachForm() {

  }

  showInsertForm() {

  }

  getProductData() {

  }

  updateProduct() {

  }

  deleteProduct() {

  }

  private getAllReceipt() {
    this.isShowLoading = true;
    this.receiptService.getAllReceipt().subscribe(res => {
      this.getAllReceiptComplete(res)
    });
  }

  getAllReceiptComplete(res: ResponseModel<BaseSearchModel<ReceiptFullModel[]>>) {
    if (res.status !== 200) {
      if (res.message) {
        res.message.forEach(value => {
          var t: any;
          t.error.message(value);
        });
        return;
      }
    }

    this.receiptSearch.result = res.result.result;
    this.receiptSearch.recordOfPage = 25;
    for (let i = 0; i < this.receiptSearch.recordOfPage; i++) {
      if (this.receiptSearch.result[i] != undefined)
        this.receipts.push(this.receiptSearch.result[i]);
    }
    setTimeout(() => {
      this.isShowLoading = false;
    }, 1000)
  }
}
