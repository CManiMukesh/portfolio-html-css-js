// Smooth scroll for nav links and "View More Projects" anchor scrolling
document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href') || '';
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Highlight nav links based on visible section
  const sections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (link) {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  }, { threshold: [0.45] });

  sections.forEach(s => observer.observe(s));
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

// Theme toggle: persist preference and respect system preference
(function () {
  const KEY = 'theme-preference';
  const toggle = () => {
    const isDark = document.body.classList.toggle('dark');
    updateButtonIcon(isDark);
    try { localStorage.setItem(KEY, isDark ? 'dark' : 'light'); } catch (e) {}
  };
  const updateButtonIcon = (isDark) => {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;
    const icon = btn.querySelector('i');
    if (!icon) return;
    icon.classList.remove('fa-moon','fa-sun');
    icon.classList.add(isDark ? 'fa-sun' : 'fa-moon');
  };

  document.addEventListener('DOMContentLoaded', function () {
    // initialize theme from localStorage or system preference
    let saved = null;
    try { saved = localStorage.getItem(KEY); } catch (e) {}
    if (saved === 'dark') document.body.classList.add('dark');
    else if (saved === 'light') document.body.classList.remove('dark');
    else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.add('dark');
    }
    updateButtonIcon(document.body.classList.contains('dark'));

    const btn = document.getElementById('themeToggle');
    if (btn) btn.addEventListener('click', toggle);
  });
})();
