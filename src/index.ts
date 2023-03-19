import { Engine } from "@babylonjs/core/Engines/engine";
 import { Scene } from "@babylonjs/core/scene";
 import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
 import { Vector3 } from "@babylonjs/core/Maths/math.vector";
 import { CreateSphere } from "@babylonjs/core/Meshes/Builders/sphereBuilder";
 import { CreateGround } from "@babylonjs/core/Meshes/Builders/groundBuilder";
 import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
 import { DirectionalLight } from "@babylonjs/core/Lights/directionalLight";
 
const createScene = (engine: Engine, canvas: HTMLCanvasElement): Scene => {
    // This creates a basic Babylon Scene object (non-mesh)
    const scene = new Scene(engine);

    // This creates and positions a free camera (non-mesh)
    const camera = new ArcRotateCamera(
        "my first camera",
        0,
        Math.PI / 3,
        10,
        new Vector3(0, 0, 0),
        scene
    );

    camera.setTarget(Vector3.Zero()); 
    camera.attachControl(canvas, true);

    // Our built-in 'sphere' shape.
    const sphere = CreateSphere("sphere", { diameter: 2, segments: 32 }, scene);
    sphere.position.y = 1;

    // Our built-in 'ground' shape.
    const ground = CreateGround("ground", { width: 6, height: 6 }, scene);

    // Load a texture to be used as the ground material
    const groundMaterial = new StandardMaterial("ground material", scene);
    ground.material = groundMaterial;
    ground.receiveShadows = true;

    const light = new DirectionalLight("light", new Vector3(0, -1, 1), scene);
    light.intensity = 0.5;
    light.position.y = 10;

    return scene;
};

export const babylonInit = async (): Promise<void> => {
    const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
    // Generate the BABYLON 3D engine
    let engine = new Engine(canvas, true, {preserveDrawingBuffer : true});

    // Create the scene
    const scene = createScene(engine, canvas);
    scene.autoClear = false;

    // Register a render loop to repeatedly render the scene
    engine.runRenderLoop(function () {
        scene.render();
    });

    // Watch for browser/canvas resize events
    window.addEventListener("resize", function () {
        engine.resize();
    });
};

babylonInit().then(() => {
    // scene started rendering, everything is initialized
});
