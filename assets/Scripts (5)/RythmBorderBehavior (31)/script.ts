class RythmBorderBehavior extends Sup.Behavior {
  private timeAlive:number
  private isPlayerBorder:boolean=false
  awake() {
    this.timeAlive=0
    this.actor.spriteRenderer.setOpacity(-1)
  }

  update() {
    this.setSprite()
    if (this.actor.spriteRenderer.getOpacity()==-1){
      this.actor.spriteRenderer.setOpacity(1)
    }
    this.timeAlive+=1
    this.actor.spriteRenderer.setOpacity(this.actor.spriteRenderer.getOpacity()-0.05)
    if (this.actor.spriteRenderer.getOpacity()<=0){
      this.actor.destroy()
    }
    
  }
  
  setIsPlayerBorder(){
    this.isPlayerBorder=true
  }
  
  setSprite(){
    if(this.isPlayerBorder && this.actor.spriteRenderer.getAnimation()!="PlayerTurn"){
      this.actor.spriteRenderer.setAnimation("PlayerTurn",false)
    }
    if(!this.isPlayerBorder && this.actor.spriteRenderer.getAnimation()!="ParrotTurn") {
      this.actor.spriteRenderer.setAnimation("ParrotTurn",false)
    }
  }
}
Sup.registerBehavior(RythmBorderBehavior);
