// Configuração do Carrossel (Swiper.js) para a Marina Recanto da Mata
const swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,      // 1 foto por vez em dispositivos móveis
    spaceBetween: 20,      // Espaçamento entre as fotos
    loop: true,            // Carrossel infinito
    autoplay: {
        delay: 3500,       // Passa sozinho suavemente a cada 3.5 segundos
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,   // Torna os pontinhos brancos clicáveis
    },
    breakpoints: {
        // Quando a tela for de computador (maior ou igual a 768px)
        768: {
            slidesPerView: 3,  // Exibe 3 fotos simultâneas na horizontal
            spaceBetween: 25,  // Espaço entre as fotos no desktop
        },
    },
});

// Ativa o efeito de Tela Cheia (Lightbox) nas imagens da galeria
Fancybox.bind("[data-fancybox='galeria-marina']", {
    // Configurações extras se necessárias no futuro
});