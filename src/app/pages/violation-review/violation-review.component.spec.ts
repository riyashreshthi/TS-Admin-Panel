import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViolationReviewComponent } from './violation-review.component';

describe('ViolationReviewComponent', () => {
  let component: ViolationReviewComponent;
  let fixture: ComponentFixture<ViolationReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViolationReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViolationReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
