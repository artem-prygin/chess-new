import { Component, HostListener, OnInit } from '@angular/core';
import { Socket } from 'socket.io-client';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { FlashMessageService } from './guards/flash-message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private socket: Socket;
  flashMessage: string;

  @HostListener('window:mousemove')
  @HostListener('window:keydown')
  @HostListener('window:click')
  resetTokenExpirationTimer(): void {
    this.authService.resetTokenExpirationTimer();
  }

  constructor(
    public authService: AuthService,
    private router: Router,
    private flashMessageService: FlashMessageService,
  ) {
    this.flashMessageService.message$.subscribe((message) => {
      this.flashMessage = message;
      setTimeout(() => {
        this.flashMessage = null;
      }, 3000);
    });
  }

  ngOnInit(): void {
    localStorage.removeItem('sessionMessage');

    // this.socket = io('http://localhost:3000');
    //
    // this.socket.on('connected', (data) => {
    //   console.log(data);
    // });
  }
}
