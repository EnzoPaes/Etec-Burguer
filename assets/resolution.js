let currentIndex = 0;
const totalCategories = document.querySelectorAll('.carousel img').length;
const categories = ['lanches', 'porções', 'bebidas'];

function prevSlide() {
    currentIndex = (currentIndex - 1 + totalCategories) % totalCategories;
    updateCarousel();
    updateCategoryButtons();
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalCategories;
    updateCarousel();
    updateCategoryButtons();
}

function updateCarousel() {
    const carousel = document.querySelector('.carousel');
    const newTransformValue = -currentIndex * 100 + '%';
    carousel.style.transform = 'translateX(' + newTransformValue + ')';
}

// 

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

// Adicione este trecho para marcar o botão ao carregar a página
updateCategoryButtons();