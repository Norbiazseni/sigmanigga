import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeAdd } from './challenge-add';

describe('ChallengeAdd', () => {
  let component: ChallengeAdd;
  let fixture: ComponentFixture<ChallengeAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallengeAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChallengeAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
