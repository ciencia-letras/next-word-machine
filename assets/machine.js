/* Next-word machine — simulation logic.
 * Probabilities are ILLUSTRATIVE (hand-set); temperature uses the real formula p^(1/T), normalised.
 * Option = [word, prob, next, flag]; next: {o:[...]} | continuation string | null (end); flag 'bad' = wrong fact. */
(function () {
  "use strict";
  const P = window.PAGE;
  const $ = id => document.getElementById(id);

  const DATA = {
    en: {
      absurd: ["giraffe","blue","yesterday","yes","banana","quantum","trombone","pyramid","danced","violet","already","marble","shoe","eclipse","butterfly","maybe","volcano"],
      S: {
        aval: { name: "Course unit assessment", prompt: "The final assessment for this course unit will be",
          insight: { cls: "", html: "<b>What happened?</b> The model does not \"know\" how this course unit is assessed. Step by step, it chose words that usually appear together in similar texts. The result is coherent and fluent, but it is a <b>plausible continuation</b>, not information about the course unit." },
          tree: { o: [
            ["based", .30, { o: [["on", .92, { o: [
              ["a", .45, "written exam and a group project."],
              ["continuous", .30, "assessment throughout the semester."],
              ["two", .15, "components: a test (60%) and a project (40%)."]]}]]}],
            ["a", .24, { o: [
              ["written", .50, "exam at the end of the semester."],
              ["final", .25, "exam worth 60% of the grade."],
              ["group", .15, "project with an oral presentation."]]}],
            ["held", .16, "at the end of the semester, on a date to be announced."],
            ["an", .12, "in-person written exam."],
            ["made", .08, "up of two parts: a test and a project."],
            ["announced", .05, "in the first week of classes."]]}},
        email: { name: "Email to students", prompt: "Dear student, please note that the deadline for",
          insight: { cls: "", html: "<b>What happened?</b> For routine texts, the \"most likely continuation\" is exactly what we want: correct, fluent administrative language. Notice, however, that <b>dates and deadlines are made up</b>: the model picks a plausible date, not the real one. We have to supply the facts." },
          tree: { o: [
            ["submitting", .30, { o: [
              ["your", .50, { o: [
                ["internship", .40, "report is 15 December."],
                ["assignment", .35, "has been extended to Friday."],
                ["application", .15, "is 30 November."]]}],
              ["the", .35, "final project is next Monday."]]}],
            ["paying", .20, { o: [
              ["tuition", .60, "fees is the 10th of each month."],
              ["the", .30, "second instalment is the end of the month."]]}],
            ["registering", .18, "for resit exams is this Friday."],
            ["course", .14, "enrolment is 20 September."],
            ["thesis", .10, "submission is 31 July."],
            ["applications", .05, "is tomorrow."]]}},
        nobel: { name: "1949 Nobel Prize", prompt: "The 1949 Nobel Prize in Medicine was awarded to",
          insight: { cls: "", html: "<b>What happened?</b> The right answer (Egas Moniz, shared with Walter Hess) is the <b>most likely</b> because it appears often in the texts the model learned from. But there is always some probability of a wrong name, and that error is written <b>with the same fluency and confidence</b>. Try generating several times at a high temperature." },
          tree: { o: [
            ["Egas", .58, { o: [["Moniz", .97, { o: [
              ["for", .46, "developing the prefrontal leucotomy."],
              ["and", .28, "Walter Hess."],
              [",", .16, "a Portuguese neurologist."]]}]]}],
            ["António", .14, "Egas Moniz and Walter Hess."],
            ["Walter", .07, "Hess and Egas Moniz."],
            ["two", .06, "researchers: Egas Moniz and Walter Hess."],
            ["a", .05, "Portuguese neurologist."],
            ["Alexander", .03, "Fleming for the discovery of penicillin.", "bad"],
            ["Santiago", .02, "Ramón y Cajal for his work on the nervous system.", "bad"]]}},
        regul: { name: "Academic Regulations", prompt: "According to Article 47 of our school's Academic Regulations, students", halluc: true,
          insight: { cls: "warn", html: "<b>Warning: this is a hallucination.</b> The model has never read these regulations (the article may not even exist), yet it writes a <b>convincing</b> rule in the right tone, because it has seen many similar regulations. The model <b>does not know that it does not know</b>. The fix: give the document to the model and ask it to quote the text, or always check the source." },
          tree: { o: [
            ["have", .29, { o: [
              ["the", .72, { o: [["right", .85, "to request a review of their exam within five working days."]]}],
              ["to", .20, "submit a justification within 48 hours."]]}],
            ["must", .25, "attend at least 75% of practical classes."],
            ["may", .19, "request a second assessment period."],
            ["who", .10, "miss an exam may apply for a resit."],
            ["are", .07, "required to justify every absence."],
            ["cannot", .05, "take more than two exams on the same day."]]}}
      },
      ex: {
        "English": "The final assessment of the course unit will be done through a written exam.",
        "Portuguese (same sentence)": "A avaliação final da unidade curricular será feita através de um exame escrito.",
        "Technical word": "Otorhinolaryngologist · Otorrinolaringologista",
        "Dates and numbers": "Egas Moniz received the Nobel Prize in Medicine in 1949; 2+2=4.",
        "Counting letters": "How many letters \"r\" are there in \"strawberry\"?"
      }
    },
    pt: {
      absurd: ["girafa","azul","ontem","sim","banana","quântico","trombone","pirâmide","dançou","violeta","já","mármore","sapato","eclipse","borboleta","talvez","vulcão"],
      S: {
        aval: { name: "Avaliação de uma UC", prompt: "A avaliação final da unidade curricular será",
          insight: { cls: "", html: "<b>O que aconteceu?</b> O modelo não \"sabe\" como é a avaliação desta UC. Escolheu, passo a passo, palavras que costumam aparecer juntas em textos semelhantes. O resultado é coerente e fluente, mas é uma <b>continuação plausível</b>, não informação sobre a UC." },
          tree: { o: [
            ["realizada", .34, { o: [
              ["através", .41, "de um exame escrito presencial."],
              ["em", .27, { o: [
                ["duas", .38, "fases: um teste escrito e um trabalho de grupo."],
                ["época", .24, "normal, com exame escrito."],
                ["formato", .20, "presencial, com consulta limitada."]]}],
              ["no", .14, "final do semestre, em data a definir."],
              ["por", .09, "meio de um trabalho individual."]]}],
            ["feita", .22, { o: [
              ["através", .45, "de um exame escrito."],
              ["com", .20, "base num trabalho prático."],
              ["por", .18, "exame e apresentação oral."]]}],
            ["composta", .15, { o: [
              ["por", .78, { o: [
                ["duas", .36, "componentes: teste (60%) e trabalho (40%)."],
                ["um", .30, "exame escrito e um projeto de grupo."],
                ["três", .14, "momentos de avaliação contínua."]]}],
              ["de", .15, "um teste e um trabalho prático."]]}],
            ["baseada", .09, "em avaliação contínua e num exame final."],
            ["efetuada", .07, "no final do semestre."],
            ["um", .03, "exame oral obrigatório."]]}},
        email: { name: "Email aos estudantes", prompt: "Caro(a) estudante, informamos que o prazo para",
          insight: { cls: "", html: "<b>O que aconteceu?</b> Para textos de rotina, a \"continuação mais provável\" é exatamente o que queremos: linguagem administrativa correta e fluente. Repare, porém, que <b>datas e prazos são inventados</b>: o modelo escolhe uma data plausível, não a data verdadeira. Os factos têm de ser dados por nós." },
          tree: { o: [
            ["a", .30, { o: [
              ["entrega", .48, { o: [
                ["do", .40, "relatório de estágio termina a 15 de dezembro."],
                ["dos", .30, "trabalhos foi prorrogado até sexta-feira."],
                ["da", .20, "documentação termina amanhã."]]}],
              ["submissão", .30, "das candidaturas termina a 30 de novembro."],
              ["inscrição", .15, "nos exames de recurso já está aberto."]]}],
            ["pagamento", .22, { o: [
              ["da", .55, "propina termina no dia 10 de cada mês."],
              ["das", .30, "propinas foi alargado até ao final do mês."]]}],
            ["inscrição", .18, "nas unidades curriculares termina a 20 de setembro."],
            ["entrega", .14, "dos trabalhos foi alterado."],
            ["submissão", .09, "da dissertação termina a 31 de julho."],
            ["o", .03, "pedido de equivalências está a decorrer."]]}},
        nobel: { name: "Prémio Nobel de 1949", prompt: "O Prémio Nobel da Medicina de 1949 foi atribuído a",
          insight: { cls: "", html: "<b>O que aconteceu?</b> A resposta certa (Egas Moniz, partilhado com Walter Hess) é a <b>mais provável</b>, porque aparece muitas vezes nos textos com que o modelo aprendeu. Mas há sempre alguma probabilidade de sair um nome errado, e esse erro é escrito <b>com a mesma fluência e confiança</b>. Experimente gerar várias vezes com temperatura alta." },
          tree: { o: [
            ["Egas", .58, { o: [["Moniz", .97, { o: [
              ["pelo", .46, "desenvolvimento da leucotomia pré-frontal."],
              ["e", .28, "Walter Hess."],
              [",", .16, "neurologista português."]]}]]}],
            ["António", .14, "Egas Moniz e Walter Hess."],
            ["Walter", .07, "Hess e Egas Moniz."],
            ["dois", .06, "investigadores: Egas Moniz e Walter Hess."],
            ["um", .05, "neurologista português."],
            ["Alexander", .03, "Fleming pela descoberta da penicilina.", "bad"],
            ["Ramón", .02, "y Cajal pelos estudos do sistema nervoso.", "bad"]]}},
        regul: { name: "Regulamento Pedagógico", prompt: "Segundo o artigo 47.º do Regulamento Pedagógico da nossa escola, o estudante", halluc: true,
          insight: { cls: "warn", html: "<b>Atenção: isto é uma alucinação.</b> O modelo nunca leu este regulamento (e o artigo pode nem existir), mas escreve uma regra <b>convincente</b>, no tom certo, porque já viu muitos regulamentos parecidos. O modelo <b>não sabe que não sabe</b>. Solução: fornecer o documento ao modelo e pedir que cite o texto, ou verificar sempre na fonte." },
          tree: { o: [
            ["tem", .29, { o: [
              ["direito", .72, { o: [
                ["a", .55, "requerer a revisão da prova no prazo de cinco dias úteis."],
                ["de", .20, "consultar a prova após a publicação das notas."]]}],
              ["de", .20, "apresentar justificação no prazo de 48 horas."]]}],
            ["deve", .25, "comparecer a pelo menos 75% das aulas práticas."],
            ["pode", .19, "solicitar uma segunda época de avaliação."],
            ["que", .10, "falte a uma prova pode requerer exame de recurso."],
            ["é", .07, "obrigado a justificar todas as faltas."],
            ["não", .05, "pode realizar mais de dois exames por dia."]]}}
      },
      ex: {
        "Português": "A avaliação final da unidade curricular será feita através de um exame escrito.",
        "Inglês (mesma frase)": "The final assessment of the course unit will be done through a written exam.",
        "Palavra técnica": "Otorrinolaringologista · Otorhinolaryngologist",
        "Datas e números": "Egas Moniz recebeu o Prémio Nobel da Medicina em 1949; 2+2=4.",
        "Contar letras": "Quantas letras \"r\" tem a palavra \"otorrinolaringologia\"?"
      }
    }
  };
  const TAIL_MASS = .008;
  const L = () => DATA[P.lang()];
  const S = () => L().S;

  /* ---------- State ---------- */
  let cur = "aval", T = .7, node = null, steps = [], hist = [], auto = null, chaos = 0, curOpts = [];

  function rng(seed) { let h = 2166136261; for (const c of seed) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
    return () => { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return ((h >>> 0) % 10000) / 10000; }; }
  function contNode(words, i, flag) {
    if (i >= words.length) return null;
    const p = i === words.length - 1 ? .93 : (.78 + ((words[i].length * 7) % 15) / 100);
    return { o: [[words[i], p, { _cont: words, _i: i + 1, _flag: flag }, flag]] };
  }
  function resolve(next, flag) {
    if (next === null || next === undefined) return null;
    if (typeof next === "string") return contNode(next.split(" "), 0, flag);
    if (next._cont) return contNode(next._cont, next._i, next._flag);
    return next;
  }
  function chaosNode() {
    const r = rng("chaos" + steps.length + steps.map(s => s.w).join());
    const pick = [...L().absurd].sort(() => r() - .5).slice(0, 6);
    const o = pick.map(w => [w, .1 + r() * .08, "__chaos"]);
    o.push([".", chaos >= 3 ? .35 : .06, null]);
    return { o, _chaos: true };
  }
  function options(n) {
    let o = n.o.map(a => ({ w: a[0], p: a[1], next: a[2], flag: a[3] }));
    const s = o.reduce((a, b) => a + b.p, 0);
    if (n._chaos) return o.map(x => ({ ...x, p: x.p / s }));
    o = o.map(x => ({ ...x, p: x.p / s * (1 - TAIL_MASS) }));
    const r = rng(cur + "|" + steps.map(s => s.w).join(" "));
    const tail = [...L().absurd].sort(() => r() - .5).slice(0, 5).map(w => ({ w, p: TAIL_MASS / 5, next: "__chaos", tail: true }));
    return o.concat(tail);
  }
  function temper(o) {
    if (T <= .001) { const m = Math.max(...o.map(x => x.p)); let done = false;
      return o.map(x => { const q = (!done && x.p === m) ? 1 : 0; if (q) done = true; return { ...x, q }; }); }
    const e = o.map(x => Math.pow(x.p, 1 / T)); const s = e.reduce((a, b) => a + b, 0);
    return o.map((x, i) => ({ ...x, q: e[i] / s }));
  }
  const dec = n => P.lang() === "pt" ? String(n).replace(".", ",") : String(n);
  function fmtPct(q) { if (q >= .995) return "100%"; if (q < .001) return "<" + dec("0.1") + "%"; return dec((q * 100).toFixed(q < .1 ? 1 : 0)) + "%"; }
  function color(q) { return q >= .4 ? "var(--ok)" : q >= .12 ? "#D9971A" : "var(--alert)"; }
  const isPunct = w => /^[.,;:!?%)]/.test(w);
  const joinWords = arr => arr.reduce((a, w) => a + (isPunct(w) ? "" : " ") + w, "");

  /* ---------- Render ---------- */
  function renderScen() {
    $("scen").innerHTML = Object.entries(S()).map(([k, v]) => `<button class="chip ${k === cur ? "on" : ""}" data-k="${k}">${P.esc(v.name)}</button>`).join("");
  }
  function renderText() {
    let h = `<span class="p">${P.esc(S()[cur].prompt)}</span>`;
    for (const st of steps) h += (isPunct(st.w) ? "" : " ") + `<span class="w" style="border-color:${color(st.q)}" title="${P.t("probAt")}: ${fmtPct(st.q)} (${P.t("tempAt")} ${dec(st.T.toFixed(1))})">${P.esc(st.w)}</span>`;
    if (node) h += '<span class="cursor"></span>';
    $("text").innerHTML = h;
    $("nw").textContent = steps.length;
    if (steps.length) { const pr = steps.reduce((a, b) => a * b.q, 1);
      $("pf").textContent = pr >= .5 ? fmtPct(pr) : P.t("oneIn") + Math.round(1 / pr).toLocaleString(P.lang() === "pt" ? "pt-PT" : "en-GB");
    } else $("pf").textContent = "—";
  }
  function renderCands() {
    const box = $("cands");
    if (!node) { box.innerHTML = `<p class="muted">${P.t("ended")}</p>`; curOpts = []; updBtns(); return; }
    const o = temper(options(node)); curOpts = o;
    const main = o.filter(x => !x.tail).sort((a, b) => b.q - a.q);
    const tail = o.filter(x => x.tail); const tq = tail.reduce((a, b) => a + b.q, 0);
    let h = main.map(x => `<button class="cand" data-i="${o.indexOf(x)}"><span class="lbl">${x.w === "." ? P.t("endWord") : P.esc(x.w)}</span><span class="bar"><i style="width:${(x.q * 100).toFixed(1)}%"></i></span><span class="pct">${fmtPct(x.q)}</span></button>`).join("");
    if (tail.length) h += `<button class="cand tail" data-tail="1" title="${tail.map(t => t.w).join(", ")}…"><span class="lbl">${P.t("others")}: ${P.esc(tail[0].w)}, ${P.esc(tail[1].w)}…</span><span class="bar"><i style="width:${(tq * 100).toFixed(1)}%"></i></span><span class="pct">${fmtPct(tq)}</span></button>`;
    box.innerHTML = h; updBtns();
  }
  function updBtns() {
    $("bPick").disabled = !node; $("bAuto").disabled = !node && !auto; $("bUndo").disabled = !steps.length || !!auto;
    $("bAuto").textContent = P.t(auto ? "bStop" : "bAuto");
  }
  function renderInsight() {
    const el = $("insight"), s = S()[cur];
    if (node) { el.className = "insight"; return; }
    let extra = "";
    if (steps.some(x => x.flag === "bad")) extra += `<p>${P.t("xBad")}</p>`;
    if (steps.some(x => x.chaos)) extra += `<p>${P.t("xChaos")}</p>`;
    el.className = "insight show " + (s.insight.cls || (extra ? "warn" : ""));
    el.innerHTML = s.insight.html + extra;
  }
  function renderHist() {
    $("hist").innerHTML = hist.map(h => {
      let f = "";
      if (h.bad) f += `<span class="flagp bad">${P.t("fBad")}</span>`;
      if (h.chaos) f += `<span class="flagp bad">${P.t("fChaos")}</span>`;
      if (h.halluc) f += `<span class="flagp inv">${P.t("fInv")}</span>`;
      if (!f && h.scen === "nobel") f = `<span class="flagp ok">${P.t("fOk")}</span>`;
      return `<li>${P.esc(h.text)}${f} <span class="t">· T=${dec(h.T.toFixed(1))}</span></li>`;
    }).join("");
    $("histhint").style.display = hist.length ? "none" : "block";
  }
  function render() { renderScen(); renderText(); renderCands(); renderInsight(); }

  /* ---------- Actions ---------- */
  function choose(opt) {
    if (!node || !opt) return;
    const isChaos = opt.next === "__chaos" || !!node._chaos;
    steps.push({ w: opt.w, q: opt.q, T, flag: opt.flag, chaos: isChaos, prev: node, prevChaos: chaos });
    if (isChaos) { chaos++; node = opt.next === null ? null : chaosNode(); }
    else node = resolve(opt.next, opt.flag);
    if (!node) finish();
    render();
  }
  function finish() {
    const s = S()[cur];
    hist.unshift({ text: s.prompt + joinWords(steps.map(x => x.w)), T, scen: cur,
      bad: steps.some(x => x.flag === "bad"), chaos: steps.some(x => x.chaos), halluc: !!s.halluc });
    hist = hist.slice(0, 12); renderHist(); stopAuto();
  }
  function sample() {
    if (!node) return; const o = curOpts.length ? curOpts : temper(options(node));
    let r = Math.random(), acc = 0;
    for (const x of o) { acc += x.q; if (r <= acc) { choose(x); return; } }
    choose(o[o.length - 1]);
  }
  function sampleTail() { const tail = curOpts.filter(x => x.tail); if (tail.length) choose(tail[Math.floor(Math.random() * tail.length)]); }
  function undo() { if (!steps.length) return; const st = steps.pop(); node = st.prev; chaos = st.prevChaos; render(); }
  function reset() { stopAuto(); node = S()[cur].tree; steps = []; chaos = 0; render(); }
  function stopAuto() { if (auto) { clearInterval(auto); auto = null; } updBtns(); }
  function toggleAuto() { if (auto) { stopAuto(); return; } if (!node) return;
    auto = setInterval(() => { if (!node) { stopAuto(); return; } sample(); }, 420); updBtns(); }
  function tempLabel() { return P.t(T === 0 ? "tl0" : T < .6 ? "tl1" : T <= 1.1 ? "tl2" : T < 1.6 ? "tl3" : "tl4"); }
  function setT(v) { T = +v; $("temp").value = T; $("tv").textContent = dec(T.toFixed(1)); $("tlab").textContent = tempLabel(); renderCands(); }

  /* ---------- Tokens ---------- */
  const PAL = ["#FFD8A8","#C5F6FA","#D0BFFF","#B2F2BB","#FFC9C9","#A5D8FF","#FFEC99","#EEBEFA"];
  let exKey = null;
  function showToks(enc, el) {
    const ids = enc.encode($("tin").value);
    el.innerHTML = ids.map((id, i) => `<span style="background:${PAL[i % PAL.length]}" title="${P.t("tokTip")}${id}">${P.esc(enc.decode([id]))}</span>`).join("");
    return ids.length;
  }
  function renderTok() {
    const t = $("tin").value;
    $("nchar").textContent = t.length;
    $("nword").textContent = (t.trim().match(/\S+/g) || []).length;
    if (window.TOK) { $("nold").textContent = showToks(window.TOK.cl100k, $("told")); $("nnew").textContent = showToks(window.TOK.o200k, $("tnew")); }
  }
  function renderTokEx(resetText) {
    const ex = L().ex, keys = Object.keys(ex);
    if (resetText || !exKey || !ex[exKey]) { exKey = keys[0]; $("tin").value = ex[exKey]; }
    $("tokex").innerHTML = keys.map(k => `<button class="chip ${k === exKey ? "on" : ""}" data-k="${P.esc(k)}">${P.esc(k)}</button>`).join("");
    renderTok();
  }

  /* ---------- Events ---------- */
  function init() {
    $("scen").addEventListener("click", e => { const b = e.target.closest(".chip"); if (!b) return; cur = b.dataset.k; reset(); });
    $("cands").addEventListener("click", e => { const b = e.target.closest(".cand"); if (!b || auto) return; if (b.dataset.tail) sampleTail(); else choose(curOpts[+b.dataset.i]); });
    $("bPick").onclick = sample; $("bAuto").onclick = toggleAuto; $("bUndo").onclick = undo; $("bReset").onclick = reset;
    $("temp").addEventListener("input", e => setT(e.target.value));
    $("tabs").addEventListener("click", e => { const b = e.target.closest("button[data-tab]"); if (!b) return;
      document.querySelectorAll("#tabs button").forEach(x => x.setAttribute("aria-selected", x === b ? "true" : "false"));
      document.querySelectorAll(".tab").forEach(t => t.classList.toggle("on", t.id === "tab-" + b.dataset.tab)); });
    $("tokex").addEventListener("click", e => { const b = e.target.closest(".chip"); if (!b) return; exKey = b.dataset.k; $("tin").value = L().ex[exKey]; renderTokEx(false); });
    $("tin").addEventListener("input", renderTok);
    let lastLang = null;
    document.addEventListener("langchange", () => {
      const lg = P.lang();
      if (lg !== lastLang) { lastLang = lg; hist = []; renderHist(); setT(T); reset(); renderTokEx(true); }
      else { setT(T); render(); renderHist(); }
    });
    window.__app = { choose, sample, reset, setT, get steps() { return steps; }, get node() { return node; }, get hist() { return hist; }, setScen(k) { cur = k; reset(); } };
  }
  init(); // scripts are at the end of <body>: the DOM is ready; must attach before app.js fires "langchange"
})();
