import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyCreationComponent } from './survey-creation.component';

describe('SurveyCreationComponent', () => {
  let component: SurveyCreationComponent;
  let fixture: ComponentFixture<SurveyCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
