'use strict'

var gCanvas
var gCtx

var gStyle = {
    fill: "#A3DBE6",
    stroke: "#2f4f4f",
    fontSize: 70,
    fontFamily: 'Arial',
}



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
    var imgSrc = `../img/${meme.selectedImgId}.jpg`

    var img = new Image()
    img.src= imgSrc
    img.onload = renderImg.bind(null, img)

    gCtx.strokeStyle= gStyle.stroke
    gCtx.fillStyle = gStyle.fill

    setTimeout (renderTxt, 100, meme.lines)
}


function renderImg(img) {
    console.log(img)
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
}

function renderTxt(txtLines){
    console.log('rendering txt')
    var font= gStyle.fontSize +'px '+ gStyle.fontFamily
    gCtx.font = font
    var diff = gCanvas.height/ txtLines.length
    var i= 0
    txtLines.forEach(line => {    
        console.log(i, diff)
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
    if (style.fill !== undefined) gStyle.fill = style.fill
    if (style.stroke !== undefined) gStyle.stroke = style.stroke
    if (style.fontFamily !== undefined) gStyle.fontFamily= style.fontFamily
    console.log(gStyle)
    renderMeme()

}

function onChangeSize(d){
    gStyle.fontSize +=d*10
    console.log(gStyle)
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