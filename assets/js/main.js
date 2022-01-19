import {Leon, Lobo, Oso, Serpiente, Aguila} from "./clases.js";


const moduloAnimal = (function(){
    //variables
    let state = {
        instancias: []
    }
    const card_deck_html = [] 
    
    //DOMCache
    const div_animales = document.querySelector('#Animales')
    const tipo_animal = document.querySelector('#animal')
    const btn_registrar = document.querySelector('#btnRegistrar')
    const preview_animal = document.querySelector('#preview')
    const modal_animal = document.querySelector('.contenido-animal')
    const modal_audio = document.querySelector('.contenido-audio')


    //Events
    tipo_animal.addEventListener('change', chageHandler)//Evento de dropdownlist para capturar tipo de animal
    btn_registrar.addEventListener('click', clickHandler)//Evento de boton para generar objeto y carta de animal

    $('#exampleModal').on('show.bs.modal', beforeModalShow)
    $('#audiomodal').on('show.bs.modal', beforeAudioModalShow)
    $('#audiomodal').on('hide.bs.modal', afterAudioModalShow)
      

    //Funciones
    async function init() {//Funcion principal
        const json = await getAnimal()
        state.animales = json
    }

    function chageHandler(e){//funcion de evento para dropdownlist
        e.preventDefault()
        const animal_select = filtarAnimal(state.animales, this.value)
        preview_animal.innerHTML = `<img class="ajustado" src="./assets/imgs/${animal_select.imagen}" alt="">`
    }
    function clickHandler(e){//funcion de evento para boton
        e.preventDefault()
        //DOMCache
        const edad_animal = document.querySelector('#edad')
        const tipo = document.querySelector('#animal')
        const comentario = document.querySelector('#comentarios')

        if(edad_animal.value !== 'Seleccione un rango de años' && tipo.value !== 'Seleccione un animal' && comentario.value !== ''){
            const animal_fil = filtarAnimal(state.animales, tipo.value)
            const obj_animal = instanciarAnimal(tipo.value, edad_animal.value, comentario.value, animal_fil)
            state.instancias.push(obj_animal)
            div_animales.innerHTML = renderTarjeta(obj_animal, state.instancias.length - 1)

            edad_animal.selectedIndex = 0
            tipo.selectedIndex = 0
            comentario.value = ''
        }
        else{
            alert('Se deben llenar todos los campos para añadir el animal')
        }
    }

    async function getAnimal(){
        const animales = await fetchAnimal()
        const arr_animales = animales.animales
        return arr_animales
    }

    async function fetchAnimal(){
        try{
            const data = await fetch('./animales.json')
            if(data.status === 200){
                console.log(data.status);
                return data.json()
            }
            
        }
        catch(e){
            console.error(e);
        }
    }

    function filtarAnimal(animales, tipo){
        const animal_filtrado = animales.filter(animal => animal.name === tipo)
        return animal_filtrado[0]
    }

    function instanciarAnimal(tipo_animal, edad_animal, comentario, animal){
        switch(tipo_animal){
            case 'Leon':{              
                return new Leon(tipo_animal, edad_animal, animal.imagen, comentario, animal.sonido)
            }
            case 'Lobo':{
                return new Lobo(tipo_animal, edad_animal, animal.imagen, comentario, animal.sonido)
            }
            case 'Serpiente':{
                return new Serpiente(tipo_animal, edad_animal, animal.imagen, comentario, animal.sonido)
            }
            case 'Oso':{               
                return new Oso(tipo_animal, edad_animal, animal.imagen, comentario, animal.sonido)
            }
            case 'Aguila':{
                return new Aguila(tipo_animal, edad_animal, animal.imagen, comentario, animal.sonido)
            }
        }
    }

    //Render
    function renderTarjeta(obj_animal, index = 0){
        const html = `<div class="card col-sm-12 col-md-6 col-lg-4 p-0">
                        <img data-toggle="modal" data-target="#exampleModal" data-index="${index}" class="tarjeta" src="assets/imgs/${obj_animal.img}" class="card-img-top" alt="${obj_animal.name}">
                        <div data-toggle="modal" data-target="#audiomodal" data-index="${index}"  class="bg-dark card-body text-center">
                            <i class="fas fa-volume-up text-white"></i>
                        </div>
                    </div>`
        
        card_deck_html.push(html) // apila tarjetas
        return card_deck_html.join('')
    }

    function beforeModalShow(e) {
        const index = e.relatedTarget.dataset.index
        const obj_animal = state.instancias[index]

        modal_animal.innerHTML = `<div class="card bg-dark text-center text-white my-3">
                <img class="tarjeta" src="assets/imgs/${obj_animal.img}" class="card-img-top" alt="${obj_animal.name}">
                <div class="card-body">
                <h2>${obj_animal.edad}</h2>
                <h3>Comentarios</h3>
                <p class="card-text">${obj_animal.comentarios}</p>
                </div>
            </div>`
    }

    function beforeAudioModalShow(e){
        const index = e.relatedTarget.dataset.index
        const obj_animal = state.instancias[index]

        modal_audio.innerHTML = `<audio controls autoplay>
                                    <source src="assets/sounds/${obj_animal.sonido}" type="audio/mp3" >
                                </audio>`
    }

    function afterAudioModalShow(){
        modal_audio.innerHTML = ``
    }

    return {init:init}
})()

moduloAnimal.init()