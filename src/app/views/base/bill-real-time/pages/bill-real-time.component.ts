import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WebSocketService} from "../../../../core/Services/agency/websocket-service";
import {ResponseModel} from "../../../../core/apis/Dtos/ResponseModel";
import {ExportingBillDto} from "../../../../core/apis/Dtos/ExportingBillDto";
import {ExportingbillService} from "../../../../core/Services/agency/ExportingbillService";
import {BillStatus} from "../../../../core/constanst/bill_Status";
import {SocketMessage} from "../../../../core/apis/Dtos/socket-message";
import {TypeBillRealTime} from "../../../../core/constanst/TypeBillRealTime";
import {ExportingBillFullDto} from "../../../../core/apis/Dtos/ExportingBillFullDto";
import {AppAddProductComponent} from "../../product/components/app-add-product/app-add-product.component";
import {AppShowDetailBill} from "../components/app-show-detail-bill/app-show-detail-bill.component";
import {BillRealTimeModule} from "../bill-real-time.module";

@Component({
    selector: 'bill-read-time',
    templateUrl: './bill-real-time.component.html',
    styleUrl: './bill-real-time.component.scss'
})
export class BillRealTimeComponent implements OnInit {
    messageList: any[] = [];
    bookingBills: ExportingBillFullDto[] = [];
    checkedBills: ExportingBillFullDto[] = [];
    shippingBills: ExportingBillFullDto[] = [];
    cancelledBills: ExportingBillFullDto[] = [];
    completedBills: ExportingBillFullDto[] = [];
    private idSocket = "billRealTimeSection";

    @ViewChild("AddWrapper") addWrapper!: AppShowDetailBill;

    constructor(private webSocketService: WebSocketService,
                private exportingBillService: ExportingbillService) {
    }

    ngOnInit(): void {
        this.getAllExportingBill();
        this.webSocketService.joinSocket(this.idSocket);
        this.listenerMessage();
    }

    sendMessage() {
        let a: ExportingBillDto = new ExportingBillDto();
        const chatMessage = {
            idSocket: this.idSocket,
            message: '1',
            data: a
        } as SocketMessage<ExportingBillDto>
        this.webSocketService.sendMessage(this.idSocket, chatMessage);
    }

    listenerMessage() {
        this.webSocketService.getMessageSubject().subscribe((message: any) => {
                this.messageList = message;
                let result = message.data as ExportingBillFullDto;

                console.log("coi ne:");
                console.log(result.exportingBill)
                this.UpdateUI(result, message.message);
            }
        );
    }


    private getAllExportingBill() {
        // cho cái load show chổ này
        this.exportingBillService.getAllBill().subscribe(
            res => {
                this.getAllExportingBillComplete(res)
            });
    }

    private getAllExportingBillComplete(res: ResponseModel<ExportingBillFullDto[]>) {
        if (res.status !== 200) {
            if (res.message) {
                res.message.forEach(
                    value => {
                        var t: any;
                        t.error.message(value);
                    }
                );
                return;
            }
        }
        // Lấy danh sách đối tượng từ API

        for (let i = 0; i < res.result.length; i++) {
            if (res.result[i] != undefined && res.result[i].exportingBill != undefined) {
                let bill = res.result[i];
                console.log(bill);
                if (bill!.exportingBill!.status === BillStatus.BOOKING) this.bookingBills.push(bill!);
                if (bill!.exportingBill!.status === BillStatus.CHECKED) this.checkedBills.push(bill!);
                if (bill!.exportingBill!.status === BillStatus.SHIPPING) this.shippingBills.push(bill!);
                if (bill!.exportingBill!.status === BillStatus.CANCELLED) this.cancelledBills.push(bill!);
                if (bill!.exportingBill!.status === BillStatus.COMPELETED) this.completedBills.push(bill!);
            }
        }
    }

    UpdateUI(exportingBill: ExportingBillFullDto, message: string) {
        console.log(message === TypeBillRealTime.BOOKING.toString());
        if (message === TypeBillRealTime.BOOKING.toString()) {
            if (exportingBill.exportingBill) this.bookingBills.push(exportingBill);
        }
    }

    showInsertForm() {
       // this.addWrapper.isInsertChose = true;
    }

    test2(bill: ExportingBillFullDto) {
       this.addWrapper.isInsertChose = true;
        this.addWrapper.bill = bill;
        let status = bill!.exportingBill!.status;
        const result = this.addWrapper.statusBill.find(item => item.id === status);
        this.addWrapper.status = result?.name ?? "";
    }
}
