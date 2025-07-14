document.getElementById("cep").addEventListener("blur", (evento) => {
    const elemento = evento.target;
    const cepInformado = elemento.value.replace('-','');

    if(!cepInformado.length === 8)
        return;

    localStorage.setItem('cep', cepInformado);

    fetch(`https://viacep.com.br/ws/${cepInformado}/json/`)
        .then(response => response.json())
        .then(data => {
            if(!data.erro){
                document.getElementById('logradouro').value = data.logradouro;
                document.getElementById('bairro').value = data.bairro;
                document.getElementById('cidade').value = data.localidade;
                document.getElementById('estado').value = data.uf;

                localStorage.setItem('logradouro', data.logradouro);
                localStorage.setItem('bairro', data.bairro);
                localStorage.setItem('cidade', data.localidade);
                localStorage.setItem('estado', data.uf);
            }else{
                alert("CEP não encontrado.")
            }
        })
        .catch(error => console.error("Erro ao buscar o CEP:", error));
});

window.addEventListener("load", () => {
    document.getElementById('cep').value = localStorage.getItem('cep') || '';
    document.getElementById('logradouro').value = localStorage.getItem('logradouro') || '';
    document.getElementById('bairro').value = localStorage.getItem('bairro') || '';
    document.getElementById('cidade').value = localStorage.getItem('cidade') || '';
    document.getElementById('estado').value = localStorage.getItem('estado') || '';
});


