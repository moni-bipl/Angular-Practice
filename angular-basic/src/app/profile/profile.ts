import { Component, computed, effect, EventEmitter, Output, signal, WritableSignal } from "@angular/core";
import { Signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
@Component({
  selector: 'app-profile',
  // template:`<h1>Profile Component</h1>`
  templateUrl: './profile.html',
  // styleUrl: './profile.css'
  styleUrls: ['./profile.css', './profilebtn.css'],
  // styles:['h1{background-color: white}']
  imports: [FormsModule]

})
export class Profile {
  display = true
  x = 10
  hide() {
    this.display = !this.display
  }
  color = 1
  handleChange(val: number) {
    this.color = val;
  }
  handleInput(event: Event) {
    this.color = parseInt((event.target as HTMLInputElement).value)
  }
  users = ["Moni", "Soni", "Monalisha", "Soniya", "Monika"]

  students = [
    { name: "moni", age: 20, email: "moni@gmail.com" },
    { name: "soni", age: 21, email: "soni@gmail.com" },

    { name: "monika", age: 22, email: "monika@gmail.com" }

  ]

  getName(val: string) {
    console.log(val)
  }
  count = signal(10)


  updateCount() {
    this.count.set(this.count() + 1)
  }
  // data=signal<string| number>(10)
  data: WritableSignal<number | string> = signal(10);

  counts: Signal<number> = computed(() => 10)
  updateSignal() {
    this.data.set("hello")// for string use set
    // this.data.update((val)=>val+1)
  }
  x1 = signal(10);
  y1 = signal(20);
  z = computed(() => this.x1() + this.y1());
  showValue() {
    console.log("first value is", this.x1())
    console.log("second value is", this.y1())
    console.log("sum of first and second value is", this.z())
  }

  updateZ() {
    this.x1.update((val) => val + 1)
  }
  c = signal(0);
  displayHeading = false;
  username = signal('Anil')
  constructor() {
    effect(() => {
      console.log(this.username());
      if (this.c() == 1 || this.c() == 2) {
        this.displayHeading = true
        setTimeout(() => {
          this.displayHeading = false
        }, 2000)
      } else {
        this.displayHeading = false
      }
    })
  }
  toggleValue() {
    this.c.set(this.c() + 1)
    this.displayHeading = !this.displayHeading
  }
  profile = []

  name = ''
  changeName(event: Event) {
    const val = (event.target as HTMLInputElement).value
    this.name = val
  }

  profileName = ['moni', 'chaurasiya', 'soni', 'avanish']

  @Output() getUsers = new EventEmitter();
  // ngOnInit() {
  //   this.getUsers.emit(this.profileName)
  // }
  loadData() {
    this.getUsers.emit(this.profileName)
  }
}