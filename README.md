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
