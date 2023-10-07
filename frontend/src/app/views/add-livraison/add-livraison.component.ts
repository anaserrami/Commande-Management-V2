import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiserviceService } from '../../apiservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-livraison',
  templateUrl: './add-livraison.component.html',
  styleUrls: ['./add-livraison.component.scss']
})
export class AddLivraisonComponent implements OnInit {
  constructor(private service:ApiserviceService, private router:ActivatedRoute) {}
  
  errormsg:any;
  successmsg:any;
  getparamidFour:any;
  getparamidProd:any;
  fournisseurs: any[] = []; // Store the list of fournisseurs
  produits: any[] = []; // Store the list of produits

  ngOnInit(): void {
    this.getparamidFour = this.router.snapshot.paramMap.get('idFournisseur');
    this.getparamidProd = this.router.snapshot.paramMap.get('idProduit');
    if(this.getparamidFour && this.getparamidProd){
      this.service.getSingleDataLivraison(this.getparamidFour, this.getparamidProd).subscribe((res) => {
        console.log(res, 'res ==>');
        this.livraisonForm.patchValue({
          idFournisseur: res.data[0].idFournisseur,
          idProduit: res.data[0].idProduit,
          delaisLivraison: res.data[0].delaisLivraison,
          prixLivraison: res.data[0].prixLivraison
        });
      });
    }
    // Fetch the list of fournisseurs
    this.service.getAllDataFournisseur().subscribe((res) => {
      this.fournisseurs = res.data;
    });
    // Fetch the list of produits
    this.service.getAllDataProduit().subscribe((res) => {
      this.produits = res.data;
    });
  }

  livraisonForm = new FormGroup({
    idFournisseur: new FormControl('', Validators.required),
    idProduit: new FormControl('', Validators.required),
    delaisLivraison: new FormControl('', Validators.required),
    prixLivraison: new FormControl('', Validators.required)
  });

  livraisonSubmit() {
    if (this.livraisonForm.valid) {
      console.log(this.livraisonForm.value);
      this.service.createDataLivraison(this.livraisonForm.value).subscribe((res) => {
        console.log(res, "res ==>");
        this.livraisonForm.reset();
        this.successmsg = res.message;
      })
    } else {
      this.errormsg = 'all fields is required !!';
    }
  }

  livraisonUpdate() {
    console.log(this.livraisonForm.value, 'updatedform');
    if (this.livraisonForm.valid) {
      this.service.updateDataLivraison(this.getparamidFour, this.getparamidProd, this.livraisonForm.value).subscribe((res) => {
        console.log(res, "res ==>");
        this.successmsg = res.message;
      });
    } else {
      this.errormsg = 'All fields are required';
    }
  }
}
