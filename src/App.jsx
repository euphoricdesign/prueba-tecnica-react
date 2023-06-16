import React, { useEffect, useState } from 'react'

const FACT_ENDPOINT_URL = 'https://catfact.ninja/fact'
// const IMAGE_ENDPOINT_URL = `https://cataas.com/cat/says/${firstWord}?json=true`


function App() {
    const [fact, setFact] = useState('')
    const [image, setImage] = useState()

    useEffect( () => {
        fetch(FACT_ENDPOINT_URL)
        .then(resp => resp.json())
        .then(data => {
            const { fact } = data
            setFact(fact)
        })
    },[] )

    useEffect(() => {

        if (!fact) return

        const firstWord = fact.split(' ')[0] // Esto nos devuelve la primera palabra y es lo que pide el enunciado

        // Pero puede pasar que nos pidan las tres primeras palabras, por ejemplo, para saber dos cosas 

        // - Si eres capaz de buscar documentación, porque esto mucha gente no se lo sabe de memoria Y ESTA BIEN 
        // - O quizas solo quieren ver como manipular arrays, strings y toda la bola 

        const threeFirstWords = fact.split(' ').slice(0, 3).join(' ')

        // Lo que estamos haciendo es utilizar el método slice que nos va a devolver un array con las primeras tres palabras
        // y luego el método join que nos transforma dicho array nuevamente en un string 

        // Si no te acuerdas de esto, que es norrrmal, lo que tienes que hacer para buscar esto es:

        // - Primero que nada en el buscador poner: "MDN"
        // - Luego podemos seguir con: "separate string by token" o en español "separar string por separador" de cualquiera de las dos formas
        // lo primero que nos aparece es el método split 
        // Después, en otra busqueda, pondriamos "MDN quedarse con X cantidad de elementos de un array"
        // Por último "MDN juntar elementos de un array en string"

        // Esta es la forma correcta de buscar, no se recomienda meterse en blogs random ni buscar JAMÁS la SOLUCIÓN DIRECTAMENTE, hay que buscar la documentación  

        fetch(`https://cataas.com/cat/says/${threeFirstWords}?json=true`)
        .then(resp => resp.json())
        .then(data => {
            const {url} = data
            setImage(`https://cataas.com${url}`) // Esto funciona de diez, pero se puede hacer mejor. En el estado siempre debemos tener lo minimo necesario. crear una constante fuera y hacer la concatenación en el src
        })
    }, [fact])


    return (
        <main>
            <h1>App de gatitos</h1>
            { fact && <p>{ fact }</p> }
            { image && <img src={image} alt={ `Image extracted using the first three words from ${fact}` } /> } 
        </main> 
    )
}

export default App

// cuando escribas el alt en la imagen (ESCRIBILO SIEMPRE) que se note que, al menos, tenes una LIGERA sensibilidad por la accesibilidad
// (el hecho de no usar solo divs es también una demostración de eso) ¿Que se podria poner ahí? `Image extracted using the first three words from ${fact}` 
// lo ideal seria describir la imagen, pero como no podemos hacerlo esto estaría bastante bien 