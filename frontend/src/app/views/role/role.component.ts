import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../apiservice.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  constructor(private service:ApiserviceService) {}
  readData:any;
  successmsg:any;
  filterText: string = '';
  originalData: any;

  ngOnInit(): void {
    this.getAllDataRole();
  }

  deleteRoleID(id:any){
    console.log(id, 'delete ==>');
    this.service.deleteDataRole(id).subscribe((res) => {
      console.log(res, 'delete ==>');
      this.successmsg = res.message;
      this.getAllDataRole();
    })
  }

  getAllDataRole(){
    this.service.getAllDataRole().subscribe((res) => {
      console.log(res, "res ==>");
      this.readData = res.data;
      this.originalData = res.data;
      this.applyFilter(); // Apply initial filter after fetching data
    });
  }

  applyFilter() {
    // Convert the filterText to lowercase for case-insensitive filtering
    const filterValue = this.filterText.toLowerCase();

    this.readData = this.originalData.filter((role: any) => {
      return (
        role.id.toString().toLowerCase().includes(filterValue) ||
        role.nom.toLowerCase().includes(filterValue)
      );
    });
  }
}
