import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../apiservice.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(private service: ApiserviceService) {}
  readData: any;
  successmsg: any;
  filterText: string = '';
  originalData: any;

  ngOnInit(): void {
    this.getAllDataUser();
  }

  deleteUserID(id: any) {
    console.log(id, 'delete ==>');
    this.service.deleteDataUser(id).subscribe((res) => {
      console.log(res, 'delete ==>');
      this.successmsg = res.message;
      this.getAllDataUser();
    });
  }

  getAllDataUser() {
    this.service.getAllDataUser().subscribe((res) => {
      console.log(res, 'res ==>');
      this.readData = res.data;
      this.originalData = res.data;
      this.applyFilter(); // Apply initial filter after fetching data

      // Fetch the role for each user
      this.originalData.forEach((user: any) => {
        this.service.getSingleDataRole(user.idRole).subscribe((roleRes) => {
          console.log(roleRes, 'roleRes ==>');
          user.role = roleRes.data[0];
        });
      });
    });
  }

  applyFilter() {
    // Convert the filterText to lowercase for case-insensitive filtering
    const filterValue = this.filterText.toLowerCase();

    this.readData = this.originalData.filter((user: any) => {
      return (
        user.nom.toLowerCase().includes(filterValue) ||
        user.role?.nom.toLowerCase().includes(filterValue) ||
        user.tele.toLowerCase().includes(filterValue) ||
        user.email.toLowerCase().includes(filterValue)
      );
    });
  }
}
