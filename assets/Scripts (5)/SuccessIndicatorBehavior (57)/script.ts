class SuccessIndicatorBehavior extends Sup.Behavior {
  
  private timeAlive:number
  private lifeTime:number
  
  awake() {
    this.timeAlive=0
    this.lifeTime=60*5
    this.actor.arcadeBody2D.setVelocityY(20)
  }

  update() {
    this.timeAlive+=1
    
    this.actor.arcadeBody2D.setVelocityY(this.actor.arcadeBody2D.getVelocityY()-1)
    this.actor.arcadeBody2D.setVelocityX(10)
    if (this.timeAlive>=this.lifeTime){
      this.actor.destroy()
    }
  }
}
Sup.registerBehavior(SuccessIndicatorBehavior);
