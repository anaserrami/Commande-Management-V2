import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../apiservice.service';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.scss']
})
export class ProduitComponent implements OnInit {
  constructor(private service:ApiserviceService) {}
  readData:any;
  successmsg:any;
  filterText: string = '';
  originalData: any;

  ngOnInit(): void {
    this.getAllDataProduit();
  }

  deleteProduitID(id:any){
    console.log(id, 'delete ==>');
    this.service.deleteDataProduit(id).subscribe((res) => {
      console.log(res, 'delete ==>');
      this.successmsg = res.message;
      this.getAllDataProduit();
    })
  }

  getAllDataProduit(){
    this.service.getAllDataProduit().subscribe((res) => {
      console.log(res, "res ==>");
      this.readData = res.data;
      this.originalData = res.data;
      this.applyFilter(); // Apply initial filter after fetching data

      // Fetch the user details for each produit
      this.originalData.forEach((produit: any) => {
        this.service.getSingleDataUser(produit.idUser).subscribe((userRes) => {
          console.log(userRes, 'userRes ==>');
          produit.user = userRes.data[0];
        });
      });

      // Fetch the category details for each produit
      this.originalData.forEach((produit: any) => {
        this.service.getSingleDataCategorie(produit.idCategorie).subscribe((categorieRes) => {
          console.log(categorieRes, 'categorieRes ==>');
          produit.categorie = categorieRes.data[0];
        });
      });
    });
  }

  applyFilter() {
    // Convert the filterText to lowercase for case-insensitive filtering
    const filterValue = this.filterText.toLowerCase();

    this.readData = this.originalData.filter((produit: any) => {
      return (
        //produit.user?.nom.toLowerCase().includes(filterValue) ||
        //produit.categorie?.nom.toLowerCase().includes(filterValue) ||
        produit.nom.toLowerCase().includes(filterValue) ||
        //produit.description.toLowerCase().includes(filterValue) ||
        //produit.qteStock.toString().toLowerCase().includes(filterValue) ||
        produit.prix.toString().toLowerCase().includes(filterValue)
      );
    });
  }
}