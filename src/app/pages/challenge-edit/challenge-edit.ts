import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChallengeService } from '../../services/challenge-service';
import { Challenge } from '../../models/challenge';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-challenge-edit',
  templateUrl: './challenge-edit.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./challenge-edit.css']
})
export class ChallengeEdit implements OnInit {

  challengeId!: number;
  challenge!: Challenge;

  loading = true;
  error = '';

  difficulties = ['EASY', 'MEDIUM', 'HARD'];
  categories = ['CODE', 'DESIGN', 'DATA', 'SOFT'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private challengeService: ChallengeService
  ) {}

  ngOnInit(): void {
    this.challengeId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadChallenge();
  }

  loadChallenge(): void {
    this.challengeService.getById(this.challengeId).subscribe({
      next: (data) => {
        this.challenge = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'A kihívás nem található.';
        this.loading = false;
      }
    });
  }

  save(): void {
    if (!this.isValid()) return;

    this.challengeService.update(this.challengeId, this.challenge).subscribe({
      next: () => {
        alert('Sikeres mentés!');
        this.router.navigate(['/challenges']);
      },
      error: () => alert('Mentés sikertelen!')
    });
  }

  isValid(): boolean {
    if (!this.challenge.title || this.challenge.rewardPoints < 10) {
      alert('Hibás adatok!');
      return false;
    }

    if (this.challenge.startDate > this.challenge.endDate) {
      alert('A kezdő dátum nem lehet későbbi!');
      return false;
    }

    return true;
  }
}
