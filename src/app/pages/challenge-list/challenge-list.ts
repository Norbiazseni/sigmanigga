import { Component, NgModule, OnInit } from '@angular/core';
import { Challenge } from '../../models/challenge';
import { ChallengeService } from '../../services/challenge-service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-challenge-list',
  templateUrl: './challenge-list.html',
  imports: [RouterLink, CommonModule, FormsModule],
  styleUrls: ['./challenge-list.css']
})
export class ChallengeList implements OnInit {

  challenges: Challenge[] = [];
  filteredChallenges: Challenge[] = [];

  loading = true;
  error = '';

  selectedDifficulty: '' | 'EASY' | 'MEDIUM' | 'HARD' = '';

  constructor(private challengeService: ChallengeService) {}

  ngOnInit(): void {
    this.loadChallenges();
  }

  loadChallenges(): void {
    this.loading = true;
    this.challengeService.getAll().subscribe({
      next: (data) => {
        this.challenges = data;
        this.applyFilter();
        this.loading = false;
      },
      error: () => {
        this.error = 'Nem sikerült betölteni a kihívásokat.';
        this.loading = false;
      }
    });
  }

  applyFilter(): void {
    if (!this.selectedDifficulty) {
      this.filteredChallenges = this.challenges;
    } else {
      this.filteredChallenges = this.challenges.filter(
        c => c.difficulty === this.selectedDifficulty
      );
    }
  }

  deleteChallenge(id: number): void {
    if (!confirm('Biztos törlöd a kihívást?')) return;

    this.challengeService.delete(id).subscribe({
      next: () => this.loadChallenges(),
      error: () => alert('Törlés sikertelen!')
    });
  }

  isActive(challenge: Challenge): boolean {
    const today = new Date().toISOString().split('T')[0];
    return challenge.isActive &&
           challenge.startDate <= today &&
           challenge.endDate >= today;
  }
}
