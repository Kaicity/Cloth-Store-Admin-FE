import {INavData} from "@coreui/angular";

export const ReportNavItems: INavData[] = [
  {
    name: 'HỆ THỐNG BÁO CÁO',
    url: '/base',

    children: [
      {
        name: 'Báo cáo Bán hàng',
        url: '/base/cards',
      },
      {
        name: 'Báo thu - chi tiền mặt',
        url: '/base/cards',
      },
      {
        name: 'Báo cáo tồn kho',
        url: '/base/cards',
      },

    ]
  },

];
