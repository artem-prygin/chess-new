import { Component, HostListener, inject } from '@angular/core';
import { Socket } from 'socket.io-client';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  authService = inject(AuthService);
  private socket: Socket;

  @HostListener('window:mousemove')
  @HostListener('window:keydown')
  @HostListener('window:click')
  resetTokenExpirationTimer(): void {
    this.authService.resetTokenExpirationTimer();
  }
}
