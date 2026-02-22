# 💻 FitVale - Refatoração do TCC

Este repositório contém a versão refatorada do meu Trabalho de Conclusão de Curso (TCC), com melhorias no design, organização do código e estrutura geral do sistema.

O projeto consiste em uma aplicação mobile integrada com API e banco de dados, desenvolvida com foco em boas práticas de desenvolvimento, usabilidade e organização arquitetural.

---

## 🎓 Sobre o Projeto (TCC)

Este projeto foi desenvolvido como parte do meu Trabalho de Conclusão de Curso, sendo posteriormente refatorado para:
- Melhorar a estrutura do código
- Aprimorar o design da interface (UI/UX)
- Organizar melhor as funcionalidades do sistema
- Tornar o projeto mais escalável e profissional

A refatoração incluiu ajustes no front-end, integração com API e organização do banco de dados.

---

## 🚀 Funcionalidades Principais

- Tela inicial (Home) com design moderno
- Listagem dinâmica de instrutores (via API)
- Melhor comunicação com instrutores (via Chat)
- Funcionalidade que permite aos usuários montar treinos personalizados de forma autônoma.
- Funcionalidade que permite aos usuários solicitar ficha de treino ao instrutor
- Módulo de gestão de pagamentos que permite visualizar, controlar e acompanhar pagamentos realizados e futuros.

---

## 🛠️ Tecnologias Utilizadas

### 📱 Front-end (Mobile)
- React Native
- JavaScript
- AsyncStorage
- Componentização

### 🌐 Back-end
- PHP (API REST)
- Integração com requisições HTTP (fetch)

### 🗄️ Banco de Dados
- MySQL (Script SQL disponível na raiz do projeto)

---

## 🔄 Refatoração Realizada

Esta versão do projeto passou por uma refatoração completa, incluindo:
- Reorganização das telas
- Padronização do código
- Melhoria na UI/UX
- Otimização da comunicação com a API
- Melhor separação de responsabilidades (components, services, screens)
- Adição de comentários e estrutura mais limpa

---

## ⚠️ Como executar o projeto

1. Clonar o repositório
   ``` bash
    git clone https://github.com/vgmandira7/FitVale.git
   ```
2. Entrar na pasta do projeto.
   ``` bash
    cd appFitVale
   ```
3. Instalar dependências.
   ``` bash
    npm install
   ```
4. Importar o arquivo .sql encontrado na raiz desse projeto no MySQL
   
5. Ajustar o IP da API no arquivo
   ``` bash
   Services/ipConfig.js
   ```
6. Ter o XAMPP instalado e manter os serviços Apache e MySQL devidamente iniciados para o funcionamento do servidor e do banco de dados.
   ``` bash
    https://www.apachefriends.org/pt_br/download.html
   ```
7. Localize o arquivo .zip chamado pam3etim na raiz do projeto, mova-o para a pasta
   ```bash
   xampp/htdocs
   ```
    e, em seguida, extraia o conteúdo dentro desse diretório.

8. Executar o projeto.
    ``` bash
    npm start
   ```



