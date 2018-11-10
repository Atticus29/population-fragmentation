import { Directive, OnInit, ElementRef, Renderer, Input } from '@angular/core';

@Directive({
  selector: '[appMated]'
})
export class MatedDirective {
  @Input('appMated') isMated: boolean;
  constructor(private hostElement: ElementRef, private renderer: Renderer) { }

  ngOnInit() {
    if (this.isMated) {
      this.renderer.setElementClass(this.hostElement.nativeElement, 'no-longer-eligible',true);
      //TODO fleshout styling change
    }
  }
}
