class TempoBehavior extends Sup.Behavior {
  private frameCounter:number=0
  private timer:number=0
  public beatCounter:number=0
  private beatPerSec:number=2.05
  private oldBeat:number=-1
  private isPlayerTurn:boolean=false
  private shouldPlayOn=0
  private beatTolerance:boolean=false
  private beatToleranceFrameCounter:number=-15
  private beatToleranceMaxFrame:number=30
  private measureLeft=2;
  private lastNoteWasDone=false
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
      this.lastNoteWasDone=false
      //Sup.getActor("GameManager").getBehavior(GameManagerBehavior).removeFromIncomingMoves()
      if (this.isPlayerTurn){
        this.beatToleranceFrameCounter=-5
        var rythmBorder = Sup.appendScene("Prefabs/RythmBorder")[0]
        rythmBorder.getBehavior(RythmBorderBehavior).setIsPlayerBorder()
        rythmBorder.setPosition(this.actor.getPosition().x,this.actor.getPosition().y,5)
        
      }
      else {
        Sup.getActor("Parrot").getBehavior(ParrotBehavior).callDab()
        var rythmBorder = Sup.appendScene("Prefabs/RythmBorder")[0];
        rythmBorder.setPosition(this.actor.getPosition().x,this.actor.getPosition().y,5)
      }
      //Sup.log(this.beatCounter%4 + " time: " + this.timer)
      if(this.beatCounter%4==0){
        if (this.measureLeft<=0){
          this.playTrack3()
        } else this.measureLeft-=1
      }
      if ((this.beatCounter%4)+1==4){
        this.swapTurn() 
      }
    }
    
  }
  
  checkForTolerance(){
    if (this.beatToleranceFrameCounter<=this.beatToleranceMaxFrame){
      this.beatTolerance=true
      //Sup.getActor("TestBeatTolerance").spriteRenderer.setAnimation("Green")
      var move:string = Sup.getActor("GameManager").getBehavior(GameManagerBehavior).getMoves()[Sup.getActor("GameManager").getBehavior(GameManagerBehavior).getMoves().length-(3-this.beatCounter%4)-1]
      //Sup.log(move)
      if((Sup.Input.wasKeyJustPressed("LEFT") && move == "left" || Sup.Input.wasKeyJustPressed("RIGHT") && move == "right") && !this.lastNoteWasDone){
        this.successfulDab(move)
      } else {
        if(Sup.Input.wasKeyJustPressed("LEFT") && move == "right" || Sup.Input.wasKeyJustPressed("RIGHT") && move == "left"){
          this.failDab()
        }
      }
      
    }
    else {
      this.beatTolerance=false
      //Sup.getActor("TestBeatTolerance").spriteRenderer.setAnimation("Red")
      
    }
    this.beatToleranceFrameCounter+=1
  }
  
  successfulDab(move:string){
    //Faire pop un nice
    var successIndicator = Sup.appendScene("Prefabs/SuccessIndicator")[0];
    successIndicator.spriteRenderer.setAnimation("Success")
    successIndicator.setPosition(this.actor.getPosition().x,this.actor.getPosition().y,this.actor.getPosition().z+1)
    Sup.getActor("GameManager").getBehavior(GameManagerBehavior).tellPiratesToDab(move)
    this.lastNoteWasDone=true
    Sup.getActor("GameManager").getBehavior(GameManagerBehavior).killHighWave(move)
  }
  failDab(){
    //Faire pop un fail
    var successIndicator = Sup.appendScene("Prefabs/SuccessIndicator")[0];
    
    successIndicator.setPosition(this.actor.getPosition().x,this.actor.getPosition().y,this.actor.getPosition().z+1)
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
  
  public getTime():number{
    return this.timer
  }
}
Sup.registerBehavior(TempoBehavior);
