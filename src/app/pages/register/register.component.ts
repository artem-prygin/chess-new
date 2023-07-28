import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessageService } from '../../guards/flash-message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  username: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessageService: FlashMessageService,
  ) {
  }

  register() {
    this.authService.register(this.username, this.password).subscribe({
      next: (response) => {
        console.log(response);
        this.flashMessageService.show('Registration successful. You can now login.');
        this.router.navigate(['/login']);
      },
      error: (err) => console.log(err),
    });
  }
}
