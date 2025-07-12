const input = document.getElementById('tarefaInput')
const botao = document.getElementById('adicionarBtn')
const lista = document.getElementById('listaTarefas')

botao.addEventListener('click', () => {
    const texto = input.value.trim()

    if (texto !== '') {
        const li = document.createElement('li')

        // Cria span para texto da tarefa
        const spanTexto = document.createElement('span')
        spanTexto.textContent = texto
        li.appendChild(spanTexto)

        // Botão Remover
        const botaoRemover = document.createElement('button')
        botaoRemover.textContent = '❌'
        botaoRemover.addEventListener('click', () => {
            lista.removeChild(li)
        })
        li.appendChild(botaoRemover)

        // Botão Editar
        const botaoEditar = document.createElement('button')
        botaoEditar.textContent = '✏️'
        botaoEditar.addEventListener('click', () => {
            // Troca o texto por um input
            const inputEditar = document.createElement('input')
            inputEditar.type = 'text'
            inputEditar.value = spanTexto.textContent
            li.replaceChild(inputEditar, spanTexto)
            inputEditar.focus()

            // Botão Salvar
            const botaoSalvar = document.createElement('button')
            botaoSalvar.textContent = '✅'
            botaoSalvar.addEventListener('click', () => {
                const novoTexto = inputEditar.value.trim()
                if (novoTexto !== '') {
                    spanTexto.textContent = novoTexto
                    li.replaceChild(spanTexto, inputEditar)
                }
                li.removeChild(botaoSalvar)
            })
            li.appendChild(botaoSalvar)
        })
        li.appendChild(botaoEditar)

        //Botão Completar
        const botaoCompletar = document.createElement('button')
        botaoCompletar.textContent = '☐'
        botaoCompletar.addEventListener('click', () => {
            li.classList.toggle('completed')
            botaoCompletar.textContent = li.classList.contains('completed') ? '☑️' : '☐'
        })
        li.appendChild(botaoCompletar)

        lista.appendChild(li)
        input.value = ''
        input.focus()
    }
})
