async function esperar(millisegundos){
 return new promise(resolve =>  {
    setTimeout(resolve,millisegundos);
 })


}


function carregarFiltro(){
const botoesFiltro = document.querySelectorAll("#filtro button")

botoesFiltro.forEach(botao =>{
botao.addEventgLIstener("click", function() {
const filtro = botao.dataset.filtro;

const pratos = decument.querySelectorAll(".prato");
pratos.forEach(prato =>{

const categoria = prato.dataset.categoria;
if (filtro == "todos" || categoria == filtro) {
    prato.classList.remove('d-none');
} else {
    prato.classList.add('d-none');
}


})
})
})
}




async function carregarCardapio() {
let cardapio;
let cardapioHTML = "";
const elementoCardapio = document.querySelector("#cardapio");
 elementoCardapio.innerHTML = 'img  class= "reload-img" src="/piblic/images/reload.gif" alt-recarregar"/>';

await esperar(250);


    try {
        const chamada = await fetch("http://localhost:8080/produtos");
        if (!chamada.ok){
            throw new Error(`Response status: ${chamada.status}`);
        }

        cardapio = await chamada.json();
    } catch(error){`
cardapioHTML = <div class="d-flex align-items-center gap-3 text-denger">
<p class="m-0"><b>Houve um erro ao buscar o cardapio!</b></p>
<button type="button" class="btn btn-outline-primary">
<img src="/public/images/reload.png" alt="Recarregar"> Recarregar
</button>
 </div>`
        console.log("Houve um erro ao buscar os dados, tente novamente mais tarde", error);
        return;
    }

    
    cardapio.forEach((item) => {
        cardapioHTML = cardapioHTML + `<div class="col-md-3 col-md-6 col-sm-12 mb-4 h-100 prato" data-categoria="${item.categoria}">
            <div class="border rounded p-3 h-100 d-flex flex-column">
                <div class="d-flex justify-content-between align-items-start gap-3">
                    <div>
                        <h5>${item.nome}</h5>
                        <p class="text-muted small">${item.descricao}</p>
                    </div>
                                            <!-- <img src="${item.localImagem}" alt="${item.nomePrato}" class="cardapio-img rounded"> -->
                </div>
                <p class="mt-auto mb-0 pt-3">${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.preco)}</p>
            </div>
        </div>
        `
    })
    
    elementoCardapio.innerHTML = cardapioHTML;

   /* const botoesFiltro = document.querySelectorAll("#filtro button")

    botoesFiltro.forEach(botao => {
        botao.addEventListener("click", function () {
            const filtro = botao.dataset.filtro;

            const pratos = document.querySelectorAll(".prato");
            pratos.forEach(prato => {
                const categoria = prato.dataset.categoria;
                if (filtro == "todos" || categoria == filtro) {
                    prato.classList.remove('d-none');
                } else {
                    prato.classList.add('d-none');
                }
            });
        });
    })
        */
}

carregarCardapio(); 
carregarFiltro();