
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { AppComponent } from './app';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TrackersComponent } from './pages/trackers/trackers.component';

import { OKursevima } from './pages/o-kursevima/o-kursevima';
import { PopisKurseva } from './pages/popis-kurseva/popis-kurseva';
import { Raspored } from './pages/raspored/raspored';
import { Kontakt } from './pages/kontakt/kontakt';
import { Auth } from './pages/auth/auth';
import { Navbar } from './components/navbar/navbar';


@NgModule({
  declarations: [
    AppComponent,
    Navbar
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OKursevima,
    PopisKurseva,
    HttpClientModule, 
    FormsModule,
    Raspored,
    Kontakt,
    Auth,
    DashboardComponent,
    TrackersComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }