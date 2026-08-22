const root = document.querySelector('#appRoot');

const projects = [
  { id:'unipool', title:'UniPool', type:'Product', year:'2026', stack:'React Native · FastAPI', blurb:'A campus carpooling product designed around matching students by route, timing and availability.', metric:'PRODUCT BUILD', tone:'cyan' },
  { id:'tobs', title:'TOBS / BESO', type:'Research', year:'2025', stack:'Python · NGSolve · Netgen', blurb:'Topology optimisation of binary structures with finite-element simulation and iterative optimisation.', metric:'OPTIMIZATION', tone:'violet' },
  { id:'cvrptw', title:'CVRPTW', type:'Algorithms', year:'2025–26', stack:'Python · OR-Tools · VRPLIB', blurb:'Vehicle routing with capacity and time windows across Solomon, Homberger and Uchoa benchmark families.', metric:'OPERATIONS RESEARCH', tone:'orange' },
  { id:'analytics', title:'Game Score Analytics', type:'Backend', year:'2025', stack:'Java · JDBC · SQLite', blurb:'Relational gameplay analytics with complex SQL for rankings, averages, retention and session insights.', metric:'DATA ENGINEERING', tone:'green' },
  { id:'svm', title:'Platt SMO', type:'Machine Learning', year:'2025', stack:'Python · SVM', blurb:'Study and implementation work around improving Platt’s Sequential Minimal Optimisation for SVM training.', metric:'MACHINE LEARNING', tone:'pink' },
  { id:'quant', title:'Quant Lab', type:'Finance', year:'2025–26', stack:'Python · NumPy · yfinance', blurb:'CAPM, alpha/beta, log returns and statistical experiments connecting mathematical modelling with markets.', metric:'QUANT FINANCE', tone:'blue' }
];

const appMeta = {
  meta:{label:'Meta', sub:'SOCIAL GRAPH', color:'#8b5cf6'},
  instagram:{label:'Instagram', sub:'VISUAL LOG', color:'#ff3b81'},
  whatsapp:{label:'WhatsApp', sub:'DIRECT', color:'#25d366'},
  reddit:{label:'Reddit', sub:'COMMUNITIES', color:'#ff6a2f'},
  linkedin:{label:'LinkedIn', sub:'PROFESSIONAL', color:'#0a66c2'},
  snapchat:{label:'Snapchat', sub:'MEMORIES', color:'#ffe500'},
  netflix:{label:'Netflix', sub:'PROJECT CINEMA', color:'#e50914'},
  spotify:{label:'Spotify', sub:'SOUNDTRACK', color:'#1ed760'},
  office:{label:'Microsoft 365', sub:'WORKSPACE', color:'#5b5fc7'}
};

function projectCard(p){
  return `<button class="project-card ${p.tone}" data-project="${p.id}">
    <div class="pc-top"><span>${p.metric}</span><b>${p.year}</b></div>
    <div class="project-art"><div class="art-grid"></div><strong>${p.title}</strong><i>${p.type}</i></div>
    <div class="pc-copy"><h3>${p.title}</h3><p>${p.blurb}</p><div class="pc-foot"><span>${p.stack}</span><em>OPEN ↗</em></div></div>
  </button>`;
}

function shell(inner, opts={}){
  const m=appMeta[opts.app||'meta'];
  return `<div class="app ${opts.cls||''}" style="--app:${m.color}">
    <header class="topbar">
      <div class="brandline"><span class="brand-dot" style="background:${m.color}"></span><div><h1>${m.label}</h1><small>${m.sub}</small></div></div>
      <div class="top-actions"><button class="icon-btn" data-action="search">⌕</button><button class="icon-btn" data-action="notifications">◌</button><button class="avatar mini">UM</button></div>
    </header>${inner}
    <button class="back-world" onclick="location.href='world.html'">↗ WORLD</button>
  </div>`;
}

function projectModal(p){
  const related = projects.filter(x=>x.id!==p.id).slice(0,3);
  return `<div class="modal-backdrop" data-close-modal>
    <section class="project-modal" onclick="event.stopPropagation()">
      <button class="modal-close" data-close-modal>×</button>
      <div class="modal-hero ${p.tone}"><div class="modal-orbit"></div><span>${p.metric}</span><h2>${p.title}</h2><p>${p.blurb}</p></div>
      <div class="modal-body">
        <div class="modal-main">
          <div class="section-kicker">CASE STUDY / ${p.year}</div>
          <h3>What I actually built</h3>
          <p>${p.blurb} The portfolio experience turns this into a compact case study: problem, approach, implementation and what I learned.</p>
          <div class="case-grid"><div><small>ROLE</small><b>Builder / Researcher</b></div><div><small>STACK</small><b>${p.stack}</b></div><div><small>FOCUS</small><b>${p.type}</b></div><div><small>STATUS</small><b>Project archive</b></div></div>
          <div class="terminal"><div class="terminal-head"><span></span><span></span><span></span><label>project.log</label></div><pre>$ load ${p.id}\n> architecture............. OK\n> implementation............ OK\n> experiments............... OK\n> portfolio_mode............ ONLINE</pre></div>
        </div>
        <aside class="modal-side"><div class="side-title">RELATED BUILDS</div>${related.map(x=>`<button class="related" data-project="${x.id}"><b>${x.title}</b><span>${x.type}</span></button>`).join('')}</aside>
      </div>
    </section>
  </div>`;
}

function renderMeta(){return shell(`<main class="content app-home">
  <section class="hero hero-large"><div><div class="eyebrow">UM / SOCIAL GRAPH / 2026</div><h2>Everything I build,<br><span>connected.</span></h2><p>A living interface for the projects, people, ideas and experiments behind the portfolio. Click through the graph instead of reading a static CV.</p><div class="hero-buttons"><button class="primary" data-app="linkedin">OPEN PROFILE ↗</button><button class="ghost" data-app="netflix">WATCH THE WORK</button></div></div><div class="network-art"><div class="network-core">UM</div>${['AI','QUANT','MATH','CODE','PRODUCT','RESEARCH'].map((x,i)=>`<span class="node n${i}">${x}</span>`).join('')}</div></section>
  <div class="stat-strip"><div><b>06</b><span>CORE BUILDS</span></div><div><b>04</b><span>RESEARCH / OR</span></div><div><b>∞</b><span>EXPERIMENTS</span></div><div><b>01</b><span>PLAYABLE WORLD</span></div></div>
  <section class="section"><div class="section-head"><div><div class="eyebrow">WORK GRAPH</div><h2>Projects worth opening.</h2></div><button class="text-btn" data-app="netflix">VIEW ALL →</button></div><div class="project-grid">${projects.slice(0,4).map(projectCard).join('')}</div></section>
  <section class="section split-feature"><div class="feature-panel gradient-cyan"><small>LIVE WORLD</small><h3>Walk into the portfolio.</h3><p>Buildings, districts and digital experiences are connected to the same project graph.</p><button class="primary" onclick="location.href='world.html'">ENTER WORLD ↗</button></div><div class="feature-panel dark-grid"><small>THE IDEA</small><h3>Portfolio as an operating system.</h3><p>Social apps, media, office tools and games are different lenses over the same underlying work.</p><div class="mini-stack">META · IG · WA · REDDIT · LINKEDIN · NETFLIX · OFFICE · ARCADE</div></div></section>
</main>`,{app:'meta',cls:'meta'});}

function renderInstagram(){return shell(`<main class="content instagram-page"><section class="ig-head"><div class="ig-avatar">UM</div><div class="ig-info"><div class="ig-title"><h2>utkarsh.mangal</h2><button>EDIT PROFILE</button><button class="outline">SHARE</button></div><div class="ig-stats"><b>36 <span>posts</span></b><b>2.1K <span>followers</span></b><b>418 <span>following</span></b></div><p><b>Utkarsh Mangal</b><br>computational mathematics × AI × quant<br>building things because static portfolios are boring.</p></div></section><nav class="ig-tabs"><b>▦ POSTS</b><span>▣ REELS</span><span>♙ TAGGED</span></nav><div class="ig-grid">${['MATH IN AI','PARIS','CVRPTW','TOBS','F1 × NUMBERS','UNIPOOL','MATH CLUB','QUANT','PORTFOLIO WORLD'].map((x,i)=>`<button class="ig-post p${i}"><div><small>${i%3===0?'PROJECT DROP':'VISUAL LOG'}</small><strong>${x}</strong></div></button>`).join('')}</div></main>`,{app:'instagram',cls:'instagram'});}

function renderWhatsApp(){return shell(`<main class="wa-layout"><aside class="wa-list"><div class="wa-list-head"><h2>WhatsApp</h2><span>⌕　⋮</span></div><div class="wa-tabs"><b>All</b><span>Unread</span><span>Groups</span></div>${[['Recruiter','Tell me about your latest build.','12:42'],['Math Club','Euler’s Quest planning','11:18'],['CentraleSupélec','Paris / projects / exchange','09:34'],['Future You','ship it.','Yesterday'],['Project Lab','CVRPTW benchmark results','Mon']].map((c,i)=>`<button class="wa-contact ${i===0?'selected':''}"><div class="wa-avatar a${i}">${['R','MC','CS','UY','PL'][i]}</div><div><b>${c[0]}</b><p>${c[1]}</p></div><time>${c[2]}</time></button>`).join('')}</aside><section class="wa-chat"><div class="wa-chat-head"><div class="wa-avatar a0">R</div><div><b>Recruiter</b><small>online · portfolio world</small></div><span>⌕　⋮</span></div><div class="wa-messages"><div class="day">TODAY</div><div class="wa-bubble">Hey! I found your portfolio. What have you been building lately?</div><div class="wa-bubble me">A portfolio that behaves like a game world — but the projects inside are real.</div><div class="wa-bubble">Show me something interesting.</div><div class="wa-bubble me"><b>UniPool HQ</b><br>Walk in → product case study → architecture → actual build.</div><div class="wa-bubble">Okay. That is considerably more interesting than a PDF.</div></div><div class="wa-compose"><span>＋</span><input placeholder="Message"/><button>➤</button></div></section></main>`,{app:'whatsapp',cls:'whatsapp'});}

function renderReddit(){return shell(`<main class="content reddit-page"><div class="reddit-layout"><aside class="reddit-side"><h3>HOME</h3>${['Home','Popular','Explore','All'].map(x=>`<button>${x}</button>`).join('')}<h3>YOUR COMMUNITIES</h3>${['r/math','r/quant','r/webdev','r/optimization','r/formula1'].map(x=>`<button>${x}</button>`).join('')}</aside><section><div class="reddit-banner"><small>r/utkarsh</small><h2>The portfolio feed.</h2><p>Projects, technical notes and experiments — in discussion form.</p></div>${[['r/optimization','I built a topology optimizer because normal portfolios weren’t enough.','248','TOBS / BESO'],['r/webdev','What if a portfolio was a game world?','131','THREE.JS / UX'],['r/quant','Using probability and optimisation as product primitives.','94','QUANT / MATH']].map((p,i)=>`<article class="reddit-card"><div class="votes"><button>▲</button><b>${p[2]}</b><button>▼</button></div><div><small>${p[0]} · ${i+1}d</small><h3>${p[1]}</h3><p>Problem → mathematical idea → implementation → what changed after testing it in the real world.</p><div class="post-actions">💬 ${12+i*7} comments　 ↗ Share　 ⋯ More</div><span class="reddit-flair">${p[3]}</span></div></article>`).join('')}</section></div></main>`,{app:'reddit',cls:'reddit'});}

function renderLinkedIn(){return shell(`<main class="content linkedin-page"><div class="li-cover"><div class="cover-grid"></div></div><section class="li-profile"><div class="li-photo">UM</div><div class="li-actions"><button>OPEN TO</button><button>ADD PROFILE SECTION</button><button class="more">•••</button></div><h2>Utkarsh Mangal</h2><h3>Computational Mathematics · AI · Quantitative Finance · Software</h3><p>India · Paris · Open to opportunities</p><div class="li-links">Mahindra University　·　CentraleSupélec　·　GitHub</div></section><div class="li-columns"><section><article class="li-card"><div class="card-title"><h3>About</h3><span>✎</span></div><p>I use mathematics as a way to reason about uncertainty, optimisation and algorithms — then turn technical ideas into useful software experiences.</p><div class="li-tags">Probability　 Optimization　 ML　 Quant　 Algorithms</div></article><article class="li-card"><div class="card-title"><h3>Featured work</h3><span>→</span></div><div class="li-featured">${projects.slice(0,3).map(p=>`<button data-project="${p.id}"><div class="lf-art ${p.tone}">${p.title}</div><b>${p.title}</b><small>${p.type} · ${p.year}</small></button>`).join('')}</div></article><article class="li-card"><div class="card-title"><h3>Activity</h3><span>1,204 followers</span></div><div class="li-post"><div class="avatar">UM</div><div><b>Utkarsh Mangal</b><small>Computational mathematics × AI</small></div></div><p>Numbers have always made sense to me. Now I’m trying to make the software around them just as interesting.</p><div class="li-actions-row">Like　 Comment　 Repost　 Send</div></article></section><aside><div class="li-card mini-card"><b>Analytics</b><p>Profile views <strong>142</strong></p><p>Post impressions <strong>8.7K</strong></p><p>Search appearances <strong>63</strong></p></div><div class="li-card mini-card"><b>People also viewed</b><p>Quant Researcher</p><p>ML Engineer</p><p>Product Engineer</p></div></aside></div></main>`,{app:'linkedin',cls:'linkedin'});}

function renderSnapchat(){return shell(`<main class="snap-page"><div class="snap-camera"><div class="snap-sky"><span>MEMORY</span><h2>Paris / 2026</h2><p>Exchange semester. Mathematics. Trains. Late nights.</p><button>OPEN MEMORY</button></div><div class="snap-stories">${['MATH CLUB','PARIS','F1','BUILD MODE'].map((x,i)=>`<button><div class="story-ring s${i}">UM</div><b>${x}</b></button>`).join('')}</div></div><section class="snap-memories"><div class="section-head"><h2>Memories</h2><span>2026 ▾</span></div><div class="memory-grid">${['CentraleSupélec','Lyon','Annecy','Milan','Lake Como','Venice'].map((x,i)=>`<button class="memory m${i}"><small>JUN ${9+i}</small><b>${x}</b></button>`).join('')}</div></section></main>`,{app:'snapchat',cls:'snap'});}

function renderNetflix(){return shell(`<main class="netflix-page"><section class="nf-hero"><div class="nf-hero-copy"><span>UM ORIGINAL · 2026</span><h2>THE WORK.</h2><p>A portfolio told like a series: products, research, algorithms and experiments — each with a story worth opening.</p><div><button class="nf-play" data-project="unipool">▶ PLAY UNIPOOL</button><button class="nf-info" data-project="tobs">ⓘ MORE INFO</button></div></div></section><section class="nf-content"><div class="nf-row-head"><h3>Continue building</h3><span>See all →</span></div><div class="nf-row">${projects.slice(0,4).map(projectCard).join('')}</div><div class="nf-row-head"><h3>Because you like mathematics</h3><span>Curated for you</span></div><div class="nf-row">${projects.slice(2).map(projectCard).join('')}</div></section></main>`,{app:'netflix',cls:'netflix'});}

function renderSpotify(){return shell(`<main class="spotify-page"><section class="sp-hero"><div class="sp-orb">♪</div><div><small>GOOD AFTERNOON</small><h2>Build mode.</h2><p>Soundtrack for algorithms, travelling, late-night mathematics and shipping ridiculous ideas.</p></div></section><div class="sp-grid"><section><h3>Made for you</h3><div class="playlist-grid">${[['Deep Work','Algorithms · ML · Modelling','violet'],['Race Day','F1 energy for shipping','red'],['Paris Nights','Exchange semester','blue'],['Quant Hours','Probability · markets · focus','green']].map(x=>`<button class="playlist ${x[2]}"><div class="pl-cover">♫</div><b>${x[0]}</b><span>${x[1]}</span><i>▶</i></button>`).join('')}</div></section><aside class="now-playing"><small>NOW PLAYING</small><div class="np-art">UM</div><h3>Build mode.</h3><p>Utkarsh · Portfolio Sessions</p><div class="progress"><i></i></div><div class="controls">↶　▶　↷</div></aside></div></main>`,{app:'spotify',cls:'spotify'});}

function renderOffice(){return shell(`<main class="office-page"><div class="office-ribbon"><div class="office-logo">▦</div><b>Microsoft 365</b><span>Home</span><span>Insert</span><span>Layout</span><span>Review</span><span>View</span><div class="office-search">⌕ Search</div></div><section class="office-home"><div class="office-welcome"><small>GOOD MORNING, UTKARSH</small><h2>What will you create?</h2><button>＋ New document</button></div><div class="office-recent"><div class="office-title"><h3>Recent</h3><span>Open →</span></div><div class="doc-grid">${[['Resume','DOCX','blue'],['Portfolio World','PPTX','orange'],['Quant Analysis','XLSX','green'],['Research Notes','TEX','red']].map(x=>`<button class="office-doc"><div class="doc-icon ${x[2]}">${x[1]}</div><div><b>${x[0]}</b><small>Modified today · Portfolio</small></div><span>⋯</span></button>`).join('')}</div></div><section class="excel-preview"><div class="excel-head"><b>Quant Analysis.xlsx</b><span>AutoSaved</span></div><div class="formula">fx　=B2/B3-1</div><table><tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th></tr>${[['NIFTY 50','24501','24720','0.0089','CAPM'],['ICICI','1320','1341','0.0157','ALPHA'],['Risk-free','0.065','—','—','BETA'],['Portfolio','1.00','1.12','0.021','SHARPE']].map((r,i)=>`<tr><th>${i+1}</th>${r.map(v=>`<td>${v}</td>`).join('')}</tr>`).join('')}</table></section></section></main>`,{app:'office',cls:'office'});}

const renderers={meta:renderMeta,instagram:renderInstagram,whatsapp:renderWhatsApp,reddit:renderReddit,linkedin:renderLinkedIn,snapchat:renderSnapchat,netflix:renderNetflix,spotify:renderSpotify,office:renderOffice};

function render(key){ root.innerHTML=renderers[key]?renderers[key]():renderMeta(); document.querySelectorAll('.rail-btn').forEach(b=>b.classList.toggle('active',b.dataset.app===key)); bind(); }
function openProject(id){const p=projects.find(x=>x.id===id); if(!p)return; document.body.insertAdjacentHTML('beforeend',projectModal(p)); document.querySelector('.modal-backdrop').classList.add('show'); bind();}
function bind(){
  document.querySelectorAll('[data-app]').forEach(b=>b.onclick=()=>render(b.dataset.app));
  document.querySelectorAll('[data-project]').forEach(b=>b.onclick=()=>openProject(b.dataset.project));
  document.querySelectorAll('[data-close-modal]').forEach(b=>b.onclick=()=>document.querySelector('.modal-backdrop')?.remove());
  document.querySelectorAll('[data-action]').forEach(b=>b.onclick=()=>toast(b.dataset.action==='search'?'Search is coming to the world graph.':'You have no new notifications — yet.'));
}
function toast(text){document.querySelector('.toast')?.remove();document.body.insertAdjacentHTML('beforeend',`<div class="toast">${text}</div>`);setTimeout(()=>document.querySelector('.toast')?.remove(),2200)}

document.querySelectorAll('.rail-btn').forEach(b=>b.addEventListener('click',()=>render(b.dataset.app)));
render('meta');
