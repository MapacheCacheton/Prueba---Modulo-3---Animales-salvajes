import {Leon, Lobo, Oso, Serpiente, Aguila} from "./clases.js";


const moduloAnimal = (function(){
    const state = {}
    
    //DOMCache
    const div_animales = document.querySelector('#Animales')
    const tipo_animal = document.querySelector('#animal')
    const btn_registrar = document.querySelector('#btnRegistrar')
    const preview_animal =document.querySelector('#preview')


    //Events
    tipo_animal.addEventListener('change', chageHandler)//Evento de dropdownlist para capturar tipo de animal
    btn_registrar.addEventListener('click', clickHandler)//Evento de boton para generar objeto y carta de animal

    //Funciones
    async function init() {//Funcion principal
        state['animales'] = await getAnimal()
    }

    function chageHandler(e){//funcion de evento para dropdownlist
        e.preventDefault()
        const animal_select = filtarAnimal(state, this.value)
        preview_animal.innerHTML = `<img class="ajustado" src="./assets/imgs/${animal_select.imagen}" alt="">`
    }
    function clickHandler(e){//funcion de evento para boton
        e.preventDefault()
        //DOMCache
        const edad_animal = document.querySelector('#edad')
        const tipo = document.querySelector('#animal')
        const comentario = document.querySelector('#comentarios')


        const animal_fil = filtarAnimal(state, tipo.value)
        const obj_animal = instanciarAnimal(tipo.value, edad_animal.value, comentario.value, animal_fil)
        div_animales.innerHTML = renderTarjeta(obj_animal)
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
        const animal_filtrado = animales.animales.filter(animal => animal.name === tipo)
        return animal_filtrado[0]
    }

    function instanciarAnimal(tipo_animal, edad_animal, comentario, animal){
        switch(tipo_animal){
            case 'Leon':{
                const leon = new Leon(tipo_animal, edad_animal, animal.imagen, comentario, animal.sonido)
                return leon
            }
            case 'Lobo':{
                const lobo = new Lobo(tipo_animal, edad_animal, animal.imagen, comentario, animal.sonido)
                return lobo
            }
            case 'Serpiente':{
                const serpiente = new Serpiente(tipo_animal, edad_animal, animal.imagen, comentario, animal.sonido)
                return serpiente
            }
            case 'Oso':{
                const oso = new Oso(tipo_animal, edad_animal, animal.imagen, comentario, animal.sonido)
                return oso
            }
            case 'Aguila':{
                const aguila = new Aguila(tipo_animal, edad_animal, animal.imagen, comentario, animal.sonido)
                return aguila
            }
        }
    }

    //Render
    function renderTarjeta(obj_animal){
        const card_deck_html = [] 
        const html = ` 
        <div class="card">
            <img src="assets/imgs/${obj_animal.img}" class="card-img-top" alt="...">
            <div class="bg-dark card-body text-center">
                <i class="fas fa-volume-up text-white"></i>
            </div>
        </div>`
        

        return html
    }
    return {init:init}
})()

moduloAnimal.init()