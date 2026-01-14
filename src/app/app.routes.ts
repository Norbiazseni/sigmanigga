import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { ChallengeList } from './pages/challenge-list/challenge-list';
import { ChallengeAdd } from './pages/challenge-add/challenge-add';
import { ChallengeDetail } from './pages/challenge-detail/challenge-detail';
import { ChallengeEdit } from './pages/challenge-edit/challenge-edit';


export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'challenges', component: ChallengeList },
  { path: 'challenges/add', component: ChallengeAdd },
  { path: 'challenges/:id', component: ChallengeDetail },
  { path: 'challenges/:id/edit', component: ChallengeEdit },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
