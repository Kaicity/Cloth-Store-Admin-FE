import {INavData} from "@coreui/angular";

export const OperationManagement: INavData[] = [
  {
    name: 'QUẢN LÝ HOẠT ĐỘNG',
    url: '/base',
    iconComponent: {name: 'cilList'},
    children: [
      {
        name: 'Quản lý Mua Hàng',
        iconComponent: {name: 'cilDollar'},
        children: [
          {
            name: 'Nhập mua hàng hóa - sản phẩm',
            url: '/importing'
          },
          {
            name: 'Xuất trả hàng hóa',
            url: '/base/breadcrumbs'
          },
          {
            name: 'Quản lý bảng giá nhập',
            url: '/base/breadcrumbs'
          },
        ]
      },
      {
        name: 'Quản lý Bán Hàng',
        iconComponent: {name: 'cilDollar'},
        children: [
          {
            name: 'Phiếu đặt hàng',
            url: '/base/cards'
          },
          {
            name: 'Xuất bán hàng hóa - sản phẩm',
            url: '/base/breadcrumbs'
          },
          {
            name: 'Xuất khác',
            url: '/base/breadcrumbs'
          },
          {
            name: 'Nhập hàng bị trả',
            url: '/base/breadcrumbs'
          },
          {
            name: 'Quản lý bảng giá',
            url: '/base/breadcrumbs'
          },
        ]
      },
      {
        name: 'Thu - chi tiền ',
        iconComponent: {name: 'cilCreditCard'},
        children: [
          {
            name: 'Chứng từ chi',
            url: '/payment'
          },
          {
            name: 'Chứng từ thu',
            url: '/receipt'
          },
        ]
      },
      {
        name: 'Tài sản cố định',
        iconComponent: {name: 'cilLockLocked'},
        url: '/base/breadcrumbs'
      },
      {
        name: 'Quản lý nhà cung cấp',
        iconComponent: {name: 'cilLockLocked'},
        url: '/supplier'
      },
    ]
  },
];
