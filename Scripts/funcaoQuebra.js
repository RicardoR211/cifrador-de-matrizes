export function mensagemParaMatriz(msgFuncao, matriz)
{
    if(typeof msgFuncao == 'string')
    {
        //Removendo acetos da msg caso haja alguem
        var msgSemAcento = removerAcentos(msgFuncao);
        //Transformo a msg(string) em uma matriz(array);
        var msgEmUmaMatriz = transformaMsgParaMatriz(msgSemAcento);
        //Percorro o array que agora possui a msg dentro
        msgEmUmaMatriz.forEach(letra => {
            //Se a letra atual for um espaço eu irei transforma-lo em um "-"
            if(letra == " ")
            {
                letra = "-";
            }

            //Pegar cada letra e irei enfinar na "matriz" que eu recebo quando eu sou chamado
            matriz.push(letra);
        });
    }
}

function transformaMsgParaMatriz(msgParaMatriz)
{
    return msgParaMatriz.split('');
}

function removerAcentos(msgPRemoverAcento) {
    //Só pra explicar, aqui eu to pegando uma string, que é um texto, e tou separando os acentos dela "É" -> "E´"
    //Após isso eu faço tipo uma busca por todos os acontos e substitui ele por nada, ou seja, o "E´" vira  apenas "E"
    return msgPRemoverAcento.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}