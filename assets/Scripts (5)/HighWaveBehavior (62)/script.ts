class HighWaveBehavior extends Sup.Behavior {
  isGoingLeft:boolean=false
  beatNumber:number=0
  shouldDie=false
  stopTime:number=90
  stopTimer:number=0
  speed:number=20
  instantiatedTime:number
  isAttacking:boolean = false
  shouldStop=false
  
  awake() {
    Sup.getActor("GameManager").getBehavior(GameManagerBehavior).addHighWave(this)
    this.instantiatedTime = Sup.getActor("Tempo").getBehavior(TempoBehavior).getTime()
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
    if(this.isGoingLeft){
      this.actor.setPosition(this.actor.getPosition().x+this.speed,this.actor.getPosition().y,this.actor.getPosition().z)
    } else {
      this.actor.setPosition(this.actor.getPosition().x-this.speed,this.actor.getPosition().y,this.actor.getPosition().z)
    }
  }
  
  checkForStop(){
    if(this.isGoingLeft){
      if(this.actor.getPosition().x>=Sup.getActor("LeftWaveStopper").getPosition().x){
        //this.actor.setPosition(Sup.getActor("LeftWaveStopper").getPosition().x,this.actor.getPosition().y)
        this.stopTimer+=1
        this.shouldStop=true
      }
    } else {
      if(this.actor.getPosition().x<=Sup.getActor("RightWaveStopper").getPosition().x){
        //this.actor.setPosition(Sup.getActor("RightWaveStopper").getPosition().x,this.actor.getPosition().y)
        this.stopTimer+=1
        this.shouldStop=true
      }
    }
    if (this.stopTimer>=this.stopTime ){
      this.speed=40
      this.isAttacking=true
      this.shouldStop=false
      this.move()
    }
  }
  
  animate(){
    this.actor.spriteRenderer.setHorizontalFlip(this.isGoingLeft)
    if (!this.shouldDie && this.actor.spriteRenderer.getAnimation()!="Idle"){
      this.actor.spriteRenderer.setAnimation("Idle",true)
    }
    if (this.shouldDie && this.actor.spriteRenderer.getAnimation()!="Destroy"){
      this.actor.spriteRenderer.setAnimation("Destroy",false)
    }
        
  }
  
  public setIsGoingLeft(goingLeft:boolean){
    this.isGoingLeft=goingLeft
  }
  
  public getTimeInstantiated(){
    return this.instantiatedTime
  }
  
  deleteIfOutOfBound(){
    //verifier le temps de vie et tuer si superieur à 10 sec
  }
  
  public canBeKilled():boolean{
    return !this.isAttacking 
  }
  
  public getShouldDie():boolean{
    return this.shouldDie
  }
  
  public gotKilled(){
    this.shouldDie=true
  }
}
Sup.registerBehavior(HighWaveBehavior);
