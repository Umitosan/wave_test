/*jshint esversion: 6 */


function WaveGroup(q = 12) {
  this.startX = undefined;
  this.startY = undefined;
  this.quantity = q; // number of total waves
  this.waveVals = undefined;
  this.offset = undefined;
  this.counter = -10;
  this.squish = 0;
  this.squishCoef = 0.005;
  this.xOffset = 0;
  this.xVel = 1;
  this.waveColor = undefined;
  this.waveCTimer = 500;

  this.init = function() {
    this.startX = canW / 2;
    this.startY = canH / 2;
    this.waveVals = [];
    for (let i = 0; i < this.quantity; i++) {
      this.waveVals.push(8 * i * this.squishCoef);
    }
    this.waveColor = randGrey();
  };


  this.draw = function() {
    for (let j = 0; j < this.waveVals.length; j++) {
      let curX = -400;
      let curY = 0;
      let counter = 0;
      let increase = Math.PI / 200; // larger = less freq
      let squishOffset = this.waveVals[j] - this.squish;
      let squishCoef = 1 - squishOffset; // this makes the wave overall squish to the right
      let waveHeight = 100;
      ctx.save();
      ctx.translate(this.startX+0.5,this.startY+0.5);
      ctx.lineWidth = 1;
      ctx.strokeStyle = this.waveColor;
      for (let i = (-400-this.xOffset); i <= 420; i+=1) { // left bound, right bound
        ctx.beginPath();
        ctx.moveTo(curX,curY*squishCoef);
        // ctx.moveTo(curX,curY*squishCoef);
        curX = i;
        curY = Math.sin(counter) * waveHeight; //
        // ctx.lineTo(curX,curY*squishCoef);
        ctx.lineTo(curX,curY*squishCoef);
        ctx.stroke();
        counter += increase;
        // if (squishCoef > 0) {
        //   squishCoef -= 0.002;
        // }
      }
      ctx.restore();
    }
  };

  this.update = function() {
    if ( ((this.squish + this.squishCoef) < -2.5) || ((this.squish + this.squishCoef) > 1) ) {
      this.squishCoef *= -1;
      this.waveColor = randColor('rgba');
    }
    this.squish += this.squishCoef*5;  // this * number = squish speed
    this.xOffset += this.xVel;
  };

}
