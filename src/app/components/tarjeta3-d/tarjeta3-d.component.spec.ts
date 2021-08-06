import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tarjeta3DComponent } from './tarjeta3-d.component';

describe('Tarjeta3DComponent', () => {
  let component: Tarjeta3DComponent;
  let fixture: ComponentFixture<Tarjeta3DComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tarjeta3DComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Tarjeta3DComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
