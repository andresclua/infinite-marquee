# Infinite Marque
This package was designed specifically for one purpose - Provide a function for an endless loop using GSAP, it will make the process simpler and faster.

### Install
```sh
npm i @andresclua/infinite-marquee-gsap
```

# Markup

### Html
```sh
div class="c--text-a">
    <div class="c--text-a__item">
      <p class="c--text-a__item__title">
        this is my first content hope you liked it
      </p>  
      <p class="c--text-a__item__title">
        this is my second content, doesnt look pretty large so far
      </p>  
      <p class="c--text-a__item__title">
        this is my third content, needs to add a bunch of stuff here
      </p>  
      <p class="c--text-a__item__title">
        this is my fourth content, and is quite long
      </p>  
      <p class="c--text-a__item__title">
        stay there, we need a few more lines
      </p>  
      <p class="c--text-a__item__title">
        Im done, lets use some Lorem ipsum, sit maxime atque quisquam voluptatum accusantium.
      </p>
      <p class="c--text-a__item__title">
        similique aut unde numquam, voluptate, consectetur provident nostrum,
      </p>
      <p class="c--text-a__item__title">
        Nemo, aliquam.
      </p> 
    </div>
  </div>
```

### SASS/SCSS
```sh
.c--text-a{
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  &__item{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    position: relative;
    flex-shrink: 0;
    overflow: hidden;
    &__title{
      padding:1rem;
      background:red;
    }
  }
}
```

### Javascript
minimal configuration
```sh
import {horizontalLoop} from '@andresclua/infinite-marquee-gsap';
window.addEventListener("load", () => {
  horizontalLoop(document.querySelectorAll('.c--text-a__item__title'),  {paused: false,repeat:-1});
});
```


### Features
 - Uses xPercent so that even if the widths change (like if the window gets resized), it should still work in most cases.
 - When each item animates to the left or right enough, it will loop back to the other side
 - Optionally pass in a config object with values like "speed" (default: 1, which travels at roughly 100 pixels per second), paused (boolean),  repeat, reversed, and paddingRight.
 - The returned timeline will have the following methods added to it:
   - next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
   - current() - returns the current index (if an animation is in-progress, it reflects the final index)
   - times - an Array of the times on the timeline where each element hits the "starting" spot. There's also a label added accordingly, so "label1" is when the 2nd element reaches the start.
 */


### Link to Demo
[Here's the demo](https://andresclua.github.io/infinite-marquee/)

