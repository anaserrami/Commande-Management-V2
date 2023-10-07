import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommandeuserComponent } from './add-commandeuser.component';

describe('AddCommandeuserComponent', () => {
  let component: AddCommandeuserComponent;
  let fixture: ComponentFixture<AddCommandeuserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCommandeuserComponent]
    });
    fixture = TestBed.createComponent(AddCommandeuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
