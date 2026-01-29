# 📝 To-Do List Full Stack - Refatoração e Evolução de Arquitetura

Este projeto é uma aplicação completa de gerenciamento de tarefas. Originalmente desenvolvido com uma estrutura relacional (MySQL), o sistema passou por uma **refatoração profunda de arquitetura** para adotar tecnologias mais modernas, escaláveis e prontas para o ambiente de produção no servidor da **ForjaCorp**.

## 🚀 New Feature: Transição de Arquitetura (SQL para NoSQL)
O projeto deu um salto tecnológico! Migramos de uma base estruturada em **MySQL** para um ecossistema **NoSQL** com **MongoDB**, focado em performance e flexibilidade de dados.

**O que mudou na prática?**
* **⚡ Flexibilidade de Schema:** Adeus tabelas rígidas! Agora utilizamos documentos JSON (BSON) via **Mongoose**, permitindo que a aplicação evolua sem a necessidade de migrações complexas.
* **🐳 Dockerized Infrastructure:** O banco de dados agora é orquestrado via **Docker Compose**, garantindo que o ambiente de desenvolvimento seja idêntico ao de produção.
* **🏗️ Refatoração de Modelos:** Reescrita total da camada de `models` e `controllers`, trocando queries SQL por métodos assíncronos modernos.

## 🛠️ Tecnologias Utilizadas

### **Back-end**
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

### **Front-end**
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

### **Infraestrutura**
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

---

## 📂 Estrutura do Projeto
```text
├── Front-end/          # Interface do Usuário (Vanilla JS)
├── Back-end/           # API REST (Node.js/Express)
│   ├── src/
│   │   ├── controllers/# Lógica de controle e respostas
│   │   ├── models/     # Conexão e Schemas (Mongoose)
│   │   ├── middlewares/# Validações (ObjectIDs e Body)
│   │   └── router.js   # Definição dos endpoints
│   ├── .env            # Variáveis de ambiente
│   └── docker-compose.yml
