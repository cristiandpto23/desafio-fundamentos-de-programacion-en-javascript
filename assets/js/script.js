// JQuery evento click en el botón de búsqueda y captura del valor ingresado en el input
$(document).ready(function () {
    $('.btnSearch').on('click', function () {
        const superheroNumber = $('#inputSearch').val().trim();
        // Validación de que el valor ingresado sea un número
        if (!$.isNumeric(superheroNumber)) {
            alert('Código ingresado erróneo. Intente de nuevo');
            return;
        }
        //muestra la consulta a la API
        superHeroSearch(superheroNumber);
    });
});

// JQuery AJAX para consultar la API de SuperHero
function superHeroSearch(superheroNumber) {
    $.ajax({
        url: `https://www.superheroapi.com/api.php/ba82d9e7166a700ef4f04b48e3be8d2f/${superheroNumber}`,
        method: 'GET',
        success: function (data) {
            console.log(data);
            if (data.response === 'error') {
                alert('No hay información bajo ese número. Intenta con otro.');
            } else {
                superheroInfo(data);
            }
        },
        error: function () {
            alert('Error.');
        },
    });
}

// Función para mostrar el gráfico de poderes
function superheroChart(data) {
    const chart = new CanvasJS.Chart('chartContainer', {
        theme: 'light1',
        animationEnabled: true,
        title: {
            text: `Estadísticas de ${data.name}`,
        },
        data: [
            {
                // Gráfico de tipo pie
                type: 'pie',
                // Mostrar el valor entero en la tooltip
                toolTipContent: '<b>{name}</b>: {y}',
                // Mostrar el valor entero en el label
                indexLabel: '{name} - {y}',
                // Mostrar el valor entero en el label
                dataPoints: [
                    { y: data.powerstats.intelligence, name: 'intelligence' },
                    { y: data.powerstats.strength, name: 'strength' },
                    { y: data.powerstats.speed, name: 'velocity' },
                    { y: data.powerstats.durability, name: 'durability' },
                    { y: data.powerstats.power, name: 'power' },
                    { y: data.powerstats.combat, name: 'combat' },
                ],
            },
        ],
    });
    chart.render();
}
//console.log(data);

// Función para mostrar la información del SuperHero
function superheroInfo(data) {
    const superheroBox = $('#resultados');
    const total = `
            <h3>SuperHero Encontrado</h3>
            <hr>
            <div class="d-flex flex-column flex-md-row mb-5">
                <section class="card mb-3 col-md-7">
                    <div class="row">
                        <div class="col-md-5">
                            <img src="${data.image.url}" class="img-fluid">
                        </div>
                        <div class="col-md-7">
                            <div class="card-body">
                                <h5 class="card-title border-bottom pb-1">
                                    <span class="fst-italic">Nombre:</span> ${data.name}
                                </h5>
                                <p class="card-text">
                                    <h6 class="fst-italic">Conexiones:</h6>
                                    <span style="font-size:14px;">${data.connections['group-affiliation']}</span>
                                </p>
                                <p class="card-text border-bottom pb-1">
                                    <h6 class="fst-italic">Publicado por:</h6> 
                                    <span style="font-size:14px;">${data.biography.publisher}</span>
                                </p>
                                <p class="card-text border-bottom pb-1">
                                    <h6 class="fst-italic">Ocupación:</h6>
                                    <span style="font-size:14px;">${data.work.occupation}</span>
                                </p>
                                <p class="card-text border-bottom pb-1">
                                    <h6 class="fst-italic">Primera Aparición:</h6> 
                                    <span style="font-size:14px;">${data.biography['first-appearance']}</span>
                                </p>
                                <p class="card-text border-bottom pb-1">
                                    <h6 class="fst-italic">Altura:</h6> 
                                    <span style="font-size:14px;">${data.appearance['height'][1]}</span>
                                </p>
                                <p class="card-text border-bottom pb-1">
                                    <h6 class="fst-italic">Peso:</h6> 
                                    <span style="font-size:14px;">${data.appearance['weight'][1]}</span>
                                </p>
                                <p class="card-text border-bottom pb-1">
                                    <h6 class="fst-italic">Alias:</h6> 
                                    <span style="font-size:14px;">${data.biography['aliases']}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="col-md-5 col-12 mx-auto align-self-start">
                    <div id="chartContainer" style="height: 350px; width: 100%;"></div>
                </section>
            </div>
    `;

    // const chart = `
    //
    // `;

    superheroBox.html(total);
    superheroChart(data);
}
