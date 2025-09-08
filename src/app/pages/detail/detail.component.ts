import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
