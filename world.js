(() => {
  const world = document.querySelector('.world-mode');
  if (!world) return;
  const modal = document.querySelector('.world-modal');
  const modalBody = document.querySelector('.world-modal-body');
  const closeModal = () => { modal?.classList.remove('is-open'); document.body.classList.remove('modal-open'); };
  const open = (kind) => {
    const template = document.getElementById(`world-${kind}`);
    if (!template || !modal || !modalBody) return;
    modalBody.innerHTML = template.innerHTML;
    modal.classList.add('is-open');
    document.body.classList.add('modal-open');
  };

  const style = document.createElement('style');
  style.textContent = `
    .world-mode-switch{position:relative;z-index:8;display:flex;align-items:center;justify-content:center;gap:8px;width:max-content;margin:-35px auto 42px;padding:6px;border:1px solid rgba(255,255,255,.13);border-radius:999px;background:rgba(3,5,8,.78);backdrop-filter:blur(18px);box-shadow:0 15px 55px rgba(0,0,0,.3)}
    .world-mode-label{padding:0 10px;color:#6f7784;font:9px var(--mono);letter-spacing:.16em}
    .world-mode-btn{border:0;border-radius:999px;padding:10px 14px;background:transparent;color:#737986;cursor:pointer;font:700 10px var(--mono);letter-spacing:.08em;transition:.25s}
    .world-mode-btn b{opacity:.45;margin-right:6px}.world-mode-btn:hover{color:#fff}.world-mode-btn.is-active{background:#f2f3f5;color:#07090d;box-shadow:0 5px 20px rgba(255,255,255,.08)}
    [data-world-mode="city"] .world-mode{background:radial-gradient(circle at 25% 55%,rgba(0,210,190,.12),transparent 22%),radial-gradient(circle at 80% 20%,rgba(225,6,0,.12),transparent 28%),linear-gradient(180deg,#06070b,#080d12)}
    [data-world-mode="city"] .world-map{background:linear-gradient(145deg,rgba(0,210,190,.035),rgba(255,255,255,.018)),repeating-linear-gradient(0deg,transparent 0 49px,rgba(0,210,190,.035) 50px),#080b10;box-shadow:inset 0 0 90px rgba(0,210,190,.025),0 30px 100px rgba(0,0,0,.45)}
    [data-world-mode="city"] .world-road{background:linear-gradient(90deg,#111820,#37424d 48%,#111820);box-shadow:0 0 60px rgba(0,210,190,.1)}
    [data-world-mode="city"] .world-node{border-color:rgba(0,210,190,.16);background:linear-gradient(145deg,rgba(8,13,18,.94),rgba(4,7,10,.94));box-shadow:0 12px 35px rgba(0,0,0,.3)}
    [data-world-mode="city"] .world-node:hover{border-color:#00d2be;box-shadow:0 0 35px rgba(0,210,190,.16),0 20px 55px rgba(0,0,0,.45)}
    [data-world-mode="block"] .world-mode{background:linear-gradient(180deg,#101823,#162313 58%,#11170e)}
    [data-world-mode="block"] .world-map{border-radius:10px;border:4px solid #253324;background-color:#6b8453;background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);background-size:32px 32px;box-shadow:inset 0 -80px 0 rgba(0,0,0,.08),0 28px 0 #080c08,0 40px 80px rgba(0,0,0,.35)}
    [data-world-mode="block"] .world-road{height:118px;transform:rotate(-4deg);background:repeating-linear-gradient(90deg,#34383b 0 72px,#3d4144 73px 145px);border:7px solid #59605e;box-shadow:0 12px 0 rgba(0,0,0,.18)}
    [data-world-mode="block"] .world-road:after{border:0;height:8px;background:repeating-linear-gradient(90deg,#f5d45c 0 42px,transparent 42px 82px);top:calc(50% - 4px)}
    [data-world-mode="block"] .world-node{width:142px;min-height:104px;border-radius:6px;border:3px solid rgba(0,0,0,.35);background:#e8e2c9;color:#182017;box-shadow:7px 7px 0 rgba(0,0,0,.2),inset 0 -8px 0 rgba(0,0,0,.08);backdrop-filter:none;transition:.18s transform,.18s box-shadow}
    [data-world-mode="block"] .world-node:hover{transform:translate(-3px,-9px);border-color:#fff;box-shadow:9px 12px 0 rgba(0,0,0,.22),0 0 0 4px rgba(255,255,255,.15)}
    [data-world-mode="block"] .world-node small{color:#59604d}.world-node strong{letter-spacing:.02em}.world-node span{color:#4d5548}
    [data-world-mode="block"] .node-work{background:#d9a45b}.node-work strong,[data-world-mode="block"] .node-work small{color:#39230d}
    [data-world-mode="block"] .node-social{background:#78a8d1}.node-social strong,[data-world-mode="block"] .node-social small{color:#10253a}
    [data-world-mode="block"] .node-office{background:#ddd5ad}.node-office strong,[data-world-mode="block"] .node-office small{color:#36321f}
    [data-world-mode="block"] .node-games{background:#83b66d}.node-games strong,[data-world-mode="block"] .node-games small{color:#1d3517}
    [data-world-mode="block"] .node-contact{background:#c98683}.node-contact strong,[data-world-mode="block"] .node-contact small{color:#3b1717}
    [data-world-mode="block"] .node-life{background:#9b8cc5}.node-life strong,[data-world-mode="block"] .node-life small{color:#241a3b}
    [data-world-mode="block"] .world-minihud{color:#243221}
    [data-world-mode="block"] .world-mode-btn.is-active{background:#263b22;color:#eaf5df;box-shadow:inset 0 -3px 0 #88b76f}
    @media(max-width:760px){.world-mode-switch{margin:-20px auto 28px;max-width:calc(100vw - 36px);overflow:auto}.world-mode-label{display:none}.world-mode-btn{white-space:nowrap}}
  `;
  document.head.appendChild(style);

  const modeBar = document.createElement('div');
  modeBar.className = 'world-mode-switch';
  modeBar.innerHTML = `<span class="world-mode-label">WORLD MODE</span><button type="button" class="world-mode-btn is-active" data-mode="city"><b>01</b> NEON CITY</button><button type="button" class="world-mode-btn" data-mode="block"><b>02</b> BLOCK WORLD</button>`;
  world.insertBefore(modeBar, world.firstChild);
  const setMode = (mode) => {
    document.body.dataset.worldMode = mode;
    world.dataset.mode = mode;
    modeBar.querySelectorAll('.world-mode-btn').forEach(btn => btn.classList.toggle('is-active', btn.dataset.mode === mode));
    localStorage.setItem('um-world-mode', mode);
  };
  modeBar.querySelectorAll('.world-mode-btn').forEach(btn => btn.addEventListener('click', () => setMode(btn.dataset.mode)));
  setMode(localStorage.getItem('um-world-mode') === 'block' ? 'block' : 'city');

  document.querySelectorAll('[data-world]').forEach((el) => el.addEventListener('click', () => open(el.dataset.world)));
  document.addEventListener('click', (e) => { if (e.target.closest('.world-close')) closeModal(); });
  modal?.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
})();