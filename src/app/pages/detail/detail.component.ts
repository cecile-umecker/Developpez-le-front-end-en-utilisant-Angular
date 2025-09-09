import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {
  constructor(private location: Location, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Récupérer les paramètres de la requête ici
    this.route.queryParams.subscribe(params => {
      const country = params['country'];
      console.log(country);
    });
  }


  goBack(): void {
    this.location.back();
  }
}
