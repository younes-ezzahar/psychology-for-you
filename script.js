document.getElementById('year').textContent = new Date().getFullYear();

// Menu mobile
const burger = document.querySelector('.burger'), menu = document.getElementById('menu');
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
menu.addEventListener('click', e => { if (e.target.tagName === 'A') { menu.classList.remove('open'); burger.setAttribute('aria-expanded', false); } });

// Formulaire : Formspree si configuré, sinon ouverture du client e-mail
const form = document.getElementById('form'), msg = document.getElementById('msg');
form.addEventListener('submit', async e => {
  e.preventDefault();
  const d = new FormData(form);
  msg.className = ''; msg.textContent = 'Envoi en cours…';
  if (form.action.includes('VOTRE_ID')) {
    const body = `Nom : ${d.get('nom')}%0D%0ATéléphone : ${d.get('telephone')}%0D%0AE-mail : ${d.get('email')}%0D%0AMotif : ${d.get('motif')}%0D%0A%0D%0A${encodeURIComponent(d.get('message') || '')}`;
    location.href = `mailto:psychologyforyou33@gmail.com?subject=${encodeURIComponent('Demande de rendez-vous')}&body=${body}`;
    msg.textContent = 'Votre application e-mail va s’ouvrir pour envoyer la demande.';
    return;
  }
  try {
    const r = await fetch(form.action, { method: 'POST', body: d, headers: { Accept: 'application/json' } });
    if (!r.ok) throw 0;
    form.reset(); msg.className = 'ok';
    msg.textContent = 'Merci ! Votre demande a bien été envoyée. Nous vous recontactons rapidement.';
  } catch {
    msg.className = 'err';
    msg.textContent = 'Échec de l’envoi. Appelez-nous au +212 608 94 79 07 ou écrivez à psychologyforyou33@gmail.com.';
  }
});
