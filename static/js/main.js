// Script para el slider de proyectos y localidades
document.addEventListener('DOMContentLoaded', function () {
    // Scroll to section if needed
    const urlParams = new URLSearchParams(window.location.search);
    const scrollTo = urlParams.get('scroll_to');

    if (scrollTo) {
        const element = document.getElementById(scrollTo);
        if (element) {
            setTimeout(() => {
                element.scrollIntoView({ behavior: 'smooth' });
            }, 500);
        }
    }

    // Slider functionality for proyectos
    const setupSlider = (dotsSelector, prevBtnSelector, nextBtnSelector) => {
        const dots = document.querySelectorAll(dotsSelector);
        const prevBtn = document.querySelector(prevBtnSelector);
        const nextBtn = document.querySelector(nextBtnSelector);

        if (dots.length && prevBtn && nextBtn) {
            let currentSlide = 0;

            // Function to update active dot
            function updateDots() {
                dots.forEach((dot, index) => {
                    if (index === currentSlide) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }

            // Click event for dots
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    currentSlide = index;
                    updateDots();
                    // Here you would also update the slide content
                    console.log('Changed to slide', index + 1);
                });
            });

            // Previous button
            prevBtn.addEventListener('click', () => {
                currentSlide = (currentSlide - 1 + dots.length) % dots.length;
                updateDots();
                // Here you would also update the slide content
                console.log('Changed to slide', currentSlide + 1);
            });

            // Next button
            nextBtn.addEventListener('click', () => {
                currentSlide = (currentSlide + 1) % dots.length;
                updateDots();
                // Here you would also update the slide content
                console.log('Changed to slide', currentSlide + 1);
            });
        }
    };

    // Setup sliders if they exist
    setupSlider('.proyecto-redd .dot', '.proyecto-redd .prev-btn', '.proyecto-redd .next-btn');
    setupSlider('.localidades-section .dot', '.localidades-section .prev-btn', '.localidades-section .next-btn');

    // Funcionalidad de paginación para la galería
    const paginationNumbers = document.querySelectorAll('.pagination-number');
    const prevArrow = document.querySelector('.pagination-arrow.prev');
    const nextArrow = document.querySelector('.pagination-arrow.next');

    if (paginationNumbers.length) {
        let currentPage = 1;

        // Función para actualizar la página activa
        function updateActivePage(pageNum) {
            paginationNumbers.forEach(num => {
                if (parseInt(num.textContent) === pageNum) {
                    num.classList.add('active');
                } else {
                    num.classList.remove('active');
                }
            });

            // Aquí podrías cargar las imágenes correspondientes a la página
            console.log('Cargando página', pageNum);

            // Actualizar la URL con el número de página
            const url = new URL(window.location);
            url.searchParams.set('page', pageNum);
            window.history.pushState({}, '', url);
        }

        // Click en números de página
        paginationNumbers.forEach(num => {
            num.addEventListener('click', function (e) {
                e.preventDefault();
                const pageNum = parseInt(this.textContent);
                currentPage = pageNum;
                updateActivePage(pageNum);
            });
        });

        // Click en flecha anterior
        if (prevArrow) {
            prevArrow.addEventListener('click', function (e) {
                e.preventDefault();
                if (currentPage > 1) {
                    currentPage--;
                    updateActivePage(currentPage);
                }
            });
        }

        // Click en flecha siguiente
        if (nextArrow) {
            nextArrow.addEventListener('click', function (e) {
                e.preventDefault();
                const maxPage = 200; // Número máximo de páginas
                if (currentPage < maxPage) {
                    currentPage++;
                    updateActivePage(currentPage);
                }
            });
        }

        // Cargar página desde URL si existe
        const urlParams = new URLSearchParams(window.location.search);
        const pageParam = urlParams.get('page');
        if (pageParam) {
            const pageNum = parseInt(pageParam);
            if (!isNaN(pageNum) && pageNum > 0 && pageNum <= 200) {
                currentPage = pageNum;
                updateActivePage(currentPage);
            }
        }
    }

    // Lightbox para las imágenes de la galería
    const galleryItems = document.querySelectorAll('.gallery-item img');

    galleryItems.forEach(item => {
        item.addEventListener('click', function () {
            // Crear un lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';

            // Crear la imagen ampliada
            const imgLarge = document.createElement('img');
            imgLarge.src = this.src;

            // Crear botón de cierre
            const closeBtn = document.createElement('button');
            closeBtn.className = 'lightbox-close';
            closeBtn.innerHTML = '&times;';

            // Añadir elementos al lightbox
            lightbox.appendChild(imgLarge);
            lightbox.appendChild(closeBtn);

            // Añadir lightbox al body
            document.body.appendChild(lightbox);

            // Evitar scroll del body
            document.body.style.overflow = 'hidden';

            // Función para cerrar el lightbox
            function closeLightbox() {
                document.body.removeChild(lightbox);
                document.body.style.overflow = '';
            }

            // Eventos para cerrar el lightbox
            closeBtn.addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', function (e) {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });
        });
    });

    // Funcionalidad para el formulario de contacto
    const contactForm = document.querySelector('form');

    if (contactForm) {
        // Validación del formulario antes de enviar
        contactForm.addEventListener('submit', function (e) {
            const nombre = document.getElementById('nombre');
            const correo = document.getElementById('correo');
            const mensaje = document.getElementById('mensaje');
            const aceptaPolitica = document.getElementById('acepta_politica');

            let isValid = true;

            // Validar campos requeridos
            if (!nombre.value.trim()) {
                isValid = false;
                nombre.classList.add('error');
            } else {
                nombre.classList.remove('error');
            }

            if (!correo.value.trim()) {
                isValid = false;
                correo.classList.add('error');
            } else {
                correo.classList.remove('error');
            }

            if (!mensaje.value.trim()) {
                isValid = false;
                mensaje.classList.add('error');
            } else {
                mensaje.classList.remove('error');
            }

            if (!aceptaPolitica.checked) {
                isValid = false;
                aceptaPolitica.parentElement.classList.add('error');
            } else {
                aceptaPolitica.parentElement.classList.remove('error');
            }

            if (!isValid) {
                e.preventDefault();
                alert('Por favor completa todos los campos requeridos y acepta la política de privacidad.');
            }
        });
    }
});