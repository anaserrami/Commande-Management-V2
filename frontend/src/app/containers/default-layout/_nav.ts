import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    name: 'Components',
    title: true
  },
  {
    name: 'Suppliers',
    url: '/fournisseur',
    iconComponent: { name: 'cil-puzzle' }
  },
  {
    name: 'Products',
    url: '/produit',
    iconComponent: { name: 'cil-cursor' }
  },
  {
    name: 'Commands',
    url: '/commande',
    iconComponent: { name: 'cil-notes' }
  },
  {
    name: 'Deliveries',
    url: '/livraison',
    iconComponent: { name: 'cil-chart-pie' }
  },
  {
    name: 'Commands Details',
    url: '/lignedecommande',
    iconComponent: { name: 'cil-bell' }
  },
  {
    name: 'Categories',
    url: '/categorie',
    iconComponent: { name: 'cil-calculator' }
  },
  {
    name: 'Roles',
    url: '/role',
    iconComponent: { name: 'cil-drop' }
  },
  {
    name: 'Statuts',
    url: '/commandeetat',
    iconComponent: { name: 'cil-pencil' }
  },
  /*{
    title: true,
    name: 'Extras'
  },
  {
    name: 'Pages',
    url: '/login',
    iconComponent: { name: 'cil-star' },
    children: [
      {
        name: 'Login',
        url: '/login'
      },
      {
        name: 'Register',
        url: '/register'
      }
    ]
  },*/
];
