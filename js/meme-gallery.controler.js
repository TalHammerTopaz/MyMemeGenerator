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
        console.log(memes[i].selectedImgId, 'memes[i].selectedImgId')
        var ratio = getRatio(memes[i].selectedImgId)
        elImg.style.minHeight = 270*ratio +"px"
    }      


}


function onEditMeme(idx){
    setMeme(idx)
    const queryStringParams = `?meme=${idx}`
    const newUrl = window.location.protocol + '//' + window.location.host + '/index.html' + queryStringParams
    setTimeout(window.open, 500, newUrl)


}


