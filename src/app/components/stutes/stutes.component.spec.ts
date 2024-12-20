import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StutesComponent } from './stutes.component';

describe('StutesComponent', () => {
  let component: StutesComponent;
  let fixture: ComponentFixture<StutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StutesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
