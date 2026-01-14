import { Component, OnInit } from '@angular/core';
import { Challenge } from '../../models/challenge';
import { ChallengeService } from '../../services/challenge-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {

  challenges: Challenge[] = [];

  loading = true;
  error = '';

  activeCount = 0;
  totalPoints = 0;

  constructor(private challengeService: ChallengeService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.challengeService.getAll().subscribe({
      next: (data) => {
        this.challenges = data;
        this.calculateStats();
        this.loading = false;
      },
      error: () => {
        this.error = 'Nem sikerült betölteni a dashboard adatokat.';
        this.loading = false;
      }
    });
  }

  calculateStats(): void {
    const today = new Date().toISOString().split('T')[0];

    const activeChallenges = this.challenges.filter(c =>
      c.isActive &&
      c.startDate <= today &&
      c.endDate >= today
    );

    this.activeCount = activeChallenges.length;

    this.totalPoints = activeChallenges.reduce(
      (sum, c) => sum + c.rewardPoints,
      0
    );
  }
}
