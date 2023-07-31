import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FlashMessageService } from '../../../guards/flash-message.service';
import { Router } from '@angular/router';
import { FlashMessageTypeEnum } from '../../../enums/flash-message-type.enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  username: string;
  password: string;
  confirmPassword: string;
  isLoading: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessageService: FlashMessageService,
  ) {
  }

  register() {
    if (this.password !== this.confirmPassword) {
      this.flashMessageService.show({
        text: 'Passwords do not match',
        type: FlashMessageTypeEnum.Error,
      });
      return;
    }

    this.isLoading = true;

    this.authService.register(this.username, this.password).subscribe({
      next: () => {
        this.flashMessageService.show({
          text: 'Registration successful. You can now login.',
          type: FlashMessageTypeEnum.Message,
        });
        this.router.navigate(['/login']);
      },
      error: () => this.isLoading = false,
      complete: () => this.isLoading = false,
    });
  }
}
