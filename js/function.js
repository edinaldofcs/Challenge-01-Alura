function criaorObjeto(obj) {
    return document.getElementById(obj);
}

var input = criaorObjeto('input-text');
var criptografar = criaorObjeto('criptografar')
var descriptografar = criaorObjeto('descriptografar');
var resposta = criaorObjeto('resposta');
var copiar = criaorObjeto('copiar');
var erro = criaorObjeto('erro');
var decisao = "";


function verificarClique() {

    var escolha = decisao == 'criptografar';

    if (escolha) {
        input.value == "" ? MostrarMensagemDeErro('Favor inserir uma mensagem') : encriptar();
    } else {
        input.value == "" ? MostrarMensagemDeErro('Favor inserir uma mensagem') : desencriptar();
    }

}

function encriptar() {

    let mensagem = input.value.replace(/e/g, 'enter').replace(/i/g, 'imes').replace(/a/g, 'ai').replace(/o/g, 'ober').replace(/u/g, 'ufat');

    mensagem == input.value ? MostrarMensagemDeErro('Texto não criptografável') : resposta.textContent = mensagem;

}

function desencriptar() {

    let mensagem = input.value.replace(/ai/g, 'a').replace(/enter/g, 'e').replace(/imes/g, 'i').replace(/ober/g, 'o').replace(/ufat/g, 'u');

    if (mensagem == input.value) {
        return MostrarMensagemDeErro('O texto não está criptografado');
    }

    return resposta.textContent = mensagem;

}

function MostrarMensagemDeErro(msg) {
    resposta.textContent = "";
    erro.textContent = msg;
    erro.classList.add('mostrar-erro');
    setTimeout(() => {
        erro.classList.remove('mostrar-erro');
        erro.textContent = "."
    }, 3000);    
}

var validarInput = () => {
    let valorInput = input.value[input.value.length - 1].charCodeAt(0);
    let maior = valorInput >= 97 && valorInput <= 122 || valorInput == 32;
    var texto;
    if (maior) {
        texto = input.value;
        input.value = texto;
    } else {
        texto = input.value.substring(0, input.value.length - 1);
        input.value = texto;
        MostrarMensagemDeErro('Só é permitido inserir letras minúsculas');
    }
}

input.addEventListener('input', validarInput);

criptografar.addEventListener('click', (event) => {
    event.preventDefault();

    decisao = 'criptografar';
    verificarClique();
});

descriptografar.addEventListener('click', (event) => {

    event.preventDefault();

    decisao = 'descriptografar';
    verificarClique();
});


copiar.addEventListener('click', () => {

    var content = resposta.innerHTML;

    if (content != "") {

        navigator.clipboard.writeText(content)
            .then(() => {
                animarCopia();
            })
            .catch(erro => {
                animarcopiaErro();
                console.log(erro);
            })
    }else{
        console.log('nada a copiar');
    }

})

function animarCopia() {
    copiar.classList.add('animar');
    copiar.textContent = "Texto Copiado";
    setTimeout(() => {
        copiar.classList.remove('animar');
        copiar.textContent = "Copiar texto";
    }, 2000);
}

function animarcopiaErro() {
    copiar.classList.add('animarErro');
    copiar.textContent = "Falha ao copiar";
    setTimeout(() => {
        copiar.classList.remove('animarErro');
        copiar.textContent = "Copiar texto";
    }, 2000);
}


