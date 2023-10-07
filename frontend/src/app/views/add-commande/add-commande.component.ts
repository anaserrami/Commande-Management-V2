import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiserviceService } from '../../apiservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-commande',
  templateUrl: './add-commande.component.html',
  styleUrls: ['./add-commande.component.scss'],
})
export class AddCommandeComponent implements OnInit {
  constructor(
    private service: ApiserviceService,
    private router: ActivatedRoute
  ) {}

  readData: any;
  errormsg: any;
  successmsg: any;
  getparamid: any;
  filterText: string = '';
  originalData: any;
  users: any[] = []; // Store the list of users
  commandeetats: any[] = []; // Store the list of commande etats
  products: any[] = []; // Store the selected products

  ngOnInit(): void {
    this.getparamid = this.router.snapshot.paramMap.get('id');
    if (this.getparamid) {
      this.service.getSingleDataCommande(this.getparamid).subscribe((res) => {
        console.log(res, 'reazdzkfdhzdiuhs ==>');
        this.commandeForm.patchValue({
          idUser: res.data[0].idUser,
          idEtat: res.data[0].idEtat,
        });
      });
    }
    // Fetch the list of users
    this.service.getAllDataUser().subscribe((res) => {
      this.users = res.data;
    });
    // Fetch the list of commande etats
    this.service.getAllDataCommandeEtat().subscribe((res) => {
      this.commandeetats = res.data;
    });
    this.getUsersSortedAlphabetically();
    this.getAllDataProduit();
  }

  // Function to sort the users array alphabetically by 'nom'
  getUsersSortedAlphabetically() {
    this.service.getAllDataUser().subscribe((res) => {
      this.users = res.data;
      this.users.sort((a, b) => a.nom.localeCompare(b.nom));
    });
  }

  commandeForm = new FormGroup({
    idUser: new FormControl('', Validators.required),
    idEtat: new FormControl(),
    prixCommande: new FormControl(''),
    dateCommande: new FormControl(''),
  });

  commandeSubmit() {
    if (this.commandeForm.valid) {
      const ligneDeCommande = this.products
        .filter((product) => product.quantity > 0)
        .map((product) => ({
          idProduit: product.id,
          qteTotal: product.quantity,
          prixTotal: product.prix * product.quantity,
        }));

      const prixCommande = ligneDeCommande.reduce(
        (total, lc) => total + lc.prixTotal,
        0
      );
      const currentDate = new Date().toISOString();

      this.commandeForm.patchValue({
        idEtat: 1,
        dateCommande: currentDate,
        prixCommande: prixCommande.toFixed(2),
      });

      console.log('commandeForm value:', this.commandeForm.value);

      this.service.createDataCommande(this.commandeForm.value).subscribe(
        (res) => {
          console.log(res, 'res ==>');
          this.commandeForm.reset();
          this.successmsg = res.message;
          const commandeId = res.id;
          console.log(commandeId);

          const ligneDeCommandeData = ligneDeCommande.map((lc) => ({
            idCommande: commandeId,
            idProduit: lc.idProduit,
            qteTotal: lc.qteTotal,
            prixTotal: lc.prixTotal,
          }));

          console.log('ligneDeCommandeData:', ligneDeCommandeData);

          this.service.createDataLigneDeCommande(ligneDeCommandeData).subscribe(
            (res) => {
              console.log(res, 'ligneDeCommande res ==>');
              this.successmsg = 'Commande created successfully!';
            },
            (error) => {
              console.error('Error creating ligneDeCommande:', error);
            }
          );
        },
        (error) => {
          console.error('Error creating commande:', error);
        }
      );
    } else {
      this.errormsg = 'All fields are required!';
    }
  }

  getAllDataProduit() {
    this.service.getAllDataProduit().subscribe((res) => {
      console.log(res, 'res ==>');
      this.readData = res.data;
      this.originalData = res.data;
      this.applyFilter();

      this.originalData.forEach((produit: any) => {
        produit.quantity = 0; // Add quantity property to each product
      });

      // Fetch the user details for each produit
      this.originalData.forEach((produit: any) => {
        this.service.getSingleDataUser(produit.idUser).subscribe((userRes) => {
          console.log(userRes, 'userRes ==>');
          produit.user = userRes.data[0];
        });
      });

      // Fetch the category details for each produit
      this.originalData.forEach((produit: any) => {
        this.service
          .getSingleDataCategorie(produit.idCategorie)
          .subscribe((categorieRes) => {
            console.log(categorieRes, 'categorieRes ==>');
            produit.categorie = categorieRes.data[0];
          });
      });

      this.products = this.originalData; // Set the selected products to the products array

      // Assign unique IDs to each product in the this.products array
      this.products.forEach((product, index) => {
        product.id = index + 1;
      });
    });
  }

  commandeUpdate() {
    if (this.commandeForm.valid) {
      const ligneDeCommande = this.products
        .filter((product) => product.quantity > 0)
        .map((product) => ({
          idProduit: product.id,
          qteTotal: product.quantity,
          prixTotal: product.prix * product.quantity,
        }));

      const prixCommande = ligneDeCommande.reduce(
        (total, lc) => total + lc.prixTotal,
        0
      );
      const currentDate = new Date().toISOString();
      console.log(
        this.commandeForm.value,
        prixCommande,
        currentDate,
        'updatedform'
      );
      this.commandeForm.patchValue({
        idEtat: 1,
        dateCommande: currentDate,
        prixCommande: prixCommande.toFixed(2),
      });
      this.service
        .updateDataCommande(this.getparamid, this.commandeForm.value)
        .subscribe((res) => {
          console.log(res, 'res ==>');
          this.successmsg = res.message;
        });
    } else {
      this.errormsg = 'All fields are required';
    }
  }

  incrementQuantity(product: any) {
    if (!product.quantity) {
      product.quantity = 0; // Set the default value to 0
    }
    if (product.quantity < product.qteStock) {
      product.quantity += 1;
    }
  }

  decrementQuantity(product: any) {
    if (product.quantity && product.quantity > 0) {
      product.quantity -= 1;
    }
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
