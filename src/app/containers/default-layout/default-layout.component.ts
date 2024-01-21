import {Component} from '@angular/core';
import {GeneralInformationNavItems} from "../../shared/utils/GeneralInformationNavItems";
import {ReportNavItems} from "../../shared/utils/ReportNavItems";
import {ProductCustomerManagement} from "../../shared/utils/ProductCustomerManagement";
import {OperationManagement} from "../../shared/utils/OperationManagement";
import {EmployeeManagement} from "../../shared/utils/EmployeeManagement";
import {StatisticNavItems} from "../../shared/utils/StatisticNavItems";

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
  constructor() {}

  protected readonly top = top;

}
