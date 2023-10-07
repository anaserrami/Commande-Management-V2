import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../../apiservice.service';

@Component({
  selector: 'app-lignedecommande',
  templateUrl: './lignedecommande.component.html',
  styleUrls: ['./lignedecommande.component.scss'],
})
export class LignedecommandeComponent implements OnInit {
  constructor( private service: ApiserviceService, private route: ActivatedRoute ) {}

  readData: any;
  successmsg: any;
  filterText: string = '';
  originalData: any;

  ngOnInit(): void {
    const idProduit = this.route.snapshot.params['idProduit'];
    const idCommande = this.route.snapshot.params['idCommande'];
    
    if (idProduit == 0 && idCommande >= 0) {
      this.service.getSingleDataLigneDeCommande(0, idCommande).subscribe((res) => {
        console.log(res);
        this.readData = res.data;

        this.readData.forEach((lignedecommande: any) => {
          this.service.getSingleDataProduit(lignedecommande.idProduit).subscribe((produitRes) => {
            console.log(produitRes, 'produitRes ==>');
            lignedecommande.produit = produitRes.data[0];
          });
        });

        // Fetch the commands details for each ligne de commande
        this.readData.forEach((lignedecommande: any) => {
          this.service.getSingleDataCommande(lignedecommande.idCommande).subscribe((commandeRes) => {
            console.log(commandeRes, 'commandeRes ==>');
            lignedecommande.commande = commandeRes.data[0];
          });
        });
      });
    } else {
      this.getAllDataLigneDeCommande();
    }
  }

  deleteLigneDeCommandeID(idProduit: any, idCommande: any) {
    console.log(idProduit, idCommande, 'delete ==>');
    this.service.deleteDataLigneDeCommande(idProduit, idCommande).subscribe((res) => {
      console.log(res, 'delete ==>');
      this.successmsg = res.message;
      this.getAllDataLigneDeCommande();
    });
  }

  getAllDataLigneDeCommande() {
    this.service.getAllDataLigneDeCommande().subscribe((res) => {
      console.log(res, 'res ==>');
      this.readData = res.data;
      this.originalData = res.data;
      this.applyFilter();

      // Fetch the commands details for each ligne de commande
      this.originalData.forEach((lignedecommande: any) => {
        this.service.getSingleDataCommande(lignedecommande.idCommande).subscribe((commandeRes) => {
          console.log(commandeRes, 'commandeRes ==>');
          lignedecommande.commande = commandeRes.data[0];
          this.service.getSingleDataUser(lignedecommande.commande.idUser).subscribe((userRes) => {
            console.log(userRes, 'userRes ==>');
            lignedecommande.commande.user = userRes.data[0];
          });
        });
      });

      // Fetch the products details for each ligne de commande
      this.originalData.forEach((lignedecommande: any) => {
        this.service.getSingleDataProduit(lignedecommande.idProduit).subscribe((produitRes) => {
          console.log(produitRes, 'produitRes ==>');
          lignedecommande.produit = produitRes.data[0];
        });
      });
    });
  }

  applyFilter() {
    // Convert the filterText to lowercase for case-insensitive filtering
    const filterValue = this.filterText.toLowerCase();

    this.readData = this.originalData.filter((lignedecommande: any) => {
      return (
        lignedecommande.produit?.nom.toLowerCase().includes(filterValue) ||
        lignedecommande.idCommande.toString().toLowerCase().includes(filterValue) ||
        lignedecommande.qteTotal.toString().toLowerCase().includes(filterValue) ||
        lignedecommande.prixTotal.toString().toLowerCase().includes(filterValue)
      );
    });
  }
}
