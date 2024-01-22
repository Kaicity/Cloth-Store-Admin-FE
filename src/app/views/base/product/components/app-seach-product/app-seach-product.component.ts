import {AfterViewInit, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
declare var toastr: any;
@Component({
  selector: 'app-app-seach-product',
  templateUrl: './app-seach-product.component.html',
})

export class AppSeachProductComponent implements OnInit, AfterViewInit{

  isSeachChose: boolean = false;
  constructor() {}

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
  }

  closeModal() {
    this.isSeachChose = false;
  }

  wtf(){
    toastr.error("cai gi v thong", null, "m gion hoai2");
  }
}
