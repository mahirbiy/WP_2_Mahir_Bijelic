import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OKursevima } from './pages/o-kursevima/o-kursevima';
import { PopisKurseva } from './pages/popis-kurseva/popis-kurseva';
import { Raspored } from './pages/raspored/raspored';
import { Kontakt } from './pages/kontakt/kontakt';
import { Auth } from './pages/auth/auth';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TrackersComponent } from './pages/trackers/trackers.component';
import { ViewProfileComponent } from './pages/view-profile/view-profile.component';
import { FunZoneComponent } from './pages/student-fun-zone/student-fun-zone.component';
const routes: Routes = [
  { path: '', redirectTo: '/o-kursevima', pathMatch: 'full' },
  { path: 'o-kursevima', component: OKursevima },
  { path: 'popis-kurseva', component: PopisKurseva },
  { path: 'raspored', component: Raspored },
  {path: 'kontakt', component: Kontakt},
  { path: 'login', component: Auth },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'trackers', component: TrackersComponent }, 
  { path: 'profile', component: ViewProfileComponent },
  {path :'fun-zone', component: FunZoneComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }