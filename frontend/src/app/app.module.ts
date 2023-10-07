import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { ApiserviceService } from './apiservice.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgScrollbarModule } from 'ngx-scrollbar';

// Import routing module
import { AppRoutingModule } from './app-routing.module';

// Import app component
import { AppComponent } from './app.component';

// Import containers
import { DefaultFooterComponent, DefaultHeaderComponent, DefaultLayoutComponent } from './containers';

import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule
} from '@coreui/angular';

import { IconModule, IconSetService } from '@coreui/icons-angular';
import { UserComponent } from './views/user/user.component';
import { RoleComponent } from './views/role/role.component';
import { ProduitComponent } from './views/produit/produit.component';
import { CommandeComponent } from './views/commande/commande.component';
import { FournisseurComponent } from './views/fournisseur/fournisseur.component';
import { CategorieComponent } from './views/categorie/categorie.component';
import { CommandeetatComponent } from './views/commandeetat/commandeetat.component';
import { LignedecommandeComponent } from './views/lignedecommande/lignedecommande.component';
import { LivraisonComponent } from './views/livraison/livraison.component';
import { AddUserComponent } from './views/add-user/add-user.component';
import { AddRoleComponent } from './views/add-role/add-role.component';
import { AddCategorieComponent } from './views/add-categorie/add-categorie.component';
import { AddFournisseurComponent } from './views/add-fournisseur/add-fournisseur.component';
import { AddProduitComponent } from './views/add-produit/add-produit.component';
import { AddCommandeComponent } from './views/add-commande/add-commande.component';
import { AddLivraisonComponent } from './views/add-livraison/add-livraison.component';
import { AddCommandeetatComponent } from './views/add-commandeetat/add-commandeetat.component';
import { CommandeofuserComponent } from './views/commandeofuser/commandeofuser.component';
import { AddCommandeuserComponent } from './views/add-commandeuser/add-commandeuser.component';

const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent
];

@NgModule({
  declarations: [
    ...APP_CONTAINERS, 
    AppComponent, 
    UserComponent,
    RoleComponent,
    ProduitComponent,
    CommandeComponent,
    FournisseurComponent,
    CategorieComponent,
    CommandeetatComponent,
    LignedecommandeComponent,
    LivraisonComponent,
    AddUserComponent,
    AddRoleComponent,
    AddCategorieComponent,
    AddFournisseurComponent,
    AddProduitComponent,
    AddCommandeComponent,
    AddLivraisonComponent,
    AddCommandeetatComponent,
    CommandeofuserComponent,
    AddCommandeuserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AvatarModule,
    FooterModule,
    BreadcrumbModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    NavModule,
    FormModule,
    ButtonModule,
    UtilitiesModule,
    ButtonGroupModule,
    SidebarModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    CardModule,
    NgScrollbarModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    ApiserviceService,
    IconSetService,
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
