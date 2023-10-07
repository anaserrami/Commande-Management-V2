import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../apiservice.service';

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.scss'],
})
export class FournisseurComponent implements OnInit {
  constructor(private service: ApiserviceService) {}
  readData: any;
  successmsg: any;
  filterText: string = '';
  originalData: any;

  ngOnInit(): void {
    this.getAllDataFournisseur();
  }

  deleteFournisseurID(id: any) {
    console.log(id, 'delete ==>');
    this.service.deleteDataFournisseur(id).subscribe((res) => {
      console.log(res, 'delete ==>');
      this.successmsg = res.message;
      this.getAllDataFournisseur();
    });
  }

  getAllDataFournisseur() {
    this.service.getAllDataFournisseur().subscribe((res) => {
      console.log(res, 'res ==>');
      this.readData = res.data;
      this.originalData = res.data;
      this.applyFilter(); // Apply initial filter after fetching data

      // Fetch the user details for each fournisseur
      this.originalData.forEach((fournisseur: any) => {
        this.service
          .getSingleDataUser(fournisseur.idUser)
          .subscribe((userRes) => {
            console.log(userRes, 'userRes ==>');
            fournisseur.user = userRes.data[0];
          });
      });
    });
  }

  applyFilter() {
    // Convert the filterText to lowercase for case-insensitive filtering
    const filterValue = this.filterText.toLowerCase();

    this.readData = this.originalData.filter((fournisseur: any) => {
      return (
        fournisseur.nom.toLowerCase().includes(filterValue) ||
        fournisseur.user?.nom.toLowerCase().includes(filterValue) ||
        fournisseur.email.toLowerCase().includes(filterValue) ||
        fournisseur.tele.toLowerCase().includes(filterValue) ||
        fournisseur.description.toLowerCase().includes(filterValue)
      );
    });
  }
}
