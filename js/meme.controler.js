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
  


function renderMeme(saving=false){
    console.log('rendering meme')

    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
  
    const meme = getMeme() 
    console.log(meme)
    var imgSrc = `img/${meme.selectedImgId}.jpg`

    var img = new Image()
    img.src= imgSrc
    img.onload = renderImg.bind(null, img)
    
    var idx = saving? false: meme.selectedLineIdx
    console.log('idx', idx)
    setTimeout (renderTxt, 100, meme.lines, idx)
}





function renderImg(img) {
    console.log(img)
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
}

function renderTxt(txtLines, lineIdx, d){
    console.log('rendering txt')
    
    console.log('lineIdx', lineIdx)
    var diff = gCanvas.height/ txtLines.length

    for (let i=0; i<txtLines.length; i++){
        var line = txtLines[i]
        var currFontSize = (line.fontSize<= maxSize(line.txt))? line.fontSize : maxSize(line.txt)
        var font= currFontSize +'px '+ line.fontFamily
        gCtx.font = font
    
        gCtx.strokeStyle = line.stroke
        gCtx.fillStyle = line.fill
        console.log('im here', d)
        gCtx.fillText(line.txt, 10, line.lineStart)
        gCtx.strokeText(line.txt, 10, line.lineStart)

        if (i === lineIdx){
            gCtx.lineWidth = 1
            gCtx.strokeStyle = "#000000"
            gCtx.strokeRect(8, line.lineStart-32, gCanvas.width-16, 40) 
        }

    }
   
        
    

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
    const txt = switchLine()
    var elInput = document.querySelector('.text-input')
    elInput.value= txt
    renderMeme()
} 


function downloadCanvas(elLink) {
    renderMeme(true)
    setTimeout(()=>{
        const data = gCanvas.toDataURL()
        elLink.href = data
        elLink.download = 'my-meme.jpg'}, 300)}


function onSaveMeme(){

    renderMeme(true)

    setTimeout(()=>{
        const url = gCanvas.toDataURL()
    
        const queryStringParams = new URLSearchParams(window.location.search)
        const memeToEdit = queryStringParams.get('meme')
        if(memeToEdit) editMeme(url, memeToEdit)
        else saveMeme(url)

        const newUrl = window.location.protocol + '//' + window.location.host + '/meme-gallary.html'
        setTimeout(window.open, 500, newUrl)

    }, 100)
    
}


function onDelete(){ 
    deleteline()
    var elInput = document.querySelector('.text-input')
    elInput.value= ''
    renderMeme()
}

function onLineMove(d){
    console.log(d)
    setlinestart(d)
    renderMeme()

}