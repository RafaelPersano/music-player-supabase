# 🎵 Music Player Supabase Auth

Aplicativo web de player de música com autenticação Supabase, upload e listagem de faixas.
Frontend em **React + Vite**, backend com **Node (API Functions)** e deploy via **Vercel**.

---

## 🚀 Como subir no GitHub e Vercel

### 1️⃣ Instalar dependências e gerar build do frontend

Abra o terminal na raiz do projeto e execute:

```bash
cd frontend
npm install
npm run build
```

Isso vai gerar a pasta:
```
frontend/dist/
```
que contém o build final do React.

---

### 2️⃣ Configurar o projeto no GitHub

Volte para a pasta raiz e inicialize o repositório:

```bash
cd ..
git init
git add .
git commit -m "Deploy inicial para Vercel"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/music-player-supabase-auth.git
git push -u origin main
```

> 💡 Substitua **SEU_USUARIO** pelo seu nome de usuário do GitHub.

---

### 3️⃣ Fazer deploy no Vercel

1. Vá até 👉 [https://vercel.com/new](https://vercel.com/new)
2. Clique em **“Import Project”**
3. Escolha o repositório `music-player-supabase-auth`
4. Confirme o framework detectado (Vite) e clique em **Deploy**

O Vercel vai:
- usar o build estático do React (pasta `frontend/dist`)
- disponibilizar as funções Node em `/api/*`

Após o deploy, você terá:
```
https://music-player-supabase-auth.vercel.app
```
com o frontend React e as rotas de API ativas.

---

### ⚙️ Estrutura final do projeto

```
music-player-supabase-auth/
├── api/
│   ├── upload.js
│   ├── listTracks.js
│   ├── generateTags.js
│   └── package.json
├── frontend/
│   ├── src/
│   ├── vite.config.js
│   ├── package.json
│   └── dist/ (gerado após build)
├── vercel.json
└── README.md  ← este arquivo
```

---

### 💾 Variáveis de ambiente (Supabase)

Crie um arquivo `.env` dentro da pasta `frontend` com suas chaves:

```bash
VITE_SUPABASE_URL=https://SEU_PROJETO.supabase.co
VITE_SUPABASE_ANON_KEY=SUA_CHAVE_ANON
```

> Use as chaves públicas (anon) da sua instância Supabase.

---

### ✅ Pronto!

Agora o projeto estará **online no Vercel**, com autenticação via Supabase e upload/listagem de músicas funcional.
