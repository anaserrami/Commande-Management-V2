import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../apiservice.service';

@Component({
  selector: 'app-livraison',
  templateUrl: './livraison.component.html',
  styleUrls: ['./livraison.component.scss'],
})
export class LivraisonComponent implements OnInit {
  constructor(private service: ApiserviceService) {}
  readData: any;
  successmsg: any;
  filterText: string = '';
  originalData: any;

  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 20;

  ngOnInit(): void {
    this.getAllDataLivraison();
  }

  deleteLivraisonID(idFourniseur: any, idProduit: any) {
    console.log(idFourniseur, idProduit, 'delete ==>');
    this.service.deleteDataLivraison(idFourniseur, idProduit).subscribe((res) => {
        console.log(res, 'delete ==>');
        this.successmsg = res.message;
        this.getAllDataLivraison();
      });
  }

  getAllDataLivraison() {
    // Calculate the starting index based on the current page and items per page
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;

    this.service.getAllDataLivraison().subscribe((res) => {
      console.log(res, 'res ==>');
      this.readData = res.data;
      this.originalData = res.data;
      this.applyFilter(); // Apply initial filter after fetching data

      // Fetch the fournisseur details for each livraison
      this.originalData.forEach((livraison: any) => {
        this.service.getSingleDataFournisseur(livraison.idFournisseur).subscribe((fournisseurRes) => {
            console.log(fournisseurRes, 'fournisseurRes ==>');
            livraison.fournisseur = fournisseurRes.data[0];
          });
      });

      // Fetch the produit details for each livraison
      this.originalData.forEach((livraison: any) => {
        this.service.getSingleDataProduit(livraison.idProduit).subscribe((produitRes) => {
            console.log(produitRes, 'produitRes ==>');
            livraison.produit = produitRes.data[0];
          });
      });

      // Fetch the fournisseur and produit details only for the current page items
      this.originalData.slice(startIndex, startIndex + this.itemsPerPage).forEach((livraison: any) => {
        this.service.getSingleDataFournisseur(livraison.idFournisseur).subscribe((fournisseurRes) => {
          livraison.fournisseur = fournisseurRes.data[0];
        });
        this.service.getSingleDataProduit(livraison.idProduit).subscribe((produitRes) => {
          livraison.produit = produitRes.data[0];
        });
      });

    });
  }

  applyFilter() {
    // Convert the filterText to lowercase for case-insensitive filtering
    const filterValue = this.filterText.toLowerCase();

    this.readData = this.originalData.filter((livraison: any) => {
      return (
        livraison.fournisseur?.nom.toLowerCase().includes(filterValue) ||
        livraison.produit?.nom.toLowerCase().includes(filterValue) ||
        livraison.delaisLivraison.toString().toLowerCase().includes(filterValue) ||
        livraison.prixLivraison.toString().toLowerCase().includes(filterValue)
      );
    });
  }

  goToPage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.getAllDataLivraison();
  }

  nextPage() {
    this.currentPage++;
    this.getAllDataLivraison();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getAllDataLivraison();
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.originalData.length / this.itemsPerPage);
  }

  getCurrentPageData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.readData.slice(startIndex, startIndex + this.itemsPerPage);
  }

}
