import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TerminplanungComponent } from './terminplanung.component';


describe('FeatureTerminplanungComponent', () => {
  let component: TerminplanungComponent;
  let fixture: ComponentFixture<TerminplanungComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TerminplanungComponent]
    });
    fixture = TestBed.createComponent(TerminplanungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
