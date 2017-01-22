class ParrotTextBehavior extends Sup.Behavior {
  
  private timeAlive:number = 0
  private lifeTime:number = 60*0.25
  awake() {
    this.actor.textRenderer.setOpacity(0)
  }
  
  update() {
    this.timeAlive+=1
    if (this.timeAlive>=this.lifeTime){
      this.actor.destroy()
    }
    this.shake()
  }
  
  public setText(newText:string){
    this.actor.textRenderer.setText(newText)
    this.makeVisible()
  }
  
  
  
  makeVisible(){
    this.actor.textRenderer.setOpacity(1)
  }
  
  shake() {
    var lower = -1;
    var higher = 1;
    var x = (Math.random() * (higher-lower)) + lower;
    var y = (Math.random() * (higher-lower)) + lower;
    this.actor.setLocalPosition(this.actor.getLocalPosition().x,this.actor.getLocalPosition().y,this.actor.getLocalPosition().z)
  }
}
Sup.registerBehavior(ParrotTextBehavior);
