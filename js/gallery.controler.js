'use strict'



//render home img gallery
function renderGallery(){
    
    const imgs = getImagesToRender()

    var strHtmls = imgs.map(
        img => `<img class="gallery-img" 
                onclick="onImgSelect(${img.id})" 
                src="img/${img.id}.jpg">`)
    
    const elImgContainer = document.querySelector('.img-container')
    elImgContainer.innerHTML = strHtmls.join('')

    renderSearchWords() 
    display('gallery')
   
}



//display section (home-gallery/meme-editor/ meme-gallery) according to selection
function display(value){
    document.querySelector('.gallary').style.display = (value === 'gallery') ? 'block' : 'none'
    document.querySelector('.meme-contanier').style.display = (value === 'meme')?  'flex' : 'none'
    document.querySelector('.meme-gallery-section').style.display = (value === 'meme-gallery')? 'block' : 'none'
}

//show meme editor with selected image
function onImgSelect(imgId){
    const meme = getMeme() 
    meme.selectedImgId =imgId
    display('meme')
    renderMeme()
}


//generate random meme
function onGenerateRandomMeme(){  
    generateRandomMeme()
    display('meme')
    renderMeme()
}

//set search filter
function onSearch(value){
    if (value.innerText) value = value.innerText
    setFilter(value)
    renderGallery()
}

//render search words according to clicks
function renderSearchWords(){
    var searchWords = getSearchWordsMap()
    var words = Object.keys(searchWords)
    var strHtmls = words.map(
        word =>  `<span class="${word}" 
                onclick="onSearch(this)" 
                >${word}</span>`)

    const elWords = document.querySelector('.search-words')
    elWords.innerHTML = strHtmls.join('  ')

    for (const word in searchWords) {
        var selector = '.'+word+''
        var elWord = document.querySelector(selector)
        elWord.style.fontSize = searchWords[word]>8 ? searchWords[word]*3 +"px" :0
      }   
}

