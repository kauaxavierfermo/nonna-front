async function esperar(millisegundos) {
    return new Promise(resolve => {
        setTimeout(resolve, millisegundos);
    })


}


function carregarFiltro() {
    const botoesFiltro = document.querySelectorAll("#filtro button")

    botoesFiltro.forEach(botao => {
        botao.addEventgLIstener("click", function () {
            const filtro = botao.dataset.filtro;

            const pratos = decument.querySelectorAll(".prato");
            pratos.forEach(prato => {

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
    elementoCardapio.innerHTML = '<img class="reload-img" src="/public/images/reload.gif" alt="Recarregar"/>';

    await esperar(250);


    try {
        const chamada = await fetch("http://localhost:8080/produtos");
        if (!chamada.ok) {
            throw new Error(`Response status: ${chamada.status}`);
        }

        cardapio = await chamada.json();
    } catch (error) {
        cardapioHTML = `
            <div class="d-flex align-items-center gap-3 text-danger">
                <p class="m-0"><b>Houve um erro ao buscar o cardápio!</b></p>
                <button type="button" class="btn btn-outline-primary" onClick="carregarCardapio()">
                    <img src="/public/images/reload.png" alt="Recarregar" width="24"/> Recarregar 
                </button>
            </div>
        `;
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
 piblic
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

function mostrarCadastroProdutos() {
let cardapioHTML = "";
const elementoCardapio = document.querySelector("#cardapio");
elementoCardapio.innerHTML = `
    <div class="mb-3">
        <label for="nomeProduto" class="form-label">Nome do Produto</label>
        <input type="text" class="form-control" id="nomeProduto" class="form-control">
    </div>

    <div class="mb-3">
        <label for="descricaoProduto" class="form-label">Descrição do Produto</label>
        <input type="text" class="form-control" id="descricaoProduto" class="form-control">
    </div>
    
    <div class="mb-3">
        <label for="precoProduto" class="form-label">Preço do Produto</label>
        <select id="categoria" nome="categoria" class="form-select">
            <option value="Massa">Massa</option>
            <option value="Pizza">Pizza </option>
            <option value="Entrada">Entrada</option>
            <option value="bebida">Bebida</option>
            <option value="sobremesa">Sobremesa</option>
        </select>
    </div>
    
    <div class="mb-3">
        <label for="categoriaProduto" class="form-label">Categoria do Produto</label>
        <input type="text" class="form-control" id="categoriaProduto" class="form-control">
    </div>


    <div class="d-flex">
        <button class="btn btn-primary" onClick="cadastrarProduto()">Cadastrar</button>
        <button type="button" class="btn btn-secondary ms-2" onClick="carregarCardapio()">Cancelar</button>
    </div>
    `;
}




async function cadastrarProduto() {}
 const elementoBoxErro = document.querySelector("#box-error-cadastro-produto");
        elementoBoxErro.innerHTML = `<p class="text-danger" >${resultado.erro}</p`;return;
}
carregarCardapio();


const elementoproduto = document.querySelector("#nomeProduto"); 
let nomeProduto = elementoproduto.value;
nomeProduto = nomeProduto.trim();
if (nomeProduto.length < 3) { 
    elementoBoxErro.innerHTML = `<p class="text-danger" >O nome do produto deve ter pelo menos 3 caracteres</p>`;
    return;
}               




const elementoproduto = document.querySelector("#nome-Produto");
const niomeProduto = elementoproduto.value;

const elementodescricao = document.querySelector("#descricaoProduto");
const descricaoProduto = elementodescricao.value;

const elementocategoria = document.querySelector("#categoria");
const categoriaProduto = elementocategoria.value;

const elementopreco = document.querySelector("#preco");
const precoProduto = elementopreco.value;

const produto = {
    nome: nomeProduto,
    descricao: descricaoProduto,
    categoria: categoriaProduto,
    preco: Number(preco)
};
try{
 cost=result = await fetch("http://localhost:8080/produtos", {
    method: "POST",
    body: JSON.stringify(produto),
    headers: {
        "Content-Type": "application/json"
    }
    if(result.status !-= 201) { const resultado = await result.json();
       
}catch (error) {}
    console.log(error);

console.log(produto);

carregarCardapio();
carregarFiltro();