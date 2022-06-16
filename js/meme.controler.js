'use strict'

var gCanvas
var gCtx

function init() {
   console.log('im on')
    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d')
    gCtx.lineWidth = 2
    gCtx.strokeStyle = '#2f4f4f'
    gCtx.fillStyle = '#2f4f4f'

    var el = document.querySelector('.meme-contanier')
    console.log(el)
    el.style.display = "none"
    // el.hidden = true
    // renderGallery()
    renderMemeByQueryStringParams()
}



function renderMemeByQueryStringParams() {
    // Retrieve data from the current query-params
    const queryStringParams = new URLSearchParams(window.location.search)
  
    const memeToRender = queryStringParams.get('meme')
    console.log('memeToRender', memeToRender)
  
    if (memeToRender === null) renderGallery()
    else {
    setMeme(memeToRender)
    showMemeDisplay()
    renderMeme()
    }
  }
  




function renderMeme(){
    console.log('rendering meme')

    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
  
    const meme = getMeme() 
    console.log(meme)
    var imgSrc = `img/${meme.selectedImgId}.jpg`

    var img = new Image()
    img.src= imgSrc
    img.onload = renderImg.bind(null, img)

    setTimeout (renderTxt, 100, meme.lines)
}








function renderImg(img) {
    console.log(img)
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
}

function renderTxt(txtLines){
    console.log('rendering txt')
    // const style = getStyle()
    var diff = gCanvas.height/ txtLines.length
    var i= 0
    txtLines.forEach(line => { 
        console.log('im the lin to render', line) 
      
        console.log('font size' , line.fontSize)        
        var currFontSize = (line.fontSize<= maxSize(line.txt))? line.fontSize : maxSize(line.txt)
        console.log('currSize', currFontSize)
        var font= currFontSize +'px '+ line.fontFamily
        gCtx.font = font
        console.log(i, diff)
        gCtx.strokeStyle = line.stroke
        gCtx.fillStyle = line.fill
        gCtx.fillText(line.txt, 10, 50+i*diff)
        gCtx.strokeText(line.txt, 10, 50+i*diff)
        i++
    });

}

function setLineTxt(txt){
    const meme = getMeme() 
    meme.lines[meme.selectedLineIdx].txt= txt
    console.log(meme)
    renderMeme()
}


function onSelectStyle(style){
    console.log(style)
    setStyle(style) 
    renderMeme()

}

function onChangeSize(d){
    changeFontSize(d)
    renderMeme()
}

function onAddLine(){
    addLine()
    renderMeme()
}

function onSwitchLine(){
    switchLine()
    var elInput = document.querySelector('.text-input')
    elInput.value=''
    renderMeme()
} 


function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-meme.jpg'
}


function onSaveMeme(){
    const url = gCanvas.toDataURL()

    const queryStringParams = new URLSearchParams(window.location.search)
    const memeToEdit = queryStringParams.get('meme')
    if(memeToEdit) editMeme(url, memeToEdit)
    else saveMeme(url)

    const newUrl = window.location.protocol + '//' + window.location.host + '/index.html' 
    window.history.pushState({ path: newUrl }, '', newUrl)
    init()
}