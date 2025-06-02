const cardapioProdutos = {
  salgados: {
    coxinha: { img: "imagens/coxinha.png", cod: 1.1, nome: "Coxinha de Frango", preco: 6 },
    bolinhoCarne: { img: "imagens/bolinho_carne.png", cod: 1.2, nome: "Bolinho de Carne", preco: 6 },
    maravilha: { img: "imagens/maravilha.png", cod: 1.3, nome: "Maravilha", preco: 6 }
  },
  doces: {
    mousseMaracuja: { img: "imagens/mousse.png", cod: 2.1, nome: "Mousse de Maracujá", preco: 3.5 },
    brigadeirao: { img: "imagens/brigadeiro.png", cod: 2.2, nome: "Brigadeirão", preco: 4 },
    pudimLeite: { img: "imagens/pudim.png", cod: 2.3, nome: "Pudim de Leite", preco: 4.5 }
  },
  bebidas: {
    cocaCola: { img: "imagens/cocacola.png", cod: 3.1, nome: "Coca-Cola 600ml", preco: 6.5 },
    soda: { img: "imagens/soda.png", cod: 3.2, nome: "Soda 600ml", preco: 6 },
    aguaMineral: { img: "imagens/agua.png", cod: 3.3, nome: "Água Mineral 310ml", preco: 2.39 }
  }
}

const elementoBoxPrincipal = document.getElementById("box_principal")
const elementoCardapioCaixa = document.getElementById("cardapio_caixa")
const elementoComandaCaixa = document.getElementById("comanda_caixa")
const elementoConteudoCardapio = document.getElementById('conteudo_cardapio')
const elementoConteudoComanda = document.getElementById("conteudo_comanda")
const botoesCategoria = document.querySelectorAll('.lista_botoes li')

let listaComanda = []

function adicionarEfeitoHover(elemento, classeCSS) {
  elemento.addEventListener("mouseenter", () => elemento.classList.add(classeCSS))
  elemento.addEventListener("mouseleave", () => elemento.classList.remove(classeCSS))
}

adicionarEfeitoHover(elementoBoxPrincipal, "sombra")
adicionarEfeitoHover(elementoCardapioCaixa, "borda")
adicionarEfeitoHover(elementoComandaCaixa, "borda")

function criarItemCardapio(item) {
  const containerItem = document.createElement("div")
  containerItem.classList.add("cardapio_item_caixa")

  const imagemItem = document.createElement("img")
  imagemItem.src = item.img
  imagemItem.style.width = "60%"
  containerItem.appendChild(imagemItem)

  const nomeItem = document.createElement("p")
  nomeItem.textContent = item.nome
  containerItem.appendChild(nomeItem)

  const precoItem = document.createElement("p")
  precoItem.textContent = `R$${item.preco.toFixed(2)}`
  containerItem.appendChild(precoItem)

  const botaoAdicionar = document.createElement("button")
  botaoAdicionar.textContent = "Adc a Comanda"
  botaoAdicionar.classList.add("botao_cardapio_add")
  botaoAdicionar.onclick = () => adicionarProdutoComanda(item.cod)
  containerItem.appendChild(botaoAdicionar)

  return containerItem
}

function gerarCardapio(categoria) {
  elementoConteudoCardapio.classList.add("conteudo_cardapio")
  elementoConteudoCardapio.innerHTML = ""

  const listaItens = []

  if (categoria === 'todos') {
    Object.values(cardapioProdutos).forEach(grupoProdutos => {
      listaItens.push(...Object.values(grupoProdutos))
    })
  } else if (cardapioProdutos[categoria]) {
    listaItens.push(...Object.values(cardapioProdutos[categoria]))
  }

  listaItens.forEach(item => {
    const elementoItem = criarItemCardapio(item)
    elementoConteudoCardapio.appendChild(elementoItem)
  })
}

function tratarCliqueCategoria(evento) {
  const categoriaSelecionada = evento.target.dataset.categoria
  botoesCategoria.forEach(botao => botao.classList.remove('ativo'))
  evento.target.classList.add('ativo')
  gerarCardapio(categoriaSelecionada)
}

botoesCategoria.forEach(botao => botao.addEventListener('click', tratarCliqueCategoria))

function criarItemComanda(item) {
  const containerComanda = document.createElement("div")
  containerComanda.classList.add("comanda_item_caixa")

  const codigo = document.createElement("p")
  codigo.textContent = item.cod
  containerComanda.appendChild(codigo)

  const nome = document.createElement("p")
  nome.textContent = item.nome
  containerComanda.appendChild(nome)

  const precoUnitario = document.createElement("p")
  precoUnitario.textContent = `R$${item.preco.toFixed(2)}`
  containerComanda.appendChild(precoUnitario)

  const quantidade = document.createElement("p")
  quantidade.textContent = item.quantidade
  containerComanda.appendChild(quantidade)

  const precoTotal = document.createElement("p")
  precoTotal.textContent = `R$${(item.preco * item.quantidade).toFixed(2)}`
  containerComanda.appendChild(precoTotal)

  const botaoRemover = document.createElement("button")
  botaoRemover.textContent = "Remover"
  botaoRemover.style.padding = "5px"
  botaoRemover.onclick = () => removerProdutoComanda(item.cod)
  containerComanda.appendChild(botaoRemover)

  return containerComanda
}

function adicionarProdutoComanda(codigoProduto) {
  for (const grupoProdutos of Object.values(cardapioProdutos)) {
    for (const produto of Object.values(grupoProdutos)) {
      if (produto.cod === codigoProduto) {
        const pedidoExistente = listaComanda.find(pedido => pedido.cod === codigoProduto)
        if (pedidoExistente) {
          pedidoExistente.quantidade++
          pedidoExistente.valorTotal = pedidoExistente.preco * pedidoExistente.quantidade
        } else {
          listaComanda.push({
            cod: produto.cod,
            nome: produto.nome,
            preco: produto.preco,
            quantidade: 1,
            valorTotal: produto.preco
          })
        }
        atualizarComanda()
        return
      }
    }
  }
}

function removerProdutoComanda(codigoProduto) {
  const indice = listaComanda.findIndex(item => item.cod === codigoProduto)
  if (indice !== -1) {
    if (listaComanda[indice].quantidade > 1) {
      listaComanda[indice].quantidade--
    } else {
      listaComanda.splice(indice, 1)
    }
    atualizarComanda()
  }
}

function atualizarComanda() {
  elementoConteudoComanda.innerHTML = ""

  const containerItens = document.createElement("div")
  containerItens.style.height = "250px"
  containerItens.style.overflowY = "auto"
  containerItens.style.overflowX = "hidden"
  containerItens.classList.add("lista_itens")

  const linhaCabecalho = document.createElement("div")
  linhaCabecalho.classList.add("comanda_item_caixa")

  const colCod = document.createElement("p")
  colCod.textContent = "Código"
  linhaCabecalho.appendChild(colCod)

  const colNome = document.createElement("p")
  colNome.textContent = "Nome"
  linhaCabecalho.appendChild(colNome)

  const colPrecoUnit = document.createElement("p")
  colPrecoUnit.textContent = "Unit."
  linhaCabecalho.appendChild(colPrecoUnit)

  const colQuantidade = document.createElement("p")
  colQuantidade.textContent = "Quant"
  linhaCabecalho.appendChild(colQuantidade)

  const colPrecoTotal = document.createElement("p")
  colPrecoTotal.textContent = "Total"
  linhaCabecalho.appendChild(colPrecoTotal)

  const teste = document.createElement("p")
  teste.textContent = ""
  linhaCabecalho.appendChild(teste)

  containerItens.appendChild(linhaCabecalho)

  let totalComanda = 0
  listaComanda.forEach(item => {
    containerItens.appendChild(criarItemComanda(item))
    totalComanda += item.valorTotal
  })

  elementoConteudoComanda.appendChild(containerItens)

  const containerRodape = document.createElement("div")
  containerRodape.classList.add("comanda_rodape_caixa")

  const textoTotal = document.createElement("p")
  textoTotal.textContent = `Total: R$${totalComanda.toFixed(2)}`
  containerRodape.appendChild(textoTotal)

  const botaoFinalizar = document.createElement("button")
  botaoFinalizar.textContent = "Finalizar Pedido"
  botaoFinalizar.onclick = finalizarComanda
  containerRodape.appendChild(botaoFinalizar)

  const botaoLimpar = document.createElement("button")
  botaoLimpar.textContent = "Limpar Comanda"
  botaoLimpar.onclick = () => {
    listaComanda = []
    atualizarComanda()
  }
  containerRodape.appendChild(botaoLimpar)

  elementoConteudoComanda.appendChild(containerRodape)
}

function finalizarComanda() {
  let totalFinal = 0
  let quantidadeFinal = 0

  for (const item of listaComanda) {
    totalFinal += item.preco * item.quantidade
    quantidadeFinal += item.quantidade
  }

  alert(`Comanda finalizada com ${quantidadeFinal} itens. Total: R$${totalFinal.toFixed(2)}`)
  listaComanda = []
  atualizarComanda()
}

gerarCardapio('todos')
botoesCategoria.forEach(botao => {
  if (botao.dataset.categoria === 'todos') {
    botao.classList.add('ativo')
  } else {
    botao.classList.remove('ativo')
  }
})