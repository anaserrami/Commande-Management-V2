import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../apiservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.scss'],
})

export class CommandeComponent implements OnInit {
  readData: any;
  successmsg: any;
  filterText: string = '';
  originalData: any;

  constructor(private service: ApiserviceService, private router: Router) {}

  ngOnInit(): void {
    this.getAllDataCommande();
  }

  deleteCommandeID(id: any) {
    console.log(id, 'delete ==>');
    this.service.deleteDataCommande(id).subscribe((res) => {
      console.log(res, 'delete ==>');
      this.successmsg = res.message;
      this.getAllDataCommande();
    });
  }

  getAllDataCommande() {
    this.service.getAllDataCommande().subscribe((res) => {
      console.log(res, 'res ==>');
      this.readData = res.data;
      this.originalData = res.data;
      this.applyFilter();

      // Fetch the user details for each commande
      this.originalData.forEach((commande: any) => {
        this.service.getSingleDataUser(commande.idUser).subscribe((userRes) => {
          console.log(userRes, 'userRes ==>');
          commande.user = userRes.data[0];
          this.service.getSingleDataRole(commande.user.idRole).subscribe((roleRes) => {
            console.log(roleRes, 'roleRes ==>');
            commande.user.role = roleRes.data[0];
          });
        });
      });

      // Fetch the commande Statuts for each commande
      this.originalData.forEach((commande: any) => {
        this.service.getSingleDataCommandeEtat(commande.idEtat).subscribe((commandeEtatRes) => {
            console.log(commandeEtatRes, 'commandeEtatRes ==>');
            commande.commandeEtat = commandeEtatRes.data[0];
          });
      });
    });
  }

  showLigneDeCommandeDetails(idCommande: any) {
    this.router.navigate(['/lignedecommande', 0, idCommande]);
    console.log('showLigneDeCommandeDetails');
    this.service.getSingleDataLigneDeCommande(0, idCommande);
  }

  validerCommande(idCommande: any, newEtat: any) {
    this.service.changeEtatCommande(idCommande, newEtat).subscribe(() => {
      // Find the corresponding Commande object in readData and update its idEtat
      const commandeToUpdate = this.readData.find((cmd: any) => cmd.id === idCommande);
      if (commandeToUpdate) {
        commandeToUpdate.idEtat = newEtat;
      }
      // Refresh the data to see the changes
      this.getAllDataCommande();
    });
  }
  
  changeEtatCommande(idCommande: any, newEtat: number) {
    this.service.changeEtatCommande(idCommande, newEtat).subscribe(() => {
      // Find the corresponding Commande object in readData and update its idEtat
      const commandeToUpdate = this.readData.find((cmd: any) => cmd.id === idCommande);
      if (commandeToUpdate) {
        commandeToUpdate.idEtat = newEtat;
      }
      // Refresh the data to see the changes
      this.getAllDataCommande();
    });
  }
  
  onEtatChange(cmdId: number, selectedValue: string) {
    switch (selectedValue) {
      case 'complete':
        this.changeEtatCommande(cmdId, 3); // 3 corresponds to the 'Complete' idEtat value
        break;
      case 'cancel':
        this.changeEtatCommande(cmdId, 4); // 4 corresponds to the 'Cancel' idEtat value
        break;
      default:
        // Handle default case if needed
        break;
    }
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
