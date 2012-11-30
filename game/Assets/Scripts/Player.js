#pragma strict

public var speed : int = 10;
public var size : float = 2;

public var energy : float = 0;
public var energyRegenRate : float = 0.7;
public var energyMax : int = 100;

public var score : int = 0;

private var bubbleTrail : GameObject;
private var sparkleTrail : GameObject;
private var cameraObject : GameObject;

public var direction : String;

function Start()  {
    bubbleTrail  = GameObject.Find("SparkleParticles");
    sparkleTrail = GameObject.Find("SparkleParticlesSecondary");
    cameraObject = GameObject.Find("Main Camera");
}

function OnCollisionStay(collisionInfo : Collision) {
    for (var contact : ContactPoint in collisionInfo.contacts) {
    	var object : GameObject = contact.otherCollider.gameObject;
    	if(object.gameObject.tag == "Enemy") {
    	  var enemy : Enemy = object.GetComponent(Enemy);
    	  if(enemy.size < size) {
    	    enemy.size -= speed * Time.deltaTime;
    	  }
    	  if(enemy.size <= 0) {
    	    Destroy(object);
    	  }
    	}
    }
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

	if (Input.GetKey("d") || Input.GetKey("right")) {
	  transform.position.x += speed * Time.deltaTime;
	  bubbleTrail.particleEmitter.emit = true;
	  sparkleTrail.particleEmitter.emit = true;
	  direction = "right";
	}
	
	if(direction == "right") {
	  if(transform.eulerAngles.z > 270 || transform.eulerAngles.z < 120.5) {
	    transform.rotation.z -= speed / 2 * Time.deltaTime;
	  } else {
	    transform.eulerAngles = Vector3(0, 0, -90);
	  }
	}
	
	if (Input.GetKey("a") || Input.GetKey("left")) {
	  transform.position.x -= speed * Time.deltaTime;
	  bubbleTrail.particleEmitter.emit = true;
	  sparkleTrail.particleEmitter.emit = true;
	  direction = "left";
	}
	
	if(direction == "left") {
	  if(transform.eulerAngles.z < 90 || transform.eulerAngles.z >= 270) {
	    transform.rotation.z += speed / 2 * Time.deltaTime;
	  } else {
	    transform.eulerAngles = Vector3(0, 0, 90);
	  }
	}
	
	if (Input.GetKey("w") || Input.GetKey("up")) {
	  transform.position.y += speed * Time.deltaTime;
	  bubbleTrail.particleEmitter.emit = true;
	  sparkleTrail.particleEmitter.emit = true;
	  direction = "up";
	}
	
	if(direction == "up") {
		transform.rotation.z = 0;
	}
	
	if (Input.GetKey("s") || Input.GetKey("down")) {
	  transform.position.y -= speed * Time.deltaTime;
	  bubbleTrail.particleEmitter.emit = true;
	  sparkleTrail.particleEmitter.emit = true;
	  direction = "down";
	}
	
	if(direction == "down") {
		transform.rotation.z = 180;
	}
	
	cameraObject.transform.rotation.z = 0; // Make Sure Camera is Fixed
}

function OnGUI()  {
    //GUI.Box( Rect( (Screen.width / 2) - 140, 5, 280, 25 ), "Mouse Position = " + Input.mousePosition );
    GUI.Box( Rect( (Screen.width / 2) - 70, Screen.height - 30, 140, 25 ), "Enemies: " + 0 + " | Score:" + score );
    //GUI.Box( Rect( 5, (Screen.height / 2) - 12, 140, 25 ), "Rotation: " + transform.localEulerAngles.z  );
}