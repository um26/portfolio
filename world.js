(() => {
  const world = document.querySelector('.world-mode');
  if (!world) return;
  const modal = document.querySelector('.world-modal');
  const modalBody = document.querySelector('.world-modal-body');
  const close = document.querySelector('.world-close');
  const open = (kind) => {
    const template = document.getElementById(`world-${kind}`);
    if (!template || !modal || !modalBody) return;
    modalBody.innerHTML = template.innerHTML;
    modal.classList.add('is-open');
    document.body.classList.add('modal-open');
  };
  document.querySelectorAll('[data-world]').forEach((el) => el.addEventListener('click', () => open(el.dataset.world)));
  close?.addEventListener('click', () => { modal.classList.remove('is-open'); document.body.classList.remove('modal-open'); });
  modal?.addEventListener('click', (e) => { if (e.target === modal) close?.click(); });
})();