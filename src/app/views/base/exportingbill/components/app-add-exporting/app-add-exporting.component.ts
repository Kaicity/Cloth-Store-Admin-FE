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

interface SpecificationExporting {
    value: BillStatus;
    display: string;
}

@Component({
    selector: 'app-add-export',
    templateUrl: './app-add-exporting.component.html',
    styleUrls: ['./app-add-exporting.components.scss']
})
export class AppAddExportingComponent implements OnInit, AfterViewInit {
    sizeS: string[] = [];
    colorS: string[] = [];
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
    @ViewChild("autoCompleteComponent") addWrapper!: AutoCompleteComponent;
    @ViewChild("autoCompleteSizes") addSizes!: AutoCompleteComponent;
    @ViewChild("autoCompleteColos") addColors!: AutoCompleteComponent;
    @ViewChild("autoCompleteProduct") addProduct!: AutoCompleteComponent;
    @Input() eportingFull!: ExportingBillFullModel[];
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
    itemSize: SizesModel = new SizesModel();

    constructor(private customerService: CustomerService, private optionService: OptionService,
                private productService: ProductService) {

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
            this.getAllProductComplete(res)
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
        this.selected = '';
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
    }

    closeModal() {
        this.isInsertChose = false;

    }

    addOrUpdateFunc() {

    }

    onSubmit() {

    }

    optionSpecChose(display: string) {
        this.statust = display;

    }

    async receiveSelectedOption(selectedOption: string): Promise<void> {
        if (selectedOption) {
            this.selected = selectedOption;
            await Promise.all([
                this.getAllProduct(),
                this.getAllOptionColor(),
            ]);
            this.getCustomerData(this.selected);
            this.getAllOptionSizes();
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

    removeItemSize(i: number) {

    }
}
