'use strict'


// render meme gallery page
function renderMemeGallary() {

    var strHTML =''
    const memes = getMemeGallery()
    var strHTMLs = memes.map (meme => `<div onclick="onEditMeme(${memes.indexOf(meme)})" 
                                        class="meme-img img${memes.indexOf(meme)}"></div>`)
    document.querySelector('.meme-gallery-container').innerHTML = strHTMLs.join('')
    
    for (let i=0; i<memes.length; i++){

        var elImg = document.querySelector(`.img${i}`)
        elImg.style.backgroundImage = 'url(' + memes[i].url +')'

        var ratio = getRatio(memes[i].selectedImgId)
        elImg.style.height = 270*ratio +"px"
    }       

}

//show meme gallery from nav bar
function memeGallery(){
    display('meme-gallery')
    renderMemeGallary()
}


//click on meme from meme gallery to edit 
function onEditMeme(idx){
    setMeme(idx)
    const queryStringParams = `?meme=${idx}`
    const newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
    init()

}


