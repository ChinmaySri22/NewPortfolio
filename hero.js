// ---------- Locomotive scroll init ----------
const scroll = new LocomotiveScroll({
  el: document.querySelector('#main'),
  smooth: true
});

// ---------- Animations (GSAP v3 friendly easing names) ----------
function firstPageAnim() {
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: -10,
    opacity: 0,
    duration: 1.5,
    ease: "expo.inOut",
  })
    .to(".boundingelem", {
      y: 0,
      ease: "expo.inOut",
      duration: 2,
      delay: -1,
      stagger: 0.2,
    })
    .from("#footer", {
      y: -10,
      opacity: 0,
      duration: 1.5,
      delay: -1,
      ease: "expo.inOut",
    });
}

// ---------- Pointer / mouse magic ----------
function MouseChapta(){
  let xscale = 1;
  let yscale = 1;
  let xprev = 0;
  let yprev = 0;
  let timeout;

  window.addEventListener("mousemove", function (dets){
    clearTimeout(timeout);

    xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev || 1);
    yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev || 1);

    yprev = dets.clientY;
    xprev = dets.clientX;

    // only update transform once per mousemove event (no nested listeners)
    document.querySelector("#pointercircle").style.transform =
      `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;

    timeout = setTimeout(function () {
      document.querySelector("#pointercircle").style.transform =
        `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
    }, 100);
  });
}

// call pointer once
MouseChapta();

// ---------- interactive image hover ----------
var diffrot = 0;
var rotate = 0;

document.querySelectorAll(".elem").forEach(function (elem){
  elem.addEventListener("mousemove", function(dets){
    const rect = elem.getBoundingClientRect();
    const diffY = dets.clientY - rect.top - 150;
    const diffX = dets.clientX - rect.left - 150;

    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;

    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: "power3.out",
      top: diffY,
      left: diffX,
      duration: 0.3,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.2)
    });
  });

  elem.addEventListener("mouseleave", function () {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      duration: 0.3
    });
  });
});

// ---------- project modal ----------
const modal = document.getElementById('project');
const iframe = modal.querySelector('iframe');

document.querySelectorAll('.elem').forEach(elem => {
  elem.addEventListener('click', () => {
    const src = elem.dataset.src;
    iframe.src = src;
    modal.style.display = 'flex';
  });
});

document.querySelector('.close').addEventListener('click', () => {
  modal.style.display = 'none';
  iframe.src = "";
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    modal.style.display = "none";
    iframe.src = "";
  }
});

// ---------- Live footer clock (correct) ----------
function updateTime() {
  let d = new Date();
  document.getElementById("time").innerHTML = `<h5>${d.toLocaleTimeString()}</h5>`;
}

// run immediately and every second
updateTime();
setInterval(updateTime, 1000);

// ---------- run first-page timeline ----------
firstPageAnim();
