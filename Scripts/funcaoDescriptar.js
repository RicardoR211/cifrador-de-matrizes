// --- 1. CONFIGURAÇÕES GLOBAIS (AS MESMAS DO SEU CODIFICADOR) ---

// Sua matriz-chave (apenas para referência, a decodificação usa a inversa)
const matrizChave = [
    [3, 5],
    [2, 7]
];

// Matriz Inversa (calculada a partir da sua matrizChave original)
const matrizInversa = [
    [8, 2],
    [17, 15]
];

// Mapeamento de Letra para Número (A=1...Z=26, Espaço/Hífen=27)
const letraParaNumero = {
    'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
    'J': 10, 'K': 11, 'L': 12, 'M': 13, 'N': 14, 'O': 15, 'P': 16, 'Q': 17,
    'R': 18, 'S': 19, 'T': 20, 'U': 21, 'V': 22, 'W': 23, 'X': 24, 'Y': 25,
    'Z': 26,
    '-': 27, // Hífen
    ' ': 27  // Espaço (se seu sistema interpreta espaços como hífens internamente)
};

// Mapeamento de Número para Letra (para a saída decifrada)
const numeroParaLetra = {
    1: 'A', 2: 'B', 3: 'C', 4: 'D', 5: 'E', 6: 'F', 7: 'G', 8: 'H', 9: 'I',
    10: 'J', 11: 'K', 12: 'L', 13: 'M', 14: 'N', 15: 'O', 16: 'P', 17: 'Q',
    18: 'R', 19: 'S', 20: 'T', 21: 'U', 22: 'V', 23: 'W', 24: 'X', 25: 'Y',
    26: 'Z',
    27: '-' // Usamos hífen para 27, mas você pode mudar para ' ' se preferir ver espaços
};

// Sua função aplicarModulo27 corrigida (crucial para o sistema de 1 a 27)
function aplicarModulo27(num) {
    let resultado = num % 27;
    if (resultado === 0) {
        return 27; // Se o resto for 0, mapeia para 27 (Espaço/Hífen)
    } else {
        return resultado; // Caso contrário, é o próprio resto
    }
}

// --- 2. FUNÇÕES DE SUPORTE ---

// Função para converter uma mensagem de texto em um array de números
function converterMensagemParaNumeros(mensagem) {
    const numeros = [];
    // Convertendo para maiúsculas para lidar com 'a' e 'A' da mesma forma
    const msgUpper = mensagem.toUpperCase(); 
    for (let i = 0; i < msgUpper.length; i++) {
        const char = msgUpper[i];
        if (letraParaNumero[char]) {
            numeros.push(letraParaNumero[char]);
        } else {
            // Lidar com caracteres desconhecidos (ex: pontuação, números se não mapeados)
            console.warn(`Caractere desconhecido ignorado: ${char}`);
        }
    }
    return numeros;
}

// Função para agrupar o array de números em blocos de 2
// Esta função é para a mensagem *cifrada* (já deve estar em tamanho par, se codificada corretamente)
function agruparNumerosEmBlocos(numeros, tamanhoGrupo) {
    const blocos = [];
    for (let i = 0; i < numeros.length; i += tamanhoGrupo) {
        // Garantimos que sempre pegamos um par, mesmo que o último seja 'X' de preenchimento
        const grupo = numeros.slice(i, i + tamanhoGrupo); 
        blocos.push(grupo);
    }
    return blocos;
}

// --- 3. FUNÇÃO PRINCIPAL DE DECODIFICAÇÃO ---

export function decodificarMensagem(mensagemCifrada) {
    // 1. Converter a mensagem cifrada para números
    const numerosCifrados = converterMensagemParaNumeros(mensagemCifrada);

    // 2. Agrupar os números cifrados em blocos de 2
    // A mensagem cifrada já deve ter um número par de caracteres se a codificação foi feita corretamente.
    if (numerosCifrados.length % 2 !== 0) {
        console.error("Erro: Mensagem cifrada tem um número ímpar de caracteres. Não pode ser decodificada em pares.");
        return ""; // Retorna vazio ou lança erro
    }
    const blocosCifrados = agruparNumerosEmBlocos(numerosCifrados, 2);

    let mensagemDecifradaNumeros = [];

    // 3. Decodificar cada bloco
    blocosCifrados.forEach(bloco => {
        // MatrizInversa * BlocoCifrado (vetor coluna)
        const x = bloco[0]; // Primeiro número do par cifrado
        const y = bloco[1]; // Segundo número do par cifrado

        const celula1 = (matrizInversa[0][0] * x) + (matrizInversa[0][1] * y);
        const celula2 = (matrizInversa[1][0] * x) + (matrizInversa[1][1] * y);

        // Aplicar módulo 27 (sua versão corrigida) aos resultados
        const decifrado1 = aplicarModulo27(celula1);
        const decifrado2 = aplicarModulo27(celula2);

        mensagemDecifradaNumeros.push(decifrado1, decifrado2);
    });

    // 4. Converter os números decifrados de volta para letras
    let mensagemFinal = "";
    for (let i = 0; i < mensagemDecifradaNumeros.length; i++) {
        const numero = mensagemDecifradaNumeros[i];
        mensagemFinal += numeroParaLetra[numero];
    }

    // 5. Opcional: Remover o 'X' de preenchimento final, se existir
    // Se a mensagem original foi preenchida com 'X', o último caractere decifrado será 'X'.
    // Você pode decidir se quer removê-lo.
    if (mensagemFinal.endsWith('X')) {
        // Assume que 'X' (24) é sempre preenchimento e não parte da mensagem real
        // Cuidado: Se a mensagem real terminar em X, ele será removido.
        mensagemFinal = mensagemFinal.slice(0, -1);
    }

    return mensagemFinal;
}