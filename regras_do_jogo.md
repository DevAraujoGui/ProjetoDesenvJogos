# Manual do Auditor Fiscal: Fiscal vs Sonegador

Bem-vindo ao simulador de auditoria **Fiscal vs Sonegador**. Neste jogo, você atuará como um auditor de elite da Receita Federal e terá 60 segundos para analisar os dados de diversas empresas e decidir se elas são idôneas ou sonegadoras.

## Como Funciona

Para cada empresa exibida, você receberá um conjunto de dados. Estes dados vêm de declarações da própria empresa (Faturamento e Despesas Declaradas) e de cruzamentos com inteligência artificial, COAF e Receita Federal (Movimentação Bancária e Evolução Patrimonial dos Sócios).

A sua missão é cruzar essas informações para identificar possíveis fraudes e decidir:

*   **Regular (Verde):** A empresa parece estar operando de forma lícita, com os indicadores em harmonia.
*   **Fiscalizar (Vermelho):** Os dados indicam indícios de fraude e sonegação. A empresa deve ser multada!

---

## Os Indicadores

Aqui está o que significa cada linha de dados que aparecerá na tela:

### Dados Declarados (O que a empresa diz)
1.  **Faturamento Declarado:** O valor das vendas emitidas em notas fiscais pela empresa.
2.  **Despesas Declaradas:** O valor dos custos operacionais e administrativos que a empresa reportou.
3.  **Lucro Declarado:** A simples matemática de (Faturamento - Despesas). É sobre esse valor que o imposto é calculado.

### Cruzamento de Dados (O que o sistema descobriu)
4.  **Movimentação Bancária:** O dinheiro que *realmente circulou* nas contas bancárias da empresa, segundo o Banco Central (COAF). 
5.  **Evolução Patrimonial:** O aumento da riqueza pessoal dos donos da empresa no mesmo período, segundo o Imposto de Renda Pessoa Física (IRPF).

---

## Tipos de Casos que Você Vai Encontrar

Sua missão é identificar anomalias. Existem três tipos de empresas no jogo:

### 1. A Empresa Idônea (Honesta)
*   **Perfil:** Os dados estão consistentes e fazem sentido.
*   **Sinais:** A Movimentação Bancária é próxima ao Faturamento Declarado (pode ser um pouco maior por transações internas ou menor por recebimentos futuros, mas está na mesma faixa). A Evolução Patrimonial dos Sócios faz sentido e representa apenas uma parcela do Lucro Declarado (pois eles tiram dividendos, mas não retiram 100% do caixa da empresa).
*   **Ação Correta:** **Regular**.

### 2. O Sonegador por Subfaturamento ("Caixa 2")
*   **Perfil:** A empresa vende sem emitir nota fiscal para pagar menos imposto.
*   **Sinais:** O Faturamento Declarado é baixo, mas a **Movimentação Bancária é desproporcionalmente alta**. O sistema do COAF flagrou dinheiro entrando que não está justificado pelas notas fiscais. Como o dinheiro não está nas notas, o imposto pago foi bem menor do que deveria.
*   **Ação Correta:** **Fiscalizar**.

### 3. O Sonegador por Despesas Falsas ("Notas Frias")
*   **Perfil:** A empresa declara todo o faturamento corretamente, mas inventa despesas fantasmas ou "notas frias" de fornecedores que não existem, inflando as Despesas Declaradas.
*   **Sinais:** O Lucro Declarado é próximo de R$ 0 (ou seja, a empresa supostamente não ganhou dinheiro). Contudo, você vai notar que a **Evolução Patrimonial dos Sócios cresceu absurdamente**, mesmo a empresa não tendo "lucro". O dinheiro foi desviado da empresa direto para os sócios antes da tributação.
*   **Ação Correta:** **Fiscalizar**.

---

## Sistema de Pontuação

*   **Acertar Sonegadores:** Ao fiscalizar um sonegador real, o governo recupera o imposto devido mais uma **multa de 100%**. Sua arrecadação dispara.
*   **Acertar Idôneas:** Confirmar que uma empresa está regular garante um bônus de eficiência para o seu escore.
*   **Deixar Passar:** Clicar "Regular" em uma empresa sonegadora é um erro grave. Você perde pontos pesados como penalidade por ineficiência.
*   **Falso Positivo:** Fiscalizar uma empresa limpa gera um custo operacional e reduz um pouco a sua arrecadação.

Lembre-se de ficar de olho na sua **Taxa de Acertos**, pois ela é crucial para subir de patente no ranking ao final de 60 segundos.

Boa sorte, Auditor! O país conta com você.
