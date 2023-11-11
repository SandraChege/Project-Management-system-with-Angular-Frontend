import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetusersComponent } from './getusers.component';

describe('GetusersComponent', () => {
  let component: GetusersComponent;
  let fixture: ComponentFixture<GetusersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetusersComponent]
    });
    fixture = TestBed.createComponent(GetusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
