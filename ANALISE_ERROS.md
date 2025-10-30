# Análise de Erros - Tessera Amoris

## Data: 30 de outubro de 2025

---

## PROBLEMA 1: Bandeiras com texto PY/EU aparecendo

### Causa Raiz Identificada

O problema está no arquivo **`js/flag-renderer.js`**. Este JavaScript está sendo executado e **adicionando elementos `<img>` dentro dos badges**, mesmo com os atributos `alt` removidos.

**Linha 51-52 e 83-84 do flag-renderer.js:**
```javascript
flagImg.style.cssText = 'position:absolute;left:6px;top:50%;transform:translateY(-50%);width:16px;height:11px;';
// flagImg.alt = 'PY'; // REMOVED - was causing PY text to appear
```

### O Problema Real

Mesmo que o atributo `alt` tenha sido removido, o JavaScript está:

1. **Criando elementos `<img>` e inserindo no DOM** (linhas 58 e 90)
2. **Manipulando o CSS `::before`** que já contém os emojis das bandeiras
3. **Causando conflito** entre o CSS (que usa `::before` com emojis) e o JavaScript (que adiciona `<img>`)

### Por que funciona localmente mas não no servidor?

- **Localmente**: O JavaScript pode não estar sendo executado corretamente ou o cache está mostrando uma versão antiga
- **No servidor (Vercel)**: O JavaScript está sendo executado completamente, causando o conflito

---

## PROBLEMA 2: Botão "Start Your Legacy" não muda texto no hover

### Causa Raiz Identificada

O CSS está **tecnicamente correto**, mas pode haver conflitos de especificidade ou problemas de z-index.

**Análise do button-text-transition-FORCE.css:**

1. ✅ O `::after` com `content: 'Build Your Bond'` está definido (linha 44)
2. ✅ A transição de opacidade e transform está configurada (linhas 53-55)
3. ✅ O hover está ativando a mudança (linhas 68-73)

### Possível Problema

O arquivo **`css/hero-enhanced.css`** pode estar sobrescrevendo os estilos, mesmo com `!important`, devido à ordem de carregamento ou especificidade ainda maior.

---

## SOLUÇÕES PROPOSTAS

### Solução 1: Remover completamente o flag-renderer.js

O CSS já está fazendo o trabalho corretamente com `::before`. O JavaScript está causando conflito desnecessário.

**Ação:**
- Remover a linha `<script src="js/flag-renderer.js"></script>` do index.html
- OU desabilitar completamente a função `useFlagImages()` no JavaScript

### Solução 2: Verificar e corrigir conflitos no hero-enhanced.css

Verificar se há estilos no `hero-enhanced.css` que estão sobrescrevendo o botão.

**Ação:**
- Analisar o arquivo `css/hero-enhanced.css`
- Garantir que não há estilos conflitantes para `.hero-btn`

### Solução 3: Simplificar a estrutura do botão

A estrutura atual é complexa:
```html
<a href="application.html" class="btn hero-btn">
    <span class="gradient-overlay"></span>
    <span class="white-overlay"></span>
    <span class="btn-text">Start Your Legacy</span>
</a>
```

Pode ser simplificada para reduzir conflitos de z-index.

---

## PRÓXIMOS PASSOS

1. ✅ Remover o script flag-renderer.js do index.html
2. ✅ Verificar hero-enhanced.css para conflitos
3. ✅ Testar as correções localmente
4. ✅ Fazer commit e deploy no Vercel
5. ✅ Verificar no site ao vivo

---

## OBSERVAÇÕES TÉCNICAS

- O problema NÃO é de cache do Vercel/CDN (já foi testado com hard refresh e modo anônimo)
- O problema NÃO é de ordem de carregamento de CSS (os arquivos FORCE estão por último)
- O problema É de conflito entre JavaScript e CSS (bandeiras) e possivelmente especificidade CSS (botão)
