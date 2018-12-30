/*jshint esversion: 6 */


function WaveGroup(q) {
  this.startX = undefined;
  this.startY = undefined;
  this.quantity = q;
  this.waveVals = undefined;
  this.offset = undefined;
  this.counter = -10;
  this.squish = 0;
  this.squishCoef = 0.005;
  this.xOffset = 0;
  this.xVel = 1;

  this.init = function() {
    console.log('yes init');
    this.startX = canW / 2;
    this.startY = canH / 2;
    this.waveVals = [];
    for (let i = 0; i < 30; i++) {
      this.waveVals.push(3 * i * this.squishCoef);
    }
  };


  this.draw = function() {
    for (let j = 0; j < this.waveVals.length; j++) {
      let curX = -400;
      let curY = 0;
      let counter = 0;
      let increase = Math.PI / 20;
      let squishOffset = this.waveVals[j] - this.squish;
      let squishCoef = 1 - squishOffset;
      ctx.save();
      ctx.translate(this.startX,this.startY);
      for (let i = (-400-this.xOffset); i <= 420; i+=6) { // left bound, right bound
        ctx.beginPath();
        ctx.moveTo(curX,curY*squishCoef);
        curX = i;
        curY = Math.sin(counter) * 200;
        ctx.lineTo(curX,curY*squishCoef);
        ctx.stroke();
        counter += increase;
        if (squishCoef > 0) {
          squishCoef -= 0.002;
        }
      }
      ctx.restore();
    }
  };

  this.update = function() {
    if ( ((this.squish + this.squishCoef) <= -1.5) || ((this.squish + this.squishCoef) >= 0) ) {
      this.squishCoef *= -1;
    }
    this.squish += this.squishCoef*2;
    this.xOffset += this.xVel;
  };

}
