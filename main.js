const grid = new Muuri('.grid', { 
    layout : { 
      
      rounding : false , 
    }
});
// event listener para filtrar por catgorias
window.addEventListener('load', ()=> {
    grid.refreshItems().layout();
    document.getElementById('grid').classList.add('imagenes-cargadas');

    const enlaces = document.querySelectorAll('#categorias a');

    enlaces.forEach((elemento)=>{
        
        elemento.addEventListener('click', (evento)=> {
            evento.preventDefault();
            enlaces.forEach((enlace)=>{
                enlace.classList.remove('activo');
            })
           evento.target.classList.add('activo'); 
           const categoria = evento.target.innerHTML.toLowerCase();
        // esto seria como un if pero mas moderno y recortado, esta diciendo si la cateria es todos motrar todas las imagenes
        // si no muestre por categoria
           categoria === 'todos' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria ="${categoria}"]`);
        });
    });
    // agregamos el listener pero para la barra de busqueda
    document.querySelector('#barra-busqueda').addEventListener('input', (evento)=>{
        const busqueda = evento.target.value;
        grid.filter((items)=> items.getElement().dataset.etiquetas.includes(busqueda));
    });
    //Agregar listener para las imagenes
    const overlay =document.getElementById('overlay');
    document.querySelectorAll('.grid .item img').forEach((elemento)=>{
        elemento.addEventListener('click', () => { 
            const ruta = elemento.getAttribute('src');
            const descripcion = elemento.parentNode.parentNode.dataset.descripcion;
            overlay.classList.add('activo');
            document.querySelector('#overlay img').src = ruta;
            document.querySelector('#overlay .descripcion').innerHTML = descripcion;
        })
    });

    // eventlistener del boton cerrar
    document.querySelector('#btn-cerrar-popup').addEventListener('click', ()=> {
        overlay.classList.remove('activo');
    });

    //eventlistener del overlay
    overlay.addEventListener('click', (evento)=>{
        evento.target.id === 'overlay'? overlay.classList.remove('activo'): "";
    });
});