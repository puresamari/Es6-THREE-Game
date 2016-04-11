export class Animator {
    constructor (mesh) {
        let _this = this;
        
        this.mesh = mesh;

        this.mixer = new THREE.AnimationMixer( this.mesh );

        for ( var i = 0; i < this.mesh.geometry.animations.length; ++ i ) {
            let anim = this.mixer.clipAction( this.mesh.geometry.animations[ i ] );
        }

        gameEnviroment.addUpdate(function(){
            _this.mixer.update(gameEnviroment.DeltaTime);
        });
        
        console.log(this.mixer);
    }
    
    set Animation(animation) {
        this.mixer.clipAction(animation).setEffectiveWeight( 1 / 3 ).play();
    }
    
    setAnimation(animation, direction = 1) {
        let anim = this.mixer.clipAction(animation);
        if(!anim.isRunning()) {
            anim.timeScale = direction;
            anim.fadeIn(1);
            anim.play();
        }
    }
    
    stopAnimation(animation) {
        let anim = this.mixer.clipAction(animation);
        if(anim.isRunning()) {
            anim.fadeOut(1);
            anim.stop();
        }
    }
}