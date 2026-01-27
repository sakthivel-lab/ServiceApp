import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {

    private storageKey = 'theme';

    initTheme(): void {
        const savedTheme = localStorage.getItem(this.storageKey);

        if (savedTheme === 'dark' || savedTheme === 'light') {
            this.setTheme(savedTheme);
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.setTheme(prefersDark ? 'dark' : 'light');
        }
    }

    toggleTheme(): void {
        const isDark = document.body.classList.contains('dark-theme');
        this.setTheme(isDark ? 'light' : 'dark');
    }

    setTheme(theme: 'light' | 'dark'): void {
        document.body.classList.toggle('dark-theme', theme === 'dark');
        localStorage.setItem(this.storageKey, theme);
    }

    isDark(): boolean {
        return document.body.classList.contains('dark-theme');
    }
}
