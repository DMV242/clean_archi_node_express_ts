# Clean Architecture - Node.js Express TypeScript

Un projet d'implémentation de **Clean Architecture** avec Node.js, Express et TypeScript. Ce projet démontre les principes fondamentaux de l'architecture logicielle propre avec une séparation claire des responsabilités et une modularité maximale.

---

## Objectif du Projet

Ce projet est une implémentation éducative des principes de **Clean Architecture** (proposée par Robert C. Martin). Il illustre comment structurer une application backend avec :

- Séparation claire des couches (Domain → Application → Infrastructure)
- Architecture modulaire et indépendante
- Dépendances injectées et testables
- Entités métier avec logique encapsulée
- Patterns de conception (Repository, Use Case)

---

## Architecture

### Vue d'ensemble de la structure

```
src/
├── modules/                                  # Modules métier (Domain-Driven Design)
│   ├── library/                              # Module Gestion de Bibliothèque
│   │   ├── domain/                           # Couche Métier (Business Logic)
│   │   │   ├── entities/
│   │   │   │   └── Book.ts                  # Entité domaine Book
│   │   │   └── repositories/
│   │   │       └── IBookRepository.ts       # Interface du repository
│   │   │
│   │   ├── application/                      # Couche Application (Use Cases)
│   │   │   ├── dtos/                        # Data Transfer Objects
│   │   │   └── use_cases/
│   │   │       ├── AddBookUseCase.ts
│   │   │       ├── RetrieveOneBookUseCase.ts
│   │   │       ├── RetrieveAllBooksUseCase.ts
│   │   │       ├── UpdateOneBookUseCase.ts
│   │   │       └── DeleteOneBookUseCase.ts
│   │   │
│   │   └── infrastructure/                   # Couche Infrastructure
│   │       ├── repositories/
│   │       │   └── PrismaBookRepository.ts   # Implémentation Prisma
│   │       └── webserver/
│   │           ├── controllers/
│   │           │   └── BookController.ts
│   │           └── routes/
│   │               └── bookRoutes.ts
│   │
│   └── security/                             # Module Authentification
│       ├── domain/                           # Couche Métier
│       │   ├── entities/
│       │   └── repositories/
│       ├── application/                      # Couche Application
│       │   └── use_cases/
│       │       ├── SignUpUseCase.ts
│       │       └── SignInUseCase.ts
│       └── infrasctructure/                  # Couche Infrastructure
│           ├── repositories/
│           │   └── UserRepository.ts
│           ├── password_encoder/
│           │   └── Argon2Encoder.ts
│           ├── token_encoder/
│           │   └── JwtTokenEncoder.ts
│           └── webserver/
│               ├── controllers/
│               │   └── SecurityController.ts
│               └── routes/
│                   └── SecurityRoutes.ts
│
└── shared/                                   # Utilitaires Partagés
    ├── errors/                               # Gestion des erreurs
    └── middlewares/                          # Middlewares globaux

prisma/
├── schema.prisma                             # Schéma de base de données
└── migrations/                               # Migrations Prisma
```

---

## Les 3 Couches de Clean Architecture

### Couche Domain (Métier)

**Responsabilité :** Logique métier, règles d'affaires

```typescript
// src/modules/library/domain/entities/Book.ts
export class Book {
  constructor(
    private title: string,
    private author: string,
    private genre: string,
    private isAvailable = true
  ) {}

  getTitle(): string { return this.title; }
  getAuthor(): string { return this.author; }
  getIsAvailable(): boolean { return this.isAvailable; }

  toObject() {
    return { title: this.title, author: this.author, ... };
  }
}
```

Caractéristiques :
- Entités métier avec logique encapsulée
- Interfaces de repository (contrats)
- Pas de dépendances externes

### Couche Application (Use Cases)

**Responsabilité :** Orchestrer la logique métier

```typescript
// src/modules/library/application/use_cases/AddBookUseCase.ts
export class AddBookUseCase {
  constructor(bookRepository: IBookRepository) {
    this.bookRepository = bookRepository;
  }

  async execute(bookData: BookProps): Promise<BookProps> {
    const book = new Book(bookData.title, bookData.author, ...);
    return await this.bookRepository.add(book);
  }
}
```

Caractéristiques :
- Cas d'utilisation métier
- Injection de dépendances
- Pas de logique métier supplémentaire

### Couche Infrastructure (Frameworks & Drivers)

**Responsabilité :** Implémentations techniques

```typescript
// src/modules/library/infrastructure/repositories/PrismaBookRepository.ts
export class PrismaBookRepository implements IBookRepository {
  async add(book: Book): Promise<BookProps> {
    // Implémentation Prisma
  }
}

// src/modules/library/infrastructure/webserver/controllers/BookController.ts
export class BookController {
  async addBook(req: Request, res: Response) {
    const result = await this.addBookUseCase.execute(req.body);
    res.json(result);
  }
}
```

Caractéristiques :
- Implémentations Prisma, Express
- Controllers HTTP
- Routes

---

## Modèles de Données

### Book

```prisma
model Book {
  id          String    @id @default(uuid())
  title       String
  genre       String
  author      String
  isAvailable Boolean
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}
```

### User

```prisma
model User {
  id        String    @id @default(uuid())
  email     String    @unique
  password  String    # Hasé avec Argon2
  firstName String
  lastName  String
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}
```

---

## API Endpoints

### Module Bibliothèque

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/books` | Créer un nouveau livre |
| GET | `/api/books/:id` | Récupérer un livre |
| GET | `/api/books` | Récupérer tous les livres |
| PUT | `/api/books/:id` | Mettre à jour un livre |
| DELETE | `/api/books/:id` | Supprimer un livre |

### Module Authentification

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/signup` | Créer un compte utilisateur |
| POST | `/api/auth/signin` | Se connecter |

---

## Stack Technique

### Dépendances Principales

```json
{
  "express": "^4.21.1",           // Framework web
  "@prisma/client": "^5.22.0",    // ORM base de données
  "jsonwebtoken": "^9.0.2",       // Authentification JWT
  "argon2": "^0.41.1",            // Hachage des mots de passe
  "class-validator": "^0.14.1",   // Validation des données
  "class-transformer": "^0.5.1",  // Transformation DTO
  "dotenv": "^16.4.5"             // Configuration d'environnement
}
```

### Outils de Développement

```json
{
  "typescript": "^5.6.3",         // Langage principal
  "ts-node": "^10.9.2",           // Exécution TypeScript
  "nodemon": "^3.1.7",            // Auto-reload
  "prisma": "^5.22.0"             // CLI Prisma
}
```

---

## Installation et Configuration

### 1. Cloner le repository

```bash
git clone https://github.com/DMV242/clean_archi_node_express_ts.git
cd clean_archi_node_express_ts
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer l'environnement

Créer un fichier `.env` à la racine :

```env
# Port du serveur
PORT=3000

# JWT
JWT_SECRET=votre_cle_secrete_jwt_tres_longue_et_complexe

# Base de données
DATABASE_URL="file:./dev.db"
```

### 4. Initialiser la base de données

```bash
npx prisma migrate dev --name init
```

---

## Commandes Disponibles

```bash
# Démarrage en mode développement avec rechargement automatique
npm run nodemon

# Compilation TypeScript avec watch
npm run tsc

# Démarrage en production
npm start

# Exécuter les tests (actuellement non configurés)
npm test
```

---

## Principes de Clean Architecture Appliqués

### 1. Indépendance des Frameworks

La logique métier ne dépend pas d'Express, Prisma ou JWT. Cela permet de changer facilement de framework.

### 2. Testabilité

Grâce à l'injection de dépendances, les tests deviennent simples :

```typescript
const mockRepository = new MockBookRepository();
const useCase = new AddBookUseCase(mockRepository);
const result = await useCase.execute(testData);
```

### 3. Pattern Repository

Interface de repository (contrat) :

```typescript
interface IBookRepository {
  add(book: Book): Promise<BookProps>;
  retrieveOne(id: String): Promise<BookProps>;
  deleteOne(id: String): Promise<void>;
}

// Implémentation Prisma (détail d'implémentation)
class PrismaBookRepository implements IBookRepository {
  async add(book: Book): Promise<BookProps> {
    // Logique Prisma
  }
}
```

### 4. Entités Métier

Logique métier encapsulée :

```typescript
export class Book {
  constructor(title, author, genre, isAvailable = true) { }
  
  getTitle(): string { return this.title; }
  getIsAvailable(): boolean { return this.isAvailable; }
  toObject() { /* ... */ }
}
```

### 5. Use Cases

Chaque opération métier correspond à un Use Case :

```typescript
export class AddBookUseCase {
  async execute(bookData: BookProps): Promise<BookProps> {
    const book = new Book(...);
    return await this.bookRepository.add(book);
  }
}
```

### 6. Injection de Dépendances

Composition du root (src/index.ts) :

```typescript
const bookRepository = new PrismaBookRepository();
const addBookUseCase = new AddBookUseCase(bookRepository);
const bookController = new BookController(addBookUseCase, ...);
```

---

## Avantages de cette Architecture

| Avantage | Description |
|----------|-------------|
| Maintenabilité | Code organisé et facile à comprendre |
| Testabilité | Logique métier isolée et testable |
| Scalabilité | Facile d'ajouter de nouveaux modules |
| Flexibilité | Échange facile de dépendances |
| Indépendance | Métier indépendant des frameworks |
| Réutilisabilité | Use cases réutilisables |

---

## Structure d'un Module Complet

Pour ajouter un nouveau module (ex: `User Management`), suivre ce template :

```
src/modules/user-management/
├── domain/
│   ├── entities/
│   │   └── User.ts
│   └── repositories/
│       └── IUserRepository.ts
├── application/
│   ├── dtos/
│   │   └── CreateUserDTO.ts
│   └── use_cases/
│       ├── CreateUserUseCase.ts
│       └── GetUserUseCase.ts
└── infrastructure/
    ├── repositories/
    │   └── PrismaUserRepository.ts
    └── webserver/
        ├── controllers/
        │   └── UserController.ts
        └── routes/
            └── userRoutes.ts
```

---

## Flux de Requête

```
Client Request
    ↓
Express Route
    ↓
Controller (Extract Data)
    ↓
Use Case (Execute Business Logic)
    ↓
Domain Entity (Apply Business Rules)
    ↓
Repository Interface (Abstraction)
    ↓
Repository Implementation (Prisma)
    ↓
Database (SQLite)
    ↓
Response ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ←
```

---

## Contribution

Trouvé un bug ou une amélioration ? N'hésitez pas à créer une issue ou une pull request !

---

## Licence

ISC

---

## Auteur

David MVOULA

---

## Prochaines Étapes

- [ ] Ajouter des tests unitaires (Jest)
- [ ] Implémenter des tests d'intégration
- [ ] Ajouter des DTOs avec validation
- [ ] Implémenter la pagination pour les listes
- [ ] Ajouter la gestion d'erreurs globale
- [ ] Créer une documentation API (Swagger)
- [ ] Ajouter des logs structurés
- [ ] Implémenter le rate limiting

---

## Ressources d'apprentissage

- [Clean Architecture - Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Domain-Driven Design](https://www.domainlanguage.com/ddd/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
