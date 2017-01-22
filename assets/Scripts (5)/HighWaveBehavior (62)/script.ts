class HighWaveBehavior extends Sup.Behavior {
  isFacingRight:boolean=false
  beatNumber:number=0
  shouldDie=false
  stopTime:number=70
  stopTimer:number=0
  speed:number=20
  
  shouldStop=false
  
  awake() {
    Sup.getActor("GameManager").getBehavior(GameManagerBehavior).addHighWave(this)
  }

  update() {
    this.animate()
    if(!this.shouldStop){this.move()}
    this.checkForStop()
    if (this.shouldDie){
      this.speed=0
    }
  }
  
  move(){
    if(this.isFacingRight){
      this.actor.setPosition(this.actor.getPosition().x+this.speed,this.actor.getPosition().y,this.actor.getPosition().z)
    } else {
      this.actor.setPosition(this.actor.getPosition().x-this.speed,this.actor.getPosition().y,this.actor.getPosition().z)
    }
  }
  
  checkForStop(){
    if(this.isFacingRight){
      if(this.actor.getPosition().x>=Sup.getActor("LeftWaveStopper").getPosition().x){
        this.stopTimer+=1
        this.shouldStop=true
      }
    } else {
      if(this.actor.getPosition().x<=Sup.getActor("RightWaveStopper").getPosition().x){
        this.stopTimer+=1
        this.shouldStop=true
      }
    }
    if (this.stopTimer>=this.stopTime){
      this.speed=40
      this.shouldStop=false
      this.move()
    }
  }
  
  animate(){
    this.actor.spriteRenderer.setHorizontalFlip(this.isFacingRight)
    if (!this.shouldDie && this.actor.spriteRenderer.getAnimation()!="Idle"){
      this.actor.spriteRenderer.setAnimation("Idle",true)
    }
    if (this.shouldDie && this.actor.spriteRenderer.getAnimation()!="Destroy"){
      this.actor.spriteRenderer.setAnimation("Destroy",false)
    }
        
  }
  
  public setIsFacingRight(isFacingRight:boolean){
    this.isFacingRight=isFacingRight
  }
  
  deleteIfOutOfBound(){
    // if (this.actor.getPosition().x<=-1300){
    //   Sup.getActor("GameManager").getBehavior(GameManagerBehavior).killHighWave(this.beatNumber)
    // }
    // if (this.actor.getPosition().x<=-1600){
    //   this.actor.destroy()
    // }
  }
  
  public gotKilled(){
    this.shouldDie=true
    Sup.log("meurt mechante vague")
  }
}
Sup.registerBehavior(HighWaveBehavior);
