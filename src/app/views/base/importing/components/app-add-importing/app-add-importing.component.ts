import {AfterViewInit, booleanAttribute, Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ImportingTransactionModel} from "../../../../../core/apis/dtos/Importing-transaction.model";
import {ImportingModel} from "../../../../../core/apis/dtos/Importing.model";
import {ImportingFullModel} from "../../../../../core/apis/dtos/Importing-full.model";
import {ImportingService} from "../../../../../core/Services/warehouse/ImportingService";
import {SupplierModel} from "../../../../../core/apis/dtos/Supplier.model";
import {AgencyModel} from "../../../../../core/apis/dtos/Agency.model";
import {FormControl} from "@angular/forms";
import {ProductModel} from "../../../../../core/apis/dtos/Product.model";
import {ImportingStatus} from "../../../../../core/constanst/ImportingStatus";

interface ImportingStatusDisplay {
  value: ImportingStatus,
  display: string
}

@Component({
  selector: 'app-add-importing',
  templateUrl: './app-add-importing.component.html',
  styleUrl: './app-add-importing.component.scss',
})

export class AppAddImportingComponent implements OnInit, AfterViewInit {
  //Table color is show
  @Input() suppliers: SupplierModel[] = [];
  @Input() products: ProductModel[] = [];

  @Input() btnName: ({ display: string; value: number } | { display: string; value: number })[] =
    [{display: '', value: 0}, {display: '', value: 1}];

  importingTransaction: ImportingTransactionModel;

  supplier: SupplierModel;
  @Input() supplierNameDisplay!: string;
  indexSupplier!: number;

  productNameDisplay: string = "";

  isInsertChose: boolean = false;
  //Table size is show
  @Input({transform: booleanAttribute}) showTableSize = false;

  @Input() importing: ImportingModel;
  @Input() importingTransactions: ImportingTransactionModel [] = [];
  importingFull: ImportingFullModel;

  displayImporting: ImportingStatusDisplay[] = [{value: ImportingStatus.COMPLETE, display: "Đã hoàn thành"},
    {value: ImportingStatus.UNCOMPLETE, display: "Chưa hoàn thành"}];

  @Input() importingStatus!: string
  myImportingStatus! : string

  myControl = new FormControl();
  showDropdown = false;
  agencyCode: string = "AH-2041";
  agencyName: string = "TMA";

  searchTerm: string = '';
  @Input() productFill: ProductModel[] = [];

  no: number = 0;

  constructor(private importingService: ImportingService, private router: Router, private snackBar: MatSnackBar) {
    this.importingFull = new ImportingFullModel();
    this.importing = new ImportingModel();
    this.importing.agency = new AgencyModel();
    this.importing.supplier = new SupplierModel();
    this.supplier = new SupplierModel();
    this.importingTransaction = new ImportingTransactionModel();
  }

  //Lọc sản phẩm theo tên và code
  filterProducts(): void {
    const searchTermLC = this.searchTerm.toLowerCase().trim();
    if (searchTermLC === '') {
      this.productFill = this.products;
      this.showDropdown = false;
      //Reset giá tiền và số lượng
      this.importingTransaction.price = null;
      this.importingTransaction.quantity = null;
      return;
    }
    this.showDropdown = true;
    this.productFill = this.products.filter(product =>
      product.name!.toLowerCase().includes(searchTermLC) || product.code!.toLowerCase().includes(searchTermLC)
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: "center"
    });
  }

  validateInput(event: any): void {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) event.preventDefault();
  }

  addImporting() {
    //2 option them sua dua vao value[0,1]
    if (this.btnName[0].value == 0) {
      this.importing.status = this.importingStatus;
      this.importingFull.importing = this.importing;
      this.importingFull.importingTransactions = this.importingTransactions;
      this.importingService.addImporting(this.importingFull).subscribe(res => {
          this.openSnackBar("Thêm thành công phiếu nhâp hàng", "Đóng");
          this.resetPage();
        },
        error => {
          this.openSnackBar("Lỗi thêm phiếu nhâp hàng", "Đóng");
        })
    } else if (this.btnName[0].value == 1) {
      alert(this.importingStatus)
      this.importing.status = this.importingStatus;
      this.importingFull.importing = this.importing;
      this.importingFull.importingTransactions = this.importingTransactions;
      this.importingService.updateImporting(this.importingFull).subscribe(res => {
          this.openSnackBar("Cập nhật phiếu nhập hàng thành công", "Đóng");
          this.resetPage();
        },
        error => {
          this.openSnackBar("Lỗi cập nhật phiếu nhâp hàng", "Đóng");
        })
    } else return;
  }

  resetPage() {
    // Get url
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  formatCurrency() {
  }

  getStatusOnline(display: string) {
    this.importingStatus = display;
  }

  getStatusDemo(display: string) {
    this.importingStatus = display;
  }

  getOptionType(supplierName: string, index: number, supplier: SupplierModel) {
    this.supplierNameDisplay = supplierName;
    this.indexSupplier = index;
    this.importing.supplier = supplier;
  }

  addProductToTable() {
    if (this.importingTransactions) {
      this.showTableSize = true;
    }
    this.importingTransaction.amount = this.importingTransaction.quantity! * this.importingTransaction.price!;
    this.importingTransactions.push(this.importingTransaction);

    this.importingTransaction = new ImportingTransactionModel();
    this.searchTerm = "";
    this.productNameDisplay = "";
  }

  removeItemImportingTransaction(index: number) {
    this.importingTransactions.splice(index, 1);
    if (this.importingTransactions.length == 0) this.showTableSize = false;
  }

  toggleDropdown() {
    this.showDropdown = true;
  }

  selectOption(product: ProductModel) {
    //this.myForm.patchValue(product.name);
    this.showDropdown = false;
    this.productNameDisplay = product.name!;

    if (this.importingTransactions.filter(productItem => {
      productItem.id === product.id
    })) {
      for (let i = 0; i < this.importingTransactions.length; i++) {
        if (this.importingTransactions[i].product?.id === product.id) {
          this.importingTransactions[i].quantity!++;
          let calcuAmount = this.importingTransactions[i].quantity! * this.importingTransactions[i].price!
          this.importingTransactions[i].amount! = calcuAmount;
          this.productNameDisplay = ""; // Tồn tại rồi thì reset khi click chọn
          this.searchTerm = "";
          this.openSnackBar("Sản phẩm này đã được thêm tiếp tục", "Đóng")
          return;
        }
      }
      this.importingTransaction.product = product;
    }
  }

  ngAfterViewInit()
    :
    void {
  }

  ngOnInit()
    :
    void {
  }

  onSubmit() {
  }

  closeModal() {
    this.isInsertChose = false;
  }

  decrementQuantity(index: number) {
    if (this.importingTransactions[index].quantity! > 1) {
      this.importingTransactions[index].quantity!--;
      this.importingTransactions[index].amount = this.importingTransactions[index].quantity! * this.importingTransactions[index].price!
    }
  }

  incrementQuantity(index: number) {
    this.importingTransactions[index].quantity!++;
    this.importingTransactions[index].amount = this.importingTransactions[index].quantity! * this.importingTransactions[index].price!
  }
}
