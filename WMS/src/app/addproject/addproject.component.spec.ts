import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddprojectComponent } from './addproject.component';

describe('AddprojectComponent', () => {
  let component: AddprojectComponent;
  let fixture: ComponentFixture<AddprojectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddprojectComponent]
    });
    fixture = TestBed.createComponent(AddprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
