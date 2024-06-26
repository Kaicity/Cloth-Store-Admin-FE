import {INavData} from "@coreui/angular";

export const ProductCustomerManagement: INavData[] = [
  {
    name: 'SẢN PHẨM / KHÁCH',
    url: '/base',
    iconComponent: {name: 'cilNotes'},
    children: [
      {
        name: 'Quản lý sản phẩm',
        iconComponent: {name: 'cilInbox'},
        children: [
          {
            name: 'Hàng hóa - sản phẩm',
            url: '/product'
          },
          {
            name: 'sản phẩm nhập',
            url: '/cards'
          },
          {
            name: 'sản phẩm bán',
            url: '/cards'
          },
          {
            name: 'Quản lý đơn vị tính',
            url: '/cards'
          },
        ],
      },
      {
        name: 'Quản lý Khách hàng',
        iconComponent: {name: 'cilUser'},
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
