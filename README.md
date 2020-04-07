# Full Funxn Web Dashboard 

## Overview

This is the Web Dashboard for the Funxn App. It is a static UI built with Angular 2 and Bootstrap that connects with the Funxn Dashboard Server API.

## Technical Overview

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.11-webpack.8.

### Reference Theme

This theme is based on [CoreUI](http://coreui.io/demo/Angular_Demo/#/dashboard).

### Development Server

This project is hosted as a static website on S3. It can be accessed from [http://funxn.tapestryd.com](http://funxn.tapestryd.com).

### Local Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

* Move files into `components`
* Update `app.routes.ts`
	* import new component
	* add route in json heirarchy
* Update `app.modules.ts`
	* import new components
	* add to `declarations`
* Add to navigation in `full-layout.component.html`

### Build

Run `npm run build` will run the `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `npm run build-prod` to use the `-prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/). 
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
