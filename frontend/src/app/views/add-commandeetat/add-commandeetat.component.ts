import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiserviceService } from '../../apiservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-commandeetat',
  templateUrl: './add-commandeetat.component.html',
  styleUrls: ['./add-commandeetat.component.scss']
})
export class AddCommandeetatComponent implements OnInit {
  constructor(private service:ApiserviceService, private router:ActivatedRoute) {}
  
  errormsg:any;
  successmsg:any;
  getparamid:any;

  ngOnInit(): void {
    this.getparamid = this.router.snapshot.paramMap.get('id');
    if(this.getparamid){
      this.service.getSingleDataCommandeEtat(this.getparamid).subscribe((res) => {
        console.log(res, 'res ==>');
        this.commandeetatForm.patchValue({
          etat: res.data[0].etat
        });
      });
    }
  }

  commandeetatForm = new FormGroup({
    etat: new FormControl('', Validators.required)
  });

  commandeetatSubmit() {
    if (this.commandeetatForm.valid) {
      console.log(this.commandeetatForm.value);
      this.service.createDataCommandeEtat(this.commandeetatForm.value).subscribe((res) => {
        console.log(res, "res ==>");
        this.commandeetatForm.reset();
        this.successmsg = res.message;
      })
    } else {
      this.errormsg = 'all fields is required !!';
    }
  }

  commandeetatUpdate() {
    console.log(this.commandeetatForm.value, 'updatedform');
    if (this.commandeetatForm.valid) {
      this.service.updateDataCommandeEtat(this.getparamid, this.commandeetatForm.value).subscribe((res) => {
        console.log(res, "res ==>");
        this.successmsg = res.message;
      });
    } else {
      this.errormsg = 'All fields are required';
    }
  }
}
