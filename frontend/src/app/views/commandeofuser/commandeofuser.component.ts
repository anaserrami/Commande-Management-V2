import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../apiservice.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-commandeofuser',
  templateUrl: './commandeofuser.component.html',
  styleUrls: ['./commandeofuser.component.scss'],
})
export class CommandeofuserComponent implements OnInit {
  readData: any[] = [];
  successmsg: any;
  filterText: string = '';
  originalData: any[] = [];
  idUser: number | undefined;

  constructor(
    private service: ApiserviceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAllDataCommandeUser();
  }

  deleteCommandeUserID(id: any) {
    console.log(id, 'delete ==>');
    this.service.deleteDataCommande(id).subscribe((res) => {
      console.log(res, 'delete ==>');
      this.successmsg = res.message;
      this.getAllDataCommandeUser();
    });
  }

  getAllDataCommandeUser() {
    //const idUser = this.route.snapshot.params['idUser'];
    this.idUser = this.service.getIdUser();
    console.log(this.idUser, 'sheeeeeeeesh');
    this.service.getAllDataCommandeUser(this.idUser).subscribe((res) => {
      console.log(res, 'res ==>');
      this.readData = res.data;
      this.originalData = res.data;
      this.applyFilter();

      if (!this.originalData) {
        console.log('nothing');
      } else {
        // Fetch the user details for each commande
        this.originalData.forEach((commande: any) => {
          this.service
            .getSingleDataUser(commande.idUser)
            .subscribe((userRes) => {
              console.log(userRes, 'userRes ==>');
              commande.user = userRes.data[0];
            });
        });

        // Fetch the commande Etat for each commande
        this.originalData.forEach((commande: any) => {
          this.service
            .getSingleDataCommandeEtat(commande.idEtat)
            .subscribe((commandeEtatRes) => {
              console.log(commandeEtatRes, 'commandeEtatRes ==>');
              commande.commandeEtat = commandeEtatRes.data[0];
            });
        });
      }
    });
  }

  showLigneDeCommandeDetails(idCommande: any) {
    this.router.navigate(['/lignedecommande', 0, idCommande]);
    console.log('showLigneDeCommandeDetails');
    this.service.getSingleDataLigneDeCommande(0, idCommande);
  }

  addCommandeUser() {
    this.router.navigate(['/add-commandeuser']);
  }

  logout() {
    this.router.navigate(['/login']);
  }

  applyFilter() {
    // Convert the filterText to lowercase for case-insensitive filtering
    const filterValue = this.filterText.toLowerCase();

    this.readData = this.originalData.filter((commande: any) => {
      return (
        commande.user?.nom.toLowerCase().includes(filterValue) ||
        commande.user?.role?.nom.toLowerCase().includes(filterValue) ||
        commande.commandeEtat?.etat.toLowerCase().includes(filterValue) ||
        commande.prixCommande.toString().toLowerCase().includes(filterValue) ||
        commande.dateCommande.toString().toLowerCase().includes(filterValue)
      );
    });
  }
}
