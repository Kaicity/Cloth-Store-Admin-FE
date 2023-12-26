import {INavData} from "@coreui/angular";

export const ProductCustomerManagement: INavData[] = [
  {
    name: 'SẢN PHẢM / KHÁCH',
    url: '/base',
    children: [
      {
        name: 'Quản lý sản phẩm',
        iconComponent: { name: 'cil-puzzle' },
        children: [
          {
            name: 'Hàng hóa - sản phẩm',
            url: '/base/cards'
          },
          {
            name: 'sản phẩm nhập',
            url: '/base/cards'
          },
          {
            name: 'sản phẩm bán',
            url: '/base/cards'
          },
          {
            name: 'Quản lý đơn vị tính',
            url: '/base/cards'
          },
        ],
      },
      {
        name: 'Quản lý Khách hàng',
        iconComponent: { name: 'cil-puzzle' },
        children: [
          {
            name: 'Khách Hàng',
            url: '/base/cards'
          },
          {
            name: 'Nhóm Khách hàng',
            url: '/base/cards'
          },
        ]
      }

    ]
  },

];
