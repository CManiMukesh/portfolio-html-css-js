// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', function(e){
    // if link is just "#", ignore
    const href = this.getAttribute('href');
    if(!href || href === '#') return;
    const target = document.querySelector(href);
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
      // update URL hash (optional)
      history.replaceState(null, '', href);
    }
  });
});

// IntersectionObserver for reveal animations (subtle fade + slide)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('revealed');
      // optionally unobserve so it only animates once
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Contact form handling (simulated send)
const form = document.getElementById('contactForm');
if(form){
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // simple validation
    const formData = new FormData(form);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const message = formData.get('message').trim();
    if(!name || !email || !message){
      alert('Please fill all fields before sending.');
      return;
    }
    // in real usage, do fetch to endpoint or use formspree/Netlify forms etc.
    // For this static demo, we'll simulate success:
    alert('Thanks, ' + name + '! Your message has been received (demo).');
    form.reset();
  });
}

// Projects page: nothing else required (cards generated in projects.html)

// Small enhancement: add "active" link highlight on scroll
const sections = document.querySelectorAll('section[id]');
function onScrollActiveNav(){
  const scrollY = window.pageYOffset;
  sections.forEach(sec => {
    const offsetTop = sec.offsetTop - 80;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');
    const navLink = document.querySelector('.nav-links a[href="#'+id+'"]');
    if(scrollY >= offsetTop && scrollY < offsetTop + height){
      if(navLink) navLink.classList.add('active');
    } else {
      if(navLink) navLink.classList.remove('active');
    }
  });
}
window.addEventListener('scroll', onScrollActiveNav, {passive:true});
onScrollActiveNav();
