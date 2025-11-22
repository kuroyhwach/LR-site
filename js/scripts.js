 const swiper = new Swiper('.slider-container .swiper', {
    slidesPerView: 1,
    loop: true,
    speed: 1000,
    spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    on: {
            slideChangeTransitionStart: function() {
                const photoContainer = document.querySelector('.active-slide-photo');
                photoContainer.classList.remove('fade-in');
                photoContainer.classList.add('fade-out');
            },
            slideChangeTransitionEnd: function() {
                const activeSlide = this.slides[this.activeIndex];
                const photoSrc = activeSlide.getAttribute('data-photo');
                const photoElement = document.querySelector('.active-slide-photo img');
                const photoContainer = document.querySelector('.active-slide-photo');
                
                photoElement.src = photoSrc;
                setTimeout(() => {
                    photoContainer.classList.remove('fade-out');
                    photoContainer.classList.add('fade-in');
                }, 50);
            }
    },
  });

  (function () {
  function loadScript(src) {
    return new Promise((res, rej) => {
      const s = document.createElement('script');
      s.src = src;
      s.async = false;
      s.onload = () => res();
      s.onerror = () => rej(new Error('Failed to load ' + src));
      document.head.appendChild(s);
    });
  }
  function loadCSS(href) {
    return new Promise((res, rej) => {
      const l = document.createElement('link');
      l.rel = 'stylesheet';
      l.href = href;
      l.onload = () => res();
      l.onerror = () => rej(new Error('Failed to load ' + href));
      document.head.appendChild(l);
    });
  }

  const AOS_CSS = 'https://unpkg.com/aos@2.3.4/dist/aos.css';
  const AOS_JS = 'https://unpkg.com/aos@2.3.4/dist/aos.js';
  const GSAP_JS = 'https://cdn.jsdelivr.net/npm/gsap@3.12.2/dist/gsap.min.js';
  const SCROLLTRIGGER_JS = 'https://cdn.jsdelivr.net/npm/gsap@3.12.2/dist/ScrollTrigger.min.js';

  const mapping = [
    { sel: '.header__inner', aos: 'fade-down', delay: 0 },
    { sel: '.header__nav-list > .header__nav-item', aos: 'fade-down', stagger: 0.06, delay: 80 },

    { sel: '.first-screen__title', aos: 'fade-up', delay: 120 },
    { sel: '.first-screen__consultation', aos: 'fade-up', delay: 190 },
    { sel: '.first-screen__form', aos: 'fade-up', delay: 260 },
    { sel: '.first-screen__stats .first-screen__stat-item', aos: 'fade-up', stagger: 0.09, delay: 320 },
    { sel: '.first-screen__content img', aos: 'zoom-in', delay: 300 },

    { sel: '.director__image-side', aos: 'zoom-in', delay: 100 },
    { sel: '.director__content > *', aos: 'fade-up', stagger: 0.06, delay: 180 },

    { sel: '.advantages__stats-item', aos: 'fade-up', stagger: 0.08, delay: 100 },

    { sel: '.specialists__persons-item', aos: 'fade-up', stagger: 0.08, delay: 140 },

    { sel: '.partners__logos-item', aos: 'fade-up', stagger: 0.06, delay: 120 },

    { sel: '.swiper-slide', aos: 'fade-right', stagger: 0.12, delay: 100 },

    { sel: '.blog-card', aos: 'fade-up', stagger: 0.08, delay: 120 },

    { sel: '.subscribe__content > *', aos: 'fade-up', stagger: 0.06, delay: 140 },
    { sel: '.contacts__content > *', aos: 'fade-up', stagger: 0.06, delay: 140 },
  ];

  function markInit() {
    mapping.forEach(map => {
      const nodes = document.querySelectorAll(map.sel);
      if (!nodes || nodes.length === 0) return;
      nodes.forEach((el, idx) => {
        el.classList.add('anim-init');
        if (map.stagger && map.stagger > 0) {
          el.classList.add('stagger-parent');
          el.classList.add('stagger-child');
        }
      });
    });
  }

  function applyAosAttributes() {
    mapping.forEach(map => {
      const nodes = document.querySelectorAll(map.sel);
      if (!nodes || nodes.length === 0) return;
      nodes.forEach((el, idx) => {
        el.setAttribute('data-aos', map.aos || 'fade-up');
        const baseDelay = map.delay || 0;
        const stagger = map.stagger || 0;
        const computedDelay = Math.round(baseDelay + idx * (stagger * 1000));
        el.setAttribute('data-aos-delay', computedDelay.toString());
        el.setAttribute('data-aos-duration', '700');
        if (map.aos && map.aos.indexOf('fade') !== -1) el.classList.add('aos-fade-up');
        if (map.aos && map.aos.indexOf('left') !== -1) el.classList.add('aos-fade-left');
        if (map.aos && map.aos.indexOf('right') !== -1) el.classList.add('aos-fade-right');
        if (map.aos && map.aos.indexOf('zoom') !== -1) el.classList.add('aos-zoom-in');
        if (el.classList.contains('partners__logos-item') || el.classList.contains('blog-card')) {
          el.classList.add('reveal-glow');
        }
        if (map.sel.includes('__stats') || map.sel.includes('partners__logos-item') || map.sel.includes('specialists__persons')) {
        }
      });
    });
  }

  function heroGSAP() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    try {
      gsap.registerPlugin(ScrollTrigger);
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      const headerEl = document.querySelector('.header__inner');
      if (headerEl) {
        tl.from(headerEl, { y: -12, opacity: 0, duration: 0.6 }, 0);
      }

      const heroTitle = document.querySelector('.first-screen__title');
      const heroSub = document.querySelector('.first-screen__consultation');
      const heroForm = document.querySelector('.first-screen__form');
      const heroStats = document.querySelectorAll('.first-screen__stat-item');
      const heroImg = document.querySelector('.first-screen__content img');

      tl.from(heroTitle, { y: 28, opacity: 0, duration: 0.9 }, 0.12);
      tl.from(heroSub, { y: 18, opacity: 0, duration: 0.8 }, 0.28);
      tl.from(heroForm, { y: 18, opacity: 0, duration: 0.8 }, 0.36);
      if (heroStats && heroStats.length) {
        tl.from(heroStats, { y: 12, opacity: 0, duration: 0.7, stagger: 0.09 }, 0.46);
      }
      if (heroImg) {
        tl.from(heroImg, { scale: 0.98, opacity: 0, duration: 0.9 }, 0.32);
      }


      const dir = document.querySelector('.director__page');
      if (dir) {
        gsap.from('.director__page', {
          scrollTrigger: {
            trigger: '.director__page',
            start: 'top 80%',
          },
          y: 28,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        });
      }
    } catch (e) {
      console.warn('GSAP init failed', e);
    }
  }


  (async function init() {
    try {
      markInit();

      await loadCSS(AOS_CSS);
      await loadScript(AOS_JS);


      applyAosAttributes();

      if (window.AOS) {
        AOS.init({
          offset: 120,
          delay: 0,
          duration: 700,
          easing: 'cubic-bezier(.25,.8,.25,1)',
          once: false,
          mirror: false,
          anchorPlacement: 'top-bottom',
        });
      }

      await loadScript(GSAP_JS);
      await loadScript(SCROLLTRIGGER_JS);

      heroGSAP();


      setTimeout(() => {
        if (window.AOS && typeof AOS.refresh === 'function') AOS.refresh();
      }, 800);

    } catch (err) {
      console.error('Ошибка инициализации анимаций:', err);
    }
  })();

})();

const burger = document.querySelector('.burger');
const nav = document.querySelector('.header__nav');

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  nav.classList.toggle('open');
});

(function() {
  function checkViewportWidth() {
    const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const body = document.body;
    
    if (viewportWidth <= 992) {
      body.classList.add('mobile-layout');
    } else {
      body.classList.remove('mobile-layout');
    }
  }
  
  window.addEventListener('load', checkViewportWidth);
  window.addEventListener('resize', checkViewportWidth);
  
  window.addEventListener('scroll', function() {
    if (window.scrollX !== 0) {
      window.scrollTo(0, window.scrollY);
    }
  });
})();

  