(() => {
  const header = document.querySelector('.site-header');
  const menuBtn = document.querySelector('.menu-btn');
  const nav = document.querySelector('.nav-links');

  const onScroll = () => header?.classList.toggle('scrolled', window.scrollY > 24);
  onScroll();
  addEventListener('scroll', onScroll, {passive:true});

  menuBtn?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open'); menuBtn?.classList.remove('open'); menuBtn?.setAttribute('aria-expanded','false');
  }));

  const current = document.body.dataset.page;
  document.querySelector(`[data-nav="${current}"]`)?.classList.add('active');
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){ entry.target.classList.add('visible'); io.unobserve(entry.target); }
    });
  }, {threshold:.12});
  reveals.forEach(el => io.observe(el));

  // Dezenter Karten-Tilt — keine Maskottchen-Animationen.
  if(matchMedia('(pointer:fine)').matches){
    document.querySelectorAll('[data-tilt]').forEach(card => {
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX-r.left)/r.width-.5;
        const y = (e.clientY-r.top)/r.height-.5;
        card.style.transform = `perspective(900px) rotateY(${x*2.5}deg) rotateX(${-y*2.5}deg) translateY(-2px)`;
      });
      card.addEventListener('pointerleave', () => card.style.transform='');
    });
  }

  const form = document.querySelector('#contact-form');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get('name') || '';
    const subject = data.get('subject') || 'Anfrage über knurrmagenbrot.ch';
    const message = data.get('message') || '';
    const body = `Hallo Knurr,\n\n${message}\n\nFreundliche Grüsse\n${name}`;
    window.location.href = `mailto:info@knurrmagenbrot.ch?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
})();
