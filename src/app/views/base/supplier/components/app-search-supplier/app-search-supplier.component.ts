import {AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from "@angular/router";
import {SupplierSearchModel} from "../../../../../core/apis/Dtos/Supplier-search.model";
import {SupplierModel} from "../../../../../core/apis/Dtos/Supplier.model";
import {SupplierService} from "../../../../../core/Services/warehouse/SupplierService";
import {ProductService} from "../../../../../core/Services/warehouse/ProductService";

@Component({
  selector: 'app-search-supplier',
  templateUrl: './app-search-supplier.component.html',
})
export class AppSearchSupplierComponent  {

}
