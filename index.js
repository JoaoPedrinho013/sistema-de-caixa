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
// cardapio

const cardapio_caixa = document.getElementById("cardapio_caixa")

cardapio_caixa.addEventListener("mouseenter", () => {
  cardapio_caixa.classList.add("borda")
})
cardapio_caixa.addEventListener("mouseleave", () => {
  cardapio_caixa.classList.remove("borda")
})

const criarItemCardapio = (item) => {
  const div = document.createElement("div")
  div.classList.add("cardapio_item_caixa")

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
  botao.classList.add("botao_cardapio_add")
  botao.onclick = () => { adcComanda(item.cod) }
  div.appendChild(botao)

  return div
}

const gerar = (categoria) => {
  const cardapio = document.getElementById('conteudo_cardapio');
  cardapio.classList.add("conteudo_cardapio");
  cardapio.innerHTML = '';

  let categorias = [];

  if (categoria === 'todos') {
    for (const grupo of Object.values(produtos)) {
      for (const item of Object.values(grupo)) {
        categorias.push(item);
      }
    }
  } else {
    const grupo = produtos[categoria];
    if (grupo) {
      for (const item of Object.values(grupo)) {
        categorias.push(item);
      }
    }
  }

  for (const item of categorias) {
    const div = criarItemCardapio(item);
    cardapio.appendChild(div);
  }
};

const botoes = document.querySelectorAll('.lista_botoes li');
const opcao_clique = (event) => {
  const categoria = event.target.dataset.categoria;

  botoes.forEach(botao => botao.classList.remove('ativo'));

  event.target.classList.add('ativo');

  gerar(categoria);
}

botoes.forEach(botao => {
  botao.addEventListener('click', opcao_clique);
});


// Comandas

const comanda_caixa = document.getElementById("comanda_caixa")

comanda_caixa.addEventListener("mouseenter", () => {
  comanda_caixa.classList.add("borda")
})
comanda_caixa.addEventListener("mouseleave", () => {
  comanda_caixa.classList.remove("borda")
})

let comanda = []

const criarItemComanda = (item) => {
  const comanda_item_caixa = document.createElement("div")
  comanda_item_caixa.classList.add("comanda_item_caixa")

  const comanda_titulo_cd = document.createElement("p")
  comanda_titulo_cd.textContent = `CODIGO`
  comanda_item_caixa.appendChild(comanda_titulo_cd)
  const comanda_titulo_nm = document.createElement("p")
  comanda_titulo_nm.textContent = `PRODUTO`
  comanda_item_caixa.appendChild(comanda_titulo_nm)
  const comanda_titulo_vl = document.createElement("p")
  comanda_titulo_vl.textContent = `VALOR`
  comanda_item_caixa.appendChild(comanda_titulo_vl)

  const comanda_itens_cd = document.createElement("p")
  comanda_itens_cd.textContent = `${item.cod}`
  comanda_item_caixa.appendChild(comanda_itens_cd)
  const comanda_itens_nm = document.createElement("p")
  comanda_itens_nm.textContent = `${item.nome}`
  comanda_item_caixa.appendChild(comanda_itens_nm)
  const comanda_itens_vl = document.createElement("p")
  comanda_itens_vl.textContent = `R$${item.preco.toFixed(2)}`
  comanda_item_caixa.appendChild(comanda_itens_vl)

  const comanda_botao = document.createElement("button")
  comanda_botao.textContent = "Remover"
  comanda_botao.style.padding = "5px"
  comanda_botao.onclick = () => removerItem(item.cod)
  comanda_item_caixa.appendChild(comanda_botao)

  return comanda_item_caixa
}

const atualizarComanda = () => {
  const conteudo = document.getElementById("conteudo_comanda")
  conteudo.innerHTML = ""
  conteudo.classList.add("comanda_caixa")

  const lista_itens = document.createElement("div")
  lista_itens.style.flex = "1"
  lista_itens.style.overflowY = "auto"
  lista_itens.classList.add("lista_itens")

  let total = 0
  comanda.forEach(item => {
    const comanda_item_caixa = criarItemComanda(item)
    lista_itens.appendChild(comanda_item_caixa)
    total += item.preco
  })

  conteudo.appendChild(lista_itens)

  const comanda_rodape_caixa = document.createElement("div")
  comanda_rodape_caixa.classList.add("comanda_rodape_caixa")

  const comanda_total = document.createElement("p")
  comanda_total.textContent = `Total: R$${total.toFixed(2)}`
  comanda_rodape_caixa.appendChild(comanda_total)

  const comanda_botoes = document.createElement("div")
  comanda_botoes.style.display = "flex"
  comanda_botoes.style.gap = "15px"
  comanda_botoes.style.marginTop = "10px"

  const comanda_botao_cancelar = document.createElement("button")
  comanda_botao_cancelar.textContent = "Cancelar"
  comanda_botao_cancelar.onclick = cancelarComanda
  comanda_botoes.appendChild(comanda_botao_cancelar)

  const comanda_botao_finalizar = document.createElement("button")
  comanda_botao_finalizar.textContent = "Finalizar"
  comanda_botao_finalizar.onclick = finalizarComanda
  comanda_botoes.appendChild(comanda_botao_finalizar)

  comanda_rodape_caixa.appendChild(comanda_botoes)
  conteudo.appendChild(comanda_rodape_caixa)
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

