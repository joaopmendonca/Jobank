// Função para obter os dados da transação
function getTransactionData() {
    const transactionType = transactionTypeSelect.value;
    const transactionValue = parseFloat(transactionValueInput.value.replace('R$', '').replace(',', '.')); // Convertendo para número
    const currentBalance = parseFloat(userBalance.textContent);

    return {
        type: transactionType,
        value: transactionValue,
        balance: currentBalance
    };
}

// Função para atualizar o saldo
function updateBalance(transaction) {
    let newBalance;
    if (transaction.type === 'Transfer' || transaction.type === 'Payment') {
        if (transaction.balance < transaction.value) {
            alert("Saldo insuficiente");
            return;
        }
        newBalance = transaction.balance - transaction.value;
    } else if (transaction.type === 'Deposit') {
        newBalance = transaction.balance + transaction.value;
    }
    userBalance.textContent = newBalance.toFixed(2);
    return newBalance;
}

// Função para adicionar um novo elemento de extrato
function addStatementItem(transaction) {
    // Criando um novo elemento div
    const statementItem = document.createElement('div');
    statementItem.setAttribute('data-statement-item', '');
    statementItem.classList.add('column__item');
    statementItem.classList.add('column__text--small');

    // Criando um novo elemento h3 para o tipo de transação
    const transactionType = document.createElement('h3');
    transactionType.classList.add('column__text');
    transactionType.textContent = `${transaction.type} Realizado`;

    // Criando um novo elemento p para o valor da transação
    const transactionValue = document.createElement('p');
    transactionValue.classList.add('column__text');
    transactionValue.textContent = `Valor: R$ ${transaction.value.toFixed(2)}`;

    // Criando um novo elemento p para a data da transação
    const transactionDate = document.createElement('p');
    transactionDate.classList.add('column__text');
    const currentDate = new Date();
    transactionDate.textContent = `Data: ${currentDate.toLocaleDateString()} às ${currentDate.toLocaleTimeString()}`;

    // Anexando os elementos filhos ao elemento pai
    statementItem.appendChild(transactionType);
    statementItem.appendChild(transactionValue);
    statementItem.appendChild(transactionDate);

    // Selecionando o elemento da coluna de extrato
    const statementColumn = document.querySelector('.column__statement');

    // Inserindo o novo elemento de extrato abaixo do título "Transações Recentes"
    statementColumn.insertBefore(statementItem, transactionsRecentText.nextSibling);

    // Atualizando a visibilidade do texto "Você não realizou nenhuma transação ainda"
    transactionsRecentText.style.display = 'none';
}


