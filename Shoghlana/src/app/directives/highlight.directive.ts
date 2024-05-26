import { Directive, ElementRef, HostListener , Input} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective {
  @Input() externalColor: string = 'black'
  @Input('appHighlight') defaultColor = 'red' 
  constructor(private ele: ElementRef) {
    // this.ele.nativeElement.style.boxShadow = '0px 4px 2px green';

  }
  // @HostListener('mouseover') over ()
  // {
  //   this.ele.nativeElement.style.boxShadow = '0px 4px 2px green';
  // }
  // @HostListener('mouseout') out ()
  // {
  //   this.ele.nativeElement.style.boxShadow = 'this.externalColor';
  // }
}
