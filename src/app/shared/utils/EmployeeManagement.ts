import {INavData} from "@coreui/angular";

export const EmployeeManagement: INavData[] = [
  {
    name: 'Nhân viên / CTV',
    url: '/base',
    children: [
      {
        name: 'Quản lý nhân viên',
        url: '/base/cards'
      },
      {
        name: 'Quản lý chức vụ',
        url: '/base/cards'
      },


    ]
  },

];
