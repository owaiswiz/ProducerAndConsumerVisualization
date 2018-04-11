var bufferVal = 10;
var autoProduce = true;
var autoConsume = true;
var nextProduce = 5;
var nextConsume = 5;
function randomNumberFromRange(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function mapPercentageToVal() {
  return (bufferVal * 0.72)+ 5;
}

function updateBottleVal() {
  $('.mask-rect')[0].style.height = `${mapPercentageToVal()}%`;
}

function canConsume() {
  if(bufferVal > 0)
    return true;
  return false;
}

function canProduce() {
  if(bufferVal < 100)
    return true;
  return false;
}

function consume() {
  bufferVal -= 10;
}

function produce() {
  bufferVal += 10;
}

function startProducing() {
  if(autoProduce) {
    nextProduce = randomNumberFromRange(3,7);
    setTimeout(autoProduceFunc,0);
  }
}

function autoProduceFunc() {
  if(nextProduce > 0) {
    if(canProduce()) {
      $('.next-produce').text(`${nextProduce} seconds`);
      $('.producer-status').text('Producing');
      nextProduce--;
      setTimeout(autoProduceFunc,1000);
    }
    else {
      $('.next-produce').text('Buffer is full');
      $('.producer-status').text('Sleeping');
      setTimeout(autoProduceFunc,100);
    }
  }
  else {
    produce();
    updateBottleVal();
    startProducing();
  }
}

function startConsuming() {
  if(autoConsume) {
    nextConsume = randomNumberFromRange(3,7);
    setTimeout(autoConsumeFunc,0);
  }
}

function autoConsumeFunc() {
  if(nextConsume > 0) {
    if(canConsume()) {
      $('.next-consume').text(`${nextConsume} seconds`)
      $('.consumer-status').text('Consuming');
      nextConsume--;
      setTimeout(autoConsumeFunc,1000);
    }
    else {
      $('.next-consume').text(`Buffer is empty`);
      $('.consumer-status').text('Sleeping');
      setTimeout(autoConsumeFunc,100);
    }
  }
  else {
    consume();
    updateBottleVal();
    startConsuming()
  }
}

updateBottleVal()

startProducing()
startConsuming()


$('.btn-produce').click(function(){
  if(canProduce()) {
    produce();
    updateBottleVal();
  }
  else
    alert("Unable to Produce. Buffer likely full.")
});

$('.btn-consume').click(function(){
  if(canConsume()) {
    consume();
    updateBottleVal();
  }
  else
    alert("Unable to Consume. Buffer likely full.")
});
