var map, heatLayer;
var heatData = [];

// Função para converter CEP em coordenadas geográficas usando a API Nominatim
function geocodeAddress(cep) {
    // URL da API de geocodificação Nominatim
    var url = `https://nominatim.openstreetmap.org/search?format=json&postalcode=${cep}&country=Brazil`;

    // Requisição HTTP GET para a API Nominatim
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                // A API Nominatim retorna uma lista de resultados, usaremos o primeiro resultado
                var latitude = parseFloat(data[0].lat);
                var longitude = parseFloat(data[0].lon);
                // Adiciona as coordenadas ao heatData
                heatData.push([latitude, longitude]);
                // Atualiza o heatmap
                heatLayer.setLatLngs(heatData);
            } else {
                console.error("Nenhum resultado encontrado para o CEP fornecido.");
            }
        })
        .catch(error => {
            console.error("Erro ao converter CEP em coordenadas:", error);
        });
}

// Função para encontrar crimes próximos com base nas coordenadas
function findCrimesNearby(latlng) {
    // Por enquanto, deixaremos esta função vazia para ser implementada posteriormente com os dados reais
    return [];
}


// Inicializar o mapa
function initMap() {
    map = L.map('map').setView([-8.067723535168673, -34.88879549118526], 20); // Coordenadas iniciais (São Paulo, Brasil)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map); // Adicionando um tile layer gratuito com atribuição

    heatLayer = L.heatLayer([], { radius: 25 }).addTo(map); // Adicionando camada de heatmap vazia

    // Configurar evento de envio do formulário
    var crimeForm = document.getElementById('crimeForm');
    crimeForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var crimeCEP = document.getElementById('crimeCEP').value;
        // Chama a função para converter CEP em coordenadas
        geocodeAddress(crimeCEP);
        // Limpar campos do formulário após o envio
        crimeForm.reset();
    });
}

// Chamar a função initMap assim que o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initMap);
