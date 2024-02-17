import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {SupplierStatus} from "../../../../../core/constanst/SupplierStatus";
import {SupplierModel} from "../../../../../core/apis/Dtos/Supplier.model";
import {SupplierService} from "../../../../../core/Services/warehouse/SupplierService";

interface SpecificationSupplier {
  value: SupplierStatus;
  display: string;
}

@Component({
  selector: 'app-add-supplier',
  templateUrl: './app-add-supplier.component.html',

})

export class AppAddSupplierComponent implements OnInit, AfterViewInit {
  @Input() supplierModel!: SupplierModel;
  @ViewChild("AddDatePicker") addWrapper!: AppAddSupplierComponent;
  specificationStatus: SpecificationSupplier[] = [
    {value: SupplierStatus.IsWorking, display: 'đang cung cấp'},
    {value: SupplierStatus.Stop, display: 'ngừng cung cấp'},
  ];

  @Input() statusDisplay!: string;
  status!: string;
  @Input() btnName: ({ display: string; value: number })[] =
    [{display: '', value: 0}, {display: '', value: 1}];

  constructor(private supplierService: SupplierService, private router: Router) {
  }

  optionSpecChose(display: string) {
    this.status = display;
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

  }

  isInsertChose: boolean = false;

  closeModal() {
    this.isInsertChose = false;
  }

  onSubmit() {

  }

  validateInput($event: KeyboardEvent) {

  }

  getStatusValue(display: string):SupplierStatus {
    const status = this.specificationStatus.find(spec => spec.display === display);
    return status ? status.value : SupplierStatus.IsWorking;
  }

  formatCurrency() {

  }

  resetPage() {
    // Get url
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  showPassword: boolean = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  resetData() {
    this.supplierModel = new SupplierModel();
    this.status = '';
  }

  addOrUpdateFunc() {
    //Them
    if (this.btnName[0].value == 0) {
      this.supplierModel.status = this.getStatusValue(this.status);
      this.supplierService.createSupplier(this.supplierModel).subscribe(
        (res: any) => {
          console.log(res);
          alert("Khách Hàng đã được thêm");
          this.resetPage();
        },
      )
    }
    //Update
    else if (this.btnName[0].value == 1) {
      this.supplierModel.status = this.getStatusValue(this.status);
      this.supplierService.updateSupplier(this.supplierModel).subscribe(
        (res: any) => {
          alert("Khách Hàng đã được Cập Nhật");
          this.resetPage();
        }
      )
    }
  }
}
