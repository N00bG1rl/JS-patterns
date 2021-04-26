// Get random number
function randomNumber() {
  let max = 1
  let min = 0
  return Math.floor(Math.random() * (max - min + 1))
}

// Make 100 square long row
for (let i=0; i<101; i++) {
  let newSquare = document.createElement('div')
  document.querySelector('.row').appendChild(newSquare)
}

// Give first row squares random class name
function squareClasses(square) {
  for (let i=0; i<square.childNodes.length; i++) {
    let newSquare = square.childNodes[i]
    newSquare.classList.add(randomNumber() ? 'active' : 'inactive')
  }
}

squareClasses(document.querySelector('.row'))

// Set function running time (100)
let interval
timer = 0

// Make more rows and start pattern
function dublicateRow() {
  let squareRows = document.querySelectorAll('.row')
  let previousRow = squareRows[squareRows.length - 1]
  let rowClone = previousRow.cloneNode(true)
  document.querySelector('.container').appendChild(rowClone)
  checkSquareStatus(rowClone, previousRow)

  // Set function running time (100)
  if(timer<100) timer++
  else clearInterval(interval)
}

// Check previous line colors and set color based it value
function checkSquareStatus(squareRow, squareParent) {
  for (let i=0; i<squareRow.childNodes.length; i++) {
    // Main square
    let target = squareRow.childNodes[i]
    // Up square
    let mainSibling = squareParent.childNodes[i]
    // Up left square
    let prevSibling = mainSibling.previousElementSibling ||
        squareParent.childNodes[squareParent.childNodes.length - 1]
    // Up right square
    let nextSibling = mainSibling.nextElementSibling ||
        squareParent.childNodes[0]

    // Get main square status
    let squareStatus = activateSquareRules.bind (
      null, target, prevSibling, mainSibling, nextSibling
    )

    // Pattern rule values
    squareStatus([1,1,1], false)
    squareStatus([1,1,0], true)
    squareStatus([1,0,1], false)
    squareStatus([1,0,0], false)
    squareStatus([0,1,1], true)
    squareStatus([0,1,0], false)
    squareStatus([0,0,1], false)
    squareStatus([0,0,0], true)
  }
}

// Check pattern match and add class name
function activateSquareRules(
  target,
  prevSibling,
  mainSibling,
  nextSibling,
  rule,
  ruleValue
) {
  let squareRule = 
      activeSquare(prevSibling) === rule[0] &&
      activeSquare(mainSibling) === rule[1] &&
      activeSquare(nextSibling) === rule[2]
  if(squareRule)toggleActive(target, ruleValue)
}

// Check main square class name
function activeSquare(square) {
  return square.classList.contains('active') ? 1 : 0
}

// Add and remove class names
function toggleActive(square, isActive) {
  if (!!isActive) {
    square.classList.remove('inactive')
    square.classList.add('active')
  } else {
    square.classList.remove('active')
    square.classList.add('inactive')
  }
}

// Set interval for making rows
interval = setInterval(dublicateRow, 100)