import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ChallengeService } from '../../services/challenge-service';
import { Challenge } from '../../models/challenge';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-challenge-detail',
  templateUrl: './challenge-detail.html',
  imports: [CommonModule, FormsModule, RouterLink],
  styleUrls: ['./challenge-detail.css']
})
export class ChallengeDetail implements OnInit {

  challenge!: Challenge;

  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private challengeService: ChallengeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadChallenge(id);
  }

  loadChallenge(id: number): void {
    this.challengeService.getById(id).subscribe({
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

  isActive(): boolean {
    const today = new Date().toISOString().split('T')[0];
    return this.challenge.isActive &&
           this.challenge.startDate <= today &&
           this.challenge.endDate >= today;
  }
}
