const urls = [
    'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=065b7489d40a98c7cd0042e31537f36a',
    'https://api.themoviedb.org/3/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=065b7489d40a98c7cd0042e31537f36a',
    'https://api.themoviedb.org/3/discover/movie?with_genres=28&primary_release_year=2022&api_key=065b7489d40a98c7cd0042e31537f36a'
];

window.addEventListener('DOMContentLoaded', async () => {
    const responses = await Promise.all(urls.map(url => fetch(url)));
    const catalogos = await Promise.all(responses.map(response => response.json()));
    const [catalogoUno, catalogoDos, catalogoTres] = catalogos;

    function createCarouselItems(catalogo, containerId) {
        const container = document.getElementById(containerId);
        const chunkSize = 6;
        for (let i = 0; i < catalogo.results.length; i += chunkSize) {
            const chunk = catalogo.results.slice(i, i + chunkSize);
            const carouselItem = document.createElement('div');
            carouselItem.classList.add('carousel-item', i === 0 && 'active');
            const row = document.createElement('div');
            row.classList.add('row');
            chunk.forEach(pelicula => {
                const col = document.createElement('div');
                col.classList.add('col-md-2');
                const img = document.createElement('img');
                img.src = `https://image.tmdb.org/t/p/original/${pelicula.poster_path}`;
                img.classList.add('d-block', 'w-100');
                col.appendChild(img);
                row.appendChild(col);
            });
            carouselItem.appendChild(row);
            container.appendChild(carouselItem);
        }
    }

    createCarouselItems(catalogoUno, 'populares');
    createCarouselItems(catalogoDos, 'estreno');
    createCarouselItems(catalogoTres, 'vistas');

    const forms = document.querySelectorAll('.needs-validation');
    forms.forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });

    const registerForm = document.getElementById('registerForm');
    const password = document.getElementById('registerPassword');
    const confirmPassword = document.getElementById('registerConfirmPassword');

    registerForm.addEventListener('submit', function (event) {
        if (password.value !== confirmPassword.value) {
            confirmPassword.setCustomValidity('Las contraseñas no coinciden.');
            event.preventDefault();
            event.stopPropagation();
        } else {
            confirmPassword.setCustomValidity('');
        }
    });

    password.addEventListener('input', function () {
        confirmPassword.setCustomValidity('');
    });
    confirmPassword.addEventListener('input', function () {
        if (password.value !== confirmPassword.value) {
            confirmPassword.setCustomValidity('Las contraseñas no coinciden.');
        } else {
            confirmPassword.setCustomValidity('');
        }
    });
});

