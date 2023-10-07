import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommandeetatComponent } from './add-commandeetat.component';

describe('AddCommandeetatComponent', () => {
  let component: AddCommandeetatComponent;
  let fixture: ComponentFixture<AddCommandeetatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCommandeetatComponent]
    });
    fixture = TestBed.createComponent(AddCommandeetatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
