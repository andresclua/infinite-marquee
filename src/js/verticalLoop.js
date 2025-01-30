
import gsap from 'gsap'
/*
This helper function makes a group of elements animate along the y-axis in a seamless, responsive loop.

Features:
 - Uses yPercent so that even if the widths change (like if the window gets resized), it should still work in most cases.
 - When each item animates up or down enough, it will loop back to the other side
 - Optionally pass in a config object with values like draggable: true, center: true, speed (default: 1, which travels at roughly 100 pixels per second), paused (boolean), repeat, reversed, enterAnimation, leaveAnimation, and paddingBottom.
 - The returned timeline will have the following methods added to it:
   - next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
   - current() - returns the current index (if an animation is in-progress, it reflects the final index)
   - times - an Array of the times on the timeline where each element hits the "starting" spot.
   - elements - an Array of the elements that are being controlled by the timeline
 */
  export function verticalLoop(elements, config) {
    elements = gsap.utils.toArray(elements)
    if (!Array.isArray(elements) || elements.length === 0) {
        return null
    }
    config = config || {}
    let firstBounds = elements[0].getBoundingClientRect(),
        lastBounds = elements[elements.length - 1].getBoundingClientRect()

    if (!firstBounds || !lastBounds) {
        return null
    }

    let top =
            firstBounds.top -
            firstBounds.height -
            Math.abs(elements[1].getBoundingClientRect().top - firstBounds.bottom),
        bottom = lastBounds.top,
        distance = bottom - top,
        speed = config.speed * 100 || 1,
        duration = Math.abs(distance / speed),
        tl = gsap.timeline({ repeat: config.repeat || -1, paused: config.paused || false }),
        plus = speed < 0 ? "-=" : "+=",
        minus = speed < 0 ? "+=" : "-="

    elements.forEach((el) => {
        if (el) {
            let bounds = el.getBoundingClientRect(),
                ratio = Math.abs((bottom - bounds.top) / distance)

            if (speed < 0) {
                ratio = 1 - ratio
            }

            tl.to(
                el,
                {
                    y: plus + distance * ratio,
                    duration: duration * ratio,
                    ease: "none",
                },
                0
            )

            tl.fromTo(
                el,
                {
                    y: minus + distance,
                },
                {
                    y: plus + (1 - ratio) * distance,
                    ease: "none",
                    duration: (1 - ratio) * duration,
                    immediateRender: false,
                },
                duration * ratio
            )
        }
    })

    return tl
  }