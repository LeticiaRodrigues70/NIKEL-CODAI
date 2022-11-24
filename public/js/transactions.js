const myModal = new bootstrap.Modal("#transactionModal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session")

let data = {
    transactions: []
};
document.getElementById("buttonLogout").addEventListener("click", logout);

//ADICIONAR LANÇAMENTO
document.getElementById("transactionsForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const value = parseFloat(document.getElementById("InputValue").value);
    const description = document.getElementById("InputDescription").value;
    const date = document.getElementById("InputDate").value;
    const type = document.querySelector('input[name="type-input"]:checked').value;

    data.transactions.unshift({
        value: value, type: type, descripton: description, date: date
    });

    saveData(data);
    e.target.reset();
    myModal.hide();

    getTransactions();

    alert("Lançamento adicionado com sucesso.");
});

checkLogged();

function checkLogged() {
    if(session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(!logged) {
        saveSession("logged", session);
        window.location.href = "index.html";
        return;
    }

    const dataUser = localStorage.getItem(logged);
    if(dataUser) {
        data = JSON.parse(dataUser);
    }

    getTransactions();
}

function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html"
}

function getTransactions() {
    const transactions = data.transactions
    let transactionsHtml = ``;

    if(transactions.length) {
        transactions.forEach((item) => {
            let type = "Entrada";

            if(item.type === "2") {
                type = "Saída"
            }

            transactionsHtml += `
                <tr>
                    <th scope="row">${item.date}</th>
                    <td>${item.value.toFixed(2)}</td>
                    <td>${type}</td>
                    <td>${item.description}</td>
                </tr>
                
            `
        })
    }
    document.getElementById("transactionsList").innerHTML = transactionsHtml
}

function saveData() {
    localStorage.setItem(data.login, JSON.stringify(data));
}