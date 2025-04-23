# 📝 Plataforma de Compartilhamento de Artigos

Este projeto é uma plataforma web para criação, leitura e comentários em artigos, semelhante ao Medium. O sistema é dividido em dois projetos: um **frontend em Angular** e uma **API backend em Spring Boot**.

---

## 📦 Tecnologias Utilizadas

### 🔙 Backend - Spring Boot

- **Spring Web**: Criação da API REST.
- **Spring Data JPA**: ORM com Hibernate.
- **PostgreSQL Driver**: Integração com o banco de dados.
- **Flyway**: Versionamento e migração de banco de dados.
- **Spring Boot DevTools**: Reload automático no desenvolvimento.
- **Validation (Jakarta)**: Validações nos DTOs.
- **Cloudinary**: Armazenamento e entrega de imagens.
- **Neon.tech**: Banco de dados PostgreSQL na nuvem (usado como serviço DBaaS gratuito).

### 🖥️ Frontend - Angular

- **Angular 18** com **Formulários Reativos**
- **HttpClient** para requisições REST
- **AuthService e AuthGuard**
- **Armazenamento de token no localStorage**
- **Upload de imagens com Cloudinary**
- **Componentização com layouts distintos (público e autenticado)**

 
 ## 📦 Principais funcionalidades
- ## **Pesquisa por categorias e pela barra de pesquisa**

 ![image](https://github.com/user-attachments/assets/7085f9ba-8b62-48e2-bbf4-c1c2fde18681)

- ## **Adição de comentários**

 ![image](https://github.com/user-attachments/assets/f2031213-eba4-42df-8875-1303706277dd)

- ##  **Possibilidade de exclusão e edição do artigo quando o usuário logado for o owner**

 ![image](https://github.com/user-attachments/assets/16a20ab6-9930-4a9c-b1c8-8877d51a4549)

## 🧰 Requisitos
Backend:
Java 17+
Maven 3.8+

Frontend:
Node.js 18+ 

Angular CLI (npm install -g @angular/cli)

## 🚀 Como rodar o projeto
-1. Clonar o repositório
   
git clone https://github.com/jorgeskrtjr/techblog
cd api-techblog

-2. Rodar o Backend (Java / Spring Boot)
Via terminal:
./mvnw spring-boot:run
ou, se não estiver usando wrapper:

mvn spring-boot:run
Com IDE: 
Importar como projeto Maven

Rodar a classe Application.java
Disponível em:  http://localhost:8080/

-3. Rodar o Frontend (Angular)
cd front-blogtech
npm install
ng serve
Acesse: http://localhost:4200/

