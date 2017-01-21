class WaveBehavior extends Sup.Behavior {
  private speed:number
  private numberOfFramesAlive:number
  public waveType:number
  public hasCalledForNewWave:boolean
  
  
  awake() {
    this.speed = 300
    this.numberOfFramesAlive=0
    this.actor.setPosition(300,300,300)
    Sup.getActor("GameManager").getBehavior(GameManagerBehavior).addWave(this)
  }
  
  update() {
    let waveVelocity = new CANNON.Vec3(-1*this.speed,0,0)
    this.numberOfFramesAlive+=1
    //this.waveBody.velocity=waveVelocity
    var velo = -16;
  
    this.actor.setPosition(this.actor.getPosition().x+velo,this.actor.getPosition().y)
    if(!this.hasCalledForNewWave && this.actor.getPosition().x<=1120){
      this.callForNewWave()
    }
    this.setSprite()
    this.moveHitBox()
    this.deleteIfOutOfBound();
  }
  
  moveHitBox(){
    this.actor.arcadeBody2D.warpPosition(this.actor.getPosition())
    
    switch (this.waveType)
    {
      case 5||6 :
       this.actor.arcadeBody2D.setOffset({ x: 0, y: -4 })
       break;
      case 3||4 :
       this.actor.arcadeBody2D.setOffset({ x: 0, y: -75 })
       break;
      default : this.actor.arcadeBody2D.setOffset({ x: this.actor.arcadeBody2D.getOffset().x, y: -170 });
    }

  }
  callForNewWave(){
    Sup.getActor("WaveGenerator").getBehavior(WaveGeneratorBehavior).generateNewWave();
    this.hasCalledForNewWave=true;
  }
  
  deleteIfOutOfBound(){
    if (this.actor.getPosition().x<=-1300){
      Sup.getActor("GameManager").getBehavior(GameManagerBehavior).deleteWave(this)
    }
    if (this.actor.getPosition().x<=-1600){
      this.actor.destroy()
    }
  }
  
  
  public setSprite(){
    if (this.actor.spriteRenderer.getAnimation() != this.waveType.toString()){
      this.actor.spriteRenderer.setAnimation(this.waveType.toString(),false)
    }
  }
  
  public setSpeed(speed:number){
    this.speed = speed
  }
  
  
  
}
Sup.registerBehavior(WaveBehavior);
