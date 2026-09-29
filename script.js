// Navbar background
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 30);
});

// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("open");
  document.body.classList.toggle("menu-open", isOpen);
  menuBtn.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".mobile-menu a").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

// Reveal sections on scroll
const revealItems = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach(item => observer.observe(item));

// Small cursor glow on desktop
const glow = document.querySelector(".cursor-glow");

if (window.matchMedia("(pointer:fine)").matches) {
  window.addEventListener("pointermove", event => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  });
}

// Subtle project-card tilt
document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("pointermove", event => {
    if (window.innerWidth < 900) return;

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * -3;
    const rotateY = ((x / rect.width) - 0.5) * 3;

    card.style.transform =
      `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});
