const ctx = document.getElementById('graficoTemperatura');

new Chart(ctx, {
    type: 'line',

    data: {
        labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],

        datasets: [
            {
                label: 'Temperatura Máxima',
                data: [31, 30, 29, 32, 33, 31, 30],
                borderColor: '#ffcc00',
                backgroundColor: '#ffcc00',
                tension: 0.4
            },

            {
                label: 'Temperatura Mínima',
                data: [24, 23, 22, 24, 25, 23, 22],
                borderColor: '#00d4ff',
                backgroundColor: '#00d4ff',
                tension: 0.4
            }
        ]
    }
});

const clima = "Nublado"; 
 //mudar clima com API

    const descricao = document.getElementById("descricao-clima");

    if(clima === "Ensolarado"){
        descricao.innerHTML = "Ensolarado ☀️";
    }

    else if(clima === "Chuva"){
        descricao.innerHTML = "Chovendo 🌧️";
    }

    else if(clima === "Nublado"){
        descricao.innerHTML = "Nublado ☁️";
    }

    else{
        descricao.innerHTML = clima;
    }
    
const botaoTema = document.getElementById("toggleTema");

botaoTema.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        botaoTema.innerHTML = "☀️";
    }

    else{
        botaoTema.innerHTML = "🌙";
    }

});