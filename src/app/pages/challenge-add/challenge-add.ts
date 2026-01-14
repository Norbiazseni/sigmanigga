import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChallengeService } from '../../services/challenge-service';
import { Challenge } from '../../models/challenge';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-challenge-add',
  imports: [CommonModule, FormsModule],
  templateUrl: './challenge-add.html',
  styleUrls: ['./challenge-add.css']
})
export class ChallengeAdd {

  challenge: Challenge = {
    title: '',
    category: 'CODE',
    difficulty: 'EASY',
    rewardPoints: 10,
    startDate: '',
    endDate: '',
    isActive: true,
    description: ''
  };

  difficulties = ['EASY', 'MEDIUM', 'HARD'];
  categories = ['CODE', 'DESIGN', 'DATA', 'SOFT'];

  error = '';
  saving = false;

  constructor(
    private challengeService: ChallengeService,
    private router: Router
  ) {}

  save(): void {
    if (!this.isValid()) return;

    this.saving = true;

    this.challengeService.create(this.challenge).subscribe({
      next: () => {
        alert('Kihívás sikeresen létrehozva!');
        this.router.navigate(['/challenges']);
      },
      error: () => {
        this.error = 'A létrehozás sikertelen.';
        this.saving = false;
      }
    });
  }

  isValid(): boolean {
    if (!this.challenge.title) {
      this.error = 'A cím megadása kötelező.';
      return false;
    }

    if (this.challenge.rewardPoints < 10 || this.challenge.rewardPoints > 500) {
      this.error = 'A pontérték 10 és 500 között legyen.';
      return false;
    }

    if (this.challenge.startDate > this.challenge.endDate) {
      this.error = 'A kezdő dátum nem lehet későbbi, mint a befejezés.';
      return false;
    }

    this.error = '';
    return true;
  }
}
