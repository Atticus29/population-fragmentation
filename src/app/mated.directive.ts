import { Directive, OnInit, ElementRef, Renderer, Input } from '@angular/core';

@Directive({
  selector: '[appMated]'
})
export class MatedDirective {
  @Input('appMated') isMated: boolean;
  constructor(private hostElement: ElementRef, private renderer: Renderer) { }

  ngOnInit() {
    // console.log(this.isFocused);
    if (this.isMated) {
      console.log("isMated go here in MatedDirective");
      //TODO fleshout styling change
      // this.renderer.invokeElementMethod(this.hostElement.nativeElement, 'scrollIntoView');
    }
  }
}
