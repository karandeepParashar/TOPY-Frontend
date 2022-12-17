import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeniorCitizentHeaderComponent } from './senior-citizent-header.component';

describe('SeniorCitizentHeaderComponent', () => {
  let component: SeniorCitizentHeaderComponent;
  let fixture: ComponentFixture<SeniorCitizentHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeniorCitizentHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeniorCitizentHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
