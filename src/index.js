import gsap from 'gsap';
import {horizontalLoop} from './js/horizontalLoop';


window.addEventListener("load", () => {

  const text = gsap.utils.toArray(".c--text-a__item__title");
  horizontalLoop(text,  {paused: false,repeat:-1});

  const imagesA = gsap.utils.toArray(".js-marque-a");
  horizontalLoop(imagesA,  {paused: false,repeat:-1});

  const imagesB = gsap.utils.toArray(".js-marque-b");
  horizontalLoop(imagesB,  {paused: false,repeat:-1, reversed:true});

  const imagesC = gsap.utils.toArray(".js-marque-c");
  horizontalLoop(imagesC,  {paused: false,repeat:-1,speed:0.25 });
});
