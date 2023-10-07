import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiserviceService } from '../../apiservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-fournisseur',
  templateUrl: './add-fournisseur.component.html',
  styleUrls: ['./add-fournisseur.component.scss']
})
export class AddFournisseurComponent implements OnInit {
  constructor(private service: ApiserviceService, private router: ActivatedRoute) { }

  errormsg: any;
  successmsg: any;
  getparamid: any;
  users: any[] = []; // Store the list of users

  ngOnInit(): void {
    this.getparamid = this.router.snapshot.paramMap.get('id');
    if (this.getparamid) {
      this.service.getSingleDataFournisseur(this.getparamid).subscribe((res) => {
        console.log(res, 'res ==>');
        this.fournisseurForm.patchValue({
          idUser: res.data[0].idUser,
          nom: res.data[0].nom,
          email: res.data[0].email,
          tele: res.data[0].tele,
          description: res.data[0].description
        });
      });
    }

    // Fetch the list of users
    this.service.getAllDataUser().subscribe((res) => {
      this.users = res.data;
    });
    this.getUsersSortedAlphabetically();
  }

  // Function to sort the users array alphabetically by 'nom'
  getUsersSortedAlphabetically() {
    this.service.getAllDataUser().subscribe((res) => {
      this.users = res.data;
      this.users.sort((a, b) => a.nom.localeCompare(b.nom));
    });
  }

  fournisseurForm = new FormGroup({
    idUser: new FormControl('', Validators.required),
    nom: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    tele: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  fournisseurSubmit() {
    if (this.fournisseurForm.valid) {
      console.log(this.fournisseurForm.value);
      this.service.createDataFournisseur(this.fournisseurForm.value).subscribe((res) => {
        console.log(res, 'res ==>');
        this.fournisseurForm.reset();
        this.successmsg = res.message;
      });
    } else {
      this.errormsg = 'Please fill in all required fields correctly.';
    }
  }

  fournisseurUpdate() {
    console.log(this.fournisseurForm.value, 'updatedform');
    if (this.fournisseurForm.valid) {
      this.service.updateDataFournisseur(this.getparamid, this.fournisseurForm.value).subscribe((res) => {
        console.log(res, 'res ==>');
        this.successmsg = res.message;
      });
    } else {
      this.errormsg = 'Please fill in all required fields correctly.';
    }
  }
}
