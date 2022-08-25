const moedaBase = document.querySelector('#moedaBase');
const moedaFinal = document.querySelector('#moedaFinal');


(async () => {
    const resp = await fetch('./moedas.json');
    const data = await resp.json();

    for (const moedas in data) {
        let result = `<option value="${moedas}">${moedas} - ${data[moedas]}</option>`;
        moedaBase.innerHTML += result;
        moedaFinal.innerHTML += result;
    }

})();

const myHeaders = new Headers();
myHeaders.append("apikey", "CHAVE_API");


const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
};

document.querySelector('button').addEventListener('click', () => {

    const valueBase = moedaBase.options[moedaBase.selectedIndex].value;
    const valueFinal = moedaFinal.options[moedaFinal.selectedIndex].value;
    const valorPesquisa = document.querySelector('#valorPesquisa');

    fetch(`https://api.apilayer.com/fixer/convert?to=${valueFinal}&from=${valueBase}&amount=${valorPesquisa.value}`, requestOptions)
    .then(response => response.json())
    .then(result => document.querySelector('span').innerHTML = `Resultado final : &nbsp;${result.result}`)
    .catch(error => console.log('error', error));
});

