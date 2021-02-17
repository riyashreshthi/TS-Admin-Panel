import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LuckyDrawViewComponent } from './lucky-draw-view.component';

describe('LuckyDrawViewComponent', () => {
  let component: LuckyDrawViewComponent;
  let fixture: ComponentFixture<LuckyDrawViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LuckyDrawViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LuckyDrawViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
