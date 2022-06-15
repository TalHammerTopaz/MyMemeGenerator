'use strict'

function renderGallery(){
   

    var strHTML =''
    for (var i=0; i<18; i++){
        strHTML +=`<img class="gallery-img" onclick="onImgSelect(${i+1})" src="img/${i+1}.jpg">`
    }
    const elImgContainer = document.querySelector('.img-container')
    elImgContainer.innerHTML = strHTML
}

function onImgSelect(imgId){
    const meme = getMeme() 
    meme.selectedImgId =imgId
    showMemeDisplay()
    renderMeme()
}

function showMemeDisplay(){
    document.querySelector('.meme-contanier').hidden = false
    document.querySelector('.gallary').hidden = true
}


function onGenerateRandomMeme(){
    generateRandomMeme()
    showMemeDisplay()
    renderMeme()
}