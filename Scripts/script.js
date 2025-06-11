/*-------------
Primeira parte consiste em pegar a msg -> Remover acentos -> Quebrar ela e por cada caractere em um array
-------------*/

//import util from 'util';

//Importando funções
import { mensagemParaMatriz } from "./funcaoQuebra.js";
import { matrizLetraPNumeros } from "./funcaoNumerar.js";
import { agruparMatriz, multiplicarBlocoPorChave } from './funcaoAgruparEmbaralhar.js';
import { decifrarNumeroParaLetras } from './funcaoDecifrador.js';
import { decodificarMensagem } from './funcaoDescriptar.js';








//Pegando nossos botões e colocando o event listenner
let buttonEnconder = document.getElementById('btnCodificar');
let buttonDecodificar = document.getElementById('btnDecodificar');

//Quando eu clicar no botão de codificar ele precisa verificar se tem um texto pra ser codificado, obvio
//Após isso eu codifico
buttonEnconder.addEventListener('click', ()=>{
    if(checarInputPossuiTexto('inputCodificar')){
        let inputCodificararText = document.getElementById('inputCodificar').value;
        let encoderOutput = document.getElementById('outputCodificar');

        //Se tem texto minha msg é o texto
        const msgPCod = inputCodificararText;

        //Vou pegar a mensagem e transformar tudo dentro dela em CAIXA ALTA
        const msgPCodUpper = msgPCod.toUpperCase();

        //Matriz que irá receber a mensagem ja quebrada
        var matrizMsgCodUpper = [];

        mensagemParaMatriz(msgPCodUpper, matrizMsgCodUpper);
        //console.log("Minha matriz com a mensagem codificada em letra maiscula corresponde a: " + matrizMsgCodUpper);

        //Nesse podno matrizMsgCodUpper representa nossa matriz com a msg quebrada e já em CAIXA ALTA

        //Proximo passo consiste em pegar essa matriz que vai ta com as letras e transformar em uma matriz com númeors
        const arrayDeNumerosPuro = matrizLetraPNumeros(matrizMsgCodUpper)
        //console.log(arrayDeNumerosPuro);

        //Matriz da qual irá conter blocos de 2x1 do nosso array de números puro
        //Para ser multiplicada pela nossa chave :P

        const matrizBlocosPuros = agruparMatriz(arrayDeNumerosPuro, 2);
        //console.log("Matriz de Blocos Puros: ")
        //console.log(util.inspect(matrizBlocosPuros));


        //Aqui é a matriz q sera usada para códificar a mensagem
        const matrizChave = [
            [3, 5],
            [2, 7]
        ]


        //Aqui eu irei pegar a matriz que possui os blocos de 2x1 e irei passar um por
        //Um na função e ao mesmo tempo, para cada retorno da função, vou por o resultado
        //Em uma matriz de resultado

        let matrizBlocosMisturados = [];

        for(const bloco of matrizBlocosPuros)
        {
            let blocoMisturado = multiplicarBlocoPorChave(bloco, matrizChave);
            matrizBlocosMisturados.push(blocoMisturado);
        }

        //O .flat tirar de blocos de 2 em 2 e joga em um só de 1 em 1
        //E o .join('') agrupa a porra toda
        let codigoFinalArray = matrizBlocosMisturados.flat();
        let codigoFinalEscrito = decifrarNumeroParaLetras(codigoFinalArray).join('');

        //console.log(typeof(codigoFinalEscrito));
        //console.log(codigoFinalEscrito)
        encoderOutput.textContent = codigoFinalEscrito;
    }
});

buttonDecodificar.addEventListener('click', ()=>{
    if(checarInputPossuiTexto('inputDecodificar')){
        let _inputDecodificarText = document.getElementById('inputDecodificar').value;
        let _decoderOutput = document.getElementById('outputDecodificar')

        let _msgDecifrada = decodificarMensagem(_inputDecodificarText);
        _decoderOutput.textContent = _msgDecifrada;
    }
});


function checarInputPossuiTexto(_input)
{
    const inputElement = document.getElementById(_input);

    // Check if the element exists and if its value is not an empty string
    return inputElement && inputElement.value !== '';
}