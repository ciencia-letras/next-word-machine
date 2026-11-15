/* Page text, EN first then PT. Elements with data-t="key" get T[lang][key] (text);
 * elements with data-h="key" get T[lang][key] as HTML (filled by machine.js).
 * The EN/PT buttons in the CeL header set <html lang>; this file follows it and fires "langchange".
 * ?lang=pt in the URL opens the page in Portuguese. */
(function (g) {
  "use strict";
  const T = {
    en: {
      eyebrow: "Ciência e Letras · Lab tool",
      h1: "The next-word machine: how a language model writes",
      lead: "ChatGPT, Copilot, Claude and Gemini write by predicting, one piece at a time, the most plausible continuation. Build a sentence word by word, see the probabilities behind each choice, play with temperature and see how text becomes tokens.",
      tabGen: "1 · Generate text", tabTok: "2 · Tokens: how the model reads", tabProf: "For the trainer",
      pickStart: "Choose a starting point",
      textTitle: "The text the model is writing",
      lgHi: "very likely word", lgMid: "possible", lgLo: "unlikely",
      nWords: "Words generated:", pSentence: "Probability of this exact sentence:",
      histTitle: "Sentences generated in this session",
      histHint: "Try this: generate the same sentence several times with the temperature at 1.0 and compare.",
      nextTitle: "What will the next word be?",
      nextHelp: "Click a word to choose it, or let the model draw one according to the probabilities.",
      bPick: "Model chooses", bAuto: "Generate to the end", bStop: "Stop", bUndo: "Undo", bReset: "Start again",
      tempTitle: "Temperature:", t0: "0 · always the most likely", t1: "1 · as learned", t2: "2 · chaotic",
      tempHelp: "Temperature changes the probabilities before the draw: low values concentrate the choice on the most likely words, high values give unlikely words a chance.",
      tl0: "· deterministic", tl1: "· predictable", tl2: "· balanced", tl3: "· creative", tl4: "· chaotic",
      ended: "Sentence finished. Click <b>Start again</b> or choose another starting point.",
      endWord: "(end of sentence)", others: "others",
      probAt: "Probability when chosen", tempAt: "temperature", oneIn: "1 in ",
      fBad: "wrong fact", fChaos: "nonsense", fInv: "invented", fOk: "correct",
      xBad: "<b>Wrong fact</b> in this sentence, written with the same confidence as the correct one.",
      xChaos: "<b>The text lost its meaning</b> because a very unlikely word was chosen and, from then on, the model had no coherent continuation. This is the effect of high temperatures.",
      tokTitle: "The model reads neither letters nor words: it reads tokens",
      tokLead: "Before entering the model, the text is cut into pieces (tokens) and each piece becomes a number. Type something or pick an example.",
      kChars: "characters", kWords: "words", kOld: "tokens · GPT-4 (2023)", kNew: "tokens · GPT-4o (2024)",
      tokOld: "GPT-4 tokenizer (cl100k)", tokNew: "GPT-4o tokenizer (o200k)",
      tokWhy: "<b>Why does this matter?</b><ul><li>The limits and costs of these tools are measured in tokens, not words or pages.</li><li>Older tokenizers cut Portuguese into many more pieces than English; recent ones have greatly reduced that gap.</li><li>Because the model sees pieces rather than letters, tasks such as counting letters or exact rhymes can fail.</li></ul>",
      tokNote: "OpenAI's public tokenizers, running in your browser (nothing is sent anywhere). Claude, Gemini and others use their own tokenizers, on the same principle and with results of the same order of magnitude.",
      tokTip: "token no. ",
      guide: `<h2>Trainer's guide · 20 to 25 minutes</h2>
<p><b>Audience:</b> academic and non-academic staff who already use generative AI, with no technical background.<br>
<b>Goal:</b> understand that a language model generates text by predicting, word by word, the most plausible continuation, and draw practical consequences from that.</p>
<h3>Suggested sequence</h3>
<ol>
<li><b>Opening question (2 min):</b> "When ChatGPT answers, where does it get the answer from?" Collect hypotheses (the internet, a database, "it thinks"…).</li>
<li><b>Course unit assessment (4 min):</b> click word by word. Show that each step is a choice among candidates with probabilities.</li>
<li><b>Temperature (4 min):</b> repeat at 0, 1 and 2. At 0 the sentence is always the same; at 1 it varies; at 2 it loses its meaning. Look at the list of generated sentences.</li>
<li><b>1949 Nobel Prize (4 min):</b> the right answer (Egas Moniz) is the most likely, but not guaranteed. Generate several times at temperature 1.5 (or click "Alexander" directly) to show a wrong name written just as fluently.</li>
<li><b>Academic Regulations (4 min):</b> the model has never read the document, yet it writes a convincing article. This is how "hallucination" works.</li>
<li><b>Tokens (3 min):</b> compare Portuguese and English and the word "otorhinolaryngologist".</li>
<li><b>Wrap-up (3 min):</b> the five key messages below.</li>
</ol>
<h3>Key messages</h3>
<ul>
<li>The model <b>does not look anything up</b> in a database: it generates the most plausible continuation based on what it learned.</li>
<li><b>Plausible is not true.</b> An error comes out with the same fluency and confidence as a correct answer.</li>
<li>The same question can give different answers: there is a <b>random draw</b>, controlled by temperature.</li>
<li>About documents it does not know (internal regulations, school procedures), the model <b>makes things up</b>, unless we give it the document.</li>
<li>The model works with <b>tokens</b>: limits, costs and some failures are explained by that.</li>
</ul>
<h3>Discussion questions</h3>
<ul>
<li>In which of your daily tasks is "plausibility" enough? In which is it dangerous?</li>
<li>How would you check an answer about a regulation or an academic deadline?</li>
<li>Which temperature would you choose for an institutional email? And for brainstorming ideas for a class?</li>
</ul>
<h3>A note on rigour</h3>
<p class="note muted">The probabilities in tab 1 are <b>illustrative</b>: they were set by hand to reproduce the typical behaviour of a real model, and the simulation works with whole words to be easier to read (real models work with tokens, see tab 2). A real model considers tens of thousands of candidates at each step. The temperature formula is the one used in practice: probabilities are raised to 1/T and normalised. The tokenizers in tab 2 are the real ones published by OpenAI. The regulations scenario is deliberately invented and refers to no real document.</p>`,
      foot: "© Ciência e Letras — Formação Especializada, Lda. See the panel on the right for licence and citation.",
    },
    pt: {
      eyebrow: "Ciência e Letras · Ferramenta do laboratório",
      h1: "A máquina de prever a próxima palavra: como um modelo de linguagem escreve",
      lead: "O ChatGPT, o Copilot, o Claude e o Gemini escrevem prevendo, pedaço a pedaço, a continuação mais plausível. Construa uma frase palavra a palavra, veja as probabilidades por trás de cada escolha, experimente a temperatura e veja como o texto se transforma em tokens.",
      tabGen: "1 · Gerar texto", tabTok: "2 · Tokens: como o modelo lê", tabProf: "Para o formador",
      pickStart: "Escolha um ponto de partida",
      textTitle: "O texto que o modelo está a escrever",
      lgHi: "palavra muito provável", lgMid: "possível", lgLo: "improvável",
      nWords: "Palavras geradas:", pSentence: "Probabilidade desta frase exata:",
      histTitle: "Frases geradas nesta sessão",
      histHint: "Experiência: gere a mesma frase várias vezes com a temperatura em 1,0 e compare.",
      nextTitle: "Qual será a próxima palavra?",
      nextHelp: "Clique numa palavra para a escolher, ou deixe o modelo sortear de acordo com as probabilidades.",
      bPick: "Modelo escolhe", bAuto: "Gerar até ao fim", bStop: "Parar", bUndo: "Anular", bReset: "Recomeçar",
      tempTitle: "Temperatura:", t0: "0 · sempre a mais provável", t1: "1 · como aprendeu", t2: "2 · caótico",
      tempHelp: "A temperatura altera as probabilidades antes do sorteio: valores baixos concentram a escolha nas palavras mais prováveis, valores altos dão hipóteses às improváveis.",
      tl0: "· determinístico", tl1: "· previsível", tl2: "· equilibrado", tl3: "· criativo", tl4: "· caótico",
      ended: "Frase terminada. Clique em <b>Recomeçar</b> ou escolha outro ponto de partida.",
      endWord: "(fim da frase)", others: "outras",
      probAt: "Probabilidade no momento da escolha", tempAt: "temperatura", oneIn: "1 em ",
      fBad: "facto errado", fChaos: "sem sentido", fInv: "inventado", fOk: "correto",
      xBad: "<b>Facto errado</b> nesta frase, escrito com a mesma confiança que o facto certo.",
      xChaos: "<b>O texto perdeu o sentido</b> porque foi escolhida uma palavra muito improvável e, a partir daí, o modelo deixou de ter continuações coerentes. É o efeito de temperaturas altas.",
      tokTitle: "O modelo não lê letras nem palavras: lê tokens",
      tokLead: "Antes de entrar no modelo, o texto é cortado em pedaços (tokens) e cada pedaço é convertido num número. Escreva ou escolha um exemplo.",
      kChars: "caracteres", kWords: "palavras", kOld: "tokens · GPT-4 (2023)", kNew: "tokens · GPT-4o (2024)",
      tokOld: "Tokenizador GPT-4 (cl100k)", tokNew: "Tokenizador GPT-4o (o200k)",
      tokWhy: "<b>Porque é que isto importa?</b><ul><li>Os limites e os custos destas ferramentas medem-se em tokens, não em palavras ou páginas.</li><li>Os tokenizadores mais antigos cortavam muito mais o português do que o inglês; os mais recentes reduziram bastante essa diferença.</li><li>Como o modelo vê pedaços e não letras, tarefas como contar letras ou fazer rimas exatas podem falhar.</li></ul>",
      tokNote: "Tokenizadores públicos da OpenAI, a correr no seu browser (nada é enviado para a internet). Claude, Gemini e outros usam tokenizadores próprios, com o mesmo princípio e resultados da mesma ordem de grandeza.",
      tokTip: "token n.º ",
      guide: `<h2>Guião para o formador · 20 a 25 minutos</h2>
<p><b>Público:</b> docentes e não docentes que já usam IA generativa, sem formação técnica.<br>
<b>Objetivo:</b> compreender que um modelo de linguagem gera texto prevendo, palavra a palavra, a continuação mais plausível, e retirar daí consequências práticas.</p>
<h3>Sequência sugerida</h3>
<ol>
<li><b>Pergunta de abertura (2 min):</b> "Quando o ChatGPT responde, onde é que vai buscar a resposta?" Recolher hipóteses (internet, base de dados, "pensa"…).</li>
<li><b>Avaliação da UC (4 min):</b> clicar palavra a palavra. Mostrar que cada passo é uma escolha entre candidatas com probabilidades.</li>
<li><b>Temperatura (4 min):</b> repetir com 0, 1 e 2. Na temperatura 0 a frase é sempre igual; em 1 varia; em 2 perde o sentido. Ver a lista de frases geradas.</li>
<li><b>Prémio Nobel de 1949 (4 min):</b> a resposta certa (Egas Moniz) é a mais provável, mas não é garantida. Gerar várias vezes com temperatura 1,5 (ou clicar diretamente em "Alexander") para mostrar um nome errado escrito com a mesma fluência.</li>
<li><b>Regulamento Pedagógico (4 min):</b> o modelo nunca leu o documento, mas escreve um artigo convincente. É o mecanismo da "alucinação".</li>
<li><b>Tokens (3 min):</b> comparar português e inglês e a palavra "otorrinolaringologista".</li>
<li><b>Síntese (3 min):</b> as cinco mensagens-chave abaixo.</li>
</ol>
<h3>Mensagens-chave</h3>
<ul>
<li>O modelo <b>não consulta</b> uma base de dados: gera a continuação mais plausível com base no que aprendeu.</li>
<li><b>Plausível não é verdadeiro.</b> Um erro sai com a mesma fluência e confiança que um acerto.</li>
<li>A mesma pergunta pode dar respostas diferentes: há <b>sorteio</b>, controlado pela temperatura.</li>
<li>Sobre documentos que não conhece (regulamentos internos, processos da escola), o modelo <b>inventa</b>, a menos que lhe forneçamos o documento.</li>
<li>O modelo trabalha com <b>tokens</b>: limites, custos e algumas falhas explicam-se por aí.</li>
</ul>
<h3>Perguntas para discussão</h3>
<ul>
<li>Em que tarefas do seu dia a dia a "plausibilidade" é suficiente? Em quais é perigosa?</li>
<li>Como verificaria uma resposta sobre um regulamento ou um prazo académico?</li>
<li>Que temperatura escolheria para escrever um email institucional? E para gerar ideias para uma aula?</li>
</ul>
<h3>Nota de rigor</h3>
<p class="note muted">As probabilidades do separador 1 são <b>ilustrativas</b>: foram definidas à mão para reproduzir o comportamento típico de um modelo real, e a simulação trabalha com palavras inteiras para ser mais legível (os modelos reais trabalham com tokens, ver separador 2). Um modelo real considera dezenas de milhares de candidatas em cada passo. A fórmula da temperatura é a utilizada na prática: as probabilidades são elevadas a 1/T e normalizadas. Os tokenizadores do separador 2 são os reais, publicados pela OpenAI. O cenário do regulamento é deliberadamente inventado e não se refere a nenhum documento real.</p>`,
      foot: "© Ciência e Letras — Formação Especializada, Lda. Licença e citação no painel à direita.",
    },
  };
  const q = new URLSearchParams(location.search).get("lang");
  try { if (q === "pt" || q === "en") localStorage.setItem("celLang", q); } catch (e) {}
  const lang = () => ((document.documentElement.lang || "en").toLowerCase().startsWith("pt") ? "pt" : "en");
  const t = k => (T[lang()][k] ?? T.en[k] ?? k);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  function apply() {
    document.querySelectorAll("[data-t]").forEach(el => { el.textContent = t(el.dataset.t); });
    document.querySelectorAll("[data-h]").forEach(el => { el.innerHTML = t(el.dataset.h); });
    document.documentElement.setAttribute("data-applied", lang());
    document.dispatchEvent(new Event("langchange"));
  }
  new MutationObserver(apply).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  document.addEventListener("DOMContentLoaded", apply);
  g.PAGE = { T, t, esc, lang };
})(window);
