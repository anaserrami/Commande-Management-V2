import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../apiservice.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent implements OnInit {
  constructor(private service:ApiserviceService) {}
  readData:any;
  successmsg:any;
  filterText: string = '';
  originalData: any;

  ngOnInit(): void {
    this.getAllDataCategorie();
  }

  deleteCategorieID(id:any){
    console.log(id, 'delete ==>');
    this.service.deleteDataCategorie(id).subscribe((res) => {
      console.log(res, 'delete ==>');
      this.successmsg = res.message;
      this.getAllDataCategorie();
    })
  }

  getAllDataCategorie(){
    this.service.getAllDataCategorie().subscribe((res) => {
      console.log(res, "res ==>");
      this.readData = res.data;
      this.originalData = res.data;
      this.applyFilter(); // Apply initial filter after fetching data
    });
  }

  applyFilter() {
    // Convert the filterText to lowercase for case-insensitive filtering
    const filterValue = this.filterText.toLowerCase();

    this.readData = this.originalData.filter((categorie: any) => {
      return (
        categorie.id.toString().toLowerCase().includes(filterValue) ||
        categorie.nom.toLowerCase().includes(filterValue)
      );
    });
  }
}
