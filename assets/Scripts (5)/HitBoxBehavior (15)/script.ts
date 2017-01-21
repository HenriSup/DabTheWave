class HitBoxBehavior extends Sup.Behavior {
  public triggered:boolean
  public hitbox:Sup.ArcadePhysics2D.Body
  private textRenderer:Sup.TextRenderer
  public hitBoxOriginLocation:Sup.Math.Vector2
  
  awake() {
    this.hitBoxOriginLocation = new Sup.Math.Vector2(this.actor.getLocalX()+this.actor.getParent().getLocalX(),this.actor.getLocalY()+this.actor.getParent().getLocalY())
    this.hitbox = this.actor.arcadeBody2D
    this.textRenderer = this.actor.textRenderer
    this.textRenderer.setText("")
  }

  update() {
   
    this.debug();
    
   
    //this.textRenderer.setText("y:"+this.actor.getLocalY().toPrecision(3))
    this.checkForCollision();
  }
  
  checkForCollision(){
    var testd = Sup.ArcadePhysics2D.intersects(this.hitbox,Sup.getActor("HitBoxSea").arcadeBody2D);
    var waves = Sup.getActor("GameManager").getBehavior(GameManagerBehavior).getWaves()
    
    var test = false;
    var i;
    for (i = 0; i < waves.length; i++) {
      if (Sup.ArcadePhysics2D.intersects(this.hitbox,waves[i].actor.arcadeBody2D)) {
        test = true;
      }
    this.triggered=test||testd
    }
    
  }
  debug(){
    if (this.triggered){
      this.textRenderer.setText("TRIGGERED")
    }
    else {
      this.textRenderer.setText("")
    }
  }
}
Sup.registerBehavior(HitBoxBehavior);
