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

  // Two ways to explore the same portfolio world:
  // 1. Neon City = GTA/cyberpunk, cinematic and information-dense.
  // 2. Block World = playful Roblox/Minecraft-inspired, chunky and game-like.
  const modeBar = document.createElement('div');
  modeBar.className = 'world-mode-switch';
  modeBar.innerHTML = `
    <span class="world-mode-label">WORLD MODE</span>
    <button type="button" class="world-mode-btn is-active" data-mode="city"><b>01</b> NEON CITY</button>
    <button type="button" class="world-mode-btn" data-mode="block"><b>02</b> BLOCK WORLD</button>
  `;
  world.insertBefore(modeBar, world.firstChild);

  const setMode = (mode) => {
    document.body.dataset.worldMode = mode;
    world.dataset.mode = mode;
    modeBar.querySelectorAll('.world-mode-btn').forEach(btn => btn.classList.toggle('is-active', btn.dataset.mode === mode));
    localStorage.setItem('um-world-mode', mode);
  };
  modeBar.querySelectorAll('.world-mode-btn').forEach(btn => btn.addEventListener('click', () => setMode(btn.dataset.mode)));
  const savedMode = localStorage.getItem('um-world-mode');
  setMode(savedMode === 'block' ? 'block' : 'city');

  document.querySelectorAll('[data-world]').forEach((el) => el.addEventListener('click', () => open(el.dataset.world)));
  document.addEventListener('click', (e) => { if (e.target.closest('.world-close')) closeModal(); });
  modal?.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
})();