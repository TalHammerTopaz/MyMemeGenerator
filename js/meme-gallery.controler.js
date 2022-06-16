'use strict'




function renderMemeGallary() {

    var strHTML =''
    const memes = getMemeGallery()
    for (let i=0; i<memes.length; i++){
        strHTML+= `<div onclick="onEditMeme(${i})" class="meme-img img${i}"></div>`
    }
    const elContainer = document.querySelector('.meme-gallery-container')
    console.log(strHTML)
    elContainer.innerHTML = strHTML
   
    for (let i=0; i<memes.length; i++){
        var selector  = `.img${i}`
        var elImg = document.querySelector(selector)
        var url = 'url(' + memes[i].url +')'
        elImg.style.backgroundImage = url
    }      


}


function onEditMeme(idx){
    setMeme(idx)
    setTimeout(window.open, 500, 'index.html')
    init()

}


