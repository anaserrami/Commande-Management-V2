import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiserviceService } from '../../../apiservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(private service:ApiserviceService, private router:ActivatedRoute, private router2: Router) {}

  errormsg:any;
  successmsg:any;
  getparamid:any;

  ngOnInit(): void {
    this.getparamid = this.router.snapshot.paramMap.get('id');
    if (this.getparamid) {
      this.service.getSingleDataUser(this.getparamid).subscribe((res) => {
        console.log(res, 'res ==>');
        this.userForm.patchValue({
          nom: res.data[0].nom,
          tele: res.data[0].tele,
          email: res.data[0].email,
          password: res.data[0].password
        });
      });
    }
  }

  userForm = new FormGroup({
    nom: new FormControl('', Validators.required),
    tele: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  userSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      const newUser = {
        ...this.userForm.value,
        idRole: 2,
      };

      this.service.createDataUser(newUser).subscribe((res) => {
        console.log(res, 'res ==>');
        this.userForm.reset();
        this.successmsg = res.message;
      });
    } else {
      this.errormsg = 'Please fill in all required fields correctly.';
    }
  }

  goToLogin(){
    this.router2.navigate(['/login']);
  }
}
