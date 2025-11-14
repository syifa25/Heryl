import './style.css'
import { startGame } from './game.js'

const startBtn = document.getElementById('startBtn')
const canvas = document.getElementById('gameCanvas')

startBtn.addEventListener('click', () => {

  startBtn.classList.add('hidden')


  canvas.classList.remove('hidden')

 
  startGame()
})
