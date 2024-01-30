import {Component} from '@angular/core';
import {GeneralInformationNavItems} from "../../shared/utils/GeneralInformationNavItems";
import {ReportNavItems} from "../../shared/utils/ReportNavItems";
import {ProductCustomerManagement} from "../../shared/utils/ProductCustomerManagement";
import {OperationManagement} from "../../shared/utils/OperationManagement";
import {EmployeeManagement} from "../../shared/utils/EmployeeManagement";
import {StatisticNavItems} from "../../shared/utils/StatisticNavItems";
import {BillInDayItems} from "../../shared/utils/BillInDayItems";

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent {


  public generalInformationNavItems = GeneralInformationNavItems;
  public customerEmployeeNavItems = ProductCustomerManagement;
  public operationManagement = OperationManagement;
  public employeeManagement = EmployeeManagement;
  public reportNavItems = ReportNavItems;
  public StatisticNavItems = StatisticNavItems;
  public billInDayItems = BillInDayItems;
  constructor() {}

  protected readonly top = top;

}
