import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NgChartsModule } from 'ng2-charts';
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { Chart } from 'chart.js';
import { DetailComponent } from './pages/detail/detail.component';
import { CommonModule } from '@angular/common';

Chart.register(ChartDataLabels)

@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent, DetailComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgChartsModule, CommonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
