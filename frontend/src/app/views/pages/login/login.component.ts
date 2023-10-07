import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from '../../../apiservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  errormsg: any;
  idrole: number | undefined;
  iduser: number | undefined;
  constructor(private service: ApiserviceService, private router: Router) { }

  loginSubmit(nom: string, password: string) {
    // Check if the user exists in the database
    this.service.getAllDataUser().subscribe((res) => {
      if (Array.isArray(res.data)) {
        const user = res.data.find((user: any) => user.nom === nom && user.password === password);
        if (user) {
          this.service.setIdUser(user.id);
          this.service.setIdRole(user.idRole);

          if(this.service.getIdRole() === 1){
            // Navigate to the dashboard if the user exists
            this.router.navigate(['/dashboard']);
          }
          else{
            // Navigate to the dashboard if the user exists
            this.router.navigate(['/commande/0', this.service.getIdUser()]);
          }
        } else {
          // Display an error message if the user does not exist
          this.errormsg = 'Invalid Name or Password. Please enter correct data.';
        }
      } else {
        // Handle the case when the response is not an array
        this.errormsg = 'Unexpected response format.';
      }
    });
  }
}
