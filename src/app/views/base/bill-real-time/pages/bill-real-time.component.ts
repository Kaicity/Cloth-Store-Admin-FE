import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WebSocketService} from "../../../../core/Services/agency/websocket-service";
import {ResponseModel} from "../../../../core/apis/Dtos/ResponseModel";
import {ExportingBillDto} from "../../../../core/apis/Dtos/ExportingBillDto";
import {ExportingbillService} from "../../../../core/Services/agency/ExportingbillService";
import {BillStatus} from "../../../../core/constanst/bill_Status";
import {SocketMessage} from "../../../../core/apis/Dtos/socket-message";
import {TypeBillRealTime} from "../../../../core/constanst/TypeBillRealTime";
import {ExportingBillFullDto} from "../../../../core/apis/Dtos/ExportingBillFullDto";

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bill-real-time.component.html',
  styleUrl: './bill-real-time.component.scss'
})
export class BillRealTimeComponent implements OnInit {
  messageList: any[] = [];
  bookingBills: ExportingBillDto[] = [];
  checkedBills: ExportingBillDto[] = [];
  shippingBills: ExportingBillDto[] = [];
  cancelledBills: ExportingBillDto[] = [];
  completedBills: ExportingBillDto[] = [];
  private idSocket = "billRealTimeSection";

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
        console.log(result.exportingBillDto)
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
      if (res.result[i] != undefined && res.result[i].exportingBillDto != undefined) {
        let bill = res.result[i].exportingBillDto;
        if (bill!.status === BillStatus.BOOKING) this.bookingBills.push(bill!);
        if (bill!.status === BillStatus.CHECKED) this.checkedBills.push(bill!);
        if (bill!.status === BillStatus.SHIPPING) this.shippingBills.push(bill!);
        if (bill!.status === BillStatus.CANCELLED) this.cancelledBills.push(bill!);
        if (bill!.status === BillStatus.COMPELETED) this.completedBills.push(bill!);
      }
    }
  }

  UpdateUI(exportingBill: ExportingBillFullDto, message: string) {
    console.log(message === TypeBillRealTime.BOOKING.toString());
    if (message === TypeBillRealTime.BOOKING.toString()) {
      if(exportingBill.exportingBillDto) this.bookingBills.push(exportingBill.exportingBillDto);
    }
  }
}
