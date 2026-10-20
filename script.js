// Configuração do Carrossel Contínuo e Fluido (Swiper.js)
const swiper = new Swiper(".mySwiper", {
    slidesPerView: 2,
    spaceBetween: 15,
    loop: true,
    speed: 5000, // Define a velocidade da transição contínua (quanto maior o número, mais suave e lento o movimento)
    autoplay: {
        delay: 0, // Sem tempo de espera: o movimento começa imediatamente após carregar
        disableOnInteraction: false,
    },
    freeMode: {
        enabled: true,
        momentum: false,
    },
    allowTouchMove: true, // Permite que o usuário arraste com o dedo ou mouse normalmente
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

// Ativa o efeito de Tela Cheia (Lightbox) nas imagens da galeria
Fancybox.bind("[data-fancybox='galeria-marina']", {});