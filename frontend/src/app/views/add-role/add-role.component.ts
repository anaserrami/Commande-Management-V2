import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiserviceService } from '../../apiservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {
  constructor(private service:ApiserviceService, private router:ActivatedRoute) {}
  
  errormsg:any;
  successmsg:any;
  getparamid:any;

  ngOnInit(): void {
    this.getparamid = this.router.snapshot.paramMap.get('id');
    if(this.getparamid){
      this.service.getSingleDataRole(this.getparamid).subscribe((res) => {
        console.log(res, 'res ==>');
        this.roleForm.patchValue({
          nom: res.data[0].nom
        });
      });
    }
  }

  roleForm = new FormGroup({
    nom: new FormControl('', Validators.required)
  });

  roleSubmit() {
    if (this.roleForm.valid) {
      console.log(this.roleForm.value);
      this.service.createDataRole(this.roleForm.value).subscribe((res) => {
        console.log(res, "res ==>");
        this.roleForm.reset();
        this.successmsg = res.message;
      })
    } else {
      this.errormsg = 'all fields is required !!';
    }
  }

  roleUpdate() {
    console.log(this.roleForm.value, 'updatedform');
    if (this.roleForm.valid) {
      this.service.updateDataRole(this.getparamid, this.roleForm.value).subscribe((res) => {
        console.log(res, "res ==>");
        this.successmsg = res.message;
      });
    } else {
      this.errormsg = 'All fields are required';
    }
  }
}
