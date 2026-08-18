/* =====================================================
   Mahmoud ❤ Basbousa — script.js
   Pure vanilla JavaScript, no frameworks.
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initSmoothScroll();
  initGlobalFloatingHearts();
  initHeroHearts();
  initLetterTypewriter();
  initMusicPlayer();
  initLiveCounter();
  initScrollReveal();
  initInteractiveLoveButton();
  initEnvelope();
  initQuotes();
});

/* =====================================================
   1. NAVBAR — scroll darken + mobile hamburger
   ===================================================== */
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  });

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("open");
  });

  // Close mobile menu when a link is clicked
  navLinks.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("open");
    });
  });
}

/* =====================================================
   2. SMOOTH SCROLL for nav + hero button
   ===================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const openLetterBtn = document.getElementById("openLetterBtn");
  openLetterBtn.addEventListener("click", () => {
    const letterSection = document.getElementById("letter");
    letterSection.scrollIntoView({ behavior: "smooth", block: "start" });
    spawnHeartBurst(openLetterBtn, 8);
  });
}

/* =====================================================
   3. GLOBAL FLOATING HEARTS (background ambience)
   ===================================================== */
function initGlobalFloatingHearts() {
  const layer = document.getElementById("heartsLayer");
  const symbols = ["❤", "💗", "💕"];

  function spawnHeart() {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    const size = 12 + Math.random() * 22;
    const left = Math.random() * 100;
    const duration = 8 + Math.random() * 8;
    const drift = (Math.random() - 0.5) * 120;

    heart.style.left = left + "vw";
    heart.style.fontSize = size + "px";
    heart.style.setProperty("--drift", drift + "px");
    heart.style.animationDuration = duration + "s";

    layer.appendChild(heart);

    // Clean up after animation finishes so DOM doesn't grow forever
    setTimeout(() => heart.remove(), duration * 1000 + 500);
  }

  // Spawn a heart periodically, lightweight enough not to affect performance
  setInterval(spawnHeart, 1200);
  // A few at start
  for (let i = 0; i < 4; i++) setTimeout(spawnHeart, i * 400);
}

/* =====================================================
   4. HERO floating hearts (denser, local to hero)
   ===================================================== */
function initHeroHearts() {
  const heroHearts = document.getElementById("heroHearts");
  const symbols = ["❤", "💗"];

  function spawnHeart() {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    const size = 14 + Math.random() * 20;
    const left = Math.random() * 100;
    const duration = 6 + Math.random() * 6;
    const drift = (Math.random() - 0.5) * 100;

    heart.style.left = left + "vw";
    heart.style.fontSize = size + "px";
    heart.style.setProperty("--drift", drift + "px");
    heart.style.animationDuration = duration + "s";

    heroHearts.appendChild(heart);
    setTimeout(() => heart.remove(), duration * 1000 + 500);
  }

  for (let i = 0; i < 6; i++) setTimeout(spawnHeart, i * 300);
  setInterval(spawnHeart, 1500);
}

/* Utility: burst a few hearts from a given element's position */
function spawnHeartBurst(originEl, count = 6) {
  const rect = originEl.getBoundingClientRect();
  const layer = document.getElementById("heartsLayer");

  for (let i = 0; i < count; i++) {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = "❤";
    heart.style.left = rect.left + rect.width / 2 + "px";
    heart.style.bottom = window.innerHeight - rect.top + "px";
    heart.style.fontSize = 14 + Math.random() * 16 + "px";
    heart.style.setProperty("--drift", (Math.random() - 0.5) * 140 + "px");
    heart.style.animationDuration = 2.2 + Math.random() * 1.4 + "s";
    layer.appendChild(heart);
    setTimeout(() => heart.remove(), 4000);
  }
}

/* =====================================================
   5. LOVE LETTER — typewriter reveal
   ===================================================== */
function initLetterTypewriter() {
  const letterText = document.getElementById("letterText");
  const cursor = document.getElementById("typingCursor");

  const fullText = `يا بسبوسة ❤

والله مقدرش أتخيل أيامي من غير وجودك فيها.

إنتي من أجمل الناس اللي دخلوا حياتي،
ومن أحلى الحاجات اللي حصلتلي.

بحبك أوي أوي،
وكل مرة بنتكلم فيها بحس إن الوقت بيعدي بسرعة.

وجودك بيفرق معايا،
وضحكتك وكلامك وكل التفاصيل الصغيرة اللي بينا
ليها مكان خاص عندي.

نفسي دايمًا أشوفك مبسوطة وفرحانة،
وأكون سبب في ابتسامتك مش زعلك.

ويارب نفضل لبعض،
وربنا يكتب لنا الخير والسعادة،
ولو كان لينا نصيب مع بعض،
يارب يجمعنا في الحلال ونتجوز ونكمل حياتنا سوا ❤

بحبك يا بسبوسة أوي أوي.`;

  let hasStarted = false;
  let index = 0;
  const speed = 18; // ms per character — smooth but not too slow

  function typeNext() {
    if (index < fullText.length) {
      letterText.textContent += fullText[index];
      index++;
      setTimeout(typeNext, speed);
    } else {
      cursor.classList.add("done");
    }
  }

  // Trigger only once, when the letter section scrolls into view
  const letterSection = document.getElementById("letter");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasStarted) {
          hasStarted = true;
          typeNext();
          observer.disconnect();
        }
      });
    },
    { threshold: 0.35 }
  );
  observer.observe(letterSection);
}

/* =====================================================
   6. MUSIC PLAYER
   ===================================================== */
function initMusicPlayer() {
  const audio = document.getElementById("loveSong");
  const playBtn = document.getElementById("playBtn");
  const playBtnText = document.getElementById("playBtnText");
  const disc = document.getElementById("disc");
  const discGlow = document.getElementById("discGlow");
  const progressBar = document.getElementById("progressBar");
  const progressFill = document.getElementById("progressFill");
  const progressThumb = document.getElementById("progressThumb");
  const currentTimeEl = document.getElementById("currentTime");
  const durationEl = document.getElementById("duration");
  const volumeSlider = document.getElementById("volumeSlider");
  const musicHearts = document.getElementById("musicHearts");

  let heartsInterval = null;

  function formatTime(seconds) {
    if (!isFinite(seconds) || isNaN(seconds)) return "00:00";
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  function spawnMusicHeart() {
    const heart = document.createElement("span");
    heart.textContent = "❤";
    heart.style.position = "absolute";
    heart.style.left = 40 + Math.random() * 20 + "%";
    heart.style.bottom = "20%";
    heart.style.fontSize = 10 + Math.random() * 10 + "px";
    heart.style.color = "#ff7fb0";
    heart.style.pointerEvents = "none";
    heart.style.opacity = "0.85";
    heart.style.transition = "transform 1.6s ease-out, opacity 1.6s ease-out";
    musicHearts.appendChild(heart);

    requestAnimationFrame(() => {
      heart.style.transform = `translateY(-90px) translateX(${(Math.random() - 0.5) * 60}px)`;
      heart.style.opacity = "0";
    });

    setTimeout(() => heart.remove(), 1700);
  }

  playBtn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play().catch(() => {
        // If the browser blocks playback (e.g. file missing), fail silently in UI
      });
    } else {
      audio.pause();
    }
  });

  audio.addEventListener("play", () => {
    playBtnText.textContent = "إيقاف الأغنية ⏸";
    disc.classList.add("spinning");
    discGlow.classList.add("active");
    heartsInterval = setInterval(spawnMusicHeart, 500);
  });

  audio.addEventListener("pause", () => {
    playBtnText.textContent = "شغلي الأغنية 🎵❤";
    disc.classList.remove("spinning");
    discGlow.classList.remove("active");
    clearInterval(heartsInterval);
  });

  audio.addEventListener("loadedmetadata", () => {
    durationEl.textContent = formatTime(audio.duration);
  });

  audio.addEventListener("timeupdate", () => {
    currentTimeEl.textContent = formatTime(audio.currentTime);
    const pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
    progressFill.style.width = pct + "%";
    progressThumb.style.right = pct + "%";
  });

  audio.addEventListener("ended", () => {
    playBtnText.textContent = "شغلي الأغنية 🎵❤";
    disc.classList.remove("spinning");
    discGlow.classList.remove("active");
    clearInterval(heartsInterval);
  });

  progressBar.addEventListener("click", (e) => {
    const rect = progressBar.getBoundingClientRect();
    // RTL layout: right edge = 0%, left edge = 100%
    const clickX = rect.right - e.clientX;
    const pct = Math.min(Math.max(clickX / rect.width, 0), 1);
    if (audio.duration) audio.currentTime = pct * audio.duration;
  });

  volumeSlider.addEventListener("input", () => {
    audio.volume = parseFloat(volumeSlider.value);
  });
}

/* =====================================================
   7. LIVE RELATIONSHIP COUNTER
   ===================================================== */
function initLiveCounter() {
  const startDate = new Date("2026-07-20T13:00:00");

  const daysEl = document.getElementById("countDays");
  const hoursEl = document.getElementById("countHours");
  const minutesEl = document.getElementById("countMinutes");
  const secondsEl = document.getElementById("countSeconds");

  let prevValues = { d: null, h: null, m: null, s: null };

  function bump(el) {
    el.classList.remove("bump");
    // Force reflow so the animation can restart
    void el.offsetWidth;
    el.classList.add("bump");
  }

  function pad(n) {
    return n.toString().padStart(2, "0");
  }

  function updateCounter() {
    const now = new Date();
    let diff = Math.max(0, now.getTime() - startDate.getTime());

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    daysEl.textContent = pad(days);
    hoursEl.textContent = pad(hours);
    minutesEl.textContent = pad(minutes);
    secondsEl.textContent = pad(seconds);

    if (prevValues.d !== days) bump(daysEl);
    if (prevValues.h !== hours) bump(hoursEl);
    if (prevValues.m !== minutes) bump(minutesEl);
    if (prevValues.s !== seconds) bump(secondsEl);

    prevValues = { d: days, h: hours, m: minutes, s: seconds };
  }

  updateCounter();
  setInterval(updateCounter, 1000);
}

/* =====================================================
   8. SCROLL REVEAL (IntersectionObserver)
   ===================================================== */
function initScrollReveal() {
  const revealEls = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  revealEls.forEach((el) => observer.observe(el));
}

/* =====================================================
   9. INTERACTIVE LOVE BUTTON
   ===================================================== */
function initInteractiveLoveButton() {
  const btn = document.getElementById("loveRevealBtn");
  const message = document.getElementById("hiddenMessage");
  const heart = document.getElementById("interactiveHeart");
  const heartsContainer = document.getElementById("clickHearts");

  let revealed = false;

  btn.addEventListener("click", () => {
    heart.classList.remove("pulse");
    void heart.offsetWidth;
    heart.classList.add("pulse");

    spawnHeartBurst(btn, 10);

    // Also spawn a few hearts rising from within the section
    const sectionRect = btn.closest("section").getBoundingClientRect();
    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        const h = document.createElement("span");
        h.textContent = "❤";
        h.style.position = "absolute";
        h.style.left = 20 + Math.random() * 60 + "%";
        h.style.bottom = "0";
        h.style.fontSize = 14 + Math.random() * 16 + "px";
        h.style.color = "#ff7fb0";
        h.style.opacity = "0.9";
        h.style.pointerEvents = "none";
        h.style.transition = "transform 2.2s ease-out, opacity 2.2s ease-out";
        heartsContainer.style.position = "relative";
        heartsContainer.style.height = sectionRect.height + "px";
        heartsContainer.appendChild(h);
        requestAnimationFrame(() => {
          h.style.transform = `translateY(-${200 + Math.random() * 150}px)`;
          h.style.opacity = "0";
        });
        setTimeout(() => h.remove(), 2300);
      }, i * 120);
    }

    if (!revealed) {
      revealed = true;
      message.classList.add("visible");
    }
  });
}

/* =====================================================
   10. SECRET ENVELOPE
   ===================================================== */
function initEnvelope() {
  const envelope = document.getElementById("envelope-el");
  const btn = document.getElementById("openEnvelopeBtn");

  btn.addEventListener("click", () => {
    const isOpen = envelope.classList.toggle("open");
    btn.textContent = isOpen ? "اقفليها 💌" : "افتحيها 💌";
  });
}

/* =====================================================
   11. ROMANTIC QUOTES CAROUSEL
   ===================================================== */
function initQuotes() {
  const quotes = [
    "مش كل الناس بنقابلها بتسيب أثر...\nبس إنتي سبتِ أثر جميل ❤",
    "أجمل حاجة في الحكاية إنها لسه بتبدأ.",
    "كل ثانية في العداد بتفكرني إن في حد جميل دخل حياتي.",
    "يمكن الحكاية لسه صغيرة...\nبس مكانك عندي كبير ❤",
  ];

  const quoteText = document.getElementById("quoteText");
  const prevBtn = document.getElementById("prevQuote");
  const nextBtn = document.getElementById("nextQuote");
  const dotsContainer = document.getElementById("quoteDots");

  let current = 0;
  let autoTimer = null;

  quotes.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.className = "quote-dot" + (i === 0 ? " active" : "");
    dot.addEventListener("click", () => showQuote(i, true));
    dotsContainer.appendChild(dot);
  });

  function renderDots() {
    [...dotsContainer.children].forEach((dot, i) => {
      dot.classList.toggle("active", i === current);
    });
  }

  function showQuote(index, userTriggered) {
    quoteText.classList.add("fade-out");
    setTimeout(() => {
      current = (index + quotes.length) % quotes.length;
      quoteText.textContent = quotes[current];
      quoteText.classList.remove("fade-out");
      renderDots();
    }, 300);

    if (userTriggered) resetAutoRotate();
  }

  function resetAutoRotate() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => showQuote(current + 1, false), 5000);
  }

  prevBtn.addEventListener("click", () => showQuote(current - 1, true));
  nextBtn.addEventListener("click", () => showQuote(current + 1, true));

  quoteText.textContent = quotes[0];
  resetAutoRotate();
}
