import './../scss/style.scss';

import gsap from 'gsap';
import { horizontalLoop } from './horizontalLoop';
import { verticalLoop } from './verticalLoop';

const colors = ["#ff0000","#6fb936", "#ccc", "#6fb936"];
const horizontalBoxes = gsap.utils.toArray(".c--list-group-a__list-item");

gsap.set(horizontalBoxes , {
	backgroundColor: gsap.utils.wrap(colors)
});
const horizontalMarquee = horizontalLoop(horizontalBoxes, {repeat:-1,paused:false});



const verticalBoxes = gsap.utils.toArray(".c--list-group-b__list-item");
gsap.set(verticalBoxes , {
	backgroundColor: gsap.utils.wrap(colors)
});

let verticalMarquee = verticalLoop(verticalBoxes, {
    repeat: -1, 
    paused: false, 
  });

