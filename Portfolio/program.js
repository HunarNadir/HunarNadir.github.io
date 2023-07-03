function smoothScrolling(target) {
  const coords = target.getBoundingClientRect();
  window.scrollTo({
    left: coords.left + window.pageXOffset,
    top: coords.top + window.pageYOffset,
    behavior: 'smooth',
  });
  //   section.scrollIntoView({ behavior: "smooth" });
}
function findElementHref(button) {
  smoothScrolling(document.querySelector(button.getAttribute('href')));
}

// Event Delegation
document.querySelector('.nav-links').addEventListener('click', function (e) {
  const clicked = e.target.closest('.nav-link');
  // Guard Clause
  if (!clicked) return;
  e.preventDefault();
  findElementHref(clicked);
});

// Intersection Observer for Go Up navigation button
const goUp = document.querySelector('.go-up');

goUp.addEventListener('click', function (e) {
  e.preventDefault();
  smoothScrolling(goUp);
});

function goingUp(entriesArr) {
  const [entry] = entriesArr;
  if (!entry.isIntersecting) goUp.classList.remove('hidden');
  else goUp.classList.add('hidden');
}

const headerObserver = new IntersectionObserver(goingUp, {
  root: null,
  threshold: 0,
});

headerObserver.observe(document.querySelector('.hero'));

// Reveal Sections
const allSections = document.querySelectorAll('.section');
const sectionObserver = new IntersectionObserver(
  function (entriesArr, observer) {
    const [entry] = entriesArr;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  },
  {
    root: null,
    threshold: 0.15,
  }
);

allSections.forEach(sec => {
  sectionObserver.observe(sec);
  sec.classList.add('section--hidden');
});
