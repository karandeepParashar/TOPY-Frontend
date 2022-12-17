import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentHeaderComponent } from './parent-header.component';

describe('ParentHeaderComponent', () => {
  let component: ParentHeaderComponent;
  let fixture: ComponentFixture<ParentHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
