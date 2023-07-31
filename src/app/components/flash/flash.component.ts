import { Component } from '@angular/core';
import { FlashMessageService } from '../../guards/flash-message.service';
import { FlashMessageInterface } from '../../interfaces/flash-message.interface';
import { FlashMessageTypeEnum } from '../../enums/flash-message-type.enum';

@Component({
  selector: 'app-flash',
  templateUrl: './flash.component.html',
  styleUrls: ['./flash.component.scss'],
})
export class FlashComponent {
  flashMessage: FlashMessageInterface;
  FlashMessageTypeEnum = FlashMessageTypeEnum;

  constructor(private flashMessageService: FlashMessageService) {
    this.flashMessageService.message$.subscribe((message) => {
      this.flashMessage = message;
      setTimeout(() => {
        this.flashMessage = null;
      }, 3000);
    });
  }
}
