class TempoBehavior extends Sup.Behavior {
  private frameCounter:number=0
  private timer:number=0
  private beatCounter:number=0
  private beatPerSec:number=2.05
  private oldBeat:number=-1
  private isPlayerTurn:boolean=false
  private shouldPlayOn=0
  private beatTolerance:boolean=false
  private beatToleranceFrameCounter:number=0
  private beatToleranceMaxFrame:number=15
  private measureLeft=2;
  private track0 = [new Sup.Audio.SoundPlayer("Sounds/track0", 0.8, { loop: false }),new Sup.Audio.SoundPlayer("Sounds/track0", 0.8, { loop: false })];
  private track1 = [new Sup.Audio.SoundPlayer("Sounds/track1", 0.8, { loop: false }),new Sup.Audio.SoundPlayer("Sounds/track1", 0.8, { loop: false })];
  private track2 = [new Sup.Audio.SoundPlayer("Sounds/track2", 0.8, { loop: false }),new Sup.Audio.SoundPlayer("Sounds/track2", 0.8, { loop: false })];
  private track3 = [new Sup.Audio.SoundPlayer("Sounds/track3", 0.8, { loop: false }),new Sup.Audio.SoundPlayer("Sounds/track3", 0.8, { loop: false })];
  
  awake() {
    
  }

  update() {
    this.updateFrameCounterAndTimerAndBeatCounter()
    this.checkForTolerance()
    if (this.beatJustChanged()){
      if (this.isPlayerTurn){
        this.beatToleranceFrameCounter=0
        var rythmBorder = Sup.appendScene("Prefabs/RythmBorder")[0]
        rythmBorder.getBehavior(RythmBorderBehavior).setIsPlayerBorder()
        rythmBorder.setPosition(this.actor.getPosition().x,this.actor.getPosition().y,5)
        Sup.getActor("GameManager").getBehavior(GameManagerBehavior).tellPiratesToDab()
      }
      else {
        Sup.getActor("Parrot").getBehavior(ParrotBehavior).callDab()
        var rythmBorder = Sup.appendScene("Prefabs/RythmBorder")[0];
        rythmBorder.setPosition(this.actor.getPosition().x,this.actor.getPosition().y,5)
      }
      Sup.log(this.beatCounter%4 + " time: " + this.timer)
      if(this.beatCounter%4==0){
        if (this.measureLeft<=0){
          this.playTrack3()
        } else this.measureLeft-=1
      }
      if ((this.beatCounter%4)+1==4){
        this.swapTurn() 
      }
    }
    if (Sup.Input.wasKeyJustPressed("U")){
      this.successfulDab()
    }
  }
  
  checkForTolerance(){
    if (this.beatToleranceFrameCounter<=this.beatToleranceMaxFrame){
      this.beatTolerance=true
      Sup.getActor("TestBeatTolerance").spriteRenderer.setAnimation("Green")
      
    }
    else {
      this.beatTolerance=false
      Sup.getActor("TestBeatTolerance").spriteRenderer.setAnimation("Red")
      
    }
    this.beatToleranceFrameCounter+=1
  }
  
  successfulDab(){
    //Faire pop un nice
    var successIndicator = Sup.appendScene("Prefabs/SuccessIndicator")[0];
    successIndicator.setPosition(this.actor.getPosition().x,this.actor.getPosition().y,this.actor.getPosition().z+1)
  }
  failDab(){
    //Faire pop un fail
  }
  
  swapTurn(){
    if(this.isPlayerTurn){
      this.isPlayerTurn=false
    }
    else {this.isPlayerTurn=true}
  }
  
  playTrack0(){
    this.track0[this.shouldPlayOn].setVolume(0.5);
    this.track0[this.shouldPlayOn].setPitch(0);
    this.track0[this.shouldPlayOn].play();
    this.shouldPlayOn++;
    if (this.shouldPlayOn>=this.track0.length){
      this.shouldPlayOn=0;
    }
  }
  playTrack1(){
    this.track1[this.shouldPlayOn].setVolume(0.5);
    this.track1[this.shouldPlayOn].setPitch(0);
    this.track1[this.shouldPlayOn].play();
    this.shouldPlayOn++;
    if (this.shouldPlayOn>=this.track1.length){
      this.shouldPlayOn=0;
    }
  }
  playTrack2(){
    this.measureLeft=1
    this.track2[this.shouldPlayOn].setVolume(0.5);
    this.track2[this.shouldPlayOn].setPitch(0);
    this.track2[this.shouldPlayOn].play();
    this.shouldPlayOn++;
    if (this.shouldPlayOn>=this.track2.length){
      this.shouldPlayOn=0;
    }
  }
  playTrack3(){
    this.measureLeft=1
    this.track3[this.shouldPlayOn].setVolume(0.5);
    this.track3[this.shouldPlayOn].setPitch(0);
    this.track3[this.shouldPlayOn].play();
    this.shouldPlayOn++;
    if (this.shouldPlayOn>=this.track3.length){
      this.shouldPlayOn=0;
    }
  }
  
  updateFrameCounterAndTimerAndBeatCounter(){
    this.frameCounter+=1
    this.timer=Math.round(this.frameCounter*100/60)/100;
    this.beatCounter=Math.round(this.timer/(1/this.beatPerSec));
  }
  
  beatJustChanged():boolean{
    var beatChanged = false
    if (this.beatCounter>this.oldBeat){
      beatChanged = true
      this.oldBeat = this.beatCounter
    }
    return beatChanged
  }
}
Sup.registerBehavior(TempoBehavior);
