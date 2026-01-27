import { Component } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  
  activeMedia: string[] = [];

  constructor(private mediaObserver: MediaObserver) {
    this.mediaObserver.asObservable().subscribe((changes: MediaChange[]) => {
      this.activeMedia = changes.map(change => change.mqAlias);
      console.log('Active MediaQueries:', this.activeMedia);
    });
  }
}