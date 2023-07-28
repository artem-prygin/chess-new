import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FlashMessageService {
  private messageSubject = new Subject<string>();
  message$: Observable<string> = this.messageSubject.asObservable();

  show(message: string): void {
    this.messageSubject.next(message);
  }
}
