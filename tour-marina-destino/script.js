let transicaoAtiva = false;

// Detecta se o usuário está acessando por um celular
const isMobileDevice = window.innerWidth < 768;

// Atualizado com os novos caminhos de assets do seu projeto expandido
const imagensPreload = [
    'assets/pano.webp',       // entrada (Cena 1)
    'assets/pano1.webp',      // restaurante_meio (Cena 2)
    'assets/pano2.webp',      // restaurante_vista (Cena 3)
    'assets/pano3.webp',      // piscina (Cena 4)
    'assets/pano4.webp',      // represa (Cena 5)
    'assets/pano5.webp'       // chale_interno
];

imagensPreload.forEach(src => {
    const img = new Image();
    img.src = src;
});

const planetViewer = new PhotoSphereViewer.Viewer({
    container: 'planet-view',
    panorama: 'assets/pano.webp',
    navbar: false,
    mousewheel: false,
    touchmoveTwoFingers: false,
    defaultPitch: -Math.PI / 2,
    defaultYaw: 0,
    
    // Abre a restrição do componente no celular para permitir um Zoom Out maior
    maxFov: isMobileDevice ? 135 : 90, 
    
    // Configura o planeta para começar menor/afastado no celular, mantendo o padrão no PC
    defaultZoomLvl: isMobileDevice ? -12 : 0, 
    
    fisheye: 2
});

const playButton = document.getElementById('playButton');

playButton.addEventListener('click', () => {
    playButton.classList.add('fade-out');

    setTimeout(() => {
        playButton.style.display = 'none';
    }, 300);

    const duration = 4000;
    const start = performance.now();
    
    // Mantido o limite original de 16.6 para blindar o encaixe final com a fachada
    const limiteZoom = window.innerWidth < 768 ? 23 : 50;

    function animate(now) {
        let progress = (now - start) / duration;
        if (progress > 1) progress = 1;

        const ease = 1 - Math.pow(1 - progress, 4);

        const fisheyeValue = 2 - (ease * 2);
        planetViewer.setOption('fisheye', fisheyeValue);

        const pitchValue = (-Math.PI / 2) + (ease * (Math.PI / 2));
        planetViewer.rotate({ pitch: pitchValue, yaw: 0 });

        // Calcula dinamicamente o zoom partindo do ponto inicial afastado até o seu destino original
        const zoomInicial = window.innerWidth < 768 ? -12 : 0;
        const zoomValue = zoomInicial + (ease * (limiteZoom - zoomInicial));
        planetViewer.zoom(zoomValue);

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            trocarParaPannellum();
        }
    }

    requestAnimationFrame(animate);
});

function trocarParaPannellum() {
    const planet = document.getElementById('planet-view');
    const pano = document.getElementById('panorama');

    pano.style.display = 'block';

    iniciarTour();

    setTimeout(() => {
        planet.style.opacity = '0'; // Esconde o planeta de forma suave revelando o Pannellum pronto

        setTimeout(() => {
            planetViewer.destroy();
            planet.innerHTML = '';
            planet.style.display = 'none';
        }, 400);
    }, 150);
}

function iniciarTour() {
    const isMobile = window.innerWidth < 768;
    const fovInicial = isMobile ? 75.6 : 100.6;

    window.viewer = pannellum.viewer('panorama', {
        "default": {
            "firstScene": "entrada",
            "author": "Marina Recanto da Mata",
            "sceneFadeDuration": 1000,
            "autoLoad": true,
            "autoRotate": -2,
            "hfov": fovInicial
        },

        "scenes": {
            // CENA 1 - FACHADA / HUB PRINCIPAL
            "entrada": {
                "panorama": "assets/pano.webp",
                "pitch": 0,
                "yaw": -41,
                "hotSpots": [
                    {
                        "pitch": -5,
                        "yaw": -43, // Primeiro Hotspot original para o restaurante
                        "type": "info",
                        "cssClass": "hotspot-pulse",
                        "clickHandlerFunc": function () {
                            irPara('restaurante_meio', 0, -43, 0, 50);
                        }
                    },
                    {
                        "pitch": -8,
                        "yaw": -2, // Novo Hotspot (+35 graus para a direita em relação ao de -43)
                        "type": "info",
                        "cssClass": "hotspot-pulse",
                        "clickHandlerFunc": function () {
                            // Envia o usuário descendo em direção à piscina (Cena 4)
                            irPara('piscina', -8,-2, 0, -50); 
                        }
                    }
                ]
            },

            // CENA 2 - RESTAURANTE MEIO
            "restaurante_meio": {
                "panorama": "assets/pano1.webp",
                "hotSpots": [
                    {
                        "pitch": -10,
                        "yaw": -67,
                        "type": "info",
                        "cssClass": "hotspot-pulse",
                        "clickHandlerFunc": function () {
                            irPara('restaurante_vista', 0,-67, 0, -120);
                        }
                    },
                    {
                        "pitch": -10,
                        "yaw": -133,
                        "type": "info",
                        "cssClass": "hotspot-pulse",
                        "clickHandlerFunc": function () {
                            irPara('entrada', 0,-135, 0, 150);
                        }
                    }
                ]
            },

            // CENA 3 - RESTAURANTE VISTA REPRESA
            "restaurante_vista": {
                "panorama": "assets/pano2.webp",
                "hotSpots": [
                    {
                        "pitch": -10,
                        "yaw": 50,
                        "type": "info",
                        "cssClass": "hotspot-pulse",
                        "clickHandlerFunc": function () {
                            irPara('restaurante_meio', 0, 50, -10, 115);
                        }
                    },
                    {
                        "pitch": -5,
                        "yaw": 150, // Ajuste esse yaw para apontar visualmente para a saída do salão
                        "type": "info",
                        "cssClass": "hotspot-pulse",
                        "clickHandlerFunc": function () {
                            // ATALHO DIRETO: Retorna da Cena 3 direto para a primeira cena (Fachada)
                            irPara('entrada', 0, 150, 0, 115);
                        }
                    }
                ]
            },

            // CENA 4 - PISCINA / CAMINHO (HUB DA ÁREA DE LAZER)
            "piscina": {
                "panorama": "assets/pano3.webp",
                "hotSpots": [
                    {
                        "pitch": 10,
                        "yaw": 137, // Ajustar conforme a orientação da sua foto para olhar "para trás/subida"
                        "type": "info",
                        "cssClass": "hotspot-pulse",
                        "clickHandlerFunc": function () {
                            irPara('entrada', 12, 137, 0, 160); // Volta para a Fachada
                        }
                    },
                    {
                        "pitch": -12,
                        "yaw": -80, // Direção descendo para a água
                        "type": "info",
                        "cssClass": "hotspot-pulse",
                        "clickHandlerFunc": function () {
                            irPara('represa', -10, -80, 0, 0); // Desce para a Represa (Cena 5)
                        }
                    },
                    {
                        "pitch": 15, // Pitch alto simulando a subida/entrada da estrutura do chalé
                        "yaw": 93,  // Angulação em direção ao Chalé
                        "type": "info",
                        "cssClass": "hotspot-pulse",
                        "clickHandlerFunc": function () {
                            irPara('chale_interno', 12, 93, 0, -25); // Teleporta para dentro do Chalé
                        }
                    }
                ]
            },

            // CENA 5 - REPRESA
            "represa": {
                "panorama": "assets/pano4.webp",
                "hotSpots": [
                    {
                        "pitch": 15,
                        "yaw": 182, // Direção voltando para a piscina
                        "type": "info",
                        "cssClass": "hotspot-pulse",
                        "clickHandlerFunc": function () {
                            irPara('piscina', 12, 182, 0, 90);
                        }
                    }
                ]
            },

            // CENA OPCIONAL - INTERIOR DO CHALÉ
            "chale_interno": {
                "panorama": "assets/pano5.webp",
                "hotSpots": [
                    {
                        "pitch": -15,
                        "yaw": 135, // Apontando em direção à porta de saída do Chalé
                        "type": "info",
                        "cssClass": "hotspot-pulse",
                        "clickHandlerFunc": function () {
                            irPara('piscina', -10, 140, 0, -60); // Sai do chalé de volta para a área da piscina
                        }
                    }
                ]
            }
        }
    });

    window.viewer.on('load', function () {
        if (window.viewer.getScene() === "entrada") {
            const isMobile = window.innerWidth < 768;
            if (isMobile) {
                window.viewer.setHfov(76);
            }
        }
    });
}

// Adicionamos "pitchClick" como o segundo parâmetro da função
function irPara(cena, pitchClick, yawClick, pDestino, yDestino) {
    if (transicaoAtiva) return;
    transicaoAtiva = true;

    const pano = document.getElementById('panorama');
    const fovPadrao = window.innerWidth < 768 ? 80 : 110;

    window.viewer.stopAutoRotate();

    const isMobile = window.innerWidth < 768;
    const zoomInDinamico = isMobile ? 55 : 80;

    // MÁGICA AQUI: Agora a câmera vai olhar para cima (pitchClick) antes de dar o zoom!
    window.viewer.lookAt(pitchClick, yawClick, zoomInDinamico, 1000);

    pano.style.filter = 'blur(10px) grayscale(20%)';

    setTimeout(function () {
        const isMobile = window.innerWidth < 768;
        const fovDestino = cena === "entrada" ? (isMobile ? 75 : 110) : fovPadrao;

        window.viewer.loadScene(cena, pDestino, yDestino, fovDestino);

        pano.style.filter = 'blur(0px) grayscale(0%)';
        window.viewer.startAutoRotate(-2);

        setTimeout(function () {
            transicaoAtiva = false;
        }, 500);

    }, 1200);
}