// Variáveis para controlar o estado do carrossel, avaliação do usuário e contagem de comentários
let currentIndex = 0; // Índice do slide atual
let userRating = 0; // Avaliação do usuário (inicialmente zero)
let commentCounter = 1; // Contador de comentários

// Constantes e seletores para elementos HTML
const totalCategories = document.querySelectorAll('.carousel img').length; // Total de categorias no carrossel
const categories = ['lanches', 'porções', 'bebidas']; // Lista de categorias
const stars = document.querySelectorAll('.star'); // Estrelas de avaliação
const commentInput = document.getElementById('comment'); // Entrada de comentários do usuário
const nameInput = document.getElementById('name'); // Entrada de nome do usuário
const feedbackContainer = document.getElementById('feedback'); // Contêiner de feedbacks dos usuários

// Avançar para o próximo slide no carrossel
function nextSlide() {
    currentIndex = (currentIndex + 1) % totalCategories; // Avança para o próximo slide
    updateCarousel(); // Atualiza a visualização do carrossel
}

// Voltar ao slide anterior no carrossel
function prevSlide() {
    currentIndex = (currentIndex - 1 + totalCategories) % totalCategories; // Retorna ao slide anterior
    updateCarousel(); // Atualiza a visualização do carrossel
}

// Atualizar a posição do carrossel com base no índice atual
function updateCarousel() {
    const carousel = document.querySelector('.carousel'); // Seleciona o carrossel
    const newTransformValue = -currentIndex * 100 + '%'; // Calcula a nova posição
    carousel.style.transform = `translateX(${newTransformValue})`; // Atualiza a posição do carrossel
}

// Mudar a categoria exibida no carrossel
function changeCategory(category) {
    const buttons = document.querySelectorAll('.category-selector button'); // Botões de seleção de categoria
    const menuItems = document.querySelectorAll('.menu-item'); // Itens do menu

    // Atualiza a aparência dos botões de seleção de categoria e dos itens do menu
    buttons.forEach(button => {
        if (button.innerText.toLowerCase() === category) {
            button.classList.add('selected');
        } else {
            button.classList.remove('selected');
        }
    });

    menuItems.forEach(item => {
        if (item.classList.contains(category) || category === 'all') {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });

    currentIndex = categories.indexOf(category); // Atualiza o índice atual com base na categoria selecionada
}

// Realçar as estrelas com base na avaliação do usuário
function highlightStars(rating) {
    stars.forEach(star => {
        const value = parseInt(star.getAttribute('data-value'));
        star.style.color = value <= rating ? 'gold' : 'black'; // Define a cor das estrelas
    });
}

// Submeter a avaliação do usuário e comentário
function submitRating() {
    if (userRating === 0) {
        alert('Por favor, avalie dando estrelas antes de enviar.'); // Alerta se nenhuma avaliação foi dada
        return;
    }

    const emoji = '⭐';
    const xUserRating = emoji.repeat(userRating); // Cria um texto de estrelas com base na avaliação do usuário

    const comment = commentInput.value.trim(); // Obtém o comentário do usuário
    const name = nameInput.value.trim(); // Obtém o nome do usuário

    const feedback = document.createElement('div'); // Cria um novo elemento de feedback
    feedback.classList.add('user-feedback'); // Adiciona classes ao elemento
    feedback.classList.add(`comment-${commentCounter}`); // Adiciona uma classe única para cada comentário
    commentCounter++;

    // Adiciona o nome do usuário e a avaliação ao feedback, se fornecidos
    if (name !== '') {
        feedback.innerHTML = `<h2>${name}</h2><p><strong>${xUserRating}</strong></p>`;
    }

    // Adiciona o comentário ao feedback, se fornecido
    if (comment !== '') {
        feedback.innerHTML += `<p><strong>Comentário:</strong> ${comment}</p>`;
    }

    feedbackContainer.appendChild(feedback); // Adiciona o feedback ao contêiner na página

    // Limpa os campos de entrada após o envio
    commentInput.value = '';
    nameInput.value = '';
    userRating = 0;
    highlightStars(userRating); // Remove o realce das estrelas
}

// Adiciona ouvintes de evento para cada estrela de avaliação
stars.forEach(star => {
    star.addEventListener('click', () => {
        userRating = parseInt(star.getAttribute('data-value')); // Obtém a avaliação da estrela clicada
        highlightStars(userRating); // Realça as estrelas com base na avaliação do usuário
    });
});

// Inicializa a categoria 'lanches' ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
    changeCategory('lanches');
});