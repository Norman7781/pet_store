
let petsData = {};


async function loadPetsData() {
    try {
        const response = await fetch('pets-data.json');
        if (!response.ok) {
            throw new Error('JSON file not found');
        }
        petsData = await response.json();
        console.log('Loaded pets data from JSON file');
    } catch (error) {
        console.log('Loading from inline data...', error.message);

        petsData = getDefaultPetsData();
    }
    

    renderFeaturedPets();
    renderAllPets();
}


function getDefaultPetsData() {
    return {
        "featured": [
            {
                "id": 1,
                "name": "Buddy",
                "breed": "Golden Retriever",
                "age": "3 years",
                "gender": "Male",
                "category": "dogs",
                "image": "img/dogs/dog01.jpg",
                "featured": true,
                "description": "Friendly and energetic, loves playing fetch and swimming."
            },
            {
                "id": 2,
                "name": "Whiskers",
                "breed": "Persian",
                "age": "1 year",
                "gender": "Male",
                "category": "cats",
                "image": "img/dogs/dog02.jpg",
                "featured": true,
                "description": "Calm and affectionate, enjoys quiet moments and gentle pets."
            }
        ],
        "dogs": [
            {
                "id": 1,
                "name": "Buddy",
                "breed": "Golden Retriever",
                "age": "3 years",
                "gender": "Male",
                "category": "dogs",
                "image": "img/dogs/dog03.jpg",
                "description": "Friendly and energetic, loves playing fetch and swimming."
            },
            {
                "id": 3,
                "name": "Luna",
                "breed": "Border Collie",
                "age": "2 years",
                "gender": "Female",
                "category": "dogs",
                "image": "img/dogs/dog01.jpg",
                "description": "Intelligent and active, perfect for families who love outdoor activities."
            },
            {
                "id": 4,
                "name": "Max",
                "breed": "German Shepherd",
                "age": "4 years",
                "gender": "Male",
                "category": "dogs",
                "image": "img/dogs/dog02.jpg",
                "description": "Loyal and protective, great with children and well-trained."
            },
            {
                "id": 11,
                "name": "Bella",
                "breed": "Labrador",
                "age": "1 year",
                "gender": "Female",
                "category": "dogs",
                "image": "img/dogs/dog03.jpg",
                "description": "Playful and gentle, loves kids and other pets."
            }
        ],
        "cats": [
            {
                "id": 2,
                "name": "Whiskers",
                "breed": "Persian",
                "age": "1 year",
                "gender": "Male",
                "category": "cats",
                "image": "img/cats/cat01.jpg",
                "description": "Calm and affectionate, enjoys quiet moments and gentle pets."
            },
            {
                "id": 5,
                "name": "Shadow",
                "breed": "Maine Coon",
                "age": "2 years",
                "gender": "Female",
                "category": "cats",
                "image": "img/cats/cat02.jpg",
                "description": "Large and fluffy, very social and loves attention."
            },
            {
                "id": 6,
                "name": "Mittens",
                "breed": "British Shorthair",
                "age": "3 years",
                "gender": "Female",
                "category": "cats",
                "image": "img/cats/cat03.jpg",
                "description": "Independent but loving, perfect lap cat for cozy evenings."
            },
            {
                "id": 12,
                "name": "Smokey",
                "breed": "Russian Blue",
                "age": "4 years",
                "gender": "Male",
                "category": "cats",
                "image": "img/cats/cat01.jpg",
                "description": "Quiet and elegant, enjoys peaceful environments."
            }
        ],
        "birds": [
            {
                "id": 7,
                "name": "Charlie",
                "breed": "African Grey Parrot",
                "age": "5 years",
                "gender": "Male",
                "category": "birds",
                "image": "img/birds/bird01.jpg",
                "description": "Intelligent and talkative, loves learning new words and tricks."
            },
            {
                "id": 8,
                "name": "Sunny",
                "breed": "Canary",
                "age": "1 year",
                "gender": "Female",
                "category": "birds",
                "image": "img/birds/bird02.jpg",
                "description": "Cheerful singer with a beautiful yellow coat."
            },
            {
                "id": 13,
                "name": "Rio",
                "breed": "Cockatiel",
                "age": "2 years",
                "gender": "Male",
                "category": "birds",
                "image": "img/birds/bird01.jpg",
                "description": "Friendly and social, loves to whistle and interact with people."
            }
        ],
        "capybaras": [
            {
                "id": 9,
                "name": "Cappy",
                "breed": "Capybara",
                "age": "2 years",
                "gender": "Male",
                "category": "capybaras",
                "image": "img/capybaras/capybara01.jpg",
                "description": "Gentle giant who loves water and relaxing in the sun."
            },
            {
                "id": 10,
                "name": "Bara",
                "breed": "Capybara",
                "age": "3 years",
                "gender": "Female",
                "category": "capybaras",
                "image": "img/capybaras/capybara02.jpg",
                "description": "Calm and peaceful, great with other animals and children."
            }
        ]
    };
}


function createPetCard(pet) {
    const categoryEmojis = {
        dogs: '🐕',
        cats: '🐱',
        birds: '🦜',
        capybaras: '🦫'
    };

    return `
        <div class="pet-card" data-category="${pet.category}" data-id="${pet.id}">
            <div class="photo-frame">
                <img src="${pet.image}" 
                     alt="${pet.name} - ${pet.breed}" 
                     onerror="this.src='https://via.placeholder.com/400x300/3498db/ffffff?text=${encodeURIComponent(pet.name)}'">
            </div>
            <div class="pet-info">
                <div class="pet-name">${categoryEmojis[pet.category] || '🐾'} ${pet.name}</div>
                <div class="pet-details">
                    <span><strong>Breed:</strong></span>
                    <span>${pet.breed}</span>
                </div>
                <div class="pet-details">
                    <span><strong>Age:</strong></span>
                    <span>${pet.age}</span>
                </div>
                <div class="pet-details">
                    <span><strong>Gender:</strong></span>
                    <span>${pet.gender}</span>
                </div>
                <button class="adopt-btn" onclick="adoptPet('${pet.name}', ${pet.id})">
                    💝 Adopt Me
                </button>
            </div>
        </div>
    `;
}


function renderFeaturedPets() {
    const container = document.getElementById('featured-pets');
    
    if (!container) {
        console.error('Featured pets container not found');
        return;
    }

    if (petsData.featured && petsData.featured.length > 0) {
        container.innerHTML = petsData.featured.map(pet => createPetCard(pet)).join('');
        

        const cards = container.querySelectorAll('.pet-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    } else {
        container.innerHTML = '<div class="loading">No featured pets available at the moment</div>';
    }
}


function renderAllPets() {
    const container = document.getElementById('all-pets-container');
    
    if (!container) {
        console.error('All pets container not found');
        return;
    }

    let html = '';

    const categoryTitles = {
        dogs: '🐕 Dogs - Man\'s Best Friends',
        cats: '🐱 Cats - Purr-fect Companions', 
        birds: '🦜 Birds - Feathered Friends',
        capybaras: '🦫 Capybaras - Gentle Giants'
    };


    Object.keys(categoryTitles).forEach(category => {
        if (petsData[category] && petsData[category].length > 0) {
            html += `
                <h3 class="category-title">${categoryTitles[category]}</h3>
                <div class="pets-grid" data-category="${category}">
                    ${petsData[category].map(pet => createPetCard(pet)).join('')}
                </div>
            `;
        }
    });

    if (html) {
        container.innerHTML = html;
        

        const allCards = container.querySelectorAll('.pet-card');
        allCards.forEach((card, index) => {
            card.style.animationDelay = `${(index % 3) * 0.1}s`;
        });
    } else {
        container.innerHTML = '<div class="loading">No pets available at the moment</div>';
    }
}


function showSection(sectionName) {

    const homeSection = document.querySelector('.home-section');
    const petsSection = document.querySelector('.pets-section');
    const contactSection = document.querySelector('.contact-section');
    

    if (homeSection) homeSection.classList.add('hidden');
    if (petsSection) petsSection.classList.remove('active');
    if (contactSection) contactSection.style.display = 'none';
    

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    

    switch(sectionName) {
        case 'home':
            if (homeSection) homeSection.classList.remove('hidden');
            const homeLink = document.querySelector('a[href="#home"]');
            if (homeLink) homeLink.classList.add('active');
            break;
            
        case 'pets':
            if (petsSection) petsSection.classList.add('active');
            const petsLink = document.querySelector('a[href="#pets"]');
            if (petsLink) petsLink.classList.add('active');
            break;
            
        case 'contact':
            if (contactSection) contactSection.style.display = 'block';
            const contactLink = document.querySelector('a[href="#contact"]');
            if (contactLink) contactLink.classList.add('active');
            break;
    }
}
