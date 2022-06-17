'use strict'

var gCanvas
var gCtx
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
var gDimenstions ={
    width: 450,
    height: 450,
}

function init() {
   console.log('im on')
    gCanvas = document.getElementById('my-canvas')
    gCanvas.style.width = gDimenstions.width +"px"
    gCanvas.style.height = gDimenstions.height +"px"
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
    addListeners()
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
    var ratio = getRatio(meme.selectedImgId)
    gCanvas.style.height = gDimenstions.height* ratio +"px"

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
        console.log('line to render:', line)
        var currFontSize = (line.fontSize<= maxSize(line.txt))? line.fontSize : maxSize(line.txt)
        var font= currFontSize +'px '+ line.fontFamily
        gCtx.font = font
    
        gCtx.strokeStyle = line.stroke
        gCtx.fillStyle = line.fill
        console.log('im here', d)
        console.log('line position:', line.posLine.x, line.posLine.y)
        gCtx.fillText(line.txt, line.posLine.x, line.posLine.y)
        gCtx.strokeText(line.txt, line.posLine.x, line.posLine.y)

        if (i === lineIdx){
            gCtx.lineWidth = 1
            gCtx.strokeStyle = "#000000"
            gCtx.strokeRect(line.posLine.x-2, line.posLine.y-32, line.posLine.x+410, 40) 
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



function addListeners() {
    addMouseListeners()
    addTouchListeners()
    //Listen for resize ev 
    // window.addEventListener('resize', () => {
    //     resizeCanvas()
    //     renderCanvas()
    // })
}


function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchend', onUp)
}


// function resizeCanvas() {
//     const elContainer = document.querySelector('.canvas-container')
//     gCanvas.width = elContainer.offsetWidth
//     gCanvas.height = elContainer.offsetHeight
// }


function onDown(ev) {
    console.log('onDown')
    // //Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
    lineClicked(pos)
    renderMeme()
    // if (!isLineClicked(pos)) return
    // setCircleDrag(true)
    // //Save the pos we start from 
    // gStartPos = pos
    // document.body.style.cursor = 'grabbing'

}

function onMove(ev) {
    console.log('onMove')
    console.log(isMoving())
    const pos = getEvPos(ev)
    if(!isMoving()) return
    moveLine(pos)
    renderMeme()
}
   

function onUp() {
    console.log('onUp')
    return
    // setCircleDrag(false)
    // document.body.style.cursor = 'grab'
}


function onAddSticker(value){
    console.log(value)
    addLine(value)
    renderMeme()
    
}


function getEvPos(ev) {

    //Gets the offset pos , the default pos
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    // Check if its a touch ev
    if (gTouchEvs.includes(ev.type)) {
        //soo we will not trigger the mouse ev
        ev.preventDefault()
        //Gets the first touch point
        ev = ev.changedTouches[0]
        //Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    console.log('getEvPos', pos)
    return pos
}

