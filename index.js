const produtos = {
  salgados: {
    coxinha: { img: "imagens/coxinha.avif", cod: 1.1, nome: "Coxinha de Frango", preco: 6 },
    bolinho_carne: { img: "imagens/bolinho_carne.jpg", cod: 1.2, nome: "Bolinho de Carne", preco: 6 },
    maravilha: { img: "imagens/maravilha.jpg", cod: 1.3, nome: "Maravilha", preco: 6 }
  },
  doces: {
    mousse: { img: "imagens/mousse.jpg", cod: 2.1, nome: "Mousse de Maracujá", preco: 3.5 },
    brigadeiro: { img: "imagens/brigadeiro.avif", cod: 2.2, nome: "Brigadeirão", preco: 4 },
    pudim: { img: "imagens/pudim.avif", cod: 2.3, nome: "Pudim de Leite", preco: 4.5 }
  },
  bebidas: {
    coca: { img: "imagens/cocacola.png", cod: 3.1, nome: "Coca-Cola 600ml", preco: 6.5 },
    soda: { img: "imagens/soda.jpeg", cod: 3.2, nome: "Soda 600ml", preco: 6 },
    agua: { img: "imagens/agua.png", cod: 3.3, nome: "Água Mineral 310ml", preco: 2.39 }
  }
}

const criarItemCardapio = (item) => {
  const div = document.createElement("div")
  div.style.border = "1px solid green"
  div.style.padding = "5px"
  div.style.margin = "15px"
  div.style.width = "25%"
  div.style.borderRadius = "10px"
  div.style.display = "flex"
  div.style.flexDirection = "column"
  div.style.justifyContent = "space-around"
  div.style.alignItems = "center"

  const imagem = document.createElement("img")
  imagem.src = item.img
  imagem.style.width = "60%"
  div.appendChild(imagem)

  const nome = document.createElement("p")
  nome.textContent = item.nome
  div.appendChild(nome)

  const preco = document.createElement("p")
  preco.textContent = `R$${item.preco.toFixed(2)}`
  div.appendChild(preco)

  const botao = document.createElement("button")
  botao.textContent = "Adc a Comanda"
  botao.style.backgroundColor = "lightgreen"
  botao.style.border = "1px solid rgba(0, 0, 0, 0.5)"
  botao.style.color = "black"
  botao.style.padding = "5px"
  botao.onclick = () => { adcComanda(item.cod) }
  div.appendChild(botao)

  return div
}

const gerar = (categoria) => {
  const cardapio = document.getElementById('conteudo_cardapio')
  cardapio.style.display = "flex"
  cardapio.style.flexWrap = "wrap"
  cardapio.style.height = "70%"
  cardapio.style.overflowY = "auto"
  cardapio.style.overflowX = "hidden"
  cardapio.innerHTML = ''

  let categorias = []

  if (categoria === 'todos') {
    for (const grupo of Object.values(produtos)) {
      for (const item of Object.values(grupo)) {
        categorias.push(item)
      }
    }
  } else {
    const grupo = produtos[categoria]
    if (grupo) {
      for (const item of Object.values(grupo)) {
        categorias.push(item)
      }
    }
  }

  for (const item of categorias) {
    const div = criarItemCardapio(item)
    cardapio.appendChild(div)
  }
}

let comanda = []

const criarItemComanda = (item) => {
  const div = document.createElement("div")
  div.style.display = "flex"
  div.style.justifyContent = "space-around"
  div.style.alignItems = "center"
  div.style.padding = "10px"
  div.style.marginBottom = "10px"
  div.style.border = "1px solid green"
  div.style.borderRadius = "8px"

  const produtoInfo = document.createElement("p")
  produtoInfo.textContent = `Cod: ${item.cod} | ${item.nome} | R$${item.preco.toFixed(2)}`
  div.appendChild(produtoInfo)

  const botaoRemover = document.createElement("button")
  botaoRemover.textContent = "Remover"
  botaoRemover.style.padding = "5px"
  botaoRemover.onclick = () => removerItem(item.cod)
  div.appendChild(botaoRemover)

  return div
}

const atualizarComanda = () => {
  const conteudo = document.getElementById("conteudo_comanda")
  conteudo.innerHTML = ""

  conteudo.style.display = "flex"
  conteudo.style.flexDirection = "column"
  conteudo.style.justifyContent = "space-between"
  conteudo.style.height = "80%"

  const listaItens = document.createElement("div")
  listaItens.style.flex = "1"
  listaItens.style.overflowY = "auto"

  let total = 0
  comanda.forEach(item => {
    const itemDiv = criarItemComanda(item)
    listaItens.appendChild(itemDiv)
    total += item.preco
  })

  conteudo.appendChild(listaItens)

  const rodape = document.createElement("div")
  rodape.style.marginTop = "15px"
  rodape.style.borderTop = "1px solid gray"
  rodape.style.paddingTop = "10px"
  rodape.style.display = "flex"
  rodape.style.flexDirection = "column"
  rodape.style.alignItems = "center"

  const totalEl = document.createElement("p")
  totalEl.textContent = `Total: R$${total.toFixed(2)}`
  rodape.appendChild(totalEl)

  const botoes = document.createElement("div")
  botoes.style.display = "flex"
  botoes.style.gap = "15px"
  botoes.style.marginTop = "10px"

  const cancelar = document.createElement("button")
  cancelar.textContent = "Cancelar"
  cancelar.onclick = cancelarComanda
  botoes.appendChild(cancelar)

  const finalizar = document.createElement("button")
  finalizar.textContent = "Finalizar"
  finalizar.onclick = finalizarComanda
  botoes.appendChild(finalizar)

  rodape.appendChild(botoes)
  conteudo.appendChild(rodape)
}

const adcComanda = (cod) => {
  for (const grupo of Object.values(produtos)) {
    for (const item of Object.values(grupo)) {
      if (item.cod === cod) {
        comanda.push(item)
        atualizarComanda()
        return
      }
    }
  }
}

const removerItem = (cod) => {
  const index = comanda.findIndex(item => item.cod === cod)
  if (index !== -1) {
    comanda.splice(index, 1)
    atualizarComanda()
  }
}

const cancelarComanda = () => {
  comanda = []
  atualizarComanda()
}

const finalizarComanda = () => {
  let total = 0
  for (let i = 0; i < comanda.length; i++) {
    total += comanda[i].preco
  }
  alert(`Comanda finalizada com ${comanda.length} itens. Total: R$${total.toFixed(2)}`)
  comanda = []
  atualizarComanda()
}
