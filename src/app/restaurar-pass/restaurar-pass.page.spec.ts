import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestaurarPassPage } from './restaurar-pass.page';

describe('RestaurarPassPage', () => {
  let component: RestaurarPassPage;
  let fixture: ComponentFixture<RestaurarPassPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurarPassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
