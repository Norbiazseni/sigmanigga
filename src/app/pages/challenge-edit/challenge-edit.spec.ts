import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeEdit } from './challenge-edit';

describe('ChallengeEdit', () => {
  let component: ChallengeEdit;
  let fixture: ComponentFixture<ChallengeEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallengeEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChallengeEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
