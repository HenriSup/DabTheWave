class GameManagerBehavior extends Sup.Behavior {
  private waves:WaveBehavior[]
  private pirates:PirateBehavior[]
  public incomingMoves:string[]
  
  awake() {
    this.incomingMoves = new Array<string>()
    this.waves = new Array<WaveBehavior>()
    this.pirates = new Array<PirateBehavior>()
  }

  update() {
    Sup.log(this.incomingMoves)
  }
  
  public addIncomingMove(newMove:string){
    this.incomingMoves.push(newMove)
  }
  public removeFromIncomingMoves(){
    this.incomingMoves.shift()
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
