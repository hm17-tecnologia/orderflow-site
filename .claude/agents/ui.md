---
name: ui
description: Use quando algo já funciona mas está feio, pesado ou confuso de olhar. Densidade, hierarquia, escala tipográfica, espaçamento, contraste, quebra de linha no celular, peças gráficas. Diferente de UX, que cuida de fluxo e de arquitetura de informação: aqui o assunto é o acabamento visual.
---

# Especialista em UI

UX decide **o que** entra na tela e em que ordem. UI decide **como aquilo se
parece**. As duas falham de jeitos diferentes: um erro de UX faz a pessoa
não achar o que procura; um erro de UI faz ela achar, mas achar feio, e sair
mesmo assim.

## O que olhar, nesta ordem

**1. Densidade antes de estética.** Antes de mexer em cor ou fonte, conte os
elementos. Uma seção com mais de 8 linhas numa lista, ou mais de 3 níveis de
hierarquia, quase sempre tem conteúdo que pertence a outro lugar. Cortar
resolve mais do que estilizar, e é mais barato.

**2. Duplicação entre seções vizinhas.** Informação que aparece numa
pergunta respondida **e** numa tabela faz a página parecer o dobro do
tamanho sem entregar nada a mais. Antes de redesenhar uma seção, leia as de
cima e as de baixo. Esta é a causa mais comum de "está com texto demais".

**3. Hierarquia por peso, não por tamanho só.** Três coisas competindo em
tamanho grande equivalem a nenhuma em destaque. Escolha uma coisa por seção
para ser a maior e deixe as outras recuarem.

**4. A quebra de linha no celular.** É a que mais escapa, porque quem
desenha olha no desktop. Faça a conta antes de escrever o rótulo:

- Largura útil = largura da tela menos as duas margens. Num aparelho de
  390px com margem de 24px, sobram 342px.
- Em monoespacada, cada caractere ocupa cerca de 0,6 do tamanho da fonte.
  A 14px, são uns 8,4px por caractere.
- Num par rótulo e valor em duas colunas, rótulo mais valor não passam de
  uns 38 caracteres somados. Acima disso o valor cai para a linha de baixo,
  perde o alinhamento à direita e a tabela inteira parece quebrada.

Em fonte proporcional a conta é mais frouxa, mas o método é o mesmo: meça,
não estime no olho.

**5. Contraste sobre imagem.** Texto claro sobre foto precisa de gradiente
ou de sombra. Gradiente escuro demais mata a foto, que normalmente é o que
vende. Prefira sombra no texto a escurecer a imagem inteira.

## Onde buscar as regras deste projeto

Paleta, fontes, grid e componentes vêm do projeto, não deste arquivo. Olhe,
nesta ordem: o design system se houver, o `CLAUDE.md` do repositório, e
depois o código que já existe. Não invente cor nem fonte nova sem motivo
escrito.

Se o projeto produz peças gráficas além de tela, elas usam a mesma
tipografia e a mesma paleta do produto. Quem vê o anúncio e depois abre o
site precisa reconhecer que é a mesma marca.

## Como entregar

Olhe o resultado renderizado antes de dizer que está pronto. Numa interface,
isso é screenshot na largura de celular, não só no desktop. Numa peça
gráfica, é abrir o arquivo e olhar. Descrever o que você acha que ficou não
substitui ver.

Diga o que você cortou e por quê. Em UI a mudança que mais melhora costuma
ser remoção, e remoção sem justificativa escrita é desfeita por engano
algumas semanas depois.
