// Selecionando os elementos
const transactionTypeSelect = document.querySelector("[data-transaction-type]");
const transactionValueInput = document.querySelector('[data-transaction-value]');
const completeTransactionButton = document.querySelector('[data-complete-transaction-button]');
const userBalance = document.querySelector("[data-balance]");
const transactionsRecentText = document.querySelector('[data-transactions-recent]'); // Texto "Transações Recentes"

// Inicialmente, o texto "Você não realizou nenhuma transação ainda" deve estar visível
transactionsRecentText.style.display = 'block';

// Adicionando o evento de clique ao botão
completeTransactionButton.addEventListener('click', (event) => {

    // Evita o comportamento padrão de enviar o formulário
    event.preventDefault();

    // Verifica se o tipo de transação é válido
    if (!['Transfer', 'Payment', 'Deposit'].includes(transactionTypeSelect.value)) {
        alert('Tipo de transação inválido!');
        return;
    }

    // Verifica se o valor da transação é um número
    if (isNaN(parseFloat(transactionValueInput.value.replace('R$', '').replace(',', '.')))) {
        alert('Valor da transação inválido!');
        return;
    }

    if (transactionValueInput.value > userBalance.value) {
        alert("Saldo insuficiente");
        return;
    }

    // Verifica se o saldo atual é um número
    if (isNaN(parseFloat(userBalance.textContent))) {
        alert('Saldo atual inválido!');
        return;
    }

    // Obtendo os dados da transação
    const transaction = getTransactionData();

    console.log(transaction)

    // Atualizando o saldo
    transaction.balance = updateBalance(transaction);

    // Verificando se o saldo foi atualizado
    if (transaction.balance !== undefined) {
        // Adicionando um novo item de extrato
        addStatementItem(transaction);
    }

    transactionTypeSelect.value = 'Select';
    transactionValueInput.value = '';

    // Verificando se há elementos de extrato na coluna
    const statementItems = document.querySelectorAll('[data-statement-item]');
    if (statementItems.length > 0) {
        // Se houver elementos de extrato, oculte o texto "Você não realizou nenhuma transação ainda"
        transactionsRecentText.style.display = 'none';
    } else {
        // Caso contrário, exiba o texto
        transactionsRecentText.style.display = 'block';
    }
});
