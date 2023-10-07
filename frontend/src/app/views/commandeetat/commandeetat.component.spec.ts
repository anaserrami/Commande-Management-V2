import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeetatComponent } from './commandeetat.component';

describe('CommandeetatComponent', () => {
  let component: CommandeetatComponent;
  let fixture: ComponentFixture<CommandeetatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommandeetatComponent]
    });
    fixture = TestBed.createComponent(CommandeetatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
