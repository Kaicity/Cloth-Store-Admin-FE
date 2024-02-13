import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {CustomerDto} from "../../../../../core/apis/Dtos/CustomerDto";
import {Router} from "@angular/router";
import {CustomerService} from "../../../../../core/Services/agency/CustomerService";
import {Sex} from "../../../../../core/constanst/Sex";

interface SpecificationCustomer {
  value: Sex;
  display: string;
}

@Component({
  selector: 'app-add-customer',
  templateUrl: './app-add-customer.component.html',
  styleUrls: ['./app-add-customer-component.scss']

})

export class AppAddCustomerComponent implements OnInit, AfterViewInit {
  @Input() genderDisplay: string = '';
  @Input() customer!: CustomerDto;
  @ViewChild("AddDatePicker") addWrapper!: AppAddCustomerComponent;
  specificationCustomer: SpecificationCustomer[] = [
    {value: Sex.MALE, display: 'Nam'},
    {value: Sex.FEMALE, display: 'Nữ'},
    {value: Sex.ORTHER, display: 'Khác'}
  ];
  @Input() btnName: ({ display: string; value: number } | { display: string; value: number })[] =
    [{display: '', value: 0}, {display: '', value: 1}];


  constructor(private customerService: CustomerService, private router: Router) {
  }

  optionSpecChose(display: string) {
    this.genderDisplay = display;
  }

  ngOnInit(): void {
    this.customer = new CustomerDto();
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

  formatCurrency() {

  }

  resetPage() {
    // Get url
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  addOrUpdateFunc() {
    //Them
    if (this.btnName[0].value == 0) {
      const genderSpec = this.specificationCustomer.find(spec => spec.value === Sex.MALE);
      if (genderSpec) {
        this.customer.gender = genderSpec.value;

        this.customerService.addCustomer(this.customer).subscribe(
          (res: any) => {
            console.log(res);
            alert("Khách Hàng đã được thêm");
            this.resetPage();
          },
        )
      }
    }
    //Update
    else if(this.btnName[0].value == 1){
      this.customerService.updateCustomer(this.customer).subscribe(
        (res:any)=>{
          alert("Khách Hàng đã được Cập Nhật");
          this.resetPage();
        }
      )
    }
    else return;
  }
}
