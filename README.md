# CrudtutoFront

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4401/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


src/app/
├── core/
│   └── layout/
│       ├── layout.component.ts
│       ├── layout.component.html
│       └── layout.component.scss
│
├── shared/
│   └── material.module.ts
│
├── modules/
│   ├── dashboard/
│   │   ├── dashboard.component.ts
│   │   ├── dashboard.component.html
│   │   ├── dashboard.component.scss
│   │   ├── dashboard-routing.module.ts
│   │   └── dashboard.module.ts
│   │
│   ├── customers/
│   ├── inventory/
│   ├── service-requests/
│   ├── notifications/
│   ├── reports/
│   └── auth/
│       └── login/
│
├── app-routing.module.ts
├── app.component.ts
└── app.module.ts
ng g m modules/dashboard --routing
ng g m modules/customers --routing
ng g m modules/inventory --routing
ng g m modules/service-requests --routing
ng g m modules/notifications --routing
ng g m modules/reports --routing
ng g m auth/login --routing

ng g c modules/dashboard/dashboard --module modules/dashboard/dashboard.module.ts

ng g c modules/customers/customers --module modules/customers/customers.module.ts

ng g c modules/inventory/inventory --module modules/inventory/inventory.module.ts

ng g c modules/service-requests/service-requests --module modules/service-requests/service-requests.module.ts

ng g c modules/reports/reports --module modules/reports/reports.module.ts

ng g c modules/notifications/notifications --module modules/notifications/notifications.module.ts

ng g c login/login --module login/login.module.ts

ng g c layout/layout --module layout/layout.module.ts

| Alias   | Description        |
| ------- | ------------------ |
| `lg`    | 1280px – 1919.99px |
| `lt-xl` | < 1920px           |
| `gt-md` | ≥ 1280px           |
| `gt-sm` | ≥ 960px            |
| `gt-xs` | ≥ 600px            |
| `yba`   | Height ≤ 600px     |
npm cache clean --force
rm -rf node_modules package-lock.json
npm install