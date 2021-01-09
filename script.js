document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll('.grid div');
  const logLeft = document.querySelectorAll('.log-left');
  const logRight = document.querySelectorAll('.log-right');
  const carLeft = document.querySelectorAll('.car-left');
  const carRight = document.querySelectorAll('.car-right');
  const timeleft = document.querySelector('#timeleft');
  const result = document.querySelector('#result');
  const button = document.querySelector('#btn');
  var currentIndex = 76;
  var time = 10;
  var index = 9;
  var timer;
  var timer2;
  const image = new Image();
  image.src='cooky.png';
  image.height=50;

  //squares[currentIndex].classList.add('frog');
  squares[currentIndex].appendChild(image);

  function moveFrog(e){
    //squares[currentIndex].classList.remove('frog');
    squares[currentIndex].removeChild(image);
    switch (e.keyCode) {
      case 37:
        if(currentIndex % index > 0){
          currentIndex--;
        }
        break;
      case 38:
        if(currentIndex / index >= 1){
          currentIndex-=9;
        }
        break;
      case 39:
        if(currentIndex % index !== 8){
          currentIndex++;
        }
        break;
      case 40:
        if(currentIndex / index !== 8){
          currentIndex+=9;
        }
        break;
    }
    //squares[currentIndex].classList.add('frog');
    squares[currentIndex].appendChild(image);
    win();
    lose();
  }

  function moveCar(){
    carLeft.forEach(carLeft => moveCarLeft(carLeft));
    carRight.forEach(carRight => moveCarRight(carRight));
  }

  function moveCarLeft(carLeft){
    switch (true) {
      case carLeft.classList.contains('c1'):
        carLeft.classList.remove('c1');
        carLeft.classList.add('c3');
        break;
      case carLeft.classList.contains('c2'):
        carLeft.classList.remove('c2');
        carLeft.classList.add('c1');
        break;
      case carLeft.classList.contains('c3'):
        carLeft.classList.remove('c3');
        carLeft.classList.add('c2');
        break;
    }
  }

  function moveCarRight(carRight){
    switch (true) {
      case carRight.classList.contains('c1'):
        carRight.classList.remove('c1');
        carRight.classList.add('c2');
        break;
      case carRight.classList.contains('c2'):
        carRight.classList.remove('c2');
        carRight.classList.add('c3');
        break;
      case carRight.classList.contains('c3'):
        carRight.classList.remove('c3');
        carRight.classList.add('c1');
        break;
    }
  }

  function moveLog(){
    logLeft.forEach(logLeft => moveLogLeft(logLeft));
    logRight.forEach(logRight => moveLogRight(logRight));
  }

  function moveLogLeft(logLeft){
    switch (true) {
      case logLeft.classList.contains('l1'):
        logLeft.classList.remove('l1');
        logLeft.classList.add('l5');
        break;
      case logLeft.classList.contains('l2'):
        logLeft.classList.remove('l2');
        logLeft.classList.add('l1');
        break;
      case logLeft.classList.contains('l3'):
        logLeft.classList.remove('l3');
        logLeft.classList.add('l2');
        break;
      case logLeft.classList.contains('l4'):
        logLeft.classList.remove('l4');
        logLeft.classList.add('l3');
        break;
      case logLeft.classList.contains('l5'):
        logLeft.classList.remove('l5');
        logLeft.classList.add('l4');
        break;
    }
  }

  function moveLogRight(logRight){
    switch (true) {
      case logRight.classList.contains('l1'):
        logRight.classList.remove('l1');
        logRight.classList.add('l2');
        break;
      case logRight.classList.contains('l2'):
        logRight.classList.remove('l2');
        logRight.classList.add('l3');
        break;
      case logRight.classList.contains('l3'):
        logRight.classList.remove('l3');
        logRight.classList.add('l4');
        break;
      case logRight.classList.contains('l4'):
        logRight.classList.remove('l4');
        logRight.classList.add('l5');
        break;
      case logRight.classList.contains('l5'):
        logRight.classList.remove('l5');
        logRight.classList.add('l1');
        break;
    }
  }

  function moveWithLogLeft(){
    if(currentIndex>=18 && currentIndex<=26){
      //squares[currentIndex].classList.remove('frog');
      squares[currentIndex].removeChild(image);
      currentIndex+=1;
      //squares[currentIndex].classList.add('frog');
      squares[currentIndex].appendChild(image);
    }
  }

  function moveWithLogRight(){
    if(currentIndex>=27 && currentIndex<=35){
      //squares[currentIndex].classList.remove('frog');
      squares[currentIndex].removeChild(image);
      currentIndex-=1;
      //squares[currentIndex].classList.add('frog');
      squares[currentIndex].appendChild(image);
    }
  }

  function win(){
    if(currentIndex==4){
      result.innerHTML = '이겼습니다!';
      //후처리
      //squares[currentIndex].classList.remove('frog');
      //squares[currentIndex].removeChild(image);
      clearInterval(timer);
      clearInterval(timer2);
      document.removeEventListener('keyup', moveFrog);
    }
  }

  function lose(){
    if(time==0 || squares[currentIndex].classList.contains('c1') || squares[currentIndex].classList.contains('l4') || squares[currentIndex].classList.contains('l5')){
      result.innerHTML = '졌습니다!';
      //후처리
      //squares[currentIndex].classList.remove('frog');
      //squares[currentIndex].removeChild(image);
      clearInterval(timer);
      clearInterval(timer2);
      document.removeEventListener('keyup', moveFrog);
    }
  }

  function movePieces(){
    moveCar();
    moveLog();
    moveWithLogLeft();
    moveWithLogRight();
    lose();
  }

  function timeOver(){
    time--;
    timeleft.innerHTML = time;
  }

  button.addEventListener("click", ()=>{
    if(timer && timer2){
      clearInterval(timer);
      clearInterval(timer2);
    }else{
      timer = setInterval(movePieces, 400);
      timer2 = setInterval(timeOver, 1000);
      document.addEventListener('keyup', moveFrog);
    }
  });

});
