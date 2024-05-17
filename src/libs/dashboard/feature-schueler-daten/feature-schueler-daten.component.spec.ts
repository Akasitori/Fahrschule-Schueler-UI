import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureSchuelerDatenComponent } from './feature-schueler-daten.component';

describe('FeatureSchuelerDatenComponent', () => {
  let component: FeatureSchuelerDatenComponent;
  let fixture: ComponentFixture<FeatureSchuelerDatenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeatureSchuelerDatenComponent]
    });
    fixture = TestBed.createComponent(FeatureSchuelerDatenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
