import {
    Scene,
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
    PerspectiveCamera,
    WebGLRenderer,
    Vector2,
    Vector3,
    Vector4,
    Line,
    LineLoop,
    Quaternion,
    Matrix4,
    Spherical,
    Box3,
    Sphere,
    Raycaster,
    MathUtils,
    MOUSE,
    Clock,
    MeshLambertMaterial,
    DirectionalLight,
    MeshPhongMaterial,
    SphereGeometry,
    AmbientLight,
    GridHelper,
    WireframeGeometry,
    EdgesGeometry,
    LineBasicMaterial,
    LineSegments,
    AxesHelper,
    BufferGeometry,
    BufferAttribute,
    TrianglesDrawMode,
    TriangleStripDrawMode,
    Triangle,
    Object3D
  } from "three";
  
  
  import CameraControls from 'camera-controls';
  
  const subsetOfTHREE = {
    MOUSE,
    Vector2,
    Vector3,
    Vector4,
    Quaternion,
    Matrix4,
    Spherical,
    Box3,
    Sphere,
    Raycaster,
    MathUtils: {
      DEG2RAD: MathUtils.DEG2RAD,
      clamp: MathUtils.clamp
    }
  };

CameraControls.install({THREE : subsetOfTHREE});
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";
import { panelsr } from "./src/custom_mesh";



export function threeMesh(canvas,guiCont){

    
    // Scene

    const scene= new Scene();
    scene.background= null;

    // the object

    const geometry= new BoxGeometry(1,1,1);
    const geometry2 = new SphereGeometry(0.45);
    const wirebox = new EdgesGeometry(geometry);
    
    // helpers
    const axes = new AxesHelper(1);
    axes.material.depthTest = false;
    const grid = new GridHelper();
    grid.material.depthTest = true;
    grid.renderOrder = 2;
    scene.add(axes);
    

    // the material

    const material= new MeshBasicMaterial({
        color: 0xffffff,
        polygonOffset:true,
        polygonOffsetFactor:1,
        polygonOffsetUnits:1
    });
    const materialSphere= new MeshPhongMaterial({
        color: 0xff00ff,
        shininess: 100 ,
        flatShading: false
    });

    const edgesMaterial= new LineBasicMaterial({color:0x000000});
    const wireframe = new LineSegments(wirebox,edgesMaterial);
    const mesh= new Mesh(geometry,material);
    const sphere= new Mesh(geometry2,materialSphere)

    // adding objects to the scene

    sphere.position.x +=1.5;
    mesh.position.x += 1;
    mesh.position.y += 0.5;
    scene.add(mesh);
    mesh.add(wireframe);
    
    // controls

    const gui = new GUI({autoPlace : false});
    const min = -3;
    const max = 3; 
    const step = 0.001;
    gui.width = 800;
    gui.domElement.id = "three-gui";
    guiCont.append(gui.domElement);
    
    const colorParam= {
        color : 0xff0000,
    }
    
    //gui.add(mesh.position,'x',min,max,step); 
    gui.add(mesh.position,'x').min(min).max(max).step(step).name('X-axis');
    

    gui.addColor(colorParam,'color').onChange(()=>{
        mesh.material.color.set(colorParam.color);
        
    });

    
    
    //scene.add(sphere);

    
    // lights

    const light = new DirectionalLight();
    light.position.set(3,2,1).normalize();
    scene.add(light);

    const light2 = new AmbientLight(0xffffff,0.3);
    light.position.set(-3,2,-1).normalize();

    scene.add(light2);
    scene.add(grid);

    // camera;

    const camera= new PerspectiveCamera(50, canvas.clientWith / canvas.clientHeight);
    camera.position.z = 3;
    camera.position.y = 3;
    camera.position.x = 3;
    camera.lookAt(axes.position)
    scene.add(camera);

    // window.addEventListener('mousemove', (event)=>{
        
    //     const position = getMousePosition(event);
    //     camera.position.x = Math.sin(position.x *Math.PI * 2)*2;
    //     camera.position.z = Math.cos(position.x * Math.PI * 2)*2;
    //     camera.position.y = position.y * 3;
        
    //     camera.lookAt(mesh.position);
    // })
    

    // function getMousePosition(event) {
    //     const position= new Vector2();
    //     const bounds= canvas.getBoundingClientRect();
    //     position.x=(event.clientX - bounds.left) / (bounds.right - bounds.left) * 2 - 1;
    //     position.y=-(event.clientY - bounds.top) / (bounds.bottom - bounds.top) * 2 + 1;
    //     return position;

    // }

    // GUI

    //the renderer
    
    const renderer = new WebGLRenderer( { canvas } )
    renderer.setSize(canvas.clientWidth , canvas.clientHeight, false)
    
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
    renderer.setClearColor(0xffffff,1);
    
    
    //renderer.render(scene,camera);


    window.addEventListener('resize',()=> {
       
        camera.aspect = canvas.clientWidth / canvas.clientHeight ;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth , canvas.clientHeight, false);
    });

    //controls
    
    
    const clock = new Clock();
    const cameraControls = new CameraControls(camera, canvas);
    cameraControls.dollyToCursor=true;
    // controls.enableDamping = true ;


    // animtation
    
    function animate() {
        const detla = clock.getDelta();
        cameraControls.update(detla);
        // mesh.rotation.x += 0.01;
        // mesh.rotation.z += 0.01;
        renderer.render(scene,camera);
        requestAnimationFrame(animate);
    }

    animate()

}
export function customMesh(canvas,guiCont){

    
    // Scene

    const scene= new Scene();
    scene.background= null;

    //  CUSTOM the object
    const panels2=panelsr
    const vertex = panelsr.vertex
    const coords=[]
    const coords2=[]
    const coordsT=[]
    const edgesMaterialT= new LineBasicMaterial({
        color:0x0000ff
    });
    for(const l in panels2['L_2']){
        coords.push(panels2['L_2'][l])
    
    }
    for(let a in coords){
        
        for(let v of coords[a]){
            coords2.push(v)
        }
    } 
    
    const flatcoord=[].concat(...coords2);
    
    const flatcoordsc = []

    for(let v of flatcoord){
        const sclcrd=(v*0.0001)
        flatcoordsc.push(sclcrd)
    }
    const vertices= new Float32Array(flatcoordsc)
    
    const geometry2 = new BufferGeometry().setFromPoints(vertices);
    geometry2.setAttribute('position',new BufferAttribute(vertices,3));
    
    
    
    console.log(geometry2)

    // helpers
    const axes = new AxesHelper(1);
    axes.material.depthTest = true;
    const grid = new GridHelper();
    grid.material.depthTest = true;
    grid.renderOrder = 0;
    scene.add(axes);
    
    // the material

    const material= new MeshBasicMaterial({
        color: 0x5f92b9,
        polygonOffset:true,
        polygonOffsetFactor:1,
        polygonOffsetUnits:1,
        side:2
    });
    const materialp= new MeshPhongMaterial({
        color: 0x5f92b9,
        shininess: 100 ,
        flatShading: false,
        side:2
    });

    const edgesMaterial= new LineBasicMaterial({
        color:0x000000
    });
    edgesMaterial.linewidth = 2;
    const wireTriangle = new WireframeGeometry(geometry2);
    const wireframe= new LineSegments(wireTriangle,edgesMaterial)
    const meshT= new Mesh(geometry2,material);

    scene.add(meshT);
    meshT.add(wireframe);
    
    // controls

    const gui = new GUI({autoPlace : false});
    const min = -3;
    const max = 3; 
    const step = 0.001;
    gui.width = 800;
    gui.domElement.id = "three-gui";
    guiCont.append(gui.domElement);
    
    const colorParam= {
        color : 0xff0000,
    }
    
    gui.add(meshT.position,'x',min,max,step); 
    console.log(meshT.material)
    gui.addColor(colorParam,'color').onChange(()=>{
        meshT.material.color.set(colorParam.color);
        
    });
    
    // lights

    const light = new DirectionalLight();
    light.position.set(3,2,1).normalize();
    scene.add(light);

    const light2 = new AmbientLight(0xffffff,0.3);
    light.position.set(-3,2,-1).normalize();

    scene.add(light2);
    scene.add(grid);

    // camera;

    const camera= new PerspectiveCamera(50, canvas.clientWith / canvas.clientHeight);
    camera.position.z = 3;
    camera.position.y = 3;
    camera.position.x = 3;
    camera.lookAt(meshT.position)
    scene.add(camera);

    // GUI

    //the renderer
    
    const renderer = new WebGLRenderer( { canvas : canvas } )
    
    renderer.setSize(canvas.clientWidth , canvas.clientHeight, false)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
    renderer.setClearColor(0xffffff,1);
    //renderer.render(scene,camera);
    
    //controls
    
    const clock = new Clock();
    const cameraControls = new CameraControls(camera,canvas);
    
    cameraControls.dollyToCursor=true;

    
    
    //animtation
    const  animate = () => {
        const detla = clock.getDelta();
        cameraControls.update(detla);
        renderer.render(scene,camera);
        requestAnimationFrame(animate);
    }
    
    window.addEventListener('load',()=> {
        animate();
    });
    animate();


    window.addEventListener('resize',()=> {
        camera.aspect = canvas.clientWidth / canvas.clientHeight ;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth , canvas.clientHeight, false);
        
    });
    
    
   
}