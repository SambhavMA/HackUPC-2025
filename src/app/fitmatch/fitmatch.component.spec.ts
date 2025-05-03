import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitmatchComponent } from './fitmatch.component';

describe('FitmatchComponent', () => {
  let component: FitmatchComponent;
  let fixture: ComponentFixture<FitmatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FitmatchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FitmatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
