//Tenho 2 formas de decodificar, de números para letra, isso deve ocorrer no output final do ciclo do meu programa, ou seja
//quando eu codificar ele deve só pegar os números e por letras no lugar
//A outra forma para eu decodificar é receber os blocos e fazer o processo inverso para descobrir a frase original

// Objeto que mapeia números para Letras
const caracteresPelosValores = {
    1: 'A', 2: 'B', 3: 'C', 4: 'D', 5: 'E',
    6: 'F', 7: 'G', 8: 'H', 9: 'I', 10: 'J',
    11: 'K', 12: 'L', 13: 'M', 14: 'N', 15: 'O',
    16: 'P', 17: 'Q', 18: 'R', 19: 'S', 20: 'T',
    21: 'U', 22: 'V', 23: 'W', 24: 'X', 25: 'Y',
    26: 'Z',
    27: '-'
};

export function decifrarNumeroParaLetras(matrizNumeros) {
    // Usamos o map() para pegar cada número e transformá-lo na letra correspondente.
    // O map() VAI RETORNAR O NOVO ARRAY que queremos.
    const letrasDecodificadas = matrizNumeros.map((numeroAtual) => {
        // Pegamos o caractere correspondente ao número no nosso mapa inverso.
        const letra = caracteresPelosValores[numeroAtual];

        return letra; // Retornamos a letra para ser adicionada ao novo array
    });

    // A função DEVE retornar o array de letras diretamente.
    // Você pode fazer o console.log FORA da função, quando for usá-la.
    return letrasDecodificadas;
}
