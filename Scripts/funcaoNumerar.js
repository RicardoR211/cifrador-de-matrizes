//Aqui o programa vai transformar o nosso array e letras em um array de números do qual cada número corresponde a uma letra do alfabeto

//Mapeando o valor de cada caracteres
const valoresDosCaracteres = {
    'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5,
    'F': 6, 'G': 7, 'H': 8, 'I': 9, 'J': 10,
    'K': 11, 'L': 12, 'M': 13, 'N': 14, 'O': 15,
    'P': 16, 'Q': 17, 'R': 18, 'S': 19, 'T': 20,
    'U': 21, 'V': 22, 'W': 23, 'X': 24, 'Y': 25,
    'Z': 26, '-': 27
};

export function matrizLetraPNumeros(matrizComMsgPNumerar) {
    // Usamos map para transformar cada letra em seu valor numérico
    const arrayDeNumeros = matrizComMsgPNumerar.map(letraAtual => {
        // Obter o valor do caractere do seu mapa
        const valor = valoresDosCaracteres[letraAtual];

        if (valor === undefined) {
            console.warn(`Caractere '${letraAtual}' não mapeado.`);
        }

        return valor;
    });

    return arrayDeNumeros; // Retorna o array de números completo
}

//Será usado na hora de decifrar fazendo o caminho inverso
export function letraPNumeros(letra)
{
    return valoresDosCaracteres[letra];
}