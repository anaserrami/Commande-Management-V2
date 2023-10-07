import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiserviceService } from '../../apiservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.scss']
})
export class AddCategorieComponent implements OnInit {
  constructor(private service:ApiserviceService, private router:ActivatedRoute) {}
  
  errormsg:any;
  successmsg:any;
  getparamid:any;

  ngOnInit(): void {
    this.getparamid = this.router.snapshot.paramMap.get('id');
    if(this.getparamid){
      this.service.getSingleDataCategorie(this.getparamid).subscribe((res) => {
        console.log(res, 'res ==>');
        this.categorieForm.patchValue({
          nom: res.data[0].nom
        });
      });
    }
  }

  categorieForm = new FormGroup({
    nom: new FormControl('', Validators.required)
  });

  categorieSubmit() {
    if (this.categorieForm.valid) {
      console.log(this.categorieForm.value);
      this.service.createDataCategorie(this.categorieForm.value).subscribe((res) => {
        console.log(res, "res ==>");
        this.categorieForm.reset();
        this.successmsg = res.message;
      })
    } else {
      this.errormsg = 'all fields is required !!';
    }
  }

  categorieUpdate() {
    console.log(this.categorieForm.value, 'updatedform');
    if (this.categorieForm.valid) {
      this.service.updateDataCategorie(this.getparamid, this.categorieForm.value).subscribe((res) => {
        console.log(res, "res ==>");
        this.successmsg = res.message;
      });
    } else {
      this.errormsg = 'All fields are required';
    }
  }
}
