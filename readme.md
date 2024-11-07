## Gsap Infinite Marquee

This package is designed with one purpose: to create a smooth, infinite scrolling effect using GSAP. The [helper](https://gsap.com/docs/v3/HelperFunctions/helpers/seamlessLoop/) function used for the endless loop is sourced externally, while the lightweight class provided here is custom-built and can be easily integrated into your projects.

### Minimal Configuration for Horizontal

``` html
<ul class="c--list-group-a">
    <div class="c--list-group-a__list-item">1</div>
    <div class="c--list-group-a__list-item">2</div>
    <div class="c--list-group-a__list-item">3</div>
    <div class="c--list-group-a__list-item">4</div>
    <div class="c--list-group-a__list-item">5</div>
    <div class="c--list-group-a__list-item">6</div>
    <div class="c--list-group-a__list-item">7</div>
    <div class="c--list-group-a__list-item">8</div>
</ul>
```

```scss
.c--list-group-a {
    height: 300px;
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    overflow: hidden;

    &__list-item{
        display: flex;
        align-items: center;
        justify-content: center;
        background: green;
        height: 100%;
        width: 20%;
        margin: 0;
        padding: 0;
        position: relative;
        flex-shrink: 0;
        color: black;
        font-size: 21px;
        cursor: pointer;
    }
  }
```

```js
import gsap from 'gsap';
import { horizontalLoop } from './horizontalLoop';

const colors = ["#ff0000","#6fb936", "#ccc", "#6fb936"];
const horizontalBoxes = gsap.utils.toArray(".c--list-group-a__list-item");

gsap.set(horizontalBoxes , {
	backgroundColor: gsap.utils.wrap(colors)
});
const horizontalMarquee = horizontalLoop(horizontalBoxes, {repeat:-1,paused:false});

```


**Note** that you can use all Features that Helper functions provides such as next,current,toIndex,etc



### Minimal Configuration for Vertical

```html
<ul  class="c--vertical-wrapper-a">
    <div class="c--list-group-b">
        <div class="c--list-group-b__list-item ">1</div>
        <div class="c--list-group-b__list-item ">2</div>
        <div class="c--list-group-b__list-item ">3</div>
        <div class="c--list-group-b__list-item ">4</div>
        <div class="c--list-group-b__list-item ">5</div>
        <div class="c--list-group-b__list-item ">6</div>
    </div>
</ul>
```

```scss
// vertical version
// a wrapper for the vertical list is needed to set the height of the list
.c--vertical-wrapper-a {
    position: relative;
    overflow: hidden;
    width: 50%;
    height: 380px;
    z-index: 1;
}

// the list group and list item that will be animated
.c--list-group-b{
    overflow: hidden;
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;

    &__list-item{
        position: relative;
        margin: auto;
        display: block;
        height: 125px;
        background:magenta;
    }
}
```

```js
import gsap from 'gsap';
import { verticalLoop } from './verticalLoop';

const colors = ["#ff0000","#6fb936", "#ccc", "#6fb936"];
const verticalBoxes = gsap.utils.toArray(".c--list-group-b__list-item");
gsap.set(verticalBoxes , {
	backgroundColor: gsap.utils.wrap(colors)
});

let verticalMarquee = verticalLoop(verticalBoxes, {
    repeat: -1, 
    paused: false, 
  });
```

## Class

```js
import {horizontalLoop} from '@andresclua/infinite-marquee-gsap';
import gsap from 'gsap';

// import {horizontalLoop} from './helper.js';
// import gsap from 'gsap';

/**
 * InfiniteMarquee - A JavaScript class for creating a continuous horizontal marquee effect using GSAP.
 *
 * Usage:
 * Import the `InfiniteMarquee` class and initialize it with an object payload specifying the target element, speed, direction, 
 * and hover controls. This class enables a smooth, looping marquee effect with the option to control playback on hover.
 *
 * Example:
 * ```javascript
 * import InfiniteMarquee from './InfiniteMarquee';
 * 
 * const marquee = new InfiniteMarquee({
 *     element: document.querySelector('.marquee-container'),
 *     speed: 1,                   // Speed of the marquee (default is 1)
 *     direction: 'left-to-right',  // Direction of the marquee, either 'left-to-right' or 'right-to-left' (default is 'left-to-right')
 *     controlsOnHover: true        // Pauses marquee on hover if set to true (default is false)
 * });
 * 
 * // Additional controls
 * marquee.pause();   // Pauses the marquee
 * marquee.play();    // Resumes the marquee
 * marquee.destroy(); // Stops and clears all animations
 * ```
 * 
 * Constructor:
 * - `payload` (Object): Configuration object containing:
 *    - `element` (HTMLElement): The container element for the marquee items.
 *    - `speed` (Number, optional): Speed of the marquee. Default is 1.
 *    - `direction` (String, optional): 'left-to-right' or 'right-to-left'. Default is 'left-to-right'.
 *    - `controlsOnHover` (Boolean, optional): If true, the marquee pauses on hover. Default is false.
 *
 * Methods:
 * - `init()` : Initializes the horizontal marquee loop with specified speed and direction.
 * - `events()` : Sets up hover events for pausing and playing the marquee if `controlsOnHover` is enabled.
 * - `pause()` : Pauses the marquee animation.
 * - `play()` : Resumes the marquee animation.
 * - `destroy()` : Clears the marquee animation and resets speed.
 * 
 * Dependencies:
 * - GSAP (https://greensock.com/gsap/)
 * - `horizontalLoop` helper function, imported from './helper.js'
 *
 * Notes:
 * Ensure that `horizontalLoop` function is properly defined and returns a GSAP timeline compatible with loop configurations.
 * 
 * @class InfiniteMarquee
 * @param {Object} payload Configuration options for the marquee.
 * @returns {InfiniteMarquee} Instance of the InfiniteMarquee class.
 */

class InfiniteMarquee {
    constructor(payload){
        var { element, speed, direction, controlsOnHover } = payload;
        this.DOM = {
            element: element,
        };
        this.speed = speed === undefined ? 1 : speed;
        this.direction = direction === undefined || direction === null ? 'left-to-right' : direction;
        this.controlsOnHover = controlsOnHover === undefined ? false : controlsOnHover;
        this.init();
        this.events();
    }

    events(){
        if (this.controlsOnHover) {
            this.DOM.element.addEventListener("mouseenter", () => gsap.to(this.loop, { timeScale: 0, overwrite: true }));
            this.DOM.element.addEventListener("mouseleave", () => gsap.to(this.loop, { timeScale: 1, overwrite: true }));
        }
    }

    init(){
        const reversed = this.direction === 'right-to-left';  // Reverse the loop if the direction is right-to-left
        this.loop = horizontalLoop(this.DOM.element.children,  {
            paused: false,
            repeat: -1,
            reversed: reversed,
            speed: this.speed,
        });
    }

    destroy(){
        this.speed = null;
        this.loop.clear();
    }

    pause(){
        gsap.to(this.loop, { timeScale: 0, overwrite: true });
    }

    play(){
        gsap.to(this.loop, { timeScale: 1, overwrite: true });
    }
}

export default InfiniteMarquee;


```