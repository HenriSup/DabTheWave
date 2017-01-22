class GameManagerBehavior extends Sup.Behavior {
  private waves:WaveBehavior[]
  private pirates:PirateBehavior[]
  
  awake() {
    this.waves = new Array<WaveBehavior>()
    this.pirates = new Array<PirateBehavior>()
  }

  update() {
    
  }
  
  public addWave(newWave:WaveBehavior){
    this.waves.push(newWave)
  }
  
  public deleteWave(waveToDelete:WaveBehavior){
    this.waves.shift()
  }
  
  public getWaves():WaveBehavior[]{
    return this.waves
  }
  
  public addPirate(newPirate:PirateBehavior){
    this.pirates.push(newPirate)
  }
  
  public deletePirate(pirateToDelete:PirateBehavior){
    this.pirates.shift()
  }
  
  public getPirates():PirateBehavior[]{
    return this.pirates
  }
  
  public tellPiratesToDab():void{
    this.pirates.forEach(function(pirate){pirate.actor.getBehavior(PirateBehavior).callDab()});
  }
  
}
Sup.registerBehavior(GameManagerBehavior);
