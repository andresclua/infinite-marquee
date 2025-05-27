import './../scss/style.scss';

import gsap from 'gsap';
import { horizontalLoop } from './horizontalLoop';
import { verticalLoop } from './verticalLoop';

import InifiniteClass from './infiniteClass';

const colors = ["#ff0000","#6fb936", "#ccc", "#6fb936"];
const horizontalBoxes = gsap.utils.toArray(".c--list-group-a__list-item");

gsap.set(horizontalBoxes , {
	backgroundColor: gsap.utils.wrap(colors)
});
// const horizontalMarquee = horizontalLoop(horizontalBoxes, {repeat:-1,paused:false});

const marquee = new InifiniteClass({
    element: document.querySelector('.c--list-group-a'),
    speed: 1,                   // Speed of the marquee (default is 1)
    direction: 'left-to-right',  // Direction of the marquee, either 'left-to-right' or 'right-to-left' (default is 'left-to-right')
    controlsOnHover: true,
    mousewheel: { enabled: true, speed: 0.5 }        // Pauses marquee on hover if set to true (default is false)
});

// const verticalBoxes = gsap.utils.toArray(".c--list-group-b__list-item");
// gsap.set(verticalBoxes , {
// 	backgroundColor: gsap.utils.wrap(colors)
// });

// let verticalMarquee = verticalLoop(verticalBoxes, {
//   repeat: -1, 
//   paused: false, 
// });






