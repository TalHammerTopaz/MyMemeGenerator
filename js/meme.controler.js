'use strict'

var gCanvas
var gCtx



function init() {
    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d')
    gCtx.lineWidth = 2
    gCtx.strokeStyle = '#2f4f4f'
    gCtx.fillStyle = '#2f4f4f'

    document.querySelector('.meme-contanier').hidden = true
    renderGallery()
    // renderMeme()
}




function renderMeme(){
    console.log('rendering meme')

    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
  
    const meme = getMeme() 
    var imgSrc = `img/${meme.selectedImgId}.jpg`

    var img = new Image()
    img.src= imgSrc
    img.onload = renderImg.bind(null, img)

    // const style = getStyle()
    
    // gCtx.strokeStyle= style.stroke
    // gCtx.fillStyle = style.fill

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