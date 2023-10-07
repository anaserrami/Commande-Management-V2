import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../apiservice.service';
import { navItems } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent implements OnInit{
  public navItems = navItems;
  idUser: number | undefined;
  idRole: number | undefined;

  constructor(private service: ApiserviceService) {}

  ngOnInit(): void {
    this.idUser = this.service.getIdUser();
    this.idRole = this.service.getIdRole();
    console.log(this.idUser, "workkkkkkkkkkk");
    console.log(this.idRole, "workkkkkkkkkkkkkk2");
  }
}
