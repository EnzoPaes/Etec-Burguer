let currentIndex = 0;
let userRating = 0;
let commentCounter = 1; // Variável para contar os comentários
const totalCategories = document.querySelectorAll('.carousel img').length;
const categories = ['lanches', 'porções', 'bebidas'];
const stars = document.querySelectorAll('.star');
const commentInput = document.getElementById('comment');
const nameInput = document.getElementById('name');
const feedbackContainer = document.getElementById('feedback');

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalCategories;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + totalCategories) % totalCategories;
    updateCarousel();
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalCategories;
    updateCarousel();
}

function updateCarousel() {
    const carousel = document.querySelector('.carousel');
    const newTransformValue = -currentIndex * 100 + '%';
    carousel.style.transform = `translateX(${newTransformValue})`;
}


document.addEventListener('DOMContentLoaded', function () {
    changeCategory('lanches');
});

function changeCategory(category) {
    const buttons = document.querySelectorAll('.category-selector button');
    const selectedCategory = categories[currentIndex];

    buttons.forEach(button => {
        if (button.innerText.toLowerCase() === category) {
            button.classList.add('selected');
        } else {
            button.classList.remove('selected');
        }
    });

    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        if (item.classList.contains(category) || category === 'all') {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });

    currentIndex = categories.indexOf(category);
}

function updateCategoryButtons() {
    const buttons = document.querySelectorAll('.category-selector button');
    buttons.forEach((button, index) => {
        if (index === currentIndex) {
            button.classList.add('selected');
        } else {
            button.classList.remove('selected');
        }
    });
}

stars.forEach(star => {
    star.addEventListener('click', () => {
        userRating = parseInt(star.getAttribute('data-value'));
        highlightStars(userRating);
    });
});

function highlightStars(rating) {
    stars.forEach(star => {
        const value = parseInt(star.getAttribute('data-value'));
        star.style.color = value <= rating ? 'gold' : 'black';
    });
}

function submitRating() {
    if (userRating === 0) {
        alert('Por favor, avalie dando estrelas antes de enviar.');
        return;
    }

    const emoji = '⭐';
    const xUserRating = emoji.repeat(userRating);

    const comment = commentInput.value.trim();
    const name = nameInput.value.trim();

    const feedback = document.createElement('div');
    feedback.classList.add('user-feedback');
    feedback.classList.add(`comment-${commentCounter}`); // Adiciona uma classe única para cada comentário
    commentCounter++;

    if (name !== '') {
        feedback.innerHTML = `<h2>${name}</h2><p><strong>${xUserRating}</strong></p>`;
    }

    if (comment !== '') {
        feedback.innerHTML += `<p><strong>Comentário:</strong> ${comment}</p>`;
    }

    feedbackContainer.appendChild(feedback);

    // Limpa a entrada após o envio
    commentInput.value = '';
    nameInput.value = '';
    userRating = 0;
    highlightStars(userRating);
}