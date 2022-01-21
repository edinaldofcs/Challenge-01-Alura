function criaorObjeto(obj) {
    return document.getElementById(obj);
}

const input = criaorObjeto('input-text');
const criptografar = criaorObjeto('criptografar')
const descriptografar = criaorObjeto('descriptografar');
const resposta = criaorObjeto('resposta');
const copiar = criaorObjeto('copiar');
const erro = criaorObjeto('erro');

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

document.addEventListener('click', (event) => {
    event.preventDefault();

    var decisao = event.target.value;

    if (decisao == 'criptografar') {
        input.value == "" ? MostrarMensagemDeErro('Favor inserir uma mensagem') : encriptar();
    } else if(decisao == 'descriptografar') {
        input.value == "" ? MostrarMensagemDeErro('Favor inserir uma mensagem') : desencriptar();
    } else if(decisao == 'copiar'){
        validarCopia();
    }
});

function validarCopia() {

    var content = resposta.innerHTML;

    if (content != "") {

        navigator.clipboard.writeText(content)
            .then(() => {
                animarCopiaouFalhaAoCopiar('animar', 'Texto Copiado');
            })
            .catch(erro => {
                animarCopiaouFalhaAoCopiar('animarErro', 'Falha ao copiar');
                console.log(erro);
            })
    }else{
        console.log('nada a copiar');
    }
}

function animarCopiaouFalhaAoCopiar(classe, texto) {
    copiar.classList.add(classe);
    copiar.textContent = texto;
    setTimeout(() => {
        copiar.classList.remove('animar');
        copiar.textContent = "Copiar texto";
    }, 2000);
}


