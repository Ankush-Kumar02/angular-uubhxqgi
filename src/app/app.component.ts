import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular Seat Reservation';
  rows = Array.from({ length: 11 }, (_, i) => (i < 10 ? Array(7).fill(false) : Array(3).fill(false)));
  message = '';
  numSeats: number = 1;

  bookSeats(numSeats: number): void {
    if (numSeats < 1 || numSeats > 7) {
      this.message = 'You can book between 1 and 7 seats only.';
      return;
    }

    for (const row of this.rows) {
      const startIndex = row.findIndex((seat, index) =>
        row.slice(index, index + numSeats).every(s => !s)
      );
      if (startIndex !== -1) {
        for (let i = startIndex; i < startIndex + numSeats; i++) {
          row[i] = true;
        }
        this.message = `${numSeats} seats booked successfully in the same row!`;
        return;
      }
    }

    this.message = 'Not enough seats available in one row. Booking nearby seats...';
    this.bookNearbySeats(numSeats);
  }

  bookNearbySeats(numSeats: number): void {
    const flatSeats = this.rows.flat();
    const availableSeats = flatSeats.reduce(
      (acc, seat, index) => (!seat ? [...acc, index] : acc),
      [] as number[]
    );

    if (availableSeats.length < numSeats) {
      this.message = 'Not enough seats available!';
      return;
    }

    for (let i = 0; i < numSeats; i++) {
      const row = Math.floor(availableSeats[i] / 7);
      const col = availableSeats[i] % 7;
      this.rows[row][col] = true;
    }

    this.message = `${numSeats} nearby seats booked successfully!`;
  }
}
