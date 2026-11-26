/* LinkedOut — versão 100% frontend (sem PHP).
   Mantém as mesmas "ações" que o api.php tinha, mas tudo roda no navegador.
   - Sem firebaseUrl no config.js: dados salvos no navegador (localStorage).
   - Com firebaseUrl: dados compartilhados entre aparelhos (Firebase Realtime Database via REST). */
const CFG=Object.assign({firebaseUrl:'',recruiterPassword:'vaga2026',masterPassword:'master2026'},window.LINKEDOUT_CONFIG||{});
const REMOTE=String(CFG.firebaseUrl||'').trim().replace(/\/+$/,'');
const FRIENDLY='Não foi possível conectar agora. Tente novamente em instantes.';
const MAX_RESUME=2*1024*1024;
const SESS='linkedout_user';
const RECRUITERS=['Gustavo',...Array.from({length:30},(_,i)=>'Usuario '+(i+1))];

/* Vagas iniciais (cadastradas só na primeira vez que o banco é aberto). */
const SEED_JOBS=[
 {
  "id": "job-101",
  "title": "Desenvolvedor(a) Web Trainee / Júnior",
  "company": "SoftCatrina Tec",
  "category": "TI",
  "location": "Jaraguá do Sul - SC (Híbrido)",
  "description": "A SoftCatrina Tec está em busca de um(a) Desenvolvedor(a) Web Trainee / Júnior para integrar a equipe de Tecnologia da Informação. Procuramos alguém com interesse em desenvolvimento web, vontade de aprender, criatividade e disposição para enfrentar novos desafios.\n\nPrincipais responsabilidades:\n• Auxiliar no desenvolvimento e na manutenção de aplicações web.\n• Participar da criação e implementação de novas funcionalidades.\n• Identificar e corrigir possíveis erros nos sistemas.\n• Colaborar com a equipe de TI em projetos e soluções tecnológicas.\n• Contribuir para a melhoria contínua das aplicações.\n\nRequisitos e qualificações:\n• Conhecimentos básicos em desenvolvimento web.\n• Noções de HTML, CSS e JavaScript.\n• Interesse em aprender novas linguagens e tecnologias.\n• Boa comunicação e capacidade de trabalhar em equipe.\n• Organização, proatividade e vontade de crescer profissionalmente.\n\nDiferenciais:\n• Conhecimento em frameworks e bibliotecas de desenvolvimento.\n• Familiaridade com bancos de dados e controle de versão (Git).\n• Projetos acadêmicos ou pessoais na área de desenvolvimento web.\n\nBenefícios:\n• Vale-alimentação ou vale-refeição.\n• Vale-transporte ou auxílio-combustível.\n• Plano de saúde e odontológico.\n• Flexibilidade de horário e modelo de trabalho híbrido.\n• Oportunidade de desenvolvimento profissional e crescimento na carreira.\n• Ambiente colaborativo e incentivo ao aprendizado contínuo.",
  "recruiter": "Equipe LinkedOut"
 },
 {
  "id": "job-102",
  "title": "Assistente Administrativo Júnior",
  "company": "Logística Jaraguá",
  "category": "ADM",
  "location": "Jaraguá do Sul - SC (Presencial)",
  "description": "Área de atuação: Administração.\n\nAtuar com rotinas administrativas e atendimento ao cliente no setor de Logística, auxiliando na organização de documentos, acompanhamento de processos e suporte geral para garantir o bom funcionamento e a agilidade da operação.\n\nPrincipais responsabilidades e atividades:\n• Realizar atividades administrativas.\n• Atender clientes de forma clara e objetiva.\n• Elaborar planilhas e relatórios.\n• Trabalhar em equipe.\n• Buscar soluções para problemas e melhorias nos processos.\n\nRequisitos e qualificações:\n• Ensino médio completo.\n• Organização e flexibilidade para lidar com diferentes demandas.\n• Boa comunicação.\n• Proatividade e facilidade para trabalhar em equipe.\n\nEscolaridade exigida: Ensino médio completo.\nExperiência profissional: não é necessária experiência anterior. Será considerado um diferencial ter atuado em atividades administrativas.\nConhecimentos técnicos: conhecimento do Pacote Office, especialmente para elaboração de planilhas e relatórios.",
  "recruiter": "Equipe LinkedOut"
 },
 {
  "id": "job-103",
  "title": "Técnico de Suporte TI – Nível 1",
  "company": "Conecta Redes",
  "category": "TI",
  "location": "Jaraguá do Sul - SC",
  "description": "Procuramos um(a) candidato(a) que goste de tecnologia, tenha paciência para atender pessoas e queira começar a carreira em TI.\n\nFormação:\n• Ensino Médio completo.\n• Cursando ou concluído: Técnico em Informática, Redes ou área de TI.\n\nConhecimentos necessários:\n• Windows, Office, navegadores e internet.\n• Instalação de programas e impressoras.\n• Noções de rede, Wi-Fi, roteador e cabo de rede.\n• Formatação e manutenção básica de computador.\n\nPerfil comportamental:\n• Calmo e paciente, mesmo com cliente nervoso.\n• Comunicativo, explica de forma simples.\n• Organizado, anota e acompanha os chamados.\n• Proativo, tenta resolver antes de passar para outro.\n• Trabalha bem em equipe.\n\nExperiência ideal:\n• Já mexeu com computador, ajudou família / escola / estágio com suporte.\n• Já atendeu público, mesmo que em outro emprego.\n\nPrincipais atividades:\n• Atender usuários com dificuldades em computadores e sistemas.\n• Identificar e solucionar problemas básicos de informática.\n• Instalar e configurar programas e softwares.\n• Auxiliar na configuração de impressoras e equipamentos.\n• Registrar chamados de suporte técnico.\n• Encaminhar problemas mais complexos para profissionais especializados.",
  "recruiter": "Equipe LinkedOut"
 },
 {
  "id": "job-105",
  "title": "Estagiário(a) de Biologia – Manejo de Fauna",
  "company": "Projeto Ambiental",
  "category": "Meio Ambiente",
  "location": "Jaraguá do Sul - SC",
  "description": "Área: Meio Ambiente. Atuação: manejo supervisionado e monitoramento de fauna.\n\nObjetivo da vaga:\nApoiar as atividades de manejo, monitoramento e acompanhamento da fauna silvestre, contribuindo para a conservação da biodiversidade e o cumprimento dos procedimentos ambientais, sempre sob supervisão dos profissionais responsáveis.\n\nPrincipais atividades e responsabilidades:\n• Auxiliar nas atividades de manejo e monitoramento de fauna silvestre.\n• Apoiar ações de captura, contenção, identificação e acompanhamento de animais, conforme protocolos técnicos e sob supervisão.\n• Auxiliar no registro de dados e informações relacionadas à fauna monitorada.\n• Apoiar a elaboração de relatórios técnicos e registros de campo.\n• Auxiliar na organização e higienização de materiais e equipamentos utilizados nas atividades.\n• Acompanhar atividades de campo e ações de monitoramento ambiental.\n• Cumprir os procedimentos de segurança, bem-estar animal e legislação ambiental aplicável.\n\nRequisitos:\n• Estar cursando graduação em Ciências Biológicas, preferencialmente a partir da 4ª fase.\n• Ter interesse pela área de fauna silvestre, conservação e manejo ambiental.\n• Disponibilidade para atividades de campo.\n• Disponibilidade para estagiar em Jaraguá do Sul – SC.\n• Conhecimento básico em informática e ferramentas do Pacote Office.",
  "recruiter": "Equipe LinkedOut"
 },
 {
  "id": "job-106",
  "title": "Auxiliar de Projetista",
  "company": "Vértice Engenharia e Projetos",
  "category": "Projetos",
  "location": "Jaraguá do Sul - SC (Presencial)",
  "description": "Processo seletivo — ficha da vaga.\nCargo: Auxiliar de Projetista | Área: Projetos | Modalidade: Presencial | Nível: Auxiliar / Júnior.\n\nSobre a empresa:\nA Vértice Engenharia e Projetos atua no desenvolvimento de projetos mecânicos e industriais, oferecendo soluções técnicas com foco em precisão, qualidade e inovação.\n\nObjetivo do cargo:\nAuxiliar os projetistas na elaboração, atualização e revisão de desenhos técnicos, contribuindo para a qualidade e organização dos projetos.\n\nPrincipais atividades:\n• Auxiliar na elaboração e atualização de desenhos técnicos.\n• Conferir medidas e especificações.\n• Apoiar a revisão de projetos.\n• Identificar e comunicar possíveis inconsistências.\n• Organizar documentos e arquivos técnicos.\n• Prestar suporte à equipe de projetos.",
  "recruiter": "Equipe LinkedOut"
 },
 {
  "id": "job-107",
  "title": "Analista de Dados Júnior",
  "company": "Empresa de Dados",
  "category": "TI",
  "location": "Jaraguá do Sul - SC",
  "description": "Área de atuação: Analytics e Engenharia de Dados.\n\nDescrição da vaga:\nAuxiliar na coleta, tratamento e análise de grandes volumes de dados, além de acompanhar projetos junto às equipes de BI, Analytics e Engenharia de Dados.\n\nPrincipais responsabilidades e atividades:\n• Coleta e preparação de dados.\n• Criação de relatórios e dashboards.\n• Análise exploratória.\n• Suporte a projetos.\n• Validação e qualidade de dados.\n• Documentação.\n\nRequisitos e qualificações:\n• Ferramentas: domínio intermediário em Excel/Google Sheets, noções básicas de SQL e familiaridade com ferramentas de BI (Power BI ou Looker Studio).\n• Perfil: raciocínio lógico, atenção aos detalhes, boa comunicação e vontade de aprender.\n• Diferenciais: conhecimento básico em Python ou R e vivência prévia (estágio ou projetos) com análise de dados.\n\nEscolaridade exigida:\n• Ensino Superior cursando ou completo em Administração, Estatística, Ciência da Computação, Engenharia ou áreas correlatas.",
  "recruiter": "Equipe LinkedOut"
 }
];

function fail(msg,status){const e=new Error(msg);e.status=status;return e;}
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function keyOf(s){const bytes=new TextEncoder().encode(String(s).trim().toLowerCase());let bin='';bytes.forEach(b=>bin+=String.fromCharCode(b));return btoa(bin).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');}
const pad=n=>String(n).padStart(2,'0');
function fmtIso(t){const d=new Date(t);return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;}
function fmtBr(t){const d=new Date(t);return `${pad(d.getDate())}/${pad(d.getMonth()+1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;}

/* ---------- Armazenamento ---------- */
const LS_KEY='linkedout_db_v1';
function lsRead(){try{return JSON.parse(localStorage.getItem(LS_KEY))||{}}catch(e){return {}}}
function lsWrite(db){try{localStorage.setItem(LS_KEY,JSON.stringify(db))}catch(e){throw fail('Espaço de armazenamento cheio. Tente um currículo menor.',413)}}
const store={
  async get(path){
    if(REMOTE){
      const r=await fetch(`${REMOTE}/${path}.json`,{cache:'no-store'});
      if(!r.ok)throw fail(FRIENDLY,r.status===401||r.status===403?500:r.status);
      return r.json();
    }
    let v=lsRead();for(const p of path.split('/'))v=(v==null)?null:v[p];
    return v===undefined?null:v;
  },
  async set(path,val){
    if(REMOTE){
      const r=await fetch(`${REMOTE}/${path}.json`,val===null?{method:'DELETE'}:{method:'PUT',body:JSON.stringify(val)});
      if(!r.ok)throw fail(FRIENDLY,500);return;
    }
    const db=lsRead(),ps=path.split('/');let o=db;
    for(const p of ps.slice(0,-1)){if(typeof o[p]!=='object'||o[p]===null)o[p]={};o=o[p];}
    if(val===null)delete o[ps[ps.length-1]];else o[ps[ps.length-1]]=val;
    lsWrite(db);
  }
};
let seeded=false;
async function ensureSeed(){
  if(seeded)return;
  if(!(await store.get('meta/seeded_v1'))){
    const base=1700000000000;
    for(let i=0;i<SEED_JOBS.length;i++)await store.set('jobs/'+SEED_JOBS[i].id,{...SEED_JOBS[i],createdTs:base-i*1000});
    await store.set('meta/seeded_v1',true);
  }
  seeded=true;
}

/* ---------- Sessão ---------- */
function curUser(){try{return JSON.parse(sessionStorage.getItem(SESS))}catch(e){return null}}
function need(role){const u=curUser();if(!u||(u.role!==role&&!(role==='recrutador'&&u.role==='master')))throw fail('Acesso não autorizado. Faça login novamente.',401);return u;}

function needMaster(){const u=curUser();if(!u||u.role!=='master')throw fail('Apenas o usuário Master pode fazer isso.',403);return u;}

/* ---------- Ações (equivalentes às do antigo api.php) ---------- */
const jobFields=['title','company','category','location','description'];
const actions={
  async candidate_login(d){
    const name=String(d.name??'').trim().replace(/\s+/g,' ');
    if(name.length<3)throw fail('Informe seu nome completo.',422);
    if(await store.get('blacklist/'+keyOf(name)))throw fail('Este nome não está autorizado a acessar a plataforma.',403);
    const user={name,role:'candidato'};sessionStorage.setItem(SESS,JSON.stringify(user));return {user};
  },
  async recruiter_login(d){
    const name=String(d.name??'').trim().replace(/\s+/g,' ').toLowerCase();
    const found=RECRUITERS.find(n=>n.toLowerCase()===name);
    if(!found||String(d.password??'')!==String(CFG.recruiterPassword))throw fail('Nome ou senha incorretos.',403);
    const user={name:found,role:'recrutador'};sessionStorage.setItem(SESS,JSON.stringify(user));return {user};
  },
  async master_login(d){
    const name=String(d.name??'master').trim().toLowerCase();
    if(name!=='master'||String(d.password??'')!==String(CFG.masterPassword))throw fail('Senha do Master incorreta.',403);
    const user={name:'Master',role:'master'};sessionStorage.setItem(SESS,JSON.stringify(user));return {user};
  },
  async me(){return {user:curUser()};},
  async logout(){sessionStorage.removeItem(SESS);return {ok:true};},
  async data(){
    const u=curUser();if(!u)throw fail('Faça login para continuar.',401);
    const [jo,ao]=await Promise.all([store.get('jobs'),store.get('applications')]);
    const jobs=Object.values(jo||{}).sort((a,b)=>b.createdTs-a.createdTs).map(j=>({id:j.id,title:j.title,company:j.company,category:j.category,location:j.location,description:j.description,recruiter:j.recruiter,createdAt:fmtIso(j.createdTs)}));
    let apps=Object.values(ao||{});
    if(u.role==='candidato')apps=apps.filter(a=>a.candidateName.toLowerCase()===u.name.toLowerCase());
    apps=apps.sort((a,b)=>b.appliedTs-a.appliedTs).map(a=>({id:a.id,jobId:a.jobId,candidateName:a.candidateName,note:a.note,status:a.status,resumePath:a.hasResume?'resume:'+a.id:null,appliedAt:fmtBr(a.appliedTs)}));
    return {jobs,applications:apps,user:u};
  },
  async apply(d){
    const u=need('candidato');
    const jobId=String(d.jobId??'').trim(),note=String(d.note??'').trim();
    if(!note)throw fail('Escreva uma apresentação.',422);
    if(!(await store.get('jobs/'+jobId)))throw fail('Vaga não encontrada.',404);
    const id='app-'+jobId+'-'+keyOf(u.name);
    if(await store.get('applications/'+id))throw fail('Você já se candidatou a esta vaga.',409);
    await store.set('applications/'+id,{id,jobId,candidateName:u.name,note,status:'Pendente',hasResume:false,appliedTs:Date.now()});
    return {ok:true,id};
  },
  async status(d){
    need('recrutador');
    if(!['Aceito','Rejeitado'].includes(d.status))throw fail('Status inválido.',422);
    const a=await store.get('applications/'+(d.id||'x'));
    if(!a||a.status!=='Pendente')return {ok:false};
    await store.set('applications/'+a.id+'/status',d.status);return {ok:true};
  },
  async create_job(d){
    const u=need('recrutador');
    for(const f of jobFields)if(!String(d[f]??'').trim())throw fail('Preencha todos os campos da vaga.',422);
    const id='job-'+Array.from(crypto.getRandomValues(new Uint8Array(8)),b=>pad(b.toString(16))).join('');
    const j={id,recruiter:u.name,createdTs:Date.now()};for(const f of jobFields)j[f]=String(d[f]).trim();
    await store.set('jobs/'+id,j);return {ok:true};
  },
  async edit_job(d){
    need('recrutador');
    for(const f of jobFields)if(!String(d[f]??'').trim())throw fail('Preencha todos os campos da vaga.',422);
    const old=await store.get('jobs/'+(d.id||'x'));if(!old)throw fail('Vaga não encontrada.',404);
    const j={...old};for(const f of jobFields)j[f]=String(d[f]).trim();
    await store.set('jobs/'+old.id,j);return {ok:true};
  },
  async blacklist_list(){
    need('recrutador');
    const b=await store.get('blacklist');
    return {names:Object.values(b||{}).map(x=>x.name).sort((x,y)=>x.localeCompare(y,'pt-BR'))};
  },
  async blacklist_add(d){
    need('recrutador');const n=String(d.name??'').trim().replace(/\s+/g,' ');
    if(!n)throw fail('Informe o nome completo.',422);
    await store.set('blacklist/'+keyOf(n),{name:n});return {ok:true};
  },
  async blacklist_remove(d){need('recrutador');await store.set('blacklist/'+keyOf(d.name??''),null);return {ok:true};},
  /* ----- Somente Master ----- */
  async delete_job(d){
    needMaster();const id=String(d.id??'');
    if(!(await store.get('jobs/'+id)))throw fail('Vaga não encontrada.',404);
    const ao=await store.get('applications');
    for(const a of Object.values(ao||{}))if(a.jobId===id){await store.set('resumes/'+a.id,null);await store.set('applications/'+a.id,null);}
    await store.set('jobs/'+id,null);return {ok:true};
  },
  async delete_application(d){
    needMaster();const id=String(d.id??'');
    await store.set('resumes/'+id,null);await store.set('applications/'+id,null);return {ok:true};
  },
  async clear_job_applications(d){
    needMaster();const id=String(d.id??'');const ao=await store.get('applications');
    for(const a of Object.values(ao||{}))if(a.jobId===id){await store.set('resumes/'+a.id,null);await store.set('applications/'+a.id,null);}
    return {ok:true};
  },
  async clear_applications(){
    needMaster();await store.set('applications',null);await store.set('resumes',null);return {ok:true};
  },
  async resume(d){
    const u=need('candidato');
    const ext=String(d.fileName||'').split('.').pop().toLowerCase();
    if(!['pdf','doc','docx'].includes(ext))throw fail('Envie PDF, DOC ou DOCX.',422);
    if(String(d.dataUrl||'').length*0.75>MAX_RESUME)throw fail('O currículo deve ter no máximo 2 MB.',422);
    const a=await store.get('applications/'+(d.applicationId||'x'));
    if(!a||a.candidateName.toLowerCase()!==u.name.toLowerCase())throw fail('Candidatura não encontrada.',404);
    await store.set('resumes/'+a.id,{name:d.fileName,dataUrl:d.dataUrl});
    await store.set('applications/'+a.id+'/hasResume',true);return {ok:true};
  }
};

async function api(action,data={},method='POST',tries=1){
  let last;
  for(let i=0;i<tries;i++){
    try{await ensureSeed();return await actions[action](data||{});}
    catch(e){if(e.status&&e.status<500)throw e;last=e.status!=null?e:fail(FRIENDLY,0);}
    if(i<tries-1)await sleep(800);
  }
  throw last;
}
async function loadData(){return api('data',{},'GET',3);}
async function logout(){try{await api('logout')}finally{location.href='index.html'}}

/* ---------- Currículos ---------- */
const MIME={pdf:'application/pdf',doc:'application/msword',docx:'application/vnd.openxmlformats-officedocument.wordprocessingml.document'};
function readResume(file){
  return new Promise((ok,no)=>{
    const ext=file.name.split('.').pop().toLowerCase();
    if(!MIME[ext])return no(new Error('Envie PDF, DOC ou DOCX.'));
    if(file.size>MAX_RESUME)return no(new Error('O currículo deve ter no máximo 2 MB.'));
    const r=new FileReader();
    r.onload=()=>ok(String(r.result).replace(/^data:[^;,]*/,'data:'+MIME[ext]));
    r.onerror=()=>no(new Error('Falha na leitura do arquivo.'));
    r.readAsDataURL(file);
  });
}
async function openResume(id){
  const w=window.open('','_blank');
  try{
    const r=await store.get('resumes/'+id);if(!r)throw 0;
    const blob=await (await fetch(r.dataUrl)).blob();const url=URL.createObjectURL(blob);
    if(/\.pdf$/i.test(r.name||'')){if(w)w.location.href=url;else location.href=url;}
    else{if(w)w.close();const a=document.createElement('a');a.href=url;a.download=r.name||'curriculo';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),10000);}
  }catch(e){if(w)w.close();alert('Não foi possível abrir o currículo.');}
}
document.addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('a[data-resume]');if(a){e.preventDefault();openResume(a.dataset.resume);}});
