import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';

import { UserComponent } from './views/user/user.component';
import { AddUserComponent } from './views/add-user/add-user.component';
import { FournisseurComponent } from './views/fournisseur/fournisseur.component';
import { AddFournisseurComponent } from './views/add-fournisseur/add-fournisseur.component';
import { ProduitComponent } from './views/produit/produit.component';
import { AddProduitComponent } from './views/add-produit/add-produit.component';
import { CommandeComponent } from './views/commande/commande.component';
import { CommandeofuserComponent } from './views/commandeofuser/commandeofuser.component';
import { AddCommandeComponent } from './views/add-commande/add-commande.component';
import { AddCommandeuserComponent } from './views/add-commandeuser/add-commandeuser.component';
import { CategorieComponent } from './views/categorie/categorie.component';
import { AddCategorieComponent } from './views/add-categorie/add-categorie.component';
import { LivraisonComponent } from './views/livraison/livraison.component';
import { AddLivraisonComponent } from './views/add-livraison/add-livraison.component';
import { CommandeetatComponent } from './views/commandeetat/commandeetat.component';
import { AddCommandeetatComponent } from './views/add-commandeetat/add-commandeetat.component';
import { RoleComponent } from './views/role/role.component';
import { AddRoleComponent } from './views/add-role/add-role.component';
import { LignedecommandeComponent } from './views/lignedecommande/lignedecommande.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      { path: 'add-user', component: AddUserComponent },
      { path: 'add-user/:id', component: AddUserComponent },
      { path: 'user', component: UserComponent },
      { path: 'add-fournisseur', component: AddFournisseurComponent },
      { path: 'add-fournisseur/:id', component: AddFournisseurComponent },
      { path: 'fournisseur', component: FournisseurComponent },
      { path: 'add-produit', component: AddProduitComponent },
      { path: 'add-produit/:id', component: AddProduitComponent },
      { path: 'produit', component: ProduitComponent },
      { path: 'add-commande', component: AddCommandeComponent },
      { path: 'add-commandeuser', component: AddCommandeuserComponent },
      { path: 'add-commandeuser/:idUser', component: AddCommandeuserComponent },
      { path: 'add-commande/:id', component: AddCommandeComponent },
      { path: 'commande', component: CommandeComponent },
      { path: 'commande/0/:idUser', component: CommandeofuserComponent },
      { path: 'add-categorie', component: AddCategorieComponent },
      { path: 'add-categorie/:id', component: AddCategorieComponent },
      { path: 'categorie', component: CategorieComponent },
      { path: 'add-livraison', component: AddLivraisonComponent },
      {
        path: 'add-livraison/:idFournisseur/:idProduit',
        component: AddLivraisonComponent,
      },
      { path: 'livraison', component: LivraisonComponent },
      { path: 'add-commandeetat', component: AddCommandeetatComponent },
      { path: 'add-commandeetat/:id', component: AddCommandeetatComponent },
      { path: 'commandeetat', component: CommandeetatComponent },
      { path: 'add-role', component: AddRoleComponent },
      { path: 'add-role/:id', component: AddRoleComponent },
      { path: 'role', component: RoleComponent },
      { path: 'lignedecommande', component: LignedecommandeComponent },
      {
        path: 'lignedecommande/:idProduit/:idCommande',
        component: LignedecommandeComponent,
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule),
      },
    ],
  },
  { path: 'login', component: LoginComponent, data: { title: 'Login Page' } },
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'Register Page' },
  },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking',
      // relativeLinkResolution: 'legacy'
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
