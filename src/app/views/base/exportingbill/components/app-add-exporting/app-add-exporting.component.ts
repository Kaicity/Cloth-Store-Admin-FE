import {AfterViewInit, Component, Input, OnInit, ViewChild} from "@angular/core";

import {BillStatus} from "../../../../../core/constanst/BillStatus";
import {AutoCompleteComponent} from "../../../../../shared/components/auto-complete/auto-complete.component";
import {CustomerModel} from "../../../../../core/apis/dtos/Customer.model";
import {CustomerService} from "../../../../../core/Services/warehouse/CustomerService";
import {OptionModel} from "../../../../../core/apis/dtos/Option.model";
import {OptionService} from "../../../../../core/Services/warehouse/OptionService";
import {ProductService} from "../../../../../core/Services/warehouse/ProductService";
import {ProductModel} from "../../../../../core/apis/dtos/Product.model";
import {BaseSearchModel} from "../../../../../core/apis/dtos/Base-search.model";
import {ResponseModel} from "../../../../../core/apis/dtos/Response.model";
import {SizesModel} from "../../../../../core/apis/dtos/Sizes.model";
import {ColorsModel} from "../../../../../core/apis/dtos/Colors.model";
import {ExportingBillFullModel} from "../../../../../core/apis/dtos/Exporting-bill-full.model";
import {ExportingBillTransactionModel} from "../../../../../core/apis/dtos/Exporting-bill-transaction.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ExportingBillModel} from "../../../../../core/apis/dtos/Exporting-bill.model";
import {ImportingStatus} from "../../../../../core/constanst/ImportingStatus";
import {ExportingbillService} from "../../../../../core/Services/agency/ExportingbillService";
import {Router} from "@angular/router";


interface SpecificationExporting {
    value: BillStatus;
    display: string;
}

interface ImportingStatusDisplay {
    value: ImportingStatus,
    display: string
}

@Component({
    selector: 'app-add-export',
    templateUrl: './app-add-exporting.component.html',
    styleUrls: ['./app-add-exporting.components.scss']
})
export class AppAddExportingComponent implements OnInit, AfterViewInit {
    sizeS: string[] = [];
    agencyCode: string = "AH-2041";
    agencyName: string = "TMA";
    showDropdown = false;
    searchTerm: string = '';
    colorS: string[] = [];
    productQuantitiesMap: Map<string, number> = new Map(); // Map to store product quantities
    productNames: string[] = [];
    public search: BaseSearchModel<ProductModel[]> = new BaseSearchModel<ProductModel[]>();
    isInsertChose: boolean = false;
    customerInfor = new CustomerModel();
    selected: string = '';
    sizeName = '';
    indexSizes!: number;
    optionSizes: OptionModel[] = [];
    sizes: SizesModel[] = [];
    colors: ColorsModel[] = [];
    optionColors: OptionModel[] = [];
    @Input() customerNames: string[] = [];
    productNameDisplay: string = "";
    productFill: ProductModel[] = [];
    @Input() exporting: ExportingBillModel;
    @Input() products: ProductModel[] = [];
    @Input() exportingBillTransactions: ExportingBillTransactionModel [] = [];
    exportingTransaction!: ExportingBillTransactionModel;
    no: number = 0;
    @ViewChild("autoCompleteComponent") addWrapper!: AutoCompleteComponent;
    @ViewChild("autoCompleteSizes") addSizes!: AutoCompleteComponent;
    @ViewChild("autoCompleteColos") addColors!: AutoCompleteComponent;
    @ViewChild("autoCompleteProduct") addProduct!: AutoCompleteComponent;
    @Input() eportingFull!: ExportingBillFullModel[];
    ExportingFull: ExportingBillFullModel;
    @Input() importingStatus!: string
    myImportingStatus!: string
    @Input() btnName: ({ display: string; value: number })[] =
        [{display: '', value: 0}, {display: '', value: 1}];
    statust: string = '';
    SpecificationExporting: SpecificationExporting[] = [
        {value: BillStatus.BOOKING, display: 'ĐẶT TRƯỚC'},
        {value: BillStatus.CHECKED, display: 'Đã Kiểm Tra'},
        {value: BillStatus.CANCELLED, display: 'Đã Hủy'},
        {value: BillStatus.COMPELETED, display: 'Đã Hoàn Thành'},
        {value: BillStatus.SHIPPING, display: 'Đang Vận Chuyển'}
    ];
    genderDisplay = '';
    itemSize: SizesModel = new SizesModel();
    displayImporting: ImportingStatusDisplay[] = [{value: ImportingStatus.COMPLETE, display: "Đã hoàn thành"},
        {value: ImportingStatus.UNCOMPLETE, display: "Chưa hoàn thành"}];


    constructor(private customerService: CustomerService, private optionService: OptionService,
                private productService: ProductService, private snackBar: MatSnackBar,
                private exportingService: ExportingbillService, private router: Router) {
        this.exportingTransaction = new ExportingBillTransactionModel();
        this.exporting = new ExportingBillModel();
        this.ExportingFull = new ExportingBillFullModel();

    }


    getDataSizes() {
        for (let c of this.optionSizes) {
            if (c.name) {
                this.sizeS.push(c.name);
            }
        }
        console.log(this.sizeS + "nguu");
    }

    getDataColors() {
        for (let c of this.optionColors) {
            if (c.name) {
                this.colorS.push(c.name);
            }
        }
    }

    ngAfterViewInit(): void {
    }

    getAllProduct() {
        this.productService.getAllProduct().subscribe(res => {
            this.productFill = res.result.result;
            this.getAllProductComplete(res)
            console.log(this.productFill + "hello");
        });
    }

    getAllProductComplete(res: ResponseModel<BaseSearchModel<ProductModel[]>>) {
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
        this.getDataProduct();
        console.log(this.search.result);
    }

    getDataProduct() {
        for (let c of this.search.result) {
            if (c.code) {
                this.productNames.push(c.code);
            }
        }
    }

    getAllOptionSizes() {
        this.optionService.getAllOptionSizes().subscribe(res => {
            this.optionSizes = res.result;
            this.getDataSizes();
        });
    }

    getAllOptionColor() {
        this.optionService.getAllOptionColors().subscribe(res => {
            this.optionColors = res.result;

            this.getDataColors();
        });
    }

    getCustomerData(id: string) {
        this.selected = id;
        this.customerService.getCustomerBycode(id).subscribe((res: any) => {
            this.customerInfor = res.result;
            console.log("Customer : ", this.customerInfor);
        });
    }


    ngOnInit(): void {
        this.getAllOptionColor();
        this.getAllOptionSizes();
        this.getAllProduct();
        this.getAmount();
    }

    getAmount() {
        let totalAmount = 0;
        for (const transaction of this.exportingBillTransactions) {
            if (transaction.product && transaction.product.price && transaction.quantity) {
                totalAmount += transaction.product.price * transaction.quantity;
            }
        }
        return totalAmount;
    }

    closeModal() {
        this.isInsertChose = false;

    }

    getGenderValue(display: string): BillStatus {
        const gender = this.SpecificationExporting.find(spec => spec.display === display);
        return gender ? gender.value : BillStatus.COMPELETED;
    }

    addOrUpdateFunc() {
        if (this.btnName[0].value == 0) {
            //s this.exporting.status=this.importingStatus;
            this.exporting.status = this.getGenderValue(this.statust);
            this.exporting.total = this.getAmount();
            this.exporting.customer=this.customerInfor;
            this.ExportingFull.exportingBill = this.exporting;
            this.ExportingFull.exportingBillTransactions = this.exportingBillTransactions;
            console.log(this.ExportingFull + "ma no ngu ");
            this.exportingService.createBill(this.ExportingFull).subscribe(res => {
                    this.openSnackBar("Thêm thành công phiếu nhâp hàng", "Đóng");
                    this.resetPage();
                },
                error => {
                    this.openSnackBar("Lỗi thêm phiếu nhâp hàng", "Đóng");
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

    onSubmit() {

    }

    optionSpecChose(display: string) {
        this.statust = display;
        console.log(this.statust)

    }

    async receiveSelectedOption(selectedOption: string): Promise<void> {
        if (selectedOption) {
            this.selected = selectedOption;
            this.getCustomerData(this.selected);

        }
    }

    getOptionSizes(optionSize: string, index: number) {
        this.sizeName = optionSize;
        this.itemSize.optionProduct = this.optionSizes[index];
        this.indexSizes = index;
    }

    showTableSize: boolean = false;

    addSizeToTable() {
        this.sizes.push(this.itemSize);
        console.log(this.optionSizes);
        if (this.itemSize) this.showTableSize = true;
        this.optionSizes.splice(this.indexSizes!, 1);
        this.itemSize = new SizesModel();
        this.sizeName = "";

    }

    selectOption(product: ProductModel) {
        //this.myForm.patchValue(product.name);
        this.showDropdown = false;
        this.productNameDisplay = product.name!;

        if (this.exportingBillTransactions.filter(productItem => {
            productItem.id === product.id
        })) {
            for (let i = 0; i < this.exportingBillTransactions.length; i++) {
                if (this.exportingBillTransactions [i].product?.id === product.id) {
                    this.exportingBillTransactions[i].quantity!++;
                    let calcuAmount = this.exportingBillTransactions[i].quantity!
                        * this.exportingBillTransactions[i].product?.price!
                    this.exportingBillTransactions[i].amount! = calcuAmount;
                    this.productNameDisplay = ""; // Tồn tại rồi thì reset khi click chọn
                    this.searchTerm = "";
                    this.openSnackBar("Sản phẩm này đã được thêm tiếp tục", "Đóng")
                    return;
                }
            }
            this.exportingTransaction.product = product;
        }
    }

    getStatusOnline(display: string) {
        this.importingStatus = display;
    }

    getStatusDemo(display: string) {
        this.importingStatus = display;
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
            horizontalPosition: "center"
        });
    }

    removeItemSize(i: number) {

    }

    toggleDropdown() {
        this.showDropdown = true;
    }

    decrementQuantity(index: number) {
        if (this.exportingBillTransactions[index].quantity! > 1) {
            this.exportingBillTransactions[index].quantity!--;
            this.exportingBillTransactions[index].amount = this.exportingBillTransactions[index].quantity! * this.exportingBillTransactions[index].product?.price!
        }
    }

    incrementQuantity(index: number) {
        this.exportingBillTransactions[index].quantity!++;
        this.exportingBillTransactions[index].amount = this.exportingBillTransactions[index].quantity! * this.exportingBillTransactions[index].product?.price!
    }


    validateInput(event: any): void {
        const pattern = /[0-9]/;
        const inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) event.preventDefault();
    }

    addProductToTable() {
        console.log(this.exportingBillTransactions + "ngu");
        if (this.exportingBillTransactions) {
            this.showTableSize = true;
        }
        this.exportingTransaction.amount = this.exportingTransaction.quantity! * this.exportingTransaction.product?.price!;
        this.exportingBillTransactions.push(this.exportingTransaction);

        this.exportingTransaction = new ExportingBillTransactionModel();
        this.searchTerm = "";
        this.productNameDisplay = "";
    }

    removeItemImportingTransaction(index: number) {
        this.exportingBillTransactions.splice(index, 1);
        if (this.exportingBillTransactions.length == 0) this.showTableSize = false;
    }

    calculateProductQuantities() {
        for (const transaction of this.exportingBillTransactions) {
            const productName = transaction.product?.name;
            const quantity = transaction.quantity || 0; // Default to 0 if quantity is null
            if (productName) {
                this.productQuantitiesMap.set(productName, (this.productQuantitiesMap.get(productName) || 0) + quantity);
            }
        }
    }

    filterProducts(): void {
        const searchTermLC = this.searchTerm.toLowerCase().trim();
        if (searchTermLC === '') {
            this.productFill = this.products;
            this.showDropdown = false;
            //Reset giá tiền và số lượng
            this.exportingTransaction.amount = null;
            this.exportingTransaction.quantity = 0;
            return;
        }
        this.showDropdown = true;
        this.productFill = this.products.filter(product =>
            product.name!.toLowerCase().includes(searchTermLC) || product.code!.toLowerCase().includes(searchTermLC)
        );
    }

    productPrice(t: ExportingBillTransactionModel) {
        return t.product ? t.product.price : null;
    }

    protected readonly ImportingStatus = ImportingStatus;
}
