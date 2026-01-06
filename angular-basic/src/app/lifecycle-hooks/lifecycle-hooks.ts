import { Component, Input, OnChanges ,OnInit,DoCheck,ChangeDetectorRef,ContentChild,AfterContentInit, ElementRef, Renderer2} from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
  <h3>Child Component</h3>
  <p>TICKS: {{ lifecycleTicks }}</p>
  <p>DATA: {{ data }}</p>
  `
})
export class ChildComponentOnChanges implements OnChanges {
  @Input() data: string='';
  lifecycleTicks: number = 1;

  ngOnChanges() {
    this.lifecycleTicks++;
  }
}



@Component({
  selector:'app-OnInit',
  template:`
  <h3>Child Component for OnInit</h3>
  <p>TICKS:{{lifecycleTicks}}
  <p>Data: {{data}}</p>
  `
})
export class ChildComponentOnInit implements OnInit{
  @Input() data:string='';
  lifecycleTicks: number=3;
  ngOnInit(){
    this.lifecycleTicks++;
  }
}



@Component({
  selector:'app-DoCheck',
  template:`
  <h3>ngDoCheck Example</h3>
  <p>Data: {{data[data.length-1]}}</p>
  `
})
export class ChildComponentDoCheck implements DoCheck{
  lifecycleTicks:number=5;
  oldTheData:string='';
  data:string[]=['initial'];


  constructor(private changeDetector: ChangeDetectorRef){
    this.changeDetector.detach();

    setTimeout(()=>{
      this.oldTheData='final'
      this.data.push('intermediate');
    },3000);

    setTimeout(()=>{
      this.data.push('final');
      this.changeDetector.markForCheck()
    },6000)
  }

  ngDoCheck() {
      console.log("lifecycleticks",++this.lifecycleTicks);
      if(this.data[this.data.length-1]!==this.oldTheData){
        this.changeDetector.detectChanges();
      }
  }
}




@Component({
  selector: 'app-parent',
  standalone:true,
  template: `
  <h1>ngOnChanges Example</h1>
  <app-child [data]="arbitraryData"></app-child>
  <app-OnInit [data]="arbitraryData"></app-OnInit>
  <app-DoCheck></app-DoCheck>
  `,
  imports: [ChildComponentOnChanges, ChildComponentOnInit, ChildComponentDoCheck]
})
export class ParentComponent {
  arbitraryData: string = 'initial';

  constructor() {
    setTimeout(() => {
      this.arbitraryData = 'final';
    }, 1000);
  }
}
