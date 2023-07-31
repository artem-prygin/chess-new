import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FlashMessageTypeEnum } from '../enums/flash-message-type.enum';
import { FlashMessageInterface } from '../interfaces/flash-message.interface';

@Injectable({
  providedIn: 'root',
})
export class FlashMessageService {
  private messageSubject = new Subject<FlashMessageInterface>();
  message$: Observable<FlashMessageInterface> = this.messageSubject.asObservable();

  show(flashMessage: FlashMessageInterface): void {
    this.messageSubject.next(flashMessage);
  }
}
