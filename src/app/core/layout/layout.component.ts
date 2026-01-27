import { Component, HostListener } from '@angular/core';
import { ThemeService } from 'src/app/shared/theme.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  isDesktop = true;
  darkMode = false;

  constructor(public themeService: ThemeService) {
    this.checkScreen();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreen();
  }

  checkScreen() {
    this.isDesktop = window.innerWidth >= 1024;
  }

  toggleDarkMode() {
    // this.darkMode = !this.darkMode;
    // document.body.classList.toggle('dark-theme', this.darkMode);
    this.themeService.toggleTheme();
  }

  refreshEngineers() {
    console.log('Refreshing engineer data...');
    // Add logic here to refresh engineer data from API or service
    // For now, just log the action
  }

}

