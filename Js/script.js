document.addEventListener('DOMContentLoaded', () => {
    // Menu Hambúrguer para Mobile
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    // Ajustado para selecionar a 'nav' dentro do 'header'
    // Se o seu CSS usa 'header nav.active' para mostrar/esconder, isso funcionará.
    // Se o seu CSS usa 'header .container nav.active', o seletor pode precisar de mais ajuste.
    const navMenu = document.querySelector('header nav'); // Alvo correto da classe 'active'

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Opcional: Adicione/remova uma classe no próprio botão para mudar o ícone (ex: X para ☰)
            // mobileMenuToggle.classList.toggle('is-open');
        });

        // Fechar o menu ao clicar num item (para navegação de página única e entre páginas)
        // Isso fechará o menu quer o link seja para uma âncora ou para outra página.
        navMenu.querySelectorAll('a').forEach(item => {
            item.addEventListener('click', () => {
                // Apenas feche o menu se ele estiver aberto
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    // Se estiver usando a classe no botão também, remova-a aqui
                    // mobileMenuToggle.classList.remove('is-open');
                }
            });
        });
    }

    // Animação de scroll suave para links de âncora - APENAS para links na MESMA PÁGINA
    // Esta é a principal alteração para evitar interferência com a navegação entre páginas
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href'); // Ex: '#about'
            const targetElement = document.querySelector(targetId);

            // Verifica se o link é uma âncora E se a seção alvo existe na página atual.
            // Isso evita que o scroll suave tente agir ao clicar em "Serviços" (que agora é servicos.html)
            // ou ao clicar em um link como "Ver Mais Casos de Sucesso" que pode ser "#" (vazio) ou para outra página.
            if (targetId && targetId !== '#' && targetElement && this.pathname === window.location.pathname) {
                e.preventDefault(); // Impede o comportamento padrão apenas se for uma âncora na mesma página

                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                // Se o menu móvel estiver aberto, feche-o após o scroll
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    // if (mobileMenuToggle) mobileMenuToggle.classList.remove('is-open');
                }
            }
            // Se as condições acima não forem atendidas (por exemplo, é um link para outra página),
            // o comportamento padrão do navegador (navegar para a nova página) irá ocorrer.
        });
    });

    // Exemplo de validação de formulário (básica) - Mantido inalterado
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Impede o envio padrão do formulário

            const name = document.getElementById('nome').value; // Usar 'nome' conforme seu HTML de contato
            const email = document.getElementById('email').value;
            const message = document.getElementById('mensagem').value; // Usar 'mensagem' conforme seu HTML de contato

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