class ParrotBehavior extends Sup.Behavior {
  
  private shouldCallDab:boolean;
  
  awake() {
    
  }

  update() {
    this.animate()
  }
  
  animate(){
    if(this.shouldCallDab){
      this.actor.spriteRenderer.setAnimation("DabCall",false)
      this.shouldCallDab=false
    }
    if (this.actor.spriteRenderer.getAnimation()=="DabCall" && this.actor.spriteRenderer.getAnimationFrameIndex() >= this.actor.spriteRenderer.getAnimationFrameCount()-1){
      if(this.actor.spriteRenderer.getAnimation()!="Idle"){this.actor.spriteRenderer.setAnimation("Idle",true)}
    }
  }
  
  public callDab(){
    this.shouldCallDab = true
  }
}
Sup.registerBehavior(ParrotBehavior);
