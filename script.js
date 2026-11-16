// Carrossel contínuo e fluido (Swiper.js)
const swiper = new Swiper(".mySwiper", {
    slidesPerView: 2,
    spaceBetween: 15,
    loop: true,
    speed: 5000,
    autoplay: {
        delay: 0,
        disableOnInteraction: false,
    },
    allowTouchMove: true,
    breakpoints: {
        768: {
            slidesPerView: 4,
            spaceBetween: 20,
        },
        1024: {
            slidesPerView: 5,
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