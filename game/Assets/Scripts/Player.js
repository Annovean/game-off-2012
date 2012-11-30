#pragma strict

public var speed : int = 10;
public var size : float = 2;

public var energy : float = 0;
public var energyRegenRate : float = 0.5;
public var energyMax : int = 50;

public var score : int = 0;

public var forkPrefabs : GameObject[];

private var bubbleTrail : GameObject;
private var sparkleTrail : GameObject;
private var cameraObject : GameObject;

private var verticalDirection : String;
private var horizontalDirection : String;

private var forkable : boolean = true;

private var enemyGenerator : EnemyGeneration;

function Start()  {
    bubbleTrail  = GameObject.Find("SparkleParticles");
    sparkleTrail = GameObject.Find("SparkleParticlesSecondary");
    cameraObject = GameObject.Find("Main Camera");
    enemyGenerator = GameObject.Find("EnemyGenerator").GetComponent(EnemyGeneration);
}

function OnCollisionStay(collisionInfo : Collision) {
    for (var contact : ContactPoint in collisionInfo.contacts) {
    	var object : GameObject = contact.otherCollider.gameObject;
    	if(object.gameObject.tag == "Enemy") {
    	  var enemy : Enemy = object.GetComponent(Enemy);
    	  if(enemy.size < size) {
    	    enemy.size -= speed * Time.deltaTime;
    	    size += ( speed * Time.deltaTime ) / 2;
    	  } else if(size > 0) {
    	  	size -= ( speed * Time.deltaTime ) / 2;
    	  }
    	  if(enemy.size <= 0.5) {
    	    Destroy(object);
    	    enemyGenerator.amountEnemies--;
    	    score++;
    	  }
    	}
    }
}

function Fork() {

	if (forkable && energy > 0) {
		energy -= size * 5;
		if (energy < 0) { energy = 0; }
		var obj : GameObject = forkPrefabs[0];
		var fork : GameObject = Instantiate(obj, Vector3(0,0,0), Quaternion.identity);
	}
	forkable = false;
	yield WaitForSeconds(1);
	forkable = true;
}

function Update() {
    transform.localScale = Vector3(size, size, 1);
    bubbleTrail.particleEmitter.emit = false;
	sparkleTrail.particleEmitter.emit = false;
    
	var newEnergy : float = energy + (energyRegenRate * Time.deltaTime);
	if(newEnergy > energyMax) {
		energy = energyMax;
	} else {
		energy = newEnergy;
	}
	
	rigidbody.constraints = RigidbodyConstraints.FreezeRotation | RigidbodyConstraints.FreezePositionZ;
	
	if (Input.GetKey("q")) {
		Fork();
	} else {

	if (Input.GetKey("d") || Input.GetKey("right")) {
	  transform.position.x += speed * Time.deltaTime;
	  bubbleTrail.particleEmitter.emit = true;
	  sparkleTrail.particleEmitter.emit = true;
	  horizontalDirection = "right";
	} else if (Input.GetKey("a") || Input.GetKey("left")) {
	  transform.position.x -= speed * Time.deltaTime;
	  bubbleTrail.particleEmitter.emit = true;
	  sparkleTrail.particleEmitter.emit = true;
	  horizontalDirection = "left";
	} else {
	  horizontalDirection = null;
	}
	
	if (Input.GetKey("w") || Input.GetKey("up")) {
	  transform.position.y += speed * Time.deltaTime;
	  bubbleTrail.particleEmitter.emit = true;
	  sparkleTrail.particleEmitter.emit = true;
	  verticalDirection = "up";
	} else if (Input.GetKey("s") || Input.GetKey("down")) {
	  transform.position.y -= speed * Time.deltaTime;
	  bubbleTrail.particleEmitter.emit = true;
	  sparkleTrail.particleEmitter.emit = true;
	  verticalDirection = "down";
	} else {
	  verticalDirection = null;
	}
	
	if(!verticalDirection) {
		if(horizontalDirection == "right") {
		  iTween.RotateTo(gameObject, Vector3(0, 0, -90), 0.5);
		}
	
		if(horizontalDirection == "left") {
		  iTween.RotateTo(gameObject, Vector3(0, 0, 90), 0.5);
		}
	}

	if(!horizontalDirection) {
		if(verticalDirection == "up") {
		  iTween.RotateTo(gameObject, Vector3(0, 0, 0), 0.5);
		}
	
		if(verticalDirection == "down") {
		  iTween.RotateTo(gameObject, Vector3(0, 0, 180), 0.5);
		}
	}
	
	if(horizontalDirection && verticalDirection) {
	  if(verticalDirection == "up") {
	    if(horizontalDirection == "right") {
	      iTween.RotateTo(gameObject, Vector3(0, 0, -45), 0.5);
	    } else {
	      iTween.RotateTo(gameObject, Vector3(0, 0, 45), 0.5);
	    }
	  }
	  
	  if(verticalDirection == "down") {
	    if(horizontalDirection == "right") {
	      iTween.RotateTo(gameObject, Vector3(0, 0, -135), 0.5);
	    } else {
	      iTween.RotateTo(gameObject, Vector3(0, 0, 135), 0.5);
	    }

	  }

	}
	}
	
	energyMax = Mathf.Ceil(size * 50);
	
	cameraObject.transform.rotation.z = 0; // Make Sure Camera is Fixed
}

function OnGUI()  {
    var enemies = GameObject.FindGameObjectsWithTag("Enemy");
    //GUI.Box( Rect( (Screen.width / 2) - 140, 5, 280, 25 ), "Mouse Position = " + Input.mousePosition );
    GUI.Box( Rect( (Screen.width / 2) - 70, Screen.height - 30, 140, 25 ), "Enemies: " + enemies.length + " | Score:" + score );
    //GUI.Box( Rect( 5, (Screen.height / 2) - 12, 140, 25 ), "Rotation: " + transform.localEulerAngles.z  );
}