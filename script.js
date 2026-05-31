gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);

/* PRELOADER */

const split = SplitText.create(
    ".logo",
    { type: "chars" }
);

gsap.timeline()

.set(".preloader",{autoAlpha:1},0)

.from(".logo",{
    scale:0.7,
    duration:6,
    ease:"none"
},0)

.from(split.chars,{
    opacity:0,
    duration:1,
    stagger:0.1,
    ease:"none"
},0)

.from(split.chars,{
    rotationY:360,
    duration:0.5,
    stagger:0.1,
    ease:"none"
},0.1)

.to(".preloader",{
    autoAlpha:0,
    duration:4.5,
    ease:"power1.out"
},0)

.to("main",{
    opacity:1,
    duration:0.5
},3.5);

/* HERO */

const heroSplit = SplitText.create(
    ".hero-title",
    { type:"chars" }
);

gsap.from(heroSplit.chars,{
    opacity:0,
    y:50,
    stagger:0.05,
    duration:1,
    delay:4
});

/* HORIZONTAL SCROLL */

const panels = gsap.utils.toArray(".container .panel");

let currentIndex = 0;
let initialLoad = true;

gsap.timeline({

    scrollTrigger:{
        trigger:".container",
        start:"top top",
        end:`+=${innerWidth * panels.length}`,
        pin:true,
        scrub:1,

        snap:{
            snapTo:(v)=>{

                if(initialLoad){
                    initialLoad=false;
                    return;
                }

                currentIndex=Math.min(
                    panels.length-1,
                    Math.max(
                        0,
                        currentIndex +
                        (
                            v >
                            currentIndex/panels.length
                            ? 1
                            : -1
                        )
                    )
                );

                return currentIndex/panels.length;
            },

            duration:{
                min:0.3,
                max:0.6
            },

            ease:"power1.inOut",
            delay:0.1
        }
    }
})

.to(panels,{
    xPercent:-100*(panels.length-1),
    ease:"none",
    duration:panels.length-1
})

.to({},{
    duration:1
});