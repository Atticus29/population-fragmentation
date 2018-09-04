import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DrawingService {

  constructor() { }

  drawCircle(x: number, y: number, radius: number, elementId: string) {
    let canvas = <HTMLCanvasElement> document.getElementById(elementId);
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');

      for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 3; j++) {
          ctx.beginPath();
          var startAngle = 0; // Starting point on circle
          var endAngle = Math.PI + (Math.PI * j) / 2; // End point on circle
          var anticlockwise = i % 2 !== 0; // clockwise or anticlockwise
          ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
          if (i > 1) {
            ctx.fill();
          } else {
            ctx.stroke();
          }
        }
      }
    }
  }
}
