/* ============================================================
   Proof AI — Premium Interactions
   ============================================================ */

// ---- Sticky nav scroll state ----
const nav = document.querySelector('header');
if (nav) {
  const onScroll = () => {
    if (window.scrollY > 24) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ---- Mobile menu toggle ----
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

// ---- Scroll reveal with stagger ----
const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => io.observe(el));

// ---- Animated number counters ----
const counters = document.querySelectorAll('[data-counter]');
const counterIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = parseFloat(el.dataset.counter);
    const suffix = el.dataset.suffix || '';
    const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
    const duration = 1800;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const val = target * eased;
      el.textContent = val.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      }) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    counterIO.unobserve(el);
  });
}, { threshold: 0.4 });
counters.forEach(c => counterIO.observe(c));

// ---- FAQ accordion ----
document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('click', () => {
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      const a = i.querySelector('.faq-a');
      if (a) a.style.maxHeight = '0';
    });
    if (!wasOpen) {
      item.classList.add('open');
      const a = item.querySelector('.faq-a');
      if (a) a.style.maxHeight = a.scrollHeight + 'px';
    }
  });
});

// ---- Gmail compose helper ----
function openGmailCompose(subject, bodyLines) {
  const body = bodyLines.map(l => l.replace(/ /g, '%20').replace(/\n/g, '%0A')).join('%0A%0A');
  const subjectEnc = encodeURIComponent(subject);
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=Priority@proofco.ai&su=${subjectEnc}&body=${body}`;
  window.open(gmailUrl, '_blank');
}

// ---- Magnetic buttons ----
document.querySelectorAll('[data-magnetic]').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// ---- Mouse-following glow ----
const mouseGlow = document.querySelector('.mouse-glow');
if (mouseGlow) {
  let mx = 0, my = 0, gx = 0, gy = 0;
  document.addEventListener('mousemove', (e) => {
    mx = e.clientX - 200;
    my = e.clientY - 200;
  });
  const animateGlow = () => {
    gx += (mx - gx) * 0.08;
    gy += (my - gy) * 0.08;
    mouseGlow.style.transform = `translate(${gx}px, ${gy}px)`;
    requestAnimationFrame(animateGlow);
  };
  animateGlow();
}

// ---- Workflow scroll-activated steps ----
const wfSteps = document.querySelectorAll('.wf-step');
if (wfSteps.length > 0) {
  const wfIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('active');
      }
    });
  }, { threshold: 0.5, rootMargin: '-80px 0px -80px 0px' });
  wfSteps.forEach(s => wfIO.observe(s));
}

// ---- Dashboard parallax tilt ----
const dashFrame = document.querySelector('.dash-frame');
if (dashFrame && window.matchMedia('(hover: hover)').matches) {
  const heroSection = dashFrame.closest('section') || dashFrame.parentElement;
  heroSection.addEventListener('mousemove', (e) => {
    const rect = dashFrame.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rx = ((e.clientY - cy) / rect.height) * -6;
    const ry = ((e.clientX - cx) / rect.width) * 6;
    dashFrame.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(0)`;
  });
  heroSection.addEventListener('mouseleave', () => {
    dashFrame.style.transform = '';
  });
}

// ---- Scroll-based parallax for orbs ----
const orbs = document.querySelectorAll('.orb[data-parallax]');
if (orbs.length > 0) {
  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    orbs.forEach(orb => {
      const speed = parseFloat(orb.dataset.parallax) || 0.15;
      orb.style.transform = `translateY(${sy * speed * -1}px)`;
    });
  }, { passive: true });
}

// ---- Contact form ----
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('cf-name').value;
    const email = document.getElementById('cf-email').value;
    const company = document.getElementById('cf-company').value;
    const topic = document.getElementById('cf-topic') ? document.getElementById('cf-topic').value : '';
    const message = document.getElementById('cf-message').value;
    const subject = encodeURIComponent(`[${topic || 'General'}] Website inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nTopic: ${topic}\n\nMessage:\n${message}`
    );
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=Priority@proofco.ai&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank');
  });
}

// ---- Get-started form ----
const getStartedForm = document.getElementById('getStartedForm');
if (getStartedForm) {
  getStartedForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const company = document.getElementById('gs-company')?.value || '';
    const name = document.getElementById('gs-name')?.value || '';
    const email = document.getElementById('gs-email')?.value || '';
    const phone = document.getElementById('gs-phone')?.value || '';
    const plan = document.getElementById('gs-plan')?.value || '';
    const subject = encodeURIComponent(`Get Started — ${company || name}`);
    const body = encodeURIComponent(
      `Company: ${company}\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nPlan: ${plan}\n\n— Sent from the Get Started page`
    );
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=Priority@proofco.ai&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank');
  });
}
