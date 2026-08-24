describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => {
    cy.visit('./src/index.html')
  })


  it('verifica o título da aplicação', () => {
cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')

  })


it.only('preenche os campos obrigatórios e envia o formulário', () => {
  cy.get('#firstName').type('Matheus', { delay: 0 })
  cy.get('#lastName').type("Cássio", { delay: 0 })
  cy.get('#email').type('mtcassio@gmail.com', { delay: 0 })
  cy.get('#phone').type('11999999999', { delay: 0 })
  cy.get('#open-text-area').type('Teste de ', { delay: 0 })
  cy.contains('button', 'Enviar').click()

  cy.get('.success').should('be.visible')
})

it.only('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
  cy.get('#firstName').type('Matheus', { delay: 0 })
  cy.get('#lastName').type("Cássio", { delay: 0 })
  cy.get('#email').type('mtcassio@gmail,com', { delay: 0 })
  cy.get('#phone').type('11999999999', { delay: 0 })
  cy.get('#open-text-area').type('Teste de ', { delay: 0 })
  cy.contains('button', 'Enviar').click()

  cy.get('.error').should('be.visible')
})
 

it.only('campo telefone continua vazio quando preenchido com valor não numérico', () => {
  cy.get('#phone').
  type('abcdefghij').
  should('have.value', '')
})

it.only('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
  cy.get('#firstName').type('Matheus', { delay: 0 })
  cy.get('#lastName').type("Cássio", { delay: 0 })
  cy.get('#email').type('mtcassio@gmail.com', { delay: 0 })
  cy.get('#phone').should('have.value', '')
  cy.get('[for="phone-checkbox"]').click()

  cy.get('button[type="submit"]').click()
  cy.get('.error').should('be.visible')
})

it('Mensagem de erro ao não preencher campos obrigatórios', () => {
cy.get('button[type="submit"]').click()
cy.get('.error').should('be.visible')
})
 
it.only('envia o formuário com sucesso usando um comando customizado', () => {
  const data = {
    firstName: 'Matheus',
    lastName: 'Cássio',
    email: 'mtcaassio1313@gmail.com',
    text: 'Teste de preenchimento de formulário com sucesso usando comando customizado.'
  }


  cy.fillMandatoryFieldsAndSubmit()
  cy.get('.success').should('be.visible')

})


//Selecionando opções em campos de seleção suspensa

it.only('seleciona o produto YouTube pelo texto', () => {
cy.get('#product') // seleciono o produto
.select('YouTube') //seleciono o YouTube
.should('have.value', 'youtube') //verifico se o valor selecionado é o YouTube

})


it.only('seleciona o produto Mentoria pelo valor', () => {
cy.get('#product') // seleciono o produto
.select('mentoria') //seleciono o mentoria
.should('have.value', 'mentoria') //verifico se o valor selecionado é o Mensoria

})

it.only('seleciona o produto Mentoria pelo índice', () => {
cy.get('#product') // seleciono o produto
.select(1) //seleciono o blog  pelo índice
.should('have.value', 'blog') //verifico se o valor selecionado é o blog

})




//Marcando inputs do tipo radio

it.only('marca o tipo de atendimento "Feedback"', () => {
  cy.get('input[type="radio"][value="feedback"]')// seleciono o input de feedback
  .check()// marco o input de feedback
  .should('be.checked') // verifico se o valor selecionado é o feedback
})

it.only('marca o tipo de atendimento "Ajuda"', () => {
  cy.get('input[type="radio"][value="ajuda"]')// seleciono o input de ajuda
  .check()// marco o input de ajuda
  .should('be.checked') // verifico se o valor selecionado é o ajuda esra marcado
})
// Define um teste individual focado; o '.only' faz o Cypress executar exclusivamente este bloco no arquivo.
it.only('marca o tipo de atendimento "Elogio"', () => { // Define um teste focado que será executado sozinho pelo Cypress.
  cy.get('input[type="radio"]') // Busca todos os elementos do tipo botão de rádio na página.
  .each(($typeOfService) => { // Inicia um laço para percorrer cada rádio encontrado, um por um.
    cy.wrap($typeOfService) // Empacota o elemento HTML atual para que o Cypress consiga interagir com ele.
    .check() // Marca (seleciona) o botão de rádio que está sendo analisado na rodada atual.
    .should('be.checked') // Valida se o botão de rádio atual foi de fato marcado corretamente.
  }) 
}) 

//Marcando (e desmarcando) inputs do tipo checkbox
it.only('marca ambos checkboxes, depois desmarca o último', () => {
  cy.get('input[type="checkbox"]') // Seleciona todos os elementos do tipo checkbox na página.
  .check() // Marca todos os checkboxes encontrados.
  .should('be.checked') // Verifica se todos os checkboxes foram marcados corretamente.
  .last() // Seleciona o último checkbox da lista.
  .uncheck() // Desmarca o último checkbox selecionado.
  .should('not.be.checked') // Verifica se o último checkbox foi desmarcado corretamente.
})

//Fazendo Upload de arquivos com cypress
it.only('faz upload de um arquivo da pasta fixtures', () => {
cy.get('#file-upload') // Seleciona o elemento de upload de arquivo pelo ID.
.selectFile('cypress/fixtures/example.json') // Seleciona o arquivo 'example.json' da pasta fixtures para upload.
.should(($input) => { // Inicia uma verificação personalizada no elemento de input.
  expect($input[0].files[0].name).to.equal('example.json') // Verifica se o nome do arquivo carregado é 'example.json'. 
})

})

it.only('faz upload de um arquivo sinulando um drag and drop', () => {
cy.get('#file-upload') // Seleciona o elemento de upload de arquivo pelo ID.
.selectFile('cypress/fixtures/example.json', {action: 'drag-drop'}) // Simula o arrastar e soltar do arquivo 'example.json' da pasta fixtures para o elemento de upload.
.should(($input) => { // Inicia uma verificação personalizada no elemento de input.
  expect($input[0].files[0].name).to.equal('example.json') // Verifica se o nome do arquivo carregado é 'example.json'. 
})
})

it.only('Sleciona um arquivo simulando uma fixture para a qial foi dada alias', () => {
  cy.fixture('example.json').as('sampleFile') // Carrega o arquivo 'example.json' da pasta fixtures e atribui um alias 'sampleFile' para referência futura.
cy.get('#file-upload') // Seleciona o elemento de upload de arquivo pelo ID.
.selectFile('@sampleFile') // Seleciona o arquivo referenciado pelo alias '@sampleFile' para upload.
.should(($input) => { // Inicia uma verificação personalizada no elemento de input.
  expect($input[0].files[0].name).to.equal('example.json') // Verifica se o nome do arquivo carregado é 'example.json'. 
})
})

//lidando com links que abrem em outra aba
it.only('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
cy.contains('a','Política de Privacidade') // Seleciona o link de texto 'Política de Privacidade' na página.
.should('have.attr', 'href', 'privacy.html') // Verifica se o link da política de privacidade possui o atributo href com valor 'privacy.html', indicando que abrirá em outra aba.
.and('have.attr', 'target', '_blank') // Verifica se o link possui o atributo target com valor '_blank', confirmando que abrirá em uma nova aba.
})

it.only('acessa a política de privacidade removendo target e entaão clica no link', () => {
cy.contains('a','Política de Privacidade') //
.invoke('removeAttr', 'target') // Remove o atributo 'target' do link.
.click()// Clica no link da política de privacidade, agora que ele não abrirá em uma nova aba.
cy.contains('h1', 'CAC TAT - Política de Privacidade') // Verifica se a página carregada contém o título 'CAC TAT - Política de privacidade'.

})



})