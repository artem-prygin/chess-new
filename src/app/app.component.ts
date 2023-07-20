import { Component, OnInit } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private socket: Socket;

  ngOnInit(): void {
    // this.socket = io('http://localhost:3000');
    //
    // this.socket.on('connected', (data) => {
    //   console.log(data);
    // });
  }
}
