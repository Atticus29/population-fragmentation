import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DrawingService {

  constructor() {
  }

  drawArc(x: number, y: number, radius: number, startAngle:number, endAngle: number, elementId: string, color: string, fillStatus: boolean) {
    let canvas = <HTMLCanvasElement> document.getElementById(elementId);
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
      ctx.arc(x, y, radius, startAngle, endAngle);
      if (fillStatus) {
        ctx.fillStyle = color;
        ctx.fill();
      } else {
        ctx.lineWidth = 1;
        ctx.strokeStyle = color;
        ctx.stroke();
      }
    }
  }

  drawTriangle(x1: number, y1: number, x2: number, y2: number, x3: number, y3:number, elementId: string, color: string, fillStatus: boolean){
    let canvasElement = <HTMLCanvasElement>document.getElementById(elementId);
    if (canvasElement){
      let context = canvasElement.getContext("2d");
      // the triangle
      context.beginPath();
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.lineTo(x3, y3);
      context.closePath();

      // the outline
      context.lineWidth = 1;
      context.strokeStyle = color;
      context.stroke();

      // the fill color
      if(fillStatus){
      context.fillStyle = color;
      context.fill();
    }

  }
}

drawEllipse(x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle:number, endAngle:number, elementId: string, color: string, fillStatus: boolean){
  let canvas = <HTMLCanvasElement> document.getElementById(elementId);
  let ctx = canvas.getContext('2d');

  ctx.setLineDash([])
  ctx.beginPath();
  ctx.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle); //x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise
  ctx.stroke();
  // ctx.setLineDash([5,5])
  // ctx.moveTo(0, 200);
  // ctx.lineTo(200,0);
  // ctx.stroke();
  if(fillStatus){
    ctx.fillStyle = color;
    ctx.fill();
  }
}
}
