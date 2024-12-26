
  //Script for vanta backgrounds
  



        VANTA.GLOBE({
          el: "#vanta_globe",
          touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 1.00,
  color: 0xa400a4,
  color2: 0x6f6f6f,
  size: 0.60,
  backgroundColor: 0x18181a
        })
       
    VANTA.FOG({
      el: "#vanta_fog",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      highlightColor: 0xffffff,
      midtoneColor: 0xe5aee5,
      lowlightColor: 0xc7c7ca,
      baseColor: 0xf7f7f7,
      blurFactor: 0.90,
      speed: 3.90,
      zoom: 1.10
   
  
    })

    VANTA.WAVES({
      el: "#vanta_waves",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0x1d0036,
      waveSpeed: 0.50
    })
   
    VANTA.NET({
      el: "#vanta_net",
      mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 1.00,
  color: 0x90007f,
  maxDistance: 24.00,
  spacing: 18.00
    })

    VANTA.CELLS({
      el: "#vanta_cells",
      mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  color1: 0x1a1a1a,
  color2: 0x6f3f95
    })

//----------------------------

//Carousel Script
    $(document).ready(function () {
      $('.slider').slick({
        dots: true,             // Show dots for navigation
        infinite: true,         // Infinite scrolling
        speed: 500,             // Transition speed
        slidesToShow: 2,        // Default number of slides to show
        slidesToScroll: 1,      // Default number of slides to scroll
        autoplay: true,         // Auto-play slides
        autoplaySpeed: 4000,    // Auto-play speed in ms
        arrows: true,           // Show navigation arrows
        responsive: [           // Breakpoints for responsiveness
          {
            breakpoint: 1024,    // At screen widths ≤ 1024px
            settings: {
              slidesToShow: 1,   // Show 2 slides
              slidesToScroll: 1, // Scroll 1 slide at a time
            },
          },
          {
            breakpoint: 600,     // At screen widths ≤ 600px
            settings: {
              slidesToShow: 1,   // Show 1 slide
              slidesToScroll: 1, // Scroll 1 slide at a time
            },
          },
        ],
      });
    });

    //---------------------------------------


    //AOS animations scripts------------


    AOS.init({
        duration: 1200, // Set the duration of the animation
        easing: 'ease-in-out', // Set the easing function
        offset: 120, // Set the offset from the element when it's triggered
        once: false, // Whether animations should play only once or every time the element scrolls into view
    });



//Script for the circular carousel logos---------------------

const items = document.querySelectorAll('.carousel-item');
const buttons = document.querySelectorAll('.control-button'); // Buttons for controlling the carousel
const radius = 350; // Radius of the circular layout
const center = { x: window.innerWidth / 3, y: window.innerHeight / 2 }; // Centered on the left part


let rotation = 0; // Current rotation in radians
let animating = true; // Flag to control continuous animation
let intervalId; // Store interval for continuous rotation
let timeoutId; // Store timeout for delayed resume

// Arrange items in a circular layout
function arrangeItems(highlightIndex = -1) {
    items.forEach((item, i) => {
        const angle = rotation + (i / items.length) * Math.PI * 2; // Angle of each item
        const x = center.x + radius * Math.cos(angle) - item.offsetWidth / 2;
        const y = center.y + radius * Math.sin(angle) - item.offsetHeight / 2;

        // Highlight the item if it's the targeted index
        if (i === highlightIndex) {
            item.style.transform = `translate(${x}px, ${y}px) scale(1.5)`; // Increase size
            item.style.zIndex = "10"; // Bring to front
        } else {
            item.style.transform = `translate(${x}px, ${y}px) scale(1)`; // Default size
            item.style.zIndex = "1"; // Reset z-index
        }
    });
}
//-----------------------------------------------------------------------------------





// Continuous rotation function
function startRotation() {
    animating = true;
    intervalId = setInterval(() => {
        if (animating) {
            rotation += 0.005; // Increment rotation
            arrangeItems();
        }
    }, 16); // ~60 FPS
}

// Stop continuous rotation
function stopRotation() {
    animating = false;
    clearInterval(intervalId);
}

// Function to rotate to a specific index
function rotateToIndex(index) {
    stopRotation(); // Stop continuous rotation
    clearTimeout(timeoutId); // Clear any existing timeout to avoid multiple triggers

    const targetAngle = -(index / items.length) * Math.PI * 2; // Target angle for the selected item
    const offsetToLeft = Math.PI; // Offset to align the selected item to the leftmost position
    const finalAngle = targetAngle + offsetToLeft;

    const shortestRotation = Math.atan2(Math.sin(finalAngle - rotation), Math.cos(finalAngle - rotation)); // Calculate shortest path

    const steps = 60; // Number of animation steps for smooth transition
    let currentStep = 0;

    const animateRotation = setInterval(() => {
        if (currentStep < steps) {
            rotation += shortestRotation / steps;
            arrangeItems(index); // Highlight the selected item
            currentStep++;
        } else {
            clearInterval(animateRotation);
            rotation = finalAngle; // Set final rotation value
            arrangeItems(index); // Ensure final alignment and highlight the item

            // Resume rotation after 5 seconds
            timeoutId = setTimeout(() => {
                arrangeItems(); // Reset highlighting before resuming rotation
                startRotation();
            }, 3000);
        }
    }, 16); // ~60 FPS
}

// Attach event listeners to buttons
buttons.forEach((button, i) => {
    button.addEventListener('click', () => rotateToIndex(i)); // Rotate to the index corresponding to the button
});

// Initialize carousel
arrangeItems();
startRotation();

//----------------------------------------------------------------------

//Nav_bar animation script------------------------------------------------

// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function () {
    const nav = document.querySelector("nav"); // Select your nav element

    window.addEventListener("scroll", function () {
        // Add the class when scrolled down
        if (window.scrollY > 0) {
            nav.classList.add("navbar-scrolled");
        } else {
            nav.classList.remove("navbar-scrolled");
        }
    });
});
//------------------------------------------------------------------

/*
    particlesJS("div", {
        
        "particles": {
            "number": {
                "value": 100,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#800080"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 5,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 100,
                "color": "#800080",
                "opacity": 0.4,
                "width": 3
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true,
        "config_demo": {
            "hide_card": false,
            "background_color": "#b61924",
            "background_image": "",
            "background_position": "50% 50%",
            "background_repeat": "no-repeat",
            "background_size": "cover"
        }
    });
*/


    

   