class ParrotTextBehavior extends Sup.Behavior {
  
  private timeAlive:number = 0
  private lifeTime:number = 60*0.5
  awake() {
    this.actor.spriteRenderer.setOpacity(0)
  }
  
  update() {
    this.timeAlive+=1
    if (this.timeAlive>=this.lifeTime){
      this.actor.destroy()
    }
    this.shake()
  }
  
  public setMove(move:string){
    this.actor.spriteRenderer.setAnimation(move)
    this.makeVisible()
  }
  
  makeVisible(){
    this.actor.spriteRenderer.setOpacity(1)
  }
  
  shake() {
    var lower = -2;
    var higher = 2;
    var x = (Math.random() * (higher-lower)) + lower;
    var y = (Math.random() * (higher-lower)) + lower;
    this.actor.setPosition(this.actor.getPosition().x+x,this.actor.getPosition().y+y,this.actor.getPosition().z)
  }
}
Sup.registerBehavior(ParrotTextBehavior);
