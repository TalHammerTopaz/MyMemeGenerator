'use strict'




function renderGallery(){

    console.log('rendering gallery')

    const imgs = getImagesToRender()
    console.log(imgs)

    var strHtmls = imgs.map(
        img => `<img class="gallery-img" 
                onclick="onImgSelect(${img.id})" 
                src="img/${img.id}.jpg">`)
    
    const elImgContainer = document.querySelector('.img-container')
    elImgContainer.innerHTML = strHtmls.join('')

    renderSearchWords() 

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


function onSearch(value){
    console.log(value)
    setFilter(value)
    renderGallery()
}


function renderSearchWords(){
    var searchWords = getSearchWordsMap()
    var words = Object.keys(searchWords)
    var strHtmls = words.map(
        word =>  `<span class="${word}" 
                onclick="searchClick(this)" 
                >${word}</span>`)

    const elWords = document.querySelector('.search-words')
    elWords.innerHTML = strHtmls.join('  ')

    for (const word in searchWords) {
        var selector = '.'+word+''
        var elWord = document.querySelector(selector)
        elWord.style.fontSize = searchWords[word]>8 ? searchWords[word]*3 +"px" :0
      }   
}

function searchClick(word){
    console.log(word.innerText)
    setFilter(word.innerText)  
    renderGallery()
  
}

