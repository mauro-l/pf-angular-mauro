import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[appMultiply]',
  standalone: false,
})
export class MultiplyDirective implements OnChanges {
  @Input()
  appMultiply = 10;

  constructor(
    private elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<unknown>
  ) {
    this.updateViewContainer();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appMultiply']) {
      this.updateViewContainer();
    }
  }

  updateViewContainer(): void {
    this.viewContainerRef.clear();
    for (let i = 0; i < this.appMultiply; i++) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }
}
