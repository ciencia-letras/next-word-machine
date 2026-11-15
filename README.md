# Next-word machine

<!-- cel:badge -->
DOI: pending (Zenodo) · em preparação
<!-- /cel:badge -->

**[English](#english)** · **[Português](#português)**

Live: **https://ciencia-letras.github.io/next-word-machine/**

---

## English

Build a sentence word by word, see the probabilities behind each choice, play with temperature and see how text becomes tokens. A teaching resource on the fundamentals of generative AI for non-specialists.

### How it works

- **Generate text:** four starting sentences (course assessment, email to students, the 1949 Nobel Prize, an invented academic regulation). At each step the tool shows the candidate next words with their probabilities; click one or let the "model" draw one.
- **Temperature (0–2):** probabilities are raised to 1/T and renormalised, as in real models. At 0 the sentence is always the same; at 2 it quickly loses its meaning.
- **Tokens:** OpenAI's real public tokenizers (GPT-4 `cl100k_base` and GPT-4o `o200k_base`) split any text into tokens, so Portuguese and English can be compared.
- **For the trainer:** a 20–25 minute script, key messages and discussion questions.

### Limits

The probabilities in the generation tab are **illustrative**, set by hand to reproduce typical model behaviour, and the simulation uses whole words instead of tokens. It is a teaching model, not a language model. The regulations scenario is deliberately invented.

### Run locally

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

No server-side code and no data leave the browser. Tokenizers: [gpt-tokenizer](https://github.com/niieani/gpt-tokenizer) (MIT), bundled in `assets/tokenizers.js`.

### Use and citation

<!-- cel:cite:en -->
© 2026 Ciência e Letras — Formação Especializada, Lda. · Author: Ricardo Correia.

Any institution may use, adapt and share this tool, including in teaching and training, **as long as it cites it**. Code: MIT ([LICENSE](LICENSE)). Content: CC BY 4.0 ([LICENSE-CONTENT](LICENSE-CONTENT)).

> Correia, R. (2026). *The next-word machine: how a language model writes* (Version 1.0.0) [Computer software]. Ciência e Letras. https://ciencia-letras.github.io/next-word-machine/

A Zenodo DOI will be added after the first release.

GitHub's “Cite this repository” button (from [CITATION.cff](CITATION.cff)) gives APA and BibTeX.
<!-- /cel:cite:en -->

---

## Português

Construa uma frase palavra a palavra, veja as probabilidades por trás de cada escolha, experimente a temperatura e veja como o texto se transforma em tokens. Um recurso pedagógico sobre os fundamentos da IA generativa para não especialistas.

### Como funciona

- **Gerar texto:** quatro frases de partida (avaliação de uma UC, email aos estudantes, o Prémio Nobel de 1949, um regulamento académico inventado). Em cada passo, a ferramenta mostra as palavras candidatas com as respetivas probabilidades; clique numa ou deixe o "modelo" sortear.
- **Temperatura (0–2):** as probabilidades são elevadas a 1/T e normalizadas, como nos modelos reais. Em 0 a frase é sempre igual; em 2 perde rapidamente o sentido.
- **Tokens:** os tokenizadores públicos reais da OpenAI (GPT-4 `cl100k_base` e GPT-4o `o200k_base`) dividem qualquer texto em tokens, permitindo comparar português e inglês.
- **Para o formador:** guião de 20–25 minutos, mensagens-chave e perguntas para discussão.

### Limites

As probabilidades do separador de geração são **ilustrativas**, definidas à mão para reproduzir o comportamento típico de um modelo, e a simulação usa palavras inteiras em vez de tokens. É um modelo pedagógico, não um modelo de linguagem. O cenário do regulamento é deliberadamente inventado.

### Correr localmente

```bash
python3 -m http.server 8000   # depois abrir http://localhost:8000
```

Sem código no servidor e sem dados a sair do browser. Tokenizadores: [gpt-tokenizer](https://github.com/niieani/gpt-tokenizer) (MIT), incluídos em `assets/tokenizers.js`.

### Utilização e citação

<!-- cel:cite:pt -->
© 2026 Ciência e Letras — Formação Especializada, Lda. · Autor: Ricardo Correia.

Qualquer instituição pode usar, adaptar e partilhar esta ferramenta, incluindo em ensino e formação, **desde que a cite**. Código: MIT ([LICENSE](LICENSE)). Conteúdos: CC BY 4.0 ([LICENSE-CONTENT](LICENSE-CONTENT)).

> Correia, R. (2026). *The next-word machine: how a language model writes* (Version 1.0.0) [Computer software]. Ciência e Letras. https://ciencia-letras.github.io/next-word-machine/

O DOI do Zenodo será acrescentado depois da primeira versão publicada.

O botão “Cite this repository” do GitHub (a partir de [CITATION.cff](CITATION.cff)) dá APA e BibTeX.
<!-- /cel:cite:pt -->
