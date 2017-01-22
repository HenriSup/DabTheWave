class TempoBehavior extends Sup.Behavior {
  private frameCounter:number=0
  private timer:number=0
  private beatCounter:number=0
  private beatPerSec:number=2
  private oldBeat:number=-1
  private isPlayerTurn:boolean=false
  private shouldPlayOn=0;
  private hitSoundPlayers = [new Sup.Audio.SoundPlayer("Sounds/BeatSound", 0.8, { loop: false }),new Sup.Audio.SoundPlayer("Sounds/BeatSound", 0.8, { loop: false }),new Sup.Audio.SoundPlayer("Sounds/BeatSound", 0.8, { loop: false })];
  awake() {
    
  }

  update() {
    this.updateFrameCounterAndTimerAndBeatCounter()
    //
    if (Sup.Input.wasKeyJustPressed("LEFT")){
      var rythmBorder = Sup.appendScene("Prefabs/RythmBorder")[0]
      rythmBorder.setPosition(this.actor.getPosition().x,this.actor.getPosition().y,5)
    }
    if (Sup.Input.wasKeyJustPressed("RIGHT")){
      var rythmBorder = Sup.appendScene("Prefabs/RythmBorder")[0]
      rythmBorder.getBehavior(RythmBorderBehavior).setIsPlayerBorder()
      rythmBorder.setPosition(this.actor.getPosition().x,this.actor.getPosition().y,5)
    }
    if (this.beatJustChanged()){
      
      if (this.isPlayerTurn){
        var rythmBorder = Sup.appendScene("Prefabs/RythmBorder")[0]
        rythmBorder.getBehavior(RythmBorderBehavior).setIsPlayerBorder()
        rythmBorder.setPosition(this.actor.getPosition().x,this.actor.getPosition().y,5)
        Sup.getActor("GameManager").getBehavior(GameManagerBehavior).tellPiratesToDab()
        //Sup.getActor("Pirates").spriteRenderer.setAnimation("Dab",false)
      }
      else {
        Sup.getActor("Parrot").getBehavior(ParrotBehavior).callDab()
        var rythmBorder = Sup.appendScene("Prefabs/RythmBorder")[0];
        rythmBorder.setPosition(this.actor.getPosition().x,this.actor.getPosition().y,5)
      }
      if(this.beatCounter%4==0){
        this.playSound()
      }
      if ((this.beatCounter%4)+1==4){
        this.swapTurn() 
      }
      
    }
    
  }
  
  swapTurn(){
    if(this.isPlayerTurn){
      this.isPlayerTurn=false
    }
    else {this.isPlayerTurn=true}
  }
  
  playSound(){
    
   // var random = (Math.random() * (higher-lower)) + lower;
    this.hitSoundPlayers[this.shouldPlayOn].setVolume(0.5);
    this.hitSoundPlayers[this.shouldPlayOn].setPitch(0);
    this.hitSoundPlayers[this.shouldPlayOn].play();
    this.shouldPlayOn++;
    if (this.shouldPlayOn>=this.hitSoundPlayers.length){
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
