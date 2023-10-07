import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../apiservice.service';

@Component({
  selector: 'app-commandeetat',
  templateUrl: './commandeetat.component.html',
  styleUrls: ['./commandeetat.component.scss']
})
export class CommandeetatComponent implements OnInit {
  constructor(private service:ApiserviceService) {}
  readData:any;
  successmsg:any;
  filterText: string = '';
  originalData: any;

  ngOnInit(): void {
    this.getAllDataCommandeEtat();
  }

  deleteCommandeEtatID(id:any){
    console.log(id, 'delete ==>');
    this.service.deleteDataCommandeEtat(id).subscribe((res) => {
      console.log(res, 'delete ==>');
      this.successmsg = res.message;
      this.getAllDataCommandeEtat();
    })
  }

  getAllDataCommandeEtat(){
    this.service.getAllDataCommandeEtat().subscribe((res) => {
      console.log(res, "res ==>");
      this.readData = res.data;
      this.originalData = res.data;
      this.applyFilter(); // Apply initial filter after fetching data
    });
  }

  applyFilter() {
    // Convert the filterText to lowercase for case-insensitive filtering
    const filterValue = this.filterText.toLowerCase();

    this.readData = this.originalData.filter((etat: any) => {
      return (
        etat.id.toString().toLowerCase().includes(filterValue) ||
        etat.etat.toLowerCase().includes(filterValue)
      );
    });
  }
}
