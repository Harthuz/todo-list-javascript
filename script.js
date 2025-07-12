const input = document.getElementById('tarefaInput')
const botao = document.getElementById('adicionarBtn')
const lista = document.getElementById('listaTarefas')

// Carrega tarefas do localStorage
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []

function salvarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

function renderizarTarefas() {
    lista.innerHTML = ''
    tarefas.forEach((tarefa, index) => {
        const li = document.createElement('li')
        if (tarefa.completa) li.classList.add('completed')

        // Texto da tarefa
        const spanTexto = document.createElement('span')
        spanTexto.textContent = tarefa.texto
        li.appendChild(spanTexto)

        // Botão Remover
        const botaoRemover = document.createElement('button')
        botaoRemover.textContent = '❌'
        botaoRemover.addEventListener('click', () => {
            tarefas.splice(index, 1)
            salvarTarefas()
            renderizarTarefas()
        })
        li.appendChild(botaoRemover)

        // Botão Editar
        const botaoEditar = document.createElement('button')
        botaoEditar.textContent = '✏️'
        botaoEditar.addEventListener('click', () => {
            const inputEditar = document.createElement('input')
            inputEditar.type = 'text'
            inputEditar.value = tarefa.texto
            li.replaceChild(inputEditar, spanTexto)
            inputEditar.focus()

            const botaoSalvar = document.createElement('button')
            botaoSalvar.textContent = '✅'
            botaoSalvar.addEventListener('click', () => {
                const novoTexto = inputEditar.value.trim()
                if (novoTexto !== '') {
                    tarefa.texto = novoTexto
                    salvarTarefas()
                    renderizarTarefas()
                }
            })
            li.appendChild(botaoSalvar)
        })
        li.appendChild(botaoEditar)

        // Botão Completar
        const botaoCompletar = document.createElement('button')
        botaoCompletar.textContent = tarefa.completa ? '☑️' : '☐'
        botaoCompletar.addEventListener('click', () => {
            tarefa.completa = !tarefa.completa
            salvarTarefas()
            renderizarTarefas()
        })
        li.appendChild(botaoCompletar)

        lista.appendChild(li)
    })
}

botao.addEventListener('click', () => {
    const texto = input.value.trim()
    if (texto !== '') {
        tarefas.push({ texto, completa: false })
        salvarTarefas()
        renderizarTarefas()
        input.value = ''
        input.focus()
    }
})

// Renderiza ao carregar
renderizarTarefas()