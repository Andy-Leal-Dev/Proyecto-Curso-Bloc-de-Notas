// Mostrar nota en modal
function viewNote(id, title, content) {
  document.getElementById('viewNoteTitle').textContent = title;
  document.getElementById('viewNoteContent').textContent = content;
  const modal = new bootstrap.Modal(document.getElementById('viewNoteModal'));
  modal.show();
}

// Preparar edición de nota
function editNote(id, title, content) {
  document.getElementById('editNoteId').value = id;
  document.getElementById('editNoteTitle').value = title;
  document.getElementById('editNoteContent').value = content;
  const modal = new bootstrap.Modal(document.getElementById('editNoteModal'));
  modal.show();
}

// Preparar nueva nota
function prepareNewNote() {
  document.getElementById('editNoteId').value = '';
  document.getElementById('editNoteTitle').value = '';
  document.getElementById('editNoteContent').value = '';
  const modal = new bootstrap.Modal(document.getElementById('editNoteModal'));
  modal.show();
}

// Preparar eliminación de nota
function prepareDeleteNote(id, title) {
  document.getElementById('deleteNoteId').value = id;
  document.querySelector('#deleteNoteModal .modal-body').innerHTML = `
    ¿Estás seguro de que quieres eliminar la nota "<strong>${title}</strong>"? 
    Esta acción no se puede deshacer.
  `;
  const modal = new bootstrap.Modal(document.getElementById('deleteNoteModal'));
  modal.show();
}

// Manejar envío de formulario de nota
document.getElementById('editNoteForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const id = document.getElementById('editNoteId').value;
  const title = document.getElementById('editNoteTitle').value;
  const content = document.getElementById('editNoteContent').value;
  
  try {
    let response;
    
    if (id) {
      // Actualizar nota existente
      response = await fetch(`/notes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content })
      });
    } else {
      // Crear nueva nota
      response = await fetch('/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content })
      });
    }
    
    const data = await response.json();
    
    if (data.success) {
      window.location.reload();
    } else {
      alert(data.error || 'Error al guardar la nota');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error al guardar la nota');
  }
});

// Confirmar eliminación de nota
document.getElementById('confirmDelete')?.addEventListener('click', async () => {
  const id = document.getElementById('deleteNoteId').value;
  
  try {
    const response = await fetch(`/notes/${id}`, {
      method: 'DELETE'
    });
    
    const data = await response.json();
    
    if (data.success) {
      window.location.reload();
    } else {
      alert(data.error || 'Error al eliminar la nota');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error al eliminar la nota');
  }
});