# LinkedOut — dinâmica de entrevista de emprego (100% frontend)

Site estático (HTML + CSS + JavaScript). Sem PHP, sem servidor. Funciona no **Vercel**, no GitHub Pages ou em qualquer hospedagem de arquivos estáticos.

## Como usar
- **Candidato:** escolhe "Candidato" e entra só com o nome completo (sem senha).
- **Recrutador:** escolhe "Recrutador / Avaliador" e entra com um dos usuários abaixo.
  - Usuários: `Gustavo` e `Usuario 1` até `Usuario 30` (maiúsculas/minúsculas não importam)
  - Senha (igual para todos): `vaga2026` — para trocar, edite `recruiterPassword` no `config.js`.
- **Master (administrador):** na tela inicial, clique em **Acesso Master** e digite só a senha `master2026` (usuário `Master`). Para trocar, edite `masterPassword` no `config.js`. O Master faz tudo que o recrutador faz e também: **apaga vagas**, **apaga candidaturas** (uma a uma, de uma vaga ou **todas de uma vez**, incluindo os currículos). Esses botões só aparecem para ele.
- O recrutador cria/edita vagas, aceita ou rejeita candidaturas, vê currículos e mantém a lista de bloqueio de nomes.
- Currículos: PDF, DOC ou DOCX, até 2 MB.

## Onde os dados ficam (importante)
Sem servidor, os dados precisam ficar em algum lugar. Há dois modos, definidos em `config.js`:

1. **Modo local (padrão, sem configurar nada):** os dados ficam no navegador de quem acessa.
   Candidato e recrutador só enxergam a mesma coisa se usarem **o mesmo navegador do mesmo computador** (por exemplo, duas abas). Serve para testar.
2. **Modo compartilhado (recomendado para a dinâmica):** os dados ficam num banco gratuito do Firebase, e todos os aparelhos veem o mesmo conteúdo (atualização automática a cada 5 segundos). Candidato no celular, recrutador no computador.

### Ativar o modo compartilhado (Firebase, gratuito, ~5 minutos)
1. Acesse https://console.firebase.google.com e crie um projeto (pode desativar o Google Analytics).
2. No menu **Build → Realtime Database**, clique em **Create Database**, escolha uma região e **Start in test mode**.
3. Abra a aba **Rules**, cole o texto abaixo e clique em **Publish** (assim ele não expira em 30 dias):
   ```json
   { "rules": { ".read": true, ".write": true } }
   ```
4. Na aba **Data**, copie a URL que aparece no topo (algo como `https://nome-do-projeto-default-rtdb.firebaseio.com`).
5. Cole essa URL em `config.js`, no campo `firebaseUrl`, salve e publique de novo (veja abaixo).

> Segurança: com essas regras, quem souber a URL do banco consegue ler e alterar os dados. Para uma dinâmica de sala isso é aceitável. Não guarde informações sensíveis.

### Nova turma / zerar os dados
No Firebase, na aba **Data**, apague o nó raiz (ícone de lixeira ao lado do nome do banco). As 6 vagas iniciais são recriadas no próximo acesso. No modo local, basta limpar os dados do site no navegador.

## Publicar no GitHub + Vercel
1. Crie um repositório no GitHub e envie todos os arquivos desta pasta (`index.html`, `candidato.html`, `recrutador.html`, `style.css`, `sync.js`, `config.js`, `README.md`).
2. Em https://vercel.com, clique em **Add New → Project**, importe o repositório e clique em **Deploy** (sem alterar nada: não há build).
3. Cada alteração enviada ao GitHub é publicada de novo automaticamente.

## Arquivos
- `index.html` — entrada (candidato / recrutador)
- `candidato.html` — vagas e candidaturas do candidato
- `recrutador.html` — painel do recrutador
- `sync.js` — "servidor" dentro do navegador (login, vagas, candidaturas, currículos, armazenamento) e as 6 vagas iniciais
- `config.js` — senhas (recrutadores e Master) e URL do Firebase
- `style.css` — estilos
