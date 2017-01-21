class GameManagerBehavior extends Sup.Behavior {
  private waves:WaveBehavior[]
  
  awake() {
    this.waves = new Array<WaveBehavior>()
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
  
}
Sup.registerBehavior(GameManagerBehavior);
