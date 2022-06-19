'use strict'


// render meme gallery page
function renderMemeGallary() {
    const txt = 'Nothing here yet... Create a meme'
    const memes = getMemeGallery()
    if(!memes){
        return
    }

    var strHTMLs = memes.map (meme => `<div onclick="onEditMeme(${memes.indexOf(meme)})" 
                                        class="meme-img img${memes.indexOf(meme)}"></div>`)

    document.querySelector('.meme-gallery-container').innerHTML = strHTMLs.join('')
    
    memes.forEach((meme, idx) => {
        var elImg = document.querySelector(`.img${idx}`)
        elImg.style.backgroundImage = 'url(' + meme.url +')'

        var ratio = getRatio(meme.selectedImgId)
        elImg.style.height = 270*ratio +"px"
    })


}

//show meme gallery from nav bar
function memeGallery(){
    display('meme-gallery')
    renderMemeGallary()
    document.body.classList.remove('menu-open')
}


//click on meme from meme gallery to edit 
function onEditMeme(idx){
    setMeme(idx)
    const queryStringParams = `?meme=${idx}`
    const newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
    init()

}


