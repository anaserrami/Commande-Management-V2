import { Component, Input, OnInit} from '@angular/core';
import { ApiserviceService } from '../../../apiservice.service';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';
//import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit{
  @Input() sidebarId: string = 'sidebar';

  public newMessages = new Array(4);
  public newTasks = new Array(5);
  public newNotifications = new Array(5);
  idUser: number | undefined;
  idRole: number | undefined;

  constructor(private classToggler: ClassToggleService, private service: ApiserviceService) { super(); }

  ngOnInit(): void {
    this.idUser = this.service.getIdUser();
    this.idRole = this.service.getIdRole();
    console.log(this.idUser, "workkkkkkkkkkk");
    console.log(this.idRole, "workkkkkkkkkkkkkk2");
  }
}
