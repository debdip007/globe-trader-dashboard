import { INavData } from '@coreui/angular';


export interface INavDataWithPermission extends INavData {
  permission?: string;
}

export const navItems: INavDataWithPermission[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    },
    permission: 'view_dashboard'
  },
  {
    name: 'Products',
    url: '/user/products',
    iconComponent: { name: 'cil-puzzle' },
    permission: 'view_product'
  },
  {
    name: 'Request',
    url: '/buyers-requests',
    iconComponent: { name: 'cil-bell' },
    permission: 'view_request'
  },
  {
    name: 'User Role',
    url: '/buyers-requests',
    iconComponent: { name: 'cil-spreadsheet' },
    permission: 'view_role'
  },
  {
    name: 'Categories',
    url: '/buyers-requests',
    iconComponent: { name: 'cil-basket' },
    permission: 'view_category'
  },
  {
    name: 'Super Admin Users',
    url: '/user/user-list/super_admin',
    iconComponent: { name: 'cil-user' },
    permission: 'view_super_admin'
  },
  {
    name: 'Admin Users',
    url: '/user/user-list/admin',
    iconComponent: { name: 'cil-user' },
    permission: 'view_admin'
  },
  {
    name: 'Seller Users',
    url: '/user/user-list/seller',
    iconComponent: { name: 'cil-user' },
    permission: 'view_seller'
  },
  {
    name: 'Seller Buyer',
    url: '/user/user-list/buyer',
    iconComponent: { name: 'cil-user' },
    permission: 'view_buyer'
  },
  // {
  //   title: true,
  //   name: 'Theme'
  // },
  // {
  //   name: 'Colors',
  //   url: '/theme/colors',
  //   iconComponent: { name: 'cil-drop' }
  // },
  // {
  //   name: 'Typography',
  //   url: '/theme/typography',
  //   linkProps: { fragment: 'headings' },
  //   iconComponent: { name: 'cil-pencil' }
  // },
  // {
  //   name: 'Components',
  //   title: true
  // },
  // {
  //   name: 'Base',
  //   url: '/base',
  //   iconComponent: { name: 'cil-puzzle' },
  //   children: [
  //     {
  //       name: 'Accordion',
  //       url: '/base/accordion',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Breadcrumbs',
  //       url: '/base/breadcrumbs',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Cards',
  //       url: '/base/cards',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Carousel',
  //       url: '/base/carousel',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Collapse',
  //       url: '/base/collapse',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'List Group',
  //       url: '/base/list-group',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Navs & Tabs',
  //       url: '/base/navs',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Pagination',
  //       url: '/base/pagination',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Placeholder',
  //       url: '/base/placeholder',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Popovers',
  //       url: '/base/popovers',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Progress',
  //       url: '/base/progress',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Spinners',
  //       url: '/base/spinners',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Tables',
  //       url: '/base/tables',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Tabs',
  //       url: '/base/tabs',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Tooltips',
  //       url: '/base/tooltips',
  //       icon: 'nav-icon-bullet'
  //     }
  //   ]
  // },
  // {
  //   name: 'Buttons',
  //   url: '/buttons',
  //   iconComponent: { name: 'cil-cursor' },
  //   children: [
  //     {
  //       name: 'Buttons',
  //       url: '/buttons/buttons',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Button groups',
  //       url: '/buttons/button-groups',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Dropdowns',
  //       url: '/buttons/dropdowns',
  //       icon: 'nav-icon-bullet'
  //     }
  //   ]
  // },
  // {
  //   name: 'Forms',
  //   url: '/forms',
  //   iconComponent: { name: 'cil-notes' },
  //   children: [
  //     {
  //       name: 'Form Control',
  //       url: '/forms/form-control',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Select',
  //       url: '/forms/select',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Checks & Radios',
  //       url: '/forms/checks-radios',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Range',
  //       url: '/forms/range',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Input Group',
  //       url: '/forms/input-group',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Floating Labels',
  //       url: '/forms/floating-labels',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Layout',
  //       url: '/forms/layout',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Validation',
  //       url: '/forms/validation',
  //       icon: 'nav-icon-bullet'
  //     }
  //   ]
  // },
  // {
  //   name: 'Charts',
  //   iconComponent: { name: 'cil-chart-pie' },
  //   url: '/charts'
  // },
  // {
  //   name: 'Icons',
  //   iconComponent: { name: 'cil-star' },
  //   url: '/icons',
  //   children: [
  //     {
  //       name: 'CoreUI Free',
  //       url: '/icons/coreui-icons',
  //       icon: 'nav-icon-bullet',
  //       badge: {
  //         color: 'success',
  //         text: 'FREE'
  //       }
  //     },
  //     {
  //       name: 'CoreUI Flags',
  //       url: '/icons/flags',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'CoreUI Brands',
  //       url: '/icons/brands',
  //       icon: 'nav-icon-bullet'
  //     }
  //   ]
  // },
  // {
  //   name: 'Notifications',
  //   url: '/notifications',
  //   iconComponent: { name: 'cil-bell' },
  //   children: [
  //     {
  //       name: 'Alerts',
  //       url: '/notifications/alerts',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Badges',
  //       url: '/notifications/badges',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Modal',
  //       url: '/notifications/modal',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Toast',
  //       url: '/notifications/toasts',
  //       icon: 'nav-icon-bullet'
  //     }
  //   ]
  // },
  // {
  //   name: 'Widgets',
  //   url: '/widgets',
  //   iconComponent: { name: 'cil-calculator' },
  //   badge: {
  //     color: 'info',
  //     text: 'NEW'
  //   }
  // },
  // {
  //   title: true,
  //   name: 'Extras'
  // },
  // {
  //   name: 'Pages',
  //   url: '/login',
  //   iconComponent: { name: 'cil-star' },
  //   children: [
  //     {
  //       name: 'Login',
  //       url: '/login',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Register',
  //       url: '/register',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Error 404',
  //       url: '/404',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Error 500',
  //       url: '/500',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Trave Visa Check',
  //       url: '/travel-visa-checker',
  //       icon: 'nav-icon-bullet'
  //     }
  //   ]
  // },
  // {
  //   title: true,
  //   name: 'Links',
  //   class: 'mt-auto'
  // },
  // {
  //   name: 'Docs',
  //   url: 'https://coreui.io/angular/docs/',
  //   iconComponent: { name: 'cil-description' },
  //   attributes: { target: '_blank' }
  // }
];
