import { Directive, OnInit, ElementRef, Renderer, Input } from '@angular/core';

@Directive({
  selector: '[appFocus]'
})
export class FocusDirective implements OnInit{
  @Input('appFocus') isFocused: boolean;

  constructor(private hostElement: ElementRef, private renderer: Renderer) { }

  ngOnInit() {
    // console.log(this.isFocused);
    if (this.isFocused) {
      console.log("Got here!");
      this.renderer.invokeElementMethod(this.hostElement.nativeElement, 'scrollIntoView');
    }
  }
}
