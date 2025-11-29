// Smooth in-page scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const href = a.getAttribute('href');
    const target = document.querySelector(href);
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
      target.focus({preventScroll:true});
    }
  });
});

// Typing effect for role (array of roles)
const roles = ['Front-end Developer', 'UI Enthusiast', 'Performance Fanatic'];
const typedEl = document.getElementById('typed-role');
let r = 0, i = 0, deleting = false;

function typeLoop(){
  if(!typedEl) return;
  const full = roles[r];
  if(!deleting){
    typedEl.textContent = full.slice(0, i+1);
    i++;
    if(i === full.length) { deleting = true; setTimeout(typeLoop, 1500); return; }
    setTimeout(typeLoop, 80);
  } else {
    typedEl.textContent = full.slice(0, i-1);
    i--;
    if(i === 0) { deleting = false; r = (r+1) % roles.length; setTimeout(typeLoop, 400); return; }
    setTimeout(typeLoop, 40);
  }
}
typeLoop();

// Theme toggle (persist)
const themeToggle = document.getElementById('themeToggle');
if(localStorage.getItem('theme')==='dark') document.documentElement.classList.add('dark');
themeToggle.addEventListener('click', ()=>{
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  themeToggle.textContent = isDark ? '☀️' : '🌙';
});

// Update year
const y = document.getElementById('year');
if(y) y.textContent = new Date().getFullYear();

// Active nav on scroll
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-list a');
function updateActive(){
  let current = '';
  sections.forEach(s=>{
    const top = s.getBoundingClientRect().top;
    if(top <= window.innerHeight * 0.35) current = s.id;
  });
  navLinks.forEach(l=>{
    l.classList.toggle('active', l.getAttribute('href') === '#'+current);
  });
}
window.addEventListener('scroll', updateActive, {passive:true});
updateActive();

// Reveal observer + stagger for project cards and section visibility
const reveal = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');

      // stagger project cards when projects section reveals
      if(entry.target.id === 'projects'){
        const cards = entry.target.querySelectorAll('.project-card');
        cards.forEach((c,i)=> setTimeout(()=> c.classList.add('visible'), i*120));
      }
    }
  });
},{threshold:0.18});

document.querySelectorAll('section').forEach(s=>reveal.observe(s));

// Back to top
const back = document.getElementById('backToTop');
window.addEventListener('scroll', ()=> back.style.display = window.scrollY > 360 ? 'block' : 'none');
back.addEventListener('click', ()=> window.scrollTo({top:0,behavior:'smooth'}));

// Contact form submit (Formspree style)
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
if(form){
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const fd = new FormData(form);
    if(fd.get('phone')) return status.textContent='Spam blocked.';
    status.textContent = 'Sending…';
    try{
      const res = await fetch(form.action, {method:form.method, body:fd, headers:{'Accept':'application/json'}});
      if(res.ok){ status.textContent = 'Thanks — message sent!'; form.reset(); } 
      else { status.textContent = 'Error sending message.'; }
    }catch(err){ status.textContent = 'Network error.'; }
  });
}

// keyboard focus outline helper
document.addEventListener('keydown', (e)=>{ 
  if(e.key==='Tab') document.documentElement.classList.add('show-focus'); 
});
