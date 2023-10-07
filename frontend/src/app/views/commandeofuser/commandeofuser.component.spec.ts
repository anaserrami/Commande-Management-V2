import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeofuserComponent } from './commandeofuser.component';

describe('CommandeofuserComponent', () => {
  let component: CommandeofuserComponent;
  let fixture: ComponentFixture<CommandeofuserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommandeofuserComponent]
    });
    fixture = TestBed.createComponent(CommandeofuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
