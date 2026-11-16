// Carrossel contínuo e fluido (Swiper.js)
const swiper = new Swiper(".mySwiper", {
    slidesPerView: 1.25, // No mobile mostra 1 foto grande + a pontinha da próxima
    spaceBetween: 12,
    loop: true,
    speed: 6000,
    autoplay: {
        delay: 0,
        disableOnInteraction: false,
    },
    allowTouchMove: true,
    breakpoints: {
        768: {
            slidesPerView: 2.5,
            spaceBetween: 16,
        },
        1024: {
            slidesPerView: 3.2, // No desktop mostra 3 fotos grandes sem espremer
            spaceBetween: 20,
        },
    },
});

// Lightbox para as fotos da galeria
Fancybox.bind("[data-fancybox='galeria-marina']", {});

// Rolagem suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (!target) return;

        e.preventDefault();
        const headerHeight = document.querySelector(".main-header").offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
        });
    });
});