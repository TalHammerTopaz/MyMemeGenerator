'use strict'

var gCanvas
var gCtx
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']


function init() {
 
    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d')

    renderMemeByQueryString()
    addListeners()

}



function renderMemeByQueryString() {
    // Retrieve data from the current query-params
    const queryStringParams = new URLSearchParams(window.location.search)
    const memeToRender = queryStringParams.get('meme')
    
    //if no query-params render gallery
    if (memeToRender === null) renderGallery()
    // render meme according to query-params
    else {
    setMeme(memeToRender)
    display('meme')
    renderMeme()
    }
  }
  

//render meme
function renderMeme(saving=false){
     
    const meme = getMeme() 
  
    const ratio = getRatio(meme.selectedImgId)
    // gCanvas.height = gCanvas.width*ratio 

    //render img
    var idx = saving? false: meme.selectedLineIdx
    const imgSrc = `img/${meme.selectedImgId}.jpg`
    const img = new Image()
    img.src= imgSrc
    img.onload = function(){

        gCanvas.height = gCanvas.width*this.height/this.width
        renderImg(img)
        renderTxt(meme.lines,idx)
    }
    
    //render text
    //if saving render without selected line
    // setTimeout (renderTxt, 100, meme.lines, idx)
}




//render img
function renderImg(img) {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
}


//render text
function renderTxt(txtLines, lineIdx){

    txtLines.forEach((line, i) =>{

        //select maximum size to fit line
        var currFontSize = (line.fontSize<= maxSize(line.txt))? line.fontSize : maxSize(line.txt)
    
        var font= currFontSize +'px '+ line.fontFamily
        gCtx.font = font
    
        gCtx.strokeStyle = line.stroke
        gCtx.fillStyle = line.fill
        gCtx.fillText(line.txt, line.posLine.x, line.posLine.y)
        gCtx.strokeText(line.txt, line.posLine.x, line.posLine.y)
    
        var txtLength = mesureTxt(line.txt)
    
        //mark selected line with rect
        if (i === lineIdx){
            gCtx.lineWidth = 1
            gCtx.strokeStyle = "#000000"
            gCtx.strokeRect(line.posLine.x-2, line.posLine.y-32, txtLength+8, 40) 
        }

    })
   

 }         


//change text on input line 
function setLineTxt(txt){
    const meme = getMeme() 
    meme.lines[meme.selectedLineIdx].txt= txt
    renderMeme()
}

//change style: 
function onSelectStyle(style){
    setStyle(style) 
    renderMeme()
}

//schange size: font, color, bg-color, 
function onChangeSize(d){
    changeFontSize(d)
    renderMeme()
}

//add line:
function onAddLine(){
    addLine()
    renderMeme()
}

//select line with btn
function onSwitchLine(){
    const txt = switchLine()
    const elInput = document.querySelector('.text-input')
    elInput.value= txt
    renderMeme()
} 

//download meme
function downloadCanvas(elLink) {
    renderMeme(true) //render without selected line markup
    setTimeout(()=>{
        const data = gCanvas.toDataURL()
        elLink.href = data
        elLink.download = 'my-meme.jpg'}, 500)
    
}

// save meme to gallery
function onSaveMeme(){

    renderMeme(true) //render without selected line markup
    
    //save url to current meme, add to or edit  saved meme array
    setTimeout(()=>{
                const url = gCanvas.toDataURL()        
                const queryStringParams = new URLSearchParams(window.location.search)
                const memeToEdit = queryStringParams.get('meme')
                if(memeToEdit) editMeme(url, memeToEdit)
                else saveMeme(url)       
                }, 100)
    
    //display meme gallery            
    setTimeout(()=>{
            display('meme-gallery')
            renderMemeGallary()
            }, 200)
    
}

//delete line
function onDelete(){ 
    deleteline()
    const elInput = document.querySelector('.text-input')
    elInput.value= ''
    renderMeme()
}

//move line btn
function onLineMove(d){
    setlinestart(d)
    renderMeme()
}


//add sticker
function onAddSticker(value){
    addLine(value)
    renderMeme()
    
}


//measure txt length
function mesureTxt(txt){
    const textLength =  gCtx.measureText(txt).width 
    return textLength
}


//calculate max size for txt
function maxSize(txt){
    const maxSize =  (gCanvas.width / txt.length) *2
    return maxSize
}



// add event listeners

function addListeners() {
    addMouseListeners()
    addTouchListeners()

}

function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
    window.addEventListener('resize', () => {
        resizeCanvas()
    })
 
}

function addTouchListeners() {
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('mouseup', onUp)
    window.addEventListener('resize', () => {
        resizeCanvas()
    })
    
}


//select or unselect line when clicking on canvas
function onDown(ev) {
    const pos = getEvPos(ev)
    toggleMoving()
    lineClicked(pos)
    renderMeme()
    document.body.style.cursor = 'grabbing'
    
}

function onUp(ev) {
    // const pos = getEvPos(ev)
    toggleMoving()
    // lineClicked(pos)
    // renderMeme()
    document.body.style.cursor = 'auto'
   
}

//move line on drag
function onMove(ev) {
    const pos = getEvPos(ev)
    if(!isMoving()) return
    moveLine(pos)
    renderMeme()
}


function resizeCanvas() {
    const elContainer = document.querySelector('.meme-contanier')
    if (elContainer.offsetWidth < 470){
        gCanvas.width = elContainer.offsetWidth-20
        gCanvas.height = gCanvas.width
    }
    renderMeme()
}


   

// get event position on canvas
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
    return pos
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}