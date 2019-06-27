import { Injectable } from '@angular/core';
import { Genotype } from './genotype.model';
import { ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DrawingService {
  constructor() {
  }

  drawArc(x: number, y: number, radius: number, startAngle:number, endAngle: number, elementRef: ElementRef, color: string, fillStatus: boolean) {
    let canvas = <HTMLCanvasElement> elementRef.nativeElement;
    if (canvas) {
      let ctx = canvas.getContext('2d');
      ctx.beginPath();
      ctx.arc(x, y, radius, startAngle, endAngle);
      if (fillStatus) {
        ctx.fillStyle = color;
        ctx.fill();
      } else {
        ctx.lineWidth = 1;
        ctx.strokeStyle = color;
        ctx.stroke();
      }
    } else {
      //TODO handle error here
    }
  }

  drawTriangle(x1: number, y1: number, x2: number, y2: number, x3: number, y3:number, elementRef: ElementRef, color: string, fillStatus: boolean){
    // console.log(elementRef);
    let canvasElement = <HTMLCanvasElement>elementRef.nativeElement;
    // console.log(canvasElement);
    if (canvasElement){
      // console.log("got here!");
      let context = canvasElement.getContext("2d");
      // console.log(canvasElement);
      context.beginPath();
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.lineTo(x3, y3);
      context.closePath();
      context.lineWidth = 1;
      context.strokeStyle = color;
      context.stroke();
      if(fillStatus){
        context.fillStyle = color;
        context.fill();
    }
  } else{
    //TODO throw/handle error here
  }
}

drawEllipse(x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle:number, endAngle:number, elementRef: ElementRef, color: string, fillStatus: boolean){
  let canvas = <HTMLCanvasElement> elementRef.nativeElement;
  if(canvas){
    let ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, false); //x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise
    ctx.stroke();
    if(fillStatus){
      ctx.fillStyle = color;
      ctx.fill();
    }
    ctx.closePath();
  } else{
    //TODO handle error here
  }

}

drawLizard(canvasRef: ElementRef, genotype: Genotype, height: number, width: number){
  // console.log(canvasRef);
  // console.log(genotype);
  //head
  this.drawTriangle(0.1875*width,0.4375*height,0.1875*width,0.5625*height,0.125*width,0.5*height, canvasRef, "black", true);
  this.drawArc(0.1875*width, 0.5*height, 0.0625*width, 3*Math.PI/2, Math.PI/2, canvasRef, "black", true);

  //eyes
  this.drawArc(0.1875*width, 0.53125*height, 2, 0, 2*Math.PI, canvasRef,"white", true);
  this.drawArc(0.1875*width, 0.46875*height, 2, 0, 2*Math.PI, canvasRef,"white", true);
  this.drawArc(0.1875*width, 0.53125*height, 0.5, 0, 2*Math.PI, canvasRef,"black", true);
  this.drawArc(0.1875*width, 0.46875*height, 0.5, 0, 2*Math.PI, canvasRef,"black", true);

  //body
  this.drawEllipse(0.5*width, 0.5*height, 0.25*width, 10, 0, 0, 2 * Math.PI, canvasRef, 'black', true);

  //legs
  this.drawEllipse(0.7*width, 0.55*height, 0.15*width, 3, 0.65, 0, 2 * Math.PI, canvasRef, 'black', true);
  this.drawEllipse(0.7*width, 0.45*height, 0.15*width, 3, 0.9+Math.PI/2, 0, 2 * Math.PI, canvasRef, 'black', true);
  this.drawEllipse(0.35*width, 0.55*height, 0.15*width, 3, -Math.PI/6, 0, 2 * Math.PI, canvasRef, 'black', true);
  this.drawEllipse(0.35*width, 0.45*height, 0.15*width, 3, Math.PI/6, 0, 2 * Math.PI, canvasRef, 'black', true);

  //random polka dots
  // let colorArray = new Array<string>("blue", "pink", "orange", "#FF00FF", "red", "#00FFFF", "#800000", "#00FF00", "#008000", "#00FFFF", "#008080", "#BFBFFE", "#800080");
  // this.drawArc(77, 95, 3, 0, 2*Math.PI, canvasRef, colorArray[Math.floor(Math.random()*colorArray.length)], true);

  // console.log(genotype.getAllele1());
  // console.log(genotype.getAllele2());
  this.drawArc(0.3*width, 0.505*height, 0.015*width, 0, 2*Math.PI, canvasRef, genotype.getAllele1(), true);
  this.drawArc(0.425*width, 0.51*height, 0.015*width, 0, 2*Math.PI, canvasRef, genotype.getAllele2(), true);
  this.drawArc(0.545*width, 0.47*height, 0.015*width, 0, 2*Math.PI, canvasRef, genotype.getAllele1(), true);
  this.drawArc(0.6*width, 0.51*height, 0.015*width, 0, 2*Math.PI, canvasRef, genotype.getAllele2(), true);
  // console.log("got to the end");
}
}
