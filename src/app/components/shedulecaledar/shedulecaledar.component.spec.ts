import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShedulecaledarComponent } from './shedulecaledar.component';

describe('ShedulecaledarComponent', () => {
  let component: ShedulecaledarComponent;
  let fixture: ComponentFixture<ShedulecaledarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShedulecaledarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShedulecaledarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
