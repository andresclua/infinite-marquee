import gsap from 'gsap';

function verticalLoop(elements, speed) {
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
    
  export {verticalLoop};