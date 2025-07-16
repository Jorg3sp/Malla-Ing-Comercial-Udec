async function cargarMalla() {
  const response = await fetch('malla_comercial_udec.json');
  const data = await response.json();
  const container = document.getElementById('malla-container');

  data.semestres.forEach(sem => {
    const semTitle = document.createElement('h2');
    semTitle.className = 'text-xl font-bold col-span-full mt-4';
    semTitle.textContent = `Semestre ${sem.semestre}`;
    container.appendChild(semTitle);

    sem.ramos.forEach(ramo => {
      const card = document.createElement('div');
      card.className = 'bg-white rounded-lg shadow p-4 cursor-pointer hover:bg-blue-50 transition';
      card.innerHTML = `
        <h3 class="text-lg font-semibold">${ramo.nombre}</h3>
        <p class="text-sm text-gray-600">${ramo.area}</p>
        <span class="inline-block mt-2 px-2 py-1 text-xs rounded-full ${
          ramo.tipo === 'Obligatorio'
            ? 'bg-blue-200 text-blue-800'
            : ramo.tipo === 'Inglés'
            ? 'bg-green-200 text-green-800'
            : 'bg-yellow-200 text-yellow-800'
        }">
          ${ramo.tipo}
        </span>
      `;
      card.onclick = () => abrirModal(ramo);
      container.appendChild(card);
    });
  });
}

function abrirModal(ramo) {
  document.getElementById('modal-title').textContent = ramo.nombre;
  document.getElementById('modal-info').textContent = `Área: ${ramo.area} | Tipo: ${ramo.tipo}`;
  document.getElementById('modal').classList.remove('hidden');
  document.getElementById('modal').classList.add('flex');
}

function closeModal() {
  document.getElementById('modal').classList.add('hidden');
  document.getElementById('modal').classList.remove('flex');
}

cargarMalla();

