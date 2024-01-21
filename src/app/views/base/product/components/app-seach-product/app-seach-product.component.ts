import {AfterViewInit, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';

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

}
