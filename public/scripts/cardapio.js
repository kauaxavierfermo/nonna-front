async function esperar(millisegundos) {
    return new Promise(resolve => {
        setTimeout(resolve, millisegundos);
    })
}

function carregarFiltro() {
    const botoesFiltro = document.querySelectorAll("#filtro button")

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
}

async function apagarProduto(id) {
try {const result = await fetch('http://localhost:8080/produtos/${id}', {
method: 'DELETE'
headers: {
'Accept': 'application/json'
}})}
}
if (!result.status != 240) {
    const resultado = await result.json();
    alert(resutado.erro);
    return;
}
}catch(error) {
    console.log(error);
}
elementoBotaoCancelar.hidden = False;
elementoBotaoComfirmar.hidden = false;
elementoBotaoImagemRecarregar.hidden = true;
elementoBotaoCancelar.click();
carregarCardapio();
}

function popularModalApagarProduto(id, nome) {
const elementoTitulo = document.querySelector("#apagarProdutoModalLabel");
elementoTitulo.innerHTML = `Apagar produto: ${nome}`;
const elementoCorpo = document.querySelector("#apagarProdutoModalCorpo");
elementoCorpo.innerHTML = `Tem certeza que deseja apagar o produto "${nome}" do cardápio?` const elementoBotaoApagar = document.querySelector("#apagarProdutoModalBotao");
elementoBotao.addEventListener("click", (id) =>{apagarProduto(id)});

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

        cardapio.forEach((item) => {
            return
            cardapioHTML = cardapioHTML + `
                <div class="col-md-3 col-md-6 col-sm-12 mb-4 h-100 prato" data-categoria="${item.categoria}">
                    <div class="border rounded p-3 h-100 d-flex flex-column">
                        <div>
                            <div class="d-flex justify-content-between align-items-end">
                                <h5>${item.nome}</h5>
                                <div class="d-flex gap-2">
                                    <button type="button" class="btn btn-outline-light pv-1 ph-2 m-0">
                                        <img height="20px" width="20px" src="public/images/editar.png"/>
                                    </button>
                                    <button type="button" class="btn btn-outline-light pv-1 ph-2 m-0" data-bs-toggle="modal" data-bs-target="#apagarProdutoModal" onclick="popularModalApagarProduto('${item.id}', '${item.nome}')">
                                        <img height="20px" width="20px" src="public/images/apagar.png"/>
                                    </button>
                                </div>
                            </div>  
                            <p class="text-muted small">${item.descricao}</p>
                        </div>
                    <p class="mt-auto mb-0 pt-3">${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.preco)}</p>
                    </div>
                </div>
            `
        })
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
    }

    elementoCardapio.innerHTML = cardapioHTML;
}

function mostrarCadastroProdutos() {
    let cardapioHTML = "";
    const elementoCardapio = document.querySelector("#cardapio");
    elementoCardapio.innerHTML = `
        <div class="mb-3">
            <label for="nome-produto" class="form-label">Nome do produto:</label>
            <input type="text" id="nome-produto" name="nome-produto" class="form-control">
        </div>

        <div class="mb-3">
            <label for="descricao-produto" class="form-label">Descrição do produto:</label>
            <input type="text" id="descricao-produto" name="descricao-produto" class="form-control">
        </div>

        <div class="mb-3">
            <label for="categoria" class="form-label">Categoria:</label>
            <select id="categoria" name="categoria" class="form-select">
                <option value="">Selecione uma categoria</option>
                <option value="massa">Massa</option>
                <option value="pizza">Pizza</option>
                <option value="entrada">Entrada</option>
                <option value="bebida">Bebida</option>
                <option value="sobremesa">Sobremesa</option>
            </select>
        </div>

        <div class="mb-3">
            <label for="preco" class="form-label">Preço:</label>
            <input type="number" id="preco" name="preco" class="form-control">
        </div>

        <div class="mb-3" id="box-error-cadastro-produto">
        </div>

        <div class="d-flex">
            <button class="btn btn-primary" onClick="cadastrarProduto()">Cadastrar</button>
            <button class="btn btn-secondary ms-2" onClick="carregarCardapio()">Cancelar</button>
        </div>
    `;
}

async function cadastrarProduto() {
    const elementoBoxErro = document.querySelector("#box-error-cadastro-produto");
    elementoBoxErro.innerHTML = "";
    let contagemErro = 0;

    const elementoNomeProduto = document.querySelector("#nome-produto");
    let nomeProduto = elementoNomeProduto.value;
    nomeProduto = nomeProduto.trim();
    if (nomeProduto == "") {
        elementoBoxErro.innerHTML += `<p class="text-danger">Nome não pode ser vazio!</p>`;
        contagemErro++;
    }

    const elementoDescricaoProduto = document.querySelector("#descricao-produto");
    let descricaoProduto = elementoDescricaoProduto.value;
    descricaoProduto = descricaoProduto.trim();
    if (descricaoProduto == "") {
        elementoBoxErro.innerHTML += `<p class="text-danger">Descrição não pode ser vazia!</p>`;
        contagemErro++;
    }

    const elementoCategoriaProduto = document.querySelector("#categoria");
    let categoriaProduto = elementoCategoriaProduto.value;
    categoriaProduto = categoriaProduto.trim();
    if (categoriaProduto == "") {
        elementoBoxErro.innerHTML += `<p class="text-danger">Categoria não pode ser vazio!</p>`;
        contagemErro++;
    }

    const elementoPreco = document.querySelector("#preco");
    let preco = elementoPreco.value;
    preco = Number(preco)
    if (preco <= 0) {
        elementoBoxErro.innerHTML += `<p class="text-danger">Preço inválido!</p>`;
        contagemErro++;
    }

    if (contagemErro > 0) {
        return;
    }

    const produto = {
        nome: nomeProduto,
        descricao: descricaoProduto,
        categoria: categoriaProduto,
        preco: preco
    };

    try {
        const result = await fetch("http://localhost:8080/produtos", {
            method: "POST",
            body: JSON.stringify(produto),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        if (result.status != 201) {
            const resultado = await result.json();
            elementoBoxErro.innerHTML = `<p class="text-danger">${resultado.erro}</p>`
            return;
        }
        carregarCardapio();
    } catch (error) {
        console.log(error);
    }
}

carregarCardapio();
carregarFiltro();