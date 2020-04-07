import { Component, ElementRef, Renderer } from '@angular/core';
import { Router, NavigationStart, Event as NavigationEvent } from '@angular/router';

@Component({
    selector: 'body',
    template: '<router-outlet></router-outlet>'
    // template: '<h1>Funx Main</h1>'
})
export class AppComponent {
    public chartRoute:Boolean = false;

    constructor(router:Router, public el: ElementRef, public renderer: Renderer) {
        console.log('AppComponent.constructor!');
        router.events
        .filter(event => event instanceof NavigationStart)
        .subscribe((event) => {
            if (event.url == '/charts') {
                renderer.setElementClass(el.nativeElement, 'aside-menu-open', true);
            } else {
                renderer.setElementClass(el.nativeElement, 'aside-menu-open', false);
            }
        });

    } 

}
