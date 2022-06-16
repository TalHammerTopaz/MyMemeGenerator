'use strict'




function renderGallery(){

    console.log('rendering gallery')

    var strHTML =''
    for (var i=0; i<18; i++){
        strHTML +=`<img class="gallery-img" onclick="onImgSelect(${i+1})" src="img/${i+1}.jpg">`
    }

    const elImgContainer = document.querySelector('.img-container')
    elImgContainer.innerHTML = strHTML

    document.querySelector('.meme-contanier').style.display = "none"
    document.querySelector('.gallary').style.display = "block"
}

function onImgSelect(imgId){
    const meme = getMeme() 
    meme.selectedImgId =imgId
    showMemeDisplay()
    renderMeme()
}


function showMemeDisplay(){
    document.querySelector('.meme-contanier').style.display = "flex"
    document.querySelector('.gallary').style.display = "none"
    
}


function onGenerateRandomMeme(){
    
    generateRandomMeme()
    showMemeDisplay()
    renderMeme()
}