document.addEventListener('DOMContentLoaded', () => {
    // Menu Hambúrguer para Mobile
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.querySelector('header nav');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Fechar o menu ao clicar num item (para navegação de página única)
        navMenu.querySelectorAll('a').forEach(item => {
            item.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            });
        });
    }

    // Animação de scroll suave para links de âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Exemplo de validação de formulário (básica)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Impede o envio padrão do formulário

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name === '' || email === '' || message === '') {
                alert('Por favor, preencha todos os campos do formulário.');
            } else if (!validateEmail(email)) {
                alert('Por favor, insira um endereço de email válido.');
            } else {
                // Em um ambiente real, você integraria com um serviço de backend
                // (e.g., Formspree, Netlify Forms, ou um servidor próprio) para enviar o e-mail.
                alert('Mensagem enviada com sucesso! A SDtK entrará em contacto brevemente.');
                contactForm.reset(); // Limpa o formulário após o "envio"
            }
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});