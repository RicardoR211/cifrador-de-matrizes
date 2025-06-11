//Aqui eu irei agrupar o array de números em um array que irá contar com grupos
//De 2 em 2 array que corresponde a n X n da nossa matriz de codificação

export function agruparMatriz(matrizOriginal, tamanhoGrupo) {
    // 1. Verifique se a matriz original tem tamanho ímpar
    if (matrizOriginal.length % tamanhoGrupo !== 0) {
        // Se for ímpar, adicione o 'X' (24) no final
        matrizOriginal.push(24); // Adiciona o X no final da sua lista de números
    }

    const arrayAgrupado = [];
    for (let i = 0; i < matrizOriginal.length; i += tamanhoGrupo) {
        // Agora, você pode simplesmente fatiar de 2 em 2, pois o tamanho é garantido ser par
        const grupo = matrizOriginal.slice(i, i + tamanhoGrupo);
        arrayAgrupado.push(grupo);
    }

    return arrayAgrupado;
}

//Multiplicar cada valores de bloco pelo valor da chave
export function multiplicarBlocoPorChave(matrizComBlocos, matrizChave)
{
    //X - Parte de cima do bloco a11
    //Y - Parte de baixo do bloco a21
    const x = matrizComBlocos[0];
    const y = matrizComBlocos[1];

    const a = matrizChave[0][0]; //a11
    const b = matrizChave[0][1]; //a12 
    const c = matrizChave[1][0]; //a21
    const d = matrizChave[1][1]; //a22

    //Apenas um debug pois sou burro.mp4
    //console.log(x);
    //console.log(y);
    //console.log(a);
    //console.log(b);
    //console.log(c);
    //console.log(d);
    
    //Célula 1
    const celula1 = (a * x) + (b * y);
    
    //Célula 2
    const celula2 = (c * x) + (d * y);

    //Aplicando múdulo de 27 a cada resultado para impedir q ele extrapole
    const cifrado1 = aplicarModulo27(celula1);
    const cifrado2 = aplicarModulo27(celula2);
    
    return [cifrado1, cifrado2];
}

//Função para aplicar módulo 27 em um número, usa-se o 27 já que estou considerando
//Espaços como "-" e eu dei o valor dele de 27
export function aplicarModulo27(num) {
    let resultado = num % 27;
    if (resultado === 0) {
        return 27; // Se o resto for 0, significa que é um múltiplo de 27. No seu sistema (1 a 27), isso é o 27.
    } else {
        return resultado; // Caso contrário, é o próprio resto.
    }
}
