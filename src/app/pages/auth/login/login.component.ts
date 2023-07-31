import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessageService } from '../../../guards/flash-message.service';
import { FlashMessageTypeEnum } from '../../../enums/flash-message-type.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  isLoading: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessageService: FlashMessageService,
  ) {
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/dashboard']);
    }
  }

  login() {
    this.isLoading = true;

    this.authService.login(this.username, this.password).subscribe({
      next: ({ token }) => {
        localStorage.setItem('token', token);
        this.flashMessageService.show({
          text: 'You was successfully logged in',
          type: FlashMessageTypeEnum.Message,
        });
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.flashMessageService.show({
          text: err.error.message,
          type: FlashMessageTypeEnum.Error,
        });
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
