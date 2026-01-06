import { Component, ContentChild, AfterContentInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-c',
  template: `
  <p>I am C.</p>
  <p>Hello World!</p>
  `
})
export class CComponent { }

@Component({
  selector: 'app-b',
  template: `
  <p>I am B.</p>
  <ng-content></ng-content>
  `
})
export class BComponent implements AfterContentInit {
  @ContentChild("BHeader", { read: ElementRef })
    hRef!: ElementRef;
  @ContentChild(CComponent, { read: ElementRef }) cRef!: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngAfterContentInit() {
    this.renderer.setStyle(this.hRef.nativeElement, 'background-color', 'yellow')

    this.renderer.setStyle(this.cRef.nativeElement.children.item(0), 'background-color', 'pink');
    this.renderer.setStyle(this.cRef.nativeElement.children.item(1), 'background-color', 'red');
  }
}

@Component({
  selector: 'app-a',
  template: `
  <h1>ngAfterContentInit Example</h1>
  <p>I am A.</p>
  <app-b>
    <h3 #BHeader>BComponent Content DOM</h3>
    <app-c></app-c>
  </app-b>
  `,
  imports:[CComponent,BComponent]
})
export class AComponent { }