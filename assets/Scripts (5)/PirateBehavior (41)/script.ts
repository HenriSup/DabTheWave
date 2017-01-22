class PirateBehavior extends Sup.Behavior {
  private shouldDab:boolean;
  awake() {
    Sup.getActor("GameManager").getBehavior(GameManagerBehavior).addPirate(this)
  }
  
  update() {
    this.animate()
  }
  
  animate(){
    if(this.shouldDab){
      this.actor.spriteRenderer.setAnimation("Dab",false)
      this.shouldDab=false
    }
    if (this.actor.spriteRenderer.getAnimation()=="Dab" && this.actor.spriteRenderer.getAnimationFrameIndex() >= this.actor.spriteRenderer.getAnimationFrameCount()-1){
      if(this.actor.spriteRenderer.getAnimation()!="Idle"){this.actor.spriteRenderer.setAnimation("Idle",true)}
    }
  }
  
  public callDab(){
    this.shouldDab = true
  }
  
  
}
Sup.registerBehavior(PirateBehavior);
