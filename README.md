# OlympicGamesStarter


Web application developed with Angular 16 to visualize Olympic Games data. The dashboard displays the number of medals per country and provides a detail page for each country. The interface is responsive for mobile, tablet, and desktop.

## Installation and running
```bash
git clone https://github.com/<your-username>/<project-name>.git
cd <project-name>
npm install
ng serve
```

Then open http://localhost:4200 in your browser.

## Main features

- Dashboard with interactive chart showing medals per country
- Detail page for each country with additional information and chart
- Navigation between pages (Angular Routing)
- Error handling and loading states for data
- Strongly typed with TypeScript and using RxJS/Observables for HTTP requests

## Stack

- [Angular 16](https://v16.angular.io/docs)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [RxJS](https://rxjs.dev/guide/overview)
- [ngx-charts](https://www.npmjs.com/package/@swimlane/ngx-charts) for charts
- [Font Awesome](https://fontawesome.com/icons) for icons (loaded via CDN)
- [HTML5](https://developer.mozilla.org/en-US/docs/Web/HTML) / [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS) (responsive design)