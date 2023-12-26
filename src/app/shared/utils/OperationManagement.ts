import {INavData} from "@coreui/angular";

export const OperationManagement: INavData[] = [
  {
    name: 'QUẢN LÝ HOẠT ĐỘNG',
    url: '/base',
    children: [
      {
        name: 'Quản lý Mua Hàng',
        iconComponent: { name: 'cil-puzzle' },
        children: [
          {
            name: 'Nhập mua hàng hóa - sản phẩm',
            url: '/base/cards'
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
        iconComponent: { name: 'cil-puzzle' },
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
        iconComponent: { name: 'cil-puzzle' },
        children: [
          {
            name: 'Chứng từ thu',
            url: '/base/cards'
          },
          {
            name: 'Chứng từ chi',
            url: '/base/breadcrumbs'
          },
        ]
      },
      {
        name: 'Tài sản cố định',
        iconComponent: { name: 'cil-puzzle' },
        url: '/base/breadcrumbs'
      },


    ]
  },

];
