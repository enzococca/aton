/*!
    @preserve

 	ATON

 	@author Bruno Fanini
	VHLab, CNR ISPC

==================================================================================*/

'use strict';

/**
@namespace ATON
*/
let ATON = {};
window.ATON = ATON;

// Import
import Node from "./ATON.node.js";
import POV from "./ATON.pov.js";
//import Period from "./ATON.period.js";
import LightProbe from "./ATON.lightprobe.js";
import XPF from "./ATON.xpf.js";
import Plugin from "./ATON.plugin.js";

import EventHub from "./ATON.eventhub.js";
import MatHub from "./ATON.mathub.js";
import Utils from "./ATON.utils.js";
import SceneHub from "./ATON.scenehub.js";
import AudioHub from "./ATON.audiohub.js";
import Nav from "./ATON.nav.js";
import XR from "./ATON.xr.js";
import SUI from "./ATON.sui.js";
import UI from "./ATON.ui.js";
import VRoadcast from "./ATON.vroadcast.js";
import SemFactory from "./ATON.semfactory.js";
import FE from "./ATON.fe.js";
import MediaFlow from "./ATON.mediaflow.js";
import Phygital from "./ATON.phygital.js";
import App from "./ATON.app.js";
import FX from "./ATON.fx.js";
import XPFNetwork from "./ATON.xpfnetwork.js";
import CC from "./ATON.cc.js";
import MRes from "./ATON.mres.js";
//import NX from "./_prv/ATON.nx.js";

// Classes
ATON.Node       = Node;
ATON.POV        = POV;
ATON.LightProbe = LightProbe;
ATON.XPF        = XPF;
ATON.Plugin     = Plugin;
//ATON.Period = Period;

// NS
ATON.EventHub   = EventHub;
ATON.Utils      = Utils;
ATON.CC         = CC;
ATON.SceneHub   = SceneHub;
ATON.MatHub     = MatHub;
ATON.Nav        = Nav;
ATON.AudioHub   = AudioHub;
ATON.XR         = XR;
ATON.SUI        = SUI;
ATON.UI         = UI;
ATON.VRoadcast  = VRoadcast;
ATON.SemFactory = SemFactory;
ATON.FE         = FE;
ATON.MediaFlow  = MediaFlow;
ATON.Phygital   = Phygital;
ATON.App        = App;
ATON.FX         = FX;
ATON.XPFNetwork = XPFNetwork;
ATON.MRes       = MRes;
//ATON.NX         = NX;

//==============================================================
// Consts
//==============================================================
ATON.STD_UPVECTOR = new THREE.Vector3(0,1,0);
ATON.ROOT_NID = "."; // reserved node ID for graph-roots

ATON.RAD2DEG = (180.0 / Math.PI);
ATON.DEG2RAD = (Math.PI / 180.0);

ATON.PATCH_ADD = 0;
ATON.PATCH_DEL = 1;

// Node types
ATON.NTYPES = {};
// 1 and 2 are reserved
ATON.NTYPES.SCENE  = 3;
ATON.NTYPES.SEM    = 4;
ATON.NTYPES.UI     = 5;

// Folders
ATON.BASE_URL           = window.location.origin;
ATON.PATH_RESTAPI       = `${ATON.BASE_URL}/api/`; // "../api/";
ATON.PATH_RESTAPI_SCENE = `${ATON.PATH_RESTAPI}scene/`;
ATON.PATH_WAPPS         = `${ATON.BASE_URL}/a/`;
ATON.PATH_MODS          = `${ATON.BASE_URL}/mods/`; // "../mods/";
//ATON.PATH_THREE         = ATON.PATH_MODS + "three/";
ATON.PATH_DRACO_LIB     = `${ATON.BASE_URL}/dist/draco/`; //ATON.PATH_THREE+"examples/js/libs/draco/";
ATON.PATH_BASIS_LIB     = `${ATON.BASE_URL}/dist/basis/`; //ATON.PATH_THREE+"examples/js/libs/basis/";
ATON.PATH_IFC_LIB       = "ifc/"; //ATON.BASE_URL + "/dist/ifc/";

ATON.PATH_COLLECTION = `${ATON.BASE_URL}/collections/`; // "../collection/";
ATON.PATH_SCENES     = `${ATON.BASE_URL}/scenes/`; // "../scenes/";
ATON.PATH_RES        = `${ATON.BASE_URL}/res/`; // "../res/";
ATON.PATH_FE         = `${ATON.BASE_URL}/s/`; // "/fe/";

ATON.SHADOWS_NEAR = 0.1;
ATON.SHADOWS_FAR  = 50.0; //50.0;
ATON.SHADOWS_SIZE = 15.0;
ATON.SHADOWS_RES  = 1024; // 512

ATON.AMB_L = 0.2; // 0.1 - Ambient for shadowed areas (without LPs)

// Scale levels
ATON.SCALE_DEFAULT   = 0;
ATON.SCALE_BIG       = 5;
ATON.SCALE_VERYBIG   = 10;
ATON.SCALE_SMALL     = -5;
ATON.SCALE_VERYSMALL = -10;



// Plugins
ATON._plugList = [];

/**
Set path collection (3D models, audio, panoramas, ...)
@param {string} path - path
*/
ATON.setPathCollection = (path)=>{
    ATON.PATH_COLLECTION = /*window.location.origin + */path;
    //ATON.PATH_MODELS     = ATON.PATH_COLLECTION+"models/";
};

/**
Set path scenes
@param {string} path - path
*/
ATON.setPathScenes = (path)=>{
    ATON.PATH_SCENES = /*window.location.origin +*/ path;
};

// For resuming suspended audio/video streams
ATON._onUserInteraction = ()=>{
    if (ATON._elPanoVideo && !ATON._vpanoPlaying) ATON._elPanoVideo.play();
    if (ATON.XPFNetwork._elVid && !ATON.XPFNetwork._vidPlaying) ATON.XPFNetwork._elVid.play();

    if (ATON.AudioHub._listener && ATON.AudioHub._listener.context){
        if (ATON.AudioHub._listener.context.state === 'suspended') ATON.AudioHub._listener.context.resume();
    }

    for (let v in ATON.MediaFlow._vStreams){
        let vs = ATON.MediaFlow._vStreams[v].el;
        if (!vs.playing && !vs.uid) vs.play();
    }
};

/* TODO: plugin
ATON.addRay = (jspath)=>{
    let s = document.createElement('script');
    s.setAttribute('src', jspath);
    s.async = false;
    document.body.appendChild(s);
};
*/

// Auth
ATON.checkAuth = (onLogged, onNotLogged)=>{
    $.ajax({
        type: 'GET',
        url: ATON.PATH_RESTAPI+"user",
        xhrFields: { withCredentials: true },            
        dataType: 'json',

        success: (data)=>{
            if (data !== undefined && data.username) onLogged(data);
            else if (onNotLogged) onNotLogged();
        },

        error: ()=>{
            if (onNotLogged) onNotLogged();
        }
    });
};


ATON._setupBaseListeners = ()=>{
    let el = ATON._renderer.domElement;

    window.addEventListener( 'resize', ATON._onResize, false );
    window.onorientationchange = ATON._readDeviceOrientationMode;

    /*
    if (screenfull.isEnabled){
	    screenfull.on('change', ()=>{
            ATON._bFS = screenfull.isFullscreen;
            ATON.fireEvent("Fullscreen", ATON._bFS);

		    if (ATON._bFS) console.log("Now fullscreen");
            else console.log("Exit fullscreen");
	    });
    }
*/
    document.addEventListener('fullscreenchange',(e)=>{
        ATON._bFS = document.fullscreenElement? true : false;

        ATON.fireEvent("Fullscreen", ATON._bFS);

        if (ATON._bFS) console.log("Now fullscreen");
        else console.log("Exit fullscreen");
    });


    el.addEventListener( 'mousemove', ATON._updateScreenMove, false );
    ///el.addEventListener('dblclick', ATON._doubleTap, false);

    el.addEventListener('mousedown', (e)=>{
        if (e.button === 1) ATON.fireEvent("MouseMidButton");      // middle-click
        if (e.button === 2) ATON.fireEvent("MouseRightButton");    // right-click
    });

    el.addEventListener( 'wheel', ATON._onMouseWheel, false );

    // Generic pointer
    // UNUSED - issues with aside-panel elements
    ATON._bPointerDown = false;
/*
    window.addEventListener('pointerdown', (e)=>{
        ATON._bPointerDown = true;
        ATON._onUserInteraction();
    });
    window.addEventListener('pointerup', (e)=>{
        ATON._bPointerDown = false;
    });
    window.addEventListener('pointermove', (e)=>{
        if (!ATON._bPointerDown) return;

        ATON._updateScreenMove(e);
        ATON._handleQueries();
    });

    window.addEventListener('touchstart', (e)=>{
        ATON._bPointerDown = true;
        ATON._onUserInteraction();
    });
    window.addEventListener('touchend', (e)=>{
        ATON._bPointerDown = false;
    });
    window.addEventListener('touchmove', (e)=>{
        if (!ATON._bPointerDown) return;

        ATON._updateScreenMove(e.touches[0]);
        ATON._handleQueries();
    });
*/

/*
    Hammer(el).on("press pressup", (ev)=>{

        // Hold gesture start (press)
        if (ev.type == "press") {
            console.log("Hold active");
        }

        // Hold gesture stop (pressup)
        if (ev.type == "pressup") {
            console.log("Hold inactive");
        }
    });
*/
    // Touch events
    Hammer(el).on("doubletap", (e)=>{
        ATON._bPointerDown = false;
        ATON._onUserInteraction();

        ATON.fireEvent("DoubleTap", e.srcEvent);
        //console.log(e.srcEvent);
    });

    Hammer(el).on("tap", (e)=>{
        //ATON._evPointer = e.srcEvent;
        ATON._bPointerDown = false;

        ATON._onUserInteraction();

        ATON._updateScreenMove(e.srcEvent);
        ATON._handleQueries();

        ATON.fireEvent("Tap", e.srcEvent);
        //console.log(e.srcEvent);

        // UI selection
        if (ATON._hoveredUI === undefined) return;
        let H = ATON.getUINode(ATON._hoveredUI);
        if (H && H.onSelect) H.onSelect();
    });

    ATON.on("DoubleTap", (e)=>{
        //console.log(e);
        ATON.defaultDoubleTapFromScreenCoords(e);
    });


    // Keyboard
    ATON._kModShift = false;
    ATON._kModCtrl  = false;

    ATON._bListenKeyboardEvents = true; // FIXME: check if there's a better way

    window.addEventListener("keydown", (e)=>{
        //e.preventDefault();
        ATON._onUserInteraction();

        if (e.key === "Shift")   ATON._kModShift = true;
        if (e.key === "Control") ATON._kModCtrl  = true;
        
        if (!ATON._bListenKeyboardEvents) return;

        ATON.fireEvent("KeyPress", e.key);
        //ATON.fireEvent("KeyPress/"+e.key);
    }, false);

    window.addEventListener("keyup", (e)=>{
        //e.preventDefault();

        if (e.key === "Shift")   ATON._kModShift = false;
        if (e.key === "Control") ATON._kModCtrl  = false;

        if (!ATON._bListenKeyboardEvents) return;

        ATON.fireEvent("KeyUp", e.key);
        //ATON.fireEvent("KeyUp/"+e.key);
    }, false);

    // Defaults
    ATON.on("KeyPress", (k)=>{

        if (k==='+'){
            let f = ATON.Nav.getFOV() + 1.0;
            ATON.Nav.setFOV(f);
        }
        if (k==='-'){
            let f = ATON.Nav.getFOV() - 1.0;
            ATON.Nav.setFOV(f);
        }

        if (k==='PageUp'){
        }
        if (k==='PageDown'){
        }
    });         
};

ATON._onResize = ()=>{
    ATON.Nav._camera.aspect = window.innerWidth / window.innerHeight;
    ATON.Nav._camera.updateProjectionMatrix();

    ATON._renderer.setSize( window.innerWidth, window.innerHeight );

    if (ATON.FX.composer){
        ATON.FX.composer.setSize( window.innerWidth, window.innerHeight );
        
        if (ATON.FX.passes[ATON.FX.PASS_AA]){
            let UU = ATON.FX.passes[ATON.FX.PASS_AA].material.uniforms;
            if (UU) UU.resolution.value.set( (1/window.innerWidth), (1/window.innerHeight) );
        }
    }
    
    console.log("onResize");
};

ATON._onMouseWheel = (e)=>{
    e.preventDefault();

    ATON.fireEvent("MouseWheel", e.deltaY);
};

ATON.focusOn3DView = ()=>{
    ATON._renderer.domElement.focus();
};

// Base/default routine on generic user activation
// E.g. double-tap, VR controller trigger, etc.
ATON._SUIactivation = ()=>{
    const U = ATON.getUINode(ATON._hoveredUI);
    
    if (U === undefined) return false;
    if (U.onSelect === undefined) return false;

    U.onSelect();
    return true;
};

// Common routine for std activation/trigger
ATON._stdActivation = ()=>{
    //if (!ATON.Nav._bControl) return;

    // Handle SUI nodes
    if (ATON._SUIactivation()) return;

    if (!ATON.Nav._bControl) return;

    if (ATON.XPFNetwork._semCurr !== undefined){
        ATON.fireEvent("SemanticMaskSelect", ATON.XPFNetwork._semCurr);
    }

    // Handle active immersive AR/VR session
    if (ATON.XR._bPresenting){
        if (Nav.requestTransitionToLocomotionNodeInSightIfAny(ATON.XR.STD_TELEP_DURATION)) return;

        if (ATON.XR._sessionType === "immersive-vr") ATON.XR.teleportOnQueriedPoint();
        ATON.FE.playAudioFromSemanticNode(ATON._hoveredSemNode);
        return;
    }

    // Non-immersive sessions
    let bFPtrans = ATON.Nav.isFirstPerson() || ATON.Nav.isDevOri();

    // When first-person mode, teleport (non immersive)
    if (bFPtrans){
        if (Nav.requestTransitionToLocomotionNodeInSightIfAny(0.5)) return;

        if (ATON.Nav.currentQueryValidForLocomotion()){
            let P = ATON._queryDataScene.p;
            //let N = ATON._queryDataScene.n;

            let currDir = ATON.Nav._vDir;
            let feye = new THREE.Vector3(P.x, P.y+ATON.userHeight, P.z);
            let ftgt = new THREE.Vector3(
                feye.x + currDir.x,
                feye.y + currDir.y,
                feye.z + currDir.z,
            );

            let POV = new ATON.POV().setPosition(feye).setTarget(ftgt).setFOV(ATON.Nav._currPOV.fov);
            ATON.Nav.requestPOV(POV, 0.5);
        }
        return;
    }

    // TODO: leave this and disable requestPOVbyNode
    //if (ATON._hoveredSemNode) ATON.fireEvent("SemanticNodeSelect", ATON._hoveredSemNode);

    // In orbit mode, focus on selected SemNode...
    let hsn = ATON.getSemanticNode(ATON._hoveredSemNode);
    if (ATON._queryDataSem && hsn){
        ATON.Nav.requestPOVbyNode( hsn, 0.5);
        return;
    }

    // ...or perform standard retarget on picked surface point
    if (ATON._queryDataScene){
        ATON.Nav.requestRetarget(ATON._queryDataScene.p, /*ATON._queryDataScene.n*/undefined, 0.5);
    }
};

// Default retarget from screen coordinates (eg.: on double tap)
ATON.defaultDoubleTapFromScreenCoords = (e)=>{
    ATON._updateScreenMove(e);
    ATON._handleQueryScene();

    ATON._stdActivation();
}

// Fullscreen
ATON.isFullscreen = ()=>{
    return ATON._bFS;
/*
    if (document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement !== undefined){
        return true;
    }

    return false;
*/
};

ATON.toggleFullScreen = ()=>{
    //screenfull.toggle();
    if (!document.fullscreenElement)  document.documentElement.requestFullscreen();
    else if (document.exitFullscreen) document.exitFullscreen();
};


//============================================================================
// ATON init routines
//============================================================================
/**
Main ATON initialization, it will take care of all sub-components initialization, device profiling and much more
@example
ATON.realize()
*/
ATON.realize = ( bNoRender )=>{
    console.log("Initialize ATON...");

    ATON.Utils.init();
    ATON.Utils.profileDevice();
    
    //THREE.Object3D.DefaultUp = new THREE.Vector3(0,0,1); // mismatches WebXR y-up

    // Global time
    // uses performance.now() if it is available, otherwise the less accurate Date.now().
    ATON._clock = new THREE.Clock(true);

    // Bounds
    ATON.bounds = new THREE.Sphere();
    
    ATON._worldScale = 1.0;
    ATON._ws = 0;

    ATON._bFS = false; // fullscreen

    const wglopts = {
        //canvas: document.getElementById("View3D"),
        antialias: true, //ATON.device.isMobile? false : true,
        alpha: true,     // required for AR

        //powerPreference: "high-performance",

        ///pecision: "lowp", //"mediump"
        preserveDrawingBuffer: true
    };

    ATON._renderer = new THREE.WebGLRenderer(wglopts);
    ATON._renderer.setSize( window.innerWidth, window.innerHeight );
    //console.log(ATON._renderer);

    //ATON._renderer.domElement.style.filter = "blur(10px)";

    // Capabilities from initialized renderer
    ATON.Utils.profileRenderingCapabilities();

    ATON._stdpxd = 1.0;
    //ATON._stdpxd = window.devicePixelRatio? (window.devicePixelRatio) : 1.0;
    ATON._renderer.setPixelRatio( ATON._stdpxd );
    //console.log(ATON._stdpxd);

    // Framerate management
    ATON._fps = 60.0;
    ATON._dt  = 0.01;
    ATON._dtAccum = 0.0;
    ATON._dtCount = 0.0;
    ATON._avgFPSaccum = 0.0;
    ATON._avgFPS = 60.0;

    ATON._dRenderBudgetMinFPS = 20.0;
    ATON._dRenderBudgetMaxFPS = 55.0;

    // Adaptive Density
    ATON._bAdaptiveDensity = true;
    ATON._adMin = 0.4;
    ATON._adMax = 1.5;
    if (ATON.device.lowGPU) ATON._adMax = 1.0;
/*
    ATON._ddEST = 0.0;
    ATON._ddC   = 0;
*/
    ATON._aniMixers = [];
    
    ATON._stdEncoding = THREE.LinearEncoding; // THREE.sRGBEncoding;

    ATON._renderer.outputEncoding = ATON._stdEncoding;
    
    ATON._renderer.toneMapping = THREE.LinearToneMapping;
    //ATON._renderer.toneMapping = THREE.CineonToneMapping;
    //ATON._renderer.toneMapping = THREE.ACESFilmicToneMapping;
    
    ATON._renderer.toneMappingExposure = 1.0;
    //ATON._renderer.gammaOutput = true;
    //ATON._renderer.gammaFactor = 2.2;
    //ATON._renderer.physicallyCorrectLights = true;

    //console.log(ATON._renderer.getPixelRatio());

    if (!bNoRender) ATON._renderer.setAnimationLoop( ATON._onFrame );
    //ATON._bDirtyLP = false;

    ATON._maxAnisotropy = ATON._renderer.capabilities.getMaxAnisotropy();
    //console.log(ATON._renderer.capabilities);

    // NOTE: issues (can grow out of mem)
    //THREE.Cache.enabled = true;

    ATON.userHeight = 1.7;
 
    if (!bNoRender) document.body.appendChild( ATON._renderer.domElement );
    //console.log(ATON._renderer);
    
    let canvas = ATON._renderer.domElement;
    canvas.id = "idView3D";
    canvas.style.outline = "none";
    canvas.style.border  = "none";
    //canvas.style.padding = "0px";
    //canvas.style.margin  = "0px";
    //canvas.style.width   = "100%";
    //canvas.style.height  = "100%";

    ATON.UI.init();

    // Multimedia
    ATON._vpanoPlaying = false;
    ATON._bUserInts = 0;

    ATON.EventHub.init();
    ATON.MatHub.init();

    //ATON._setupLoadManager();
    ATON._assetsManager = {};
    ATON._aLoader = new THREE.GLTFLoader(/*ATON._loadManager*/);
    ATON._numReqLoad = 0;

    ATON._collMod = undefined; // collection url modifier

    // IFC
/*
    ATON._ifcLoader = new IFCLoader();
    ATON._ifcLoader.ifcManager.setWasmPath( ATON.PATH_IFC_LIB );
*/

    // Basis
/*
    ATON._basisLoader = new THREE.BasisTextureLoader();
    ATON._basisLoader.setTranscoderPath( ATON.PATH_BASIS_LIB );
    ATON._basisLoader.detectSupport( ATON._renderer );
*/
    ATON._ktx2Loader = new THREE.KTX2Loader();
    ATON._ktx2Loader.setTranscoderPath( ATON.PATH_BASIS_LIB );
	ATON._ktx2Loader.detectSupport( ATON._renderer );
    
    // Config DRACO
    ATON._dracoLoader = new THREE.DRACOLoader();
    //ATON._dracoLoader.setDecoderConfig({type: "wasm"}); // Force
    ATON._dracoLoader.setDecoderPath( ATON.PATH_DRACO_LIB );
    ATON._dracoLoader.setWorkerLimit(2);
    ATON._dracoLoader.preload();

    // glTF
    ATON._aLoader.setDRACOLoader( ATON._dracoLoader );
    ATON._aLoader.setKTX2Loader( ATON._ktx2Loader );

    // Register BasisTextureLoader for .basis extension.
    //THREE.DefaultLoadingManager.addHandler( /\.basis$/, ATON._ktx2Loader ); // deprecated
    THREE.DefaultLoadingManager.addHandler( /\.ktx2$/, ATON._ktx2Loader );

    // Update routines
    ATON._updRoutines = [];

    // Periods (TODO:)
    //ATON.periods = [];


    // Light Probing
    ATON._pmremGenerator = undefined;
    ATON._lps = []; // list of lightprobes
    ATON._bAutoLP = false;
    ATON._envMapInt = 1.0;
    ATON._numLPbounces = 2;
    ATON._lpbCount = 0;
    
    // Shadows
    ATON._bShadowsFixedBound = false;
    ATON._shadowsFixedBoundCenter = undefined;

    ATON._shadowsNear = ATON.SHADOWS_NEAR;
    ATON._shadowsFar  = ATON.SHADOWS_FAR;
    ATON._shadowsSize = ATON.SHADOWS_SIZE;
    ATON._shadowsRes  = ATON.SHADOWS_RES;

    ATON.initGraphs();
    ATON.SceneHub.init();

    // Multi-res component
    ATON.MRes.init();

    // Copyright manager
    ATON.CC.init();

    // Init audio hub
    ATON.AudioHub.init();

    // Init nav system
    ATON.Nav.init();

    // XR
    ATON.XR.init();

    // Spatial UI
    ATON.SUI.init();

    // VRoadcast
    ATON.VRoadcast.init();

    // Media Flow
    ATON.MediaFlow.init();

    // Semantic Factory
    ATON.SemFactory.init();

    // App
    ATON.App.init();

    // Phygital
    ATON.Phygital.init();

    // XPF-Network
    ATON.XPFNetwork.init();

    // NX
    //ATON.NX.init();

    // FX Composer setup
    if (!ATON.device.lowGPU && !ATON.device.isMobile) ATON.FX.init();
    
    if (!ATON.FX.composer){
        ATON._render = ()=>{
            ATON._renderer.render( ATON._mainRoot, ATON.Nav._camera );
        }
    }

    // Query / picked data
    ATON._queryDataScene = undefined;
    ATON._queryDataSem   = undefined;
    ATON._queryDataUI    = undefined;

    ATON._hoveredSemNode = undefined;
    ATON._hoveredUI      = undefined;

    ATON._bq = true;
    ATON._bQuerySemOcclusion = true;
    ATON._bQueryNormals  = true;
    ATON._bPauseQuery    = false;
    ATON._bCenteredQuery = false;
    
    ATON._bqScene = false;
    ATON._bqSem   = false;

    ATON._qSync    = 0;
    ATON._qSyncInt = 1;

    // Timed Gaze Input
    ATON._tgiDur = undefined; // set to seconds (e.g. 2.0 to enable)
    ATON._tgiPer = undefined; // tgi percentage
    ATON._tHover  = undefined;

    // Main Panorama
    ATON._bMainPanoInfinite = true;
    ATON._matMainPano = undefined;
    ATON._mMainPano   = undefined;
/*
    window.setInterval(()=>{
        if (!ATON._bPauseQuery) ATON._handleQueries();
    }, 100 );
*/

    // Mouse/Touch screen coords
    ATON._screenPointerCoords = new THREE.Vector2(0.0,0.0);

    // Ray casters
    ATON._rcScene = new THREE.Raycaster();
    ATON._rcScene.layers.set(ATON.NTYPES.SCENE);
    ATON._rcScene.firstHitOnly = true;

    ATON._rcSemantics = new THREE.Raycaster();
    ATON._rcSemantics.layers.set(ATON.NTYPES.SEM);
    ATON._rcSemantics.firstHitOnly = true;
    
    ATON._rcUI = new THREE.Raycaster();
    ATON._rcUI.layers.set(ATON.NTYPES.UI);
    ATON._rcUI.firstHitOnly = true;

    //ATON._registerRCS(); // not used for now

    ATON._setupBaseListeners();

    if (ATON.device.isMobile) ATON._readDeviceOrientationMode();

    // Plugins
    for (let p in ATON._plugList){
        let P = ATON._plugList[p];

        if (P.setup !== undefined)  P.setup();
        if (P.update !== undefined) ATON.addUpdateRoutine( P.update );
    }

    // Gizmo transforms
    ATON._gizmo  = undefined;
    ATON._bGizmo = false;

    ATON.focusOn3DView();
};

ATON.registerPlugin = (P)=>{
    if (P === undefined) return;
    ATON._plugList.push(P);
};

/**
Set ATON collection path modifier
@param {function} f - ...
*/
ATON.setCollectionPathModifier = (f)=>{
    ATON._collMod = f;
};

/**
Set timed-gaze duration
@param {number} dt - time to trigger activation
*/
ATON.setTimedGazeDuration = (dt)=>{
    ATON._tgiDur = dt;
};

/**
Get timed-gaze current progress (percentage)
@returns {number}
*/
ATON.getTimedGazeProgress = ()=>{
    if (ATON._tgiDur === undefined) return undefined;
    return ATON._tgiPer;
};

/**
Get current elapsed time (global clock) since ATON initialization
@returns {number}
*/
ATON.getElapsedTime = ()=>{
    return ATON._clock.elapsedTime;
};

/**
Pause rendering
*/
ATON.renderPause = ()=>{
    ATON._renderer.setAnimationLoop( undefined );
};

/**
Resume rendering (if paused)
*/
ATON.renderResume = ()=>{
    ATON._renderer.setAnimationLoop( ATON._onFrame );
};

ATON._setupLoadManager = ()=>{
    ATON._loadManager = new THREE.LoadingManager();
    ATON._loadManager.onStart = ( url, itemsLoaded, itemsTotal )=>{
	    console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
        ATON.fireEvent("NodeRequestFired", url);
    };

    ATON._loadManager.onLoad = ()=>{
	    console.log( 'Loading complete!');
        ATON.fireEvent("AllNodeRequestsCompleted");
    };

    ATON._loadManager.onProgress = ( url, itemsLoaded, itemsTotal )=>{
	    //console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
    };

    ATON._loadManager.onError = ( url )=>{
	    console.log( 'There was an error loading ' + url );
    };
};

/**
Set the default pixel density (standard is 1.0)
@example
ATON.setDefaultPixelDensity(0.5)
*/
ATON.setDefaultPixelDensity = (d)=>{
    ATON._stdpxd = d;

    ATON._renderer.setPixelRatio( d );

    if (ATON.FX.composer) ATON.FX.composer.setPixelRatio(d);

    // WebXR density
    if (ATON._renderer.xr === undefined) return;

    if (ATON.device.isMobile) ATON._renderer.xr.setFramebufferScaleFactor(ATON._stdpxd * ATON.XR.MOBILE_DENSITY_F);
    else ATON._renderer.xr.setFramebufferScaleFactor(ATON._stdpxd);
    //ATON._renderer.xr.setFramebufferScaleFactor(1.0);
};

/**
Reset pixel density to default
*/
ATON.resetPixelDensity = ()=>{
    ATON._renderer.setPixelRatio( ATON._stdpxd );
};

ATON._readDeviceOrientationMode = ()=>{
    if (Math.abs(window.orientation) === 90){
        console.log("Landscape Mode");
        ATON.fireEvent("MobileLandscapeMode");
    }
    else {
        console.log("Portrait Mode");
        ATON.fireEvent("MobilePortraitMode");
    }

    setTimeout( ATON._onResize, 500);
};


//============================================================================
// Scene-graphs
//============================================================================
ATON.snodes   = {}; // Visible scene-graph
ATON.semnodes = {}; // Semantics graph
ATON.uinodes  = {}; // UI graph

// Visible scene-graph
//=============================================
/**
Create a scene node (visible scene-graph)
@param {string} id - a string representing unique ID of the node (optional)
@returns {Node}
*/
ATON.createSceneNode = (id)=>{
    return new ATON.Node(id, ATON.NTYPES.SCENE);
};

/**
Get a previously created scene node (visible scene-graph)
@param {string} id - the node ID
@returns {Node}
*/
ATON.getSceneNode = (id)=>{ 
    if (id === undefined) return undefined;    
    return ATON.snodes[id];
};

/**
Get or create a scene node (visible scene-graph)
@param {string} id - the node ID
@returns {Node}
*/
ATON.getOrCreateSceneNode = (id)=>{
    let N = ATON.getSceneNode(id);
    if (N !== undefined) return N;
    return ATON.createSceneNode(id);
};

/**
Get root (visible scene-graph)
@returns {Node}
*/
ATON.getRootScene = ()=>{
    return ATON._rootVisible;
};

// Semantics, shape descriptors
//=============================================

/**
Create a semantic node
@param {string} id - a string representing unique ID of the node (optional)
@returns {Node}
*/
ATON.createSemanticNode = (id)=>{
    return new ATON.Node(id, ATON.NTYPES.SEM);
};

/**
Get a previously created semantic node
@param {string} id - the node ID
@returns {Node}
*/
ATON.getSemanticNode = (id)=>{
    if (id === undefined) return undefined; 
    return ATON.semnodes[id];
};

/**
Get or create a semantic node
@param {string} id - the node ID
@returns {Node}
*/
ATON.getOrCreateSemanticNode = (id)=>{
    let S = ATON.getSemanticNode(id);
    if (S !== undefined) return S;
    return ATON.createSemanticNode(id);
};

/**
Get root of semantic graph
@returns {Node}
*/
ATON.getRootSemantics = ()=>{
    return ATON._rootSem;
};

// UI graph
//=============================================

/**
Create a UI node
@param {string} id - a string representing unique ID of the node (optional)
@returns {Node}
*/
ATON.createUINode = (id)=>{
    return new ATON.Node(id, ATON.NTYPES.UI);
};

/**
Get a previously created UI node
@param {string} id - the node ID
@returns {Node}
*/
ATON.getUINode = (id)=>{
    if (id === undefined) return undefined; 
    return ATON.uinodes[id];
};

/**
Get root of UI graph
@returns {Node}
*/
ATON.getRootUI = ()=>{
    return ATON._rootUI;
};


// World/User scale
ATON._unpackScale = (s)=>{
    if (s == 0) return 1.0;

    if (s >= 0) return (1.1*s);
    return (1.0 / (-1.1*s));
};

/**
Set user scale by level.
Level is an integer ranging from -127 to 127, with 0 representing the default scale (or ATON.SCALE_DEFAULT)
@param {number} ws - the new user scale level (if undefined, reset scale)
@example
ATON.setUserScaleLevel(ATON.SCALE_SMALL);
ATON.setUserScaleLevel(ATON.SCALE_VERYBIG);
ATON.setUserScaleLevel(8);
*/
ATON.setUserScaleLevel = (us)=>{
    ATON.setWorldScaleLevel(-us);
};

ATON.getUserScale = ()=>{
    return (1.0/ATON._worldScale);
};

/**
Set world scale by level.
Level is an integer ranging from -127 to 127, with 0 representing the default scale (or ATON.SCALE_DEFAULT)
@param {number} ws - the new world scale level (if undefined, reset scale)
@example
ATON.setWorldScaleLevel(ATON.SCALE_SMALL);
ATON.setWorldScaleLevel(ATON.SCALE_VERYBIG);
ATON.setWorldScaleLevel(24);
*/
ATON.setWorldScaleLevel = (ws)=>{
    if (ws === undefined) ws = 0;

    if (ws < -127) ws = 127;
    if (ws > 127)  ws = 127;

    ATON._ws = ws;

    let s = ATON._unpackScale(ws);

    ATON._rootVisible.scale.set(s,s,s);
    ATON._rootSem.scale.set(s,s,s);
    ///ATON._rootUI.scale.set(s,s,s);
    SUI.gLocNodes.scale.set(s,s,s);
    SUI.gMeasures.scale.set(s,s,s);

    if (ATON.VRoadcast.avaGroup) ATON.VRoadcast.avaGroup.scale.set(s,s,s);
    //if (ATON.VRoadcast.focGroup) ATON.VRoadcast.focGroup.scale.set(s,s,s);
    //ATON.SUI.gPoints.scale.set(s,s,s);

    ATON.recomputeSceneBounds();

    // Relocate current POV accordingly
    let ds = (s / ATON._worldScale);

    ATON.Nav._currPOV.pos.x *= ds;
    ATON.Nav._currPOV.pos.y *= ds;
    ATON.Nav._currPOV.pos.z *= ds;
    ATON.Nav._currPOV.target.x *= ds;
    ATON.Nav._currPOV.target.y *= ds;
    ATON.Nav._currPOV.target.z *= ds;
    ATON.Nav.syncCurrCamera();

    if (ATON.XR._bPresenting) ATON.XR.setRefSpaceLocation(ATON.Nav._currPOV.pos);

    ATON._worldScale = s;
    console.log("World scale: "+s);
};

ATON.getWorldScaleLevel = ()=>{
    return ATON._ws;
};

ATON.getWorldScale = ()=>{
    return ATON._worldScale;
};

// Asset loading routines
ATON._assetReqNew = (url)=>{
    ATON._numReqLoad++;
    ATON.fireEvent("NodeRequestFired", url);
};

ATON._assetReqComplete = (url)=>{
    ATON.fireEvent("NodeRequestCompleted", url);
    ATON._numReqLoad--;

    if (ATON._numReqLoad <= 0) ATON._onAllReqsCompleted();
};

ATON._onAllReqsCompleted = ()=>{

    ATON.recomputeSceneBounds();

    //console.log(Utils.stats.numTris);

    ATON.getRootScene().assignLightProbesByProximity();
    //ATON.updateLightProbes();

    //ATON._bDirtyLP = true;

    ATON.fireEvent("AllNodeRequestsCompleted");

    ATON._postAllReqsCompleted();

    // FIXME: dirty
    setTimeout( ()=>{
        //if (c && ATON._mMainPano) ATON._mMainPano.position.copy(c);
        ATON.updateLightProbes();

        // Lazy shadows updates (performances)
        if (ATON._renderer.shadowMap.enabled && ATON._bShadowsFixedBound && ATON._aniMixers.length === 0){
            ATON._dMainL.shadow.autoUpdate = false;
            console.log("Lazy shadows");
        }
    }, 1000);
};

ATON._postAllReqsCompleted = (R)=>{
    if (R === undefined) R = ATON._rootVisible;

    for (let n in R.children){
        let N = R.children[n];

        if (N && N.toggle){
            ATON._postAllReqsCompleted(N);
            N.toggle(N.visible);

            //if (N.bPickable !== undefined) N.setPickable(N.bPickable);
        }
    }

    ThreeMeshUI.update();
};

ATON.recomputeSceneBounds = ( ubs )=>{
    //let BS = undefined;

    if (ubs){
        ATON.bounds.union( ubs );
        //console.log("custom BS")
    }
    else {
        ATON.bounds.center.copy( ATON._rootVisible.getBound().center );
        ATON.bounds.radius = ATON._rootVisible.getBound().radius;
        //console.log("BS")
    }
/*
    if (plist){
        BS = new THREE.Sphere();
        for (let p in plist) BS.expandByPoint( plist[p] );
        console.log(BS)
    }
*/
/*
    if (forcebs) BS = forcebs;
    else BS = ATON._rootVisible.getBound();

    ATON.bounds.center = BS.center;
    ATON.bounds.radius = BS.radius;
*/
    console.log(ATON.bounds);

    if (ATON.bounds.radius <= 0.0) return;

    // Shadows
    if (ATON._renderer.shadowMap.enabled){
        ATON._rootVisible.traverse((o) => {
            if (o.isMesh){
                o.castShadow = true;
                o.receiveShadow = true;
            }
        });

        ATON.adjustShadowsParamsFromSceneBounds();

        if (ATON._bShadowsFixedBound){
            ATON.updateDirShadows(/*c*/);
        }
    }

    // Auto-LP
    if (ATON._bAutoLP){
        if (ATON._lps[0] === undefined) ATON.addLightProbe( new ATON.LightProbe().setPosition(ATON.bounds.center).setNear(ATON.bounds.radius) );
        else {
            ATON._lps[0].setPosition(ATON.bounds.center).setNear(ATON.bounds.radius);
        }
        console.log("Auto LP");
    }

    if (ATON.FX.composer){
        // Estimate DOF aperture from bound radius
        ATON.FX.setDOFaperture( 1.0 / (ATON.bounds.radius * 30.0));
    }

    // re-center main pano
    if (ATON._mMainPano) ATON._mMainPano.position.copy(ATON.bounds.center);
};

/**
Register a node resource handler for a given extension
@param {string} ext - the file extension (e.g. "ifc")
@param {function} routine - handler consuming the resource url and ATON node argument hosting the final resource
@example
ATON.registerNodeResourceHandler("ifc", ( resurl, N )=>{
    // do stuff to load "resurl" into a THREE resource object
    N.add( resource );
});
*/
ATON.registerNodeResourceHandler = (ext, routine)=>{
    if (!ATON._resHandler) ATON._resHandler = {};

    ATON._resHandler[ext] = routine;
    console.log("Registered handler for extension: "+ext);
};


ATON.initGraphs = ()=>{
    // Global root
    ATON._mainRoot = new THREE.Scene();
    ATON._mainRoot.background = new THREE.Color( 0.7,0.7,0.7 );

    // Main scene-graph
    ATON._rootVisibleGlobal = new THREE.Scene(); // new THREE.Group();
    ATON._mainRoot.add(ATON._rootVisibleGlobal);

    ATON._rootVisible = ATON.createSceneNode().setAsRoot();
    ATON._rootVisibleGlobal.add(ATON._rootVisible);


    // semantics graph
    ATON._rootSem = ATON.createSemanticNode().setAsRoot();
    ATON._mainRoot.add(ATON._rootSem);

    // UI graph
    ATON._rootUI = ATON.createUINode().setAsRoot();
    //ATON._rootUI.renderOrder = 10;
    ATON._mainRoot.add(ATON._rootUI);

    // Uniform lighting
    ATON.ambLight = new THREE.AmbientLight( new THREE.Color(1,1,1) /*ATON._mainRoot.background*/ );
    //ATON.ambLight.intensity = 1.5;
    ATON._rootVisibleGlobal.add(ATON.ambLight);

    // Point light
    ATON.plight = new THREE.PointLight();
    ATON.plight.intensity = 0.0;
    ATON._rootVisibleGlobal.add(ATON.plight);

};

ATON.enablePointLight = ()=>{
    ATON.plight.intensity = 2.0;

    //if (pos) ATON.plight.position.copy(pos);
    //if (rad) ATON.plight.distance = rad;
};

ATON.disablePointLight = ()=>{
    ATON.plight.intensity = 0.0;
};

ATON.setBackgroundColor = (bg)=>{
    ATON._mainRoot.background = bg;
    //ATON.ambLight = new THREE.AmbientLight( bg );
};

// TODO:
ATON.setFog = (color, distance)=>{
    if (color === undefined) return;
    if (distance === undefined) distance = 200.0;

    ATON._rootVisibleGlobal.fog = new THREE.Fog( color, 1.0, distance );
    ATON.setBackgroundColor(color);
};

ATON.disableFog = ()=>{
    ATON._rootVisibleGlobal.fog = null;
};

/*
ATON.setOverrideMaterial = (mat)=>{
    if (mat === undefined) return;
    ATON._rootVisibleGlobal.overrideMaterial = mat;
}

ATON.removeOverrideMaterial = ()=>{
    ATON._rootVisibleGlobal.overrideMaterial = null;
};
*/

//==============================================================
// LightProbes (LPs)
//==============================================================
ATON.setAutoLP = (b)=>{
    ATON._bAutoLP = b;
};

ATON.setNeutralAmbientLight = (a)=>{
    ATON.ambLight.color = new THREE.Color( a,a,a );
};

/**
Add a LightProbe to the scene
@param {LightProbe} LP - the light probe being added 
*/
ATON.addLightProbe = (LP)=>{
    if (LP === undefined) return;

    ATON._lps.push(LP);

    ATON.setNeutralAmbientLight(0.0);

    // SUI
    if (ATON.SUI.gLPIcons === undefined) return;
    SUI.addLPIcon(LP);
};

ATON.getNumLightProbes = ()=>{
    return ATON._lps.length;
};

// Internal routine to update LPs
ATON._updLP = ()=>{
    for (let i in ATON._lps) ATON._lps[i].update();

/*
    // OLD: indirect LP based on first LP (for now)
    if (ATON._lps[0]){
        if (ATON._indLP) ATON._mainRoot.remove(ATON._indLP);

        ATON._indLP = THREE.LightProbeGenerator.fromCubeRenderTarget( ATON._renderer, ATON._lps[0]._prevCCtarget );
        ATON._indLP.intensity = 1.0;

        ATON._mainRoot.add( ATON._indLP );
    }
*/

    ATON._rootVisible.traverse((o) => {
        let LP = o.userData.LP;
        if (LP !== undefined && LP instanceof ATON.LightProbe){
            o.material.envMap  = LP.getEnvTex();
            //o.material.combine = THREE.AddOperation;
            o.material.envMapIntensity = ATON._envMapInt;
            o.material.needsUpdate     = true;
            //console.log(LP)
        }
    });
}

/**
Set the number of LightProbes bounces
@param {number} n - num bounces (default 2)
*/
ATON.setLightProbesNumBounces = (n)=>{
    if (n < 1) return;
    ATON._numLPbounces = n;
};

ATON.dirtyLightProbes = (n)=>{
    if (n === undefined) n = ATON._numLPbounces;
    ATON._lpbCount = n;
};

/**
Update all LightProbes in the scene
*/
ATON.updateLightProbes = ()=>{
    if (ATON.XR._bPresenting) return; // CHECK
    if (ATON._lps.length === 0) return;

    for (let p=0; p<ATON._numLPbounces; p++) ATON._updLP(); // multi-bounce LP captures
    //ATON._updLP();

    console.log("LPs updated.");
};

//==============================================================
// Environment
//==============================================================

/**
Set the main panorama (360)
@param {string} path - url to equirectangular image
@example
ATON.setMainPanorama("my/pano.jpg");
*/
ATON.setMainPanorama = (path)=>{
    let tpano = undefined;

    path = ATON.Utils.resolveCollectionURL(path);

    // Geometry
    if (ATON._mMainPano === undefined){
        ATON._gMainPano = new THREE.SphereBufferGeometry( /*ATON.Nav.STD_FAR * 0.8*/1.0, 60,60 );
        //ATON._gMainPano = new THREE.SphereGeometry( ATON.Nav.STD_FAR * 0.8, 60,60 );
        
        ATON._gMainPano.castShadow    = false;
        ATON._gMainPano.receiveShadow = false;

        ATON._mMainPano = new THREE.Mesh(ATON._gMainPano, ATON._matMainPano);
        ATON._mMainPano.frustumCulled = false;
        ATON._mMainPano.renderOrder = -100;

        ATON._mMainPano.layers.disable(ATON.NTYPES.SCENE);
        ATON._mMainPano.layers.disable(ATON.NTYPES.SEM);
        ATON._mMainPano.layers.disable(ATON.NTYPES.UI);
        
        ATON.setMainPanoramaRadius(ATON.Nav.STD_FAR * 0.8);
        ///ATON.setMainPanoramaRadius(100.0);
    }

    // Panoramic Video
    if (ATON.Utils.isVideo(path)){
        // First time
        if (ATON._elPanoVideo === undefined){
  
            let htvid = "<video id='idPanoVideo' loop crossOrigin='anonymous' playsinline style='display:none'>";          
            if (path.endsWith("mp4"))  htvid += "<source src='"+path+"' type='video/mp4'>";   // ; codecs='avc1.42E01E, mp4a.40.2'
            if (path.endsWith("webm")) htvid += "<source src='"+path+"' type='video/webm'>";
            htvid += "</video>";

            $(htvid).appendTo('body');

            ATON._elPanoVideo = document.getElementById("idPanoVideo");
/*
            ATON._elPanoVideo = document.createElement('video');

            ATON._elPanoVideo.id = "idPanoVideo";
            ATON._elPanoVideo.innerHTML = "<source src='"+path+"'>";
            ATON._elPanoVideo.crossOrigin = "anonymous";
            ATON._elPanoVideo.loop = true;
            ATON._elPanoVideo.playsinline = true;
            ATON._elPanoVideo.style.cssText = "display:none;";
            ATON._elPanoVideo.style = "display:none;";
            //ATON._elPanoVideo.src = path;

            //ATON._elPanoVideo.autoplay = "autoplay";
            //ATON._elPanoVideo.muted = true;

            //ATON._elPanoVideo.play();
*/
            ATON._elPanoVideo.onplaying = ()=>{
                console.log("VideoPano playing");
                ATON._vpanoPlaying = true;
            };

            ATON._elPanoVideo.onpause = ()=>{
                console.log("VideoPano paused");
                ATON._vpanoPlaying = false;
            };

            ATON._elPanoVideo.addEventListener('touchstart', function () {
                ATON._elPanoVideo.play();
            });

            // CHECK: tweak required for Apple
            enableInlineVideo(ATON._elPanoVideo);
        }

        tpano = new THREE.VideoTexture( ATON._elPanoVideo );
        tpano.encoding = ATON._stdEncoding;
        
        //tpano.minFilter = THREE.NearestFilter;
		//tpano.generateMipmaps = false;
        //console.log(ATON._elPanoVideo);

        ATON._realizeOrUpdateMainPano(tpano);
        ATON.fireEvent("MainPanoVideo");
    }
    // Static Panorama
    else {
        if (path.endsWith(".hdr")){
            new THREE.RGBELoader().load(path, (hdr)=>{ //setDataType( THREE.UnsignedByteType )
                //hdr.generateMipmaps = true;
                hdr.minFilter = THREE.LinearMipmapLinearFilter;
                hdr.magFilter = THREE.LinearFilter;
                hdr.encoding  = ATON._stdEncoding;

                ATON._realizeOrUpdateMainPano(hdr);
                ATON.fireEvent("MainPanoHDR");
            });

            return;
        }

        if (path.endsWith(".exr")){
            new THREE.EXRLoader().load(path, (exr)=>{ // .setDataType( THREE.UnsignedByteType )
                //exr.generateMipmaps = true;
                exr.minFilter = THREE.LinearMipmapLinearFilter;
                exr.magFilter = THREE.LinearFilter;
                exr.encoding  = ATON._stdEncoding;

                ATON._realizeOrUpdateMainPano(exr);
                ATON.fireEvent("MainPanoHDR");
            });

            return;
        }

        ATON.Utils.textureLoader.load(path, (tex)=>{
            tex.encoding = ATON._stdEncoding;
/*
            tex.mapping = THREE.EquirectangularReflectionMapping;
            ATON._mainRoot.background  = tex;
            ATON._mainRoot.environment = tex;
*/

            //tex.minFilter = THREE.NearestFilter;
		    tex.generateMipmaps = true;

            ATON._realizeOrUpdateMainPano(tex);
            ATON.fireEvent("MainPano");
        });

    }
};

/**
Play main videopanorama (if any loaded)
@example
ATON.playMainPanorama();
*/
ATON.playMainPanorama = ()=>{
    if (!ATON._elPanoVideo) return;
    if (ATON._vpanoPlaying) return;

    ATON._elPanoVideo.play();
}

/**
Pause main videopanorama (if any loaded)
@example
ATON.pauseMainPanorama();
*/
ATON.pauseMainPanorama = ()=>{
    if (!ATON._elPanoVideo) return;
    if (!ATON._vpanoPlaying) return;
    
    ATON._elPanoVideo.pause();
}

/**
Play or pause main videopanorama (if any loaded)
@example
ATON.playOrPauseMainPanorama();
*/
ATON.playOrPauseMainPanorama = ()=>{
    if (!ATON._elPanoVideo) return;

    if (ATON._vpanoPlaying) ATON._elPanoVideo.pause();
    else ATON._elPanoVideo.play();
}

/**
Stop and remove main videopanorama (if any)
@example
ATON.stopAndRemoveMainPanorama();
*/
ATON.stopAndRemoveMainPanorama = ()=>{
    if (!ATON._elPanoVideo) return;
    if (ATON._vpanoPlaying) ATON._elPanoVideo.pause();

    ATON._elPanoVideo.remove();
    ATON._elPanoVideo  = undefined;
    
    ATON._vpanoPlaying = false;
}

ATON._realizeOrUpdateMainPano = (tpano)=>{
    // We already created a main pano
    if (ATON._matMainPano !== undefined){
        ATON._matMainPano.map = tpano;
        //ATON._matMainPano.emissive = tpano;

        ATON.updateLightProbes();
        return;
    }

    ATON._matMainPano = new THREE.MeshBasicMaterial({ 
        map: tpano,
        ///emissive: tpano,
        //fog: false,
        
        depthTest: false,
        depthWrite: false,
        
        ///depthFunc: THREE.AlwaysDepth,
        //side: THREE.BackSide, // THREE.DoubleSide
        //side: THREE.DoubleSide
    });

    ATON._mMainPano.material = ATON._matMainPano;

/*
    ATON._mMainPano = new THREE.Mesh(ATON._gMainPano, ATON._matMainPano);
    ATON._mMainPano.frustumCulled = false;
    ATON._mMainPano.renderOrder = -100;
    
    ATON.setMainPanoramaRadius(ATON.Nav.STD_FAR * 0.8);
    ///ATON.setMainPanoramaRadius(100.0);
*/
    // FIXME: dirty, find another way
    if (ATON._bMainPanoInfinite){
        ATON._mMainPano.onAfterRender = ()=>{
            //if (ATON._numReqLoad > 0) return;
            if (ATON.Nav._currPOV) ATON._mMainPano.position.copy(ATON.Nav._currPOV.pos);
        };
    }

    ATON._rootVisibleGlobal.add(ATON._mMainPano);
    
    ATON.updateLightProbes();
};


ATON.setMainPanoramaRadius = (r)=>{
    if (ATON._gMainPano === undefined) return;
    ATON._gMainPano.scale( -r,r,r );
};

/**
Set main panorama rotation (radians) around up vector
@param {number} r - rotation
@example
ATON.setMainPanoramaRotation(1.5);
*/
ATON.setMainPanoramaRotation = (r)=>{
    if (ATON._mMainPano === undefined) return;
    ATON._mMainPano.rotation.set( 0,r,0 );
};

/**
Enable or disable main panorama infinite distance
@param {boolean} b
@example
ATON.setMainPanoramaInfinite(false);
*/
ATON.setMainPanoramaInfinite = (b)=>{
    ATON._bMainPanoInfinite = b;

    if (ATON._mMainPano === undefined) return;

    if (b){
        ATON._mMainPano.onAfterRender = ()=>{
            //if (ATON._numReqLoad > 0) return;
            if (ATON.Nav._currPOV) ATON._mMainPano.position.copy(ATON.Nav._currPOV.pos);
        };
    }
    else {
        ATON._mMainPano.onAfterRender = undefined;
    }
};

ATON.setMainPanoramaLocation = (c)=>{
    if (ATON._bMainPanoInfinite) return;
    if (ATON._mMainPano === undefined) return;

    ATON._mMainPano.position.copy(c);    
};

/**
Set and activate main directional light
@param {THREE.Vector3} v - light direction
@example
ATON.setMainLightDirection( new THREE.Vector(0.1,-1.0,0.0) );
*/
ATON.setMainLightDirection = (v)=>{

    let d = v.clone();
    d.normalize();

    d.x *= ATON.SHADOWS_FAR * 0.5;
    d.y *= ATON.SHADOWS_FAR * 0.5;
    d.z *= ATON.SHADOWS_FAR * 0.5;

    if (ATON._dMainL === undefined){
        ATON._dMainL = new THREE.DirectionalLight( new THREE.Color(1,1,1), 1.0 );
        ATON._dMainL.castShadow = false;

        ATON._dMainLtgt = new THREE.Object3D();
        ATON._rootVisibleGlobal.add(ATON._dMainLtgt);
        ATON._dMainL.target = ATON._dMainLtgt;

        ATON._rootVisibleGlobal.add(ATON._dMainL);
        ATON._dMainLpos = new THREE.Vector3();
    }

    ATON._dMainLdir = d;

    ATON._dMainL.position.set(-d.x,-d.y,-d.z);

    if (ATON._renderer.shadowMap.enabled) ATON._dMainL.shadow.needsUpdate = true;

    ATON.toggleMainLight(true);
};

ATON.getMainLightDirection = ()=>{
    if (ATON._dMainLdir === undefined) return undefined;

    let ld = ATON._dMainLdir.clone();
    ld.normalize();
    return ld;
};

ATON.toggleMainLight = (b)=>{
    if (ATON._dMainL === undefined) return;
    ATON._dMainL.visible = b;

    let numLPs = ATON._lps.length;
    
    if (b){
        if (numLPs > 0) ATON.setNeutralAmbientLight(0.0);
        else ATON.setNeutralAmbientLight(ATON.AMB_L);
        
        ATON.updateDirShadows();
    }
    else {
        if (numLPs > 0) ATON.setNeutralAmbientLight(0.0);
        ATON.setNeutralAmbientLight(1.0);
    }
};

ATON.isMainLightEnabled = ()=>{
    if (ATON._dMainL === undefined) return false;
    if (!ATON._dMainL.visible) return false;

    return true;
};

ATON.setExposure = (d)=>{
    ATON._renderer.toneMappingExposure = d;
    //ATON.updateLightProbes();
};
ATON.getExposure = ()=>{
    return ATON._renderer.toneMappingExposure;
};

// Shadows
// Smart adjustment of shadows params
ATON.adjustShadowsParamsFromSceneBounds = ()=>{
    if (ATON._dMainL === undefined) return;

    let r = ATON._rootVisible.getBound().radius;
    let c = ATON._rootVisible.getBound().center;
    
    if (r <= 0.0 || r >= ATON.SHADOWS_SIZE){
        ATON._bShadowsFixedBound = false;
        ATON._shadowsSize = ATON.SHADOWS_SIZE;
        //ATON._shadowsNear = ATON.SHADOWS_NEAR;
        //ATON._shadowsFar  = ATON.SHADOWS_FAR;
    }
    else {
        ATON._bShadowsFixedBound = true;
        ATON._shadowsFixedBoundCenter = c;
        ATON._shadowsSize = r * 1.5;

        //console.log(ATON._shadowsNear,ATON._shadowsFar);
    }

    // must dispose when changing shadow params
    if (ATON._dMainL.shadow.map){
        ATON._dMainL.shadow.map.dispose();
        ATON._dMainL.shadow.map = null;
    }

    //console.log(ATON._dMainL.shadow.camera);

    ATON._dMainL.shadow.camera.left   = -ATON._shadowsSize;
    ATON._dMainL.shadow.camera.right  = ATON._shadowsSize;
    ATON._dMainL.shadow.camera.bottom = -ATON._shadowsSize;
    ATON._dMainL.shadow.camera.top    = ATON._shadowsSize;

    ATON._dMainL.shadow.mapSize.width  = ATON._shadowsRes;
    ATON._dMainL.shadow.mapSize.height = ATON._shadowsRes;
    ATON._dMainL.shadow.camera.near    = ATON._shadowsNear;
    ATON._dMainL.shadow.camera.far     = ATON._shadowsFar;

    //ATON._dMainL.shadow.camera.updateProjectionMatrix();

    let shb = -(r * 0.0002);
    if (shb < -0.001) shb = -0.001; // -0.0005
    ATON._dMainL.shadow.bias = shb;

    //ATON._dMainL.shadow.normalBias = 0.05;
    //ATON._dMainL.shadow.radius = 8;
};


ATON.toggleShadows = (b)=>{
    if (ATON._dMainL === undefined) return;

    if (b){
        if (ATON.XR.isPresenting()) return; // do not enable for XR
        if (ATON.device.lowGPU) return; // do not enable on low-profile devices

        ATON._dMainL.castShadow = true;
        ATON._renderer.shadowMap.enabled = true;

        if (ATON.device.isMobile) ATON._renderer.shadowMap.type = THREE.PCFShadowMap;
        else ATON._renderer.shadowMap.type = THREE.PCFSoftShadowMap; // THREE.VSMShadowMap; 

        //ATON._renderer.shadowMap.type    = THREE.BasicShadowMap;
        //ATON._renderer.shadowMap.type    = THREE.PCFShadowMap;
        //ATON._renderer.shadowMap.type    = THREE.PCFSoftShadowMap; //
        //ATON._renderer.shadowMap.type    = THREE.VSMShadowMap;

        ATON._rootVisible.traverse((o) => {
            if (o.isMesh){
                o.castShadow = true;
                o.receiveShadow = true;
            }
        });

        ATON.adjustShadowsParamsFromSceneBounds();

        ATON.updateDirShadows();

        ATON._dMainL.shadow.needsUpdate = true;

        console.log("Shadows ON");
    }
    else {
        ATON._dMainL.castShadow = false;
        ATON._renderer.shadowMap.enabled = false;
        console.log("Shadows OFF");
    }
};

ATON.updateDirShadows = (/*p*/)=>{
    if (ATON._dMainLdir === undefined) return;
    if (ATON._dMainLpos === undefined) return;

    let p = ATON._shadowsFixedBoundCenter;

    if (p === undefined){
        p = ATON.Nav.getCurrentEyeLocation();

        ATON._dMainLpos.x = p.x + (ATON.Nav._vDir.x * ATON._shadowsSize);
        ATON._dMainLpos.y = p.y + (ATON.Nav._vDir.y * ATON._shadowsSize);
        ATON._dMainLpos.z = p.z + (ATON.Nav._vDir.z * ATON._shadowsSize);
    }
    else {
        ATON._dMainLpos.x = p.x;
        ATON._dMainLpos.y = p.y;
        ATON._dMainLpos.z = p.z;
    }

    ATON._dMainL.position.set(
        ATON._dMainLpos.x - ATON._dMainLdir.x, 
        ATON._dMainLpos.y - ATON._dMainLdir.y, 
        ATON._dMainLpos.z - ATON._dMainLdir.z
    );

    ATON._dMainLtgt.position.copy(ATON._dMainLpos);
};

ATON._updateEnvironment = ()=>{
    if (!ATON._renderer.shadowMap.enabled) return;
    if (ATON._bShadowsFixedBound) return;

    ATON.updateDirShadows();
};

// main audio
ATON.setGlobalAudio = (audioURL, bLoop)=>{
    if (audioURL === undefined) return;
    if (bLoop === undefined) bLoop = true;

    audioURL = ATON.Utils.resolveCollectionURL(audioURL);

    if (ATON._auMain === undefined || ATON._auMain === null) ATON._auMain = new THREE.Audio( ATON.AudioHub._listener );
    else if (ATON._auMain.isPlaying) ATON._auMain.stop();

    ATON.AudioHub._loader.load( audioURL, (buffer)=>{
        ATON._auMain.setBuffer( buffer );
        ATON._auMain.setLoop( bLoop );
        //ATON._auMain.setVolume( 2.0 );
        //A._auTalk.setPlaybackRate(0.9);
        ATON._auMain.play();
    });
};

// FPS monitoring
ATON._markFPS = ()=>{
    if (ATON._numReqLoad > 0) return;
    if (ATON._dt < 0.0) return;

    ATON._dtCount += 1.0;
    ATON._dtAccum += ATON._dt;

    if (ATON._dtAccum < 1.0) return; // 1s mark

    ATON._fps = 1.0 / (ATON._dtAccum / ATON._dtCount);

    ATON._dtCount = 0.0;
    ATON._dtAccum = 0.0;

    // Handle dynamic render profiles
    ATON._handleDynamicRenderProfiles();
};

/**
Enable or disable dynamic density for renderer
@param {function} b - bool
*/
ATON.toggleAdaptiveDensity = (b)=>{
    ATON._bAdaptiveDensity = b;
};

/**
Set dynamic rendering FPS budgets. Default values are 20 and 55
@param {number} minBudget - the lower bound to trigger a lower rendering profile
@param {number} maxBudget - the upper bound to trigger a higher rendering profile
*/
ATON.setDynamicRenderingFPS = (minBudget, maxBudget)=>{
    if (minBudget >= maxBudget) return;

    if (minBudget) ATON._dRenderBudgetMinFPS = minBudget;
    if (maxBudget) ATON._dRenderBudgetMaxFPS = maxBudget;
};

// Dynamic Render Profiles
ATON._handleDynamicRenderProfiles = ()=>{
    let d = ATON._renderer.getPixelRatio();

    // We need lower RP
    if (ATON._fps < ATON._dRenderBudgetMinFPS){

        if (ATON._bAdaptiveDensity && !ATON.XR._bPresenting){ // Dynamic density
            d -= 0.1;
            if (d >= ATON._adMin){
                ATON._renderer.setPixelRatio( d );

                // change res to each pass
                //ATON.updateFXPassesResolution(d);
                if (ATON.FX.composer) ATON.FX.composer.setPixelRatio(d);

                console.log("Density: "+d.toPrecision(2));
            }
        }
/*
        if (ATON.XR._bPresenting){
            let et = ATON.MRes.getTSetsErrorTarget();
            et += 1.0;
            ATON.MRes.setTSetsErrorTarget(et);
        }
*/
        //ATON.toggleShadows(false);

        ATON.fireEvent("RequestLowerRender");
        //console.log("Need lower render profile");
    }

    // Can go higher RP
    if (ATON._fps > ATON._dRenderBudgetMaxFPS){

        if (ATON._bAdaptiveDensity && !ATON.XR._bPresenting){ // Dynamic density
            d += 0.1;
            if (d <= ATON._adMax){
                ATON._renderer.setPixelRatio( d );

                // change res to each pass
                //ATON.updateFXPassesResolution(d);
                if (ATON.FX.composer) ATON.FX.composer.setPixelRatio(d);

                console.log("Density: "+d.toPrecision(2));
            }
        }
/*
        if (ATON.XR._bPresenting){
            let et = ATON.MRes.getTSetsErrorTarget();
            et -= 1.0;
            if (et > 1.0) ATON.MRes.setTSetsErrorTarget(et);
        }
*/
        ATON.fireEvent("RequestHigherRender");
        //console.log("Can request higher render profile");
    }
/*
    ATON._ddC++;
    ATON._ddEST += d;
    console.log(ATON._ddEST / ATON._ddC);
*/
};

//==============================================================
// Update routines
//==============================================================
ATON._onFrame = ()=>{
    // TODO: add pause render

    ATON._dt = ATON._clock.getDelta();
    //ATON._fps = (1.0 / ATON._dt);
    
    ATON._markFPS();

    //ATON.fireEvent("preframe");

    // Render
    //ATON._renderer.render( ATON._mainRoot, ATON.Nav._camera );


    if (ATON.XR._bPresenting) ATON.XR.update();
    else ATON.Nav._controls.update(ATON._dt);

    // Spatial queries
    ATON._handleQueries(); // k

    // Navigation system
    ATON.Nav.update(); // k

    // VRoadcast
    ATON.VRoadcast.update();

    // SUI
    ATON.SUI.update(); // k

    // Mat
    ATON.MatHub.update(); // k

    // Environment/lighting
    ATON._updateEnvironment();

    // 3D models animations
    ATON._updateAniMixers();

    ATON._updateRoutines();

    // Multi-res
    ATON.MRes.update();

    // XPF
    ATON.XPFNetwork.update();


    // Render frame
    ATON._render();

/*
    if (ATON._lpbCount > 0){
        ATON.updateLightProbes();
        ATON._lpbCount--;
    }
*/
    //ATON.fireEvent("frame");
};

// Render frame
ATON._render = ()=>{
    if ( !ATON.FX.composer || ATON.XR._bPresenting)
        ATON._renderer.render( ATON._mainRoot, ATON.Nav._camera );
    else {
        //if (ATON.Nav._bInteracting) ATON.FX.togglePass(ATON.FX.PASS_AA, false);
        //else ATON.FX.togglePass(ATON.FX.PASS_AA, true);

        ATON.FX.composer.render();
    }
};

/**
Add an update routine (continuosly executed)
@param {function} U - function
*/
ATON.addUpdateRoutine = (U)=>{
    if (U === undefined) return;
    ATON._updRoutines.push(U);
};

/**
Removes all update routines
*/
ATON.deleteAllUpdateRoutines = ()=>{
    ATON._updRoutines = [];
};

ATON._updateRoutines = ()=>{
    let n = ATON._updRoutines.length;
    if (n <= 0) return;

    for (let u=0; u<n; u++) ATON._updRoutines[u]();
};


// Animations
ATON._updateAniMixers = ()=>{
    let num = ATON._aniMixers.length;
    if (num < 1) return;

    for (let m=0; m<num; m++){
        let M = ATON._aniMixers[m];
        M.update( ATON._dt );
        //console.log(M);
    }
};

ATON._updateScreenMove = (e)=>{
    if (e.preventDefault) e.preventDefault();

    if (ATON._bCenteredQuery) return;

/*
    if (ATON.Nav._mode === ATON.Nav.MODE_DEVORI){
        ATON._screenPointerCoords.x = 0.0;
        ATON._screenPointerCoords.y = 0.0;
        return;
    }
*/
	ATON._screenPointerCoords.x = ( e.clientX / window.innerWidth ) * 2 - 1;
	ATON._screenPointerCoords.y = -( e.clientY / window.innerHeight ) * 2 + 1;

    //console.log(ATON._screenPointerCoords);
};

ATON.toggleCenteredQuery = (b)=>{
    ATON._bCenteredQuery = b;
    
    if (b){
        ATON._screenPointerCoords.x = 0.0;
        ATON._screenPointerCoords.y = 0.0;
    }
};

//==============================================================
// Query rountines
//==============================================================

/**
Enable or disable queries
@param {boolean} b
*/
ATON.toggleQueries = (b)=>{
    ATON._bq = b;
};

ATON._registerRCS = ()=>{
    ATON._rcRR = 0;
    ATON._rcHandlers = [];

    ATON._rcHandlers.push( ATON._handleQueryScene );
    ATON._rcHandlers.push( ATON._handleQuerySemantics );
    ATON._rcHandlers.push( ATON._handleQueryUI );
};

ATON._handleQueries = ()=>{
    // NOT USED
    //ATON._qSync = (ATON._qSync + 1) % ATON._qSyncInt;
    //if (ATON._qSync !== 0) return;

    if (!ATON._bq) return;
    if (ATON._bPauseQuery) return;
    if (ATON.Nav._bInteracting) return;
    if (ATON._numReqLoad > 0) return;

    if (ATON.Nav.isTransitioning()) return; // do not query during POV transitions
    //if (ATON.device.isMobile || !ATON.XR.isPresenting()) return; 

    // interleaving mode
    //ATON._rcHandlers[ATON._rcRR]();
    //ATON._rcRR = (ATON._rcRR+1) % 3;

    ATON._handleQueryUI();

    if (ATON._bqScene) ATON._handleQueryScene();
    if (ATON._bqSem) ATON._handleQuerySemantics();
    
    //ATON._handleQueryUI();

    if (ATON.Nav._bLocValidator) ATON.Nav.locomotionValidator();

    // Timed gaze input
    if (ATON._tgiDur === undefined) return;
    if (ATON._tHover === undefined) return;
    //console.log(ATON._tHover);

    const d = ATON._clock.elapsedTime - ATON._tHover;
    if (d >= ATON._tgiDur){
        ATON._stdActivation();

        ATON._tHover = undefined;
        ATON._tgiPer = undefined;
    }
    else ATON._tgiPer = (d/ATON._tgiDur);

};

// Ray casting visible scenegraph
ATON._handleQueryScene = ()=>{
    if (ATON.XR.isPresenting()){
        ATON.XR.setupQueryRay(ATON._rcScene);
    }
    else 
        ATON._rcScene.setFromCamera( ATON._screenPointerCoords, ATON.Nav._camera );

    ATON._hitsScene = [];
    //ATON._rcScene.intersectObjects( ATON._rootVisible.children, true, ATON._hitsScene );
    ATON._rcScene.intersectObjects( ATON._mainRoot.children, true, ATON._hitsScene );

    //ATON._hitsOperator(ATON._hits);

    // Process hits
    const hitsnum = ATON._hitsScene.length;
    if (hitsnum <= 0){
        ATON._queryDataScene = undefined;
        return;
    }

    const h = ATON._hitsScene[0];

    ATON._queryDataScene = {};
    ATON._queryDataScene.p  = h.point;
    ATON._queryDataScene.d  = h.distance;
    ATON._queryDataScene.o  = h.object;
    ATON._queryDataScene.uv = h.uv;
    
    //console.log(ATON._queryDataScene.uv);

    // Normals
    if (!ATON._bQueryNormals) return;
    if (!h.face) return;
    if (!h.face.normal) return;

    ATON._queryDataScene.matrixWorld = new THREE.Matrix3().getNormalMatrix( h.object.matrixWorld );
    ATON._queryDataScene.n = h.face.normal.clone().applyMatrix3( ATON._queryDataScene.matrixWorld ).normalize();
};

/**
Get location of current focal point, taking into account a small surface offset
If no surface is actually queried, return undefined
@returns {THREE.Vector3}
@example
let fp = ATON.getSceneFocalPoint()
*/
ATON.getSceneFocalPoint = ()=>{
    if (ATON._queryDataScene === undefined) return undefined;

    let p = ATON._queryDataScene.p;
    //let d = ATON._queryDataScene.d;

    let FP = new THREE.Vector3();
    FP.lerpVectors(p, ATON.Nav._currPOV.pos, 0.02); // Apply small offset wrt current eye location

    return FP;
};

/**
Get location of current queried point (if any) on visible scene.
If no point is queried, return undefined
@returns {THREE.Vector3}
@example
let p = ATON.getSceneQueriedPoint()
*/
ATON.getSceneQueriedPoint = ()=>{
    if (ATON._queryDataScene === undefined) return undefined;
    return ATON._queryDataScene.p;
};

/**
Get distance to queried location (if any) on visible scene.
If no point is queried, return undefined
@returns {number}
@example
let d = ATON.getSceneQueriedDistance()
*/
ATON.getSceneQueriedDistance = ()=>{
    if (ATON._queryDataScene === undefined) return undefined;
    return ATON._queryDataScene.d;
};

/**
Get queried location normal (if any) on visible scene.
If no point is queried, return undefined
@returns {THREE.Vector3}
@example
let n = ATON.getSceneQueriedNormal()
*/
ATON.getSceneQueriedNormal = ()=>{
    if (ATON._queryDataScene === undefined) return undefined;
    return ATON._queryDataScene.n;
};

/**
Set query range
@param {number} near - near distance (default: 0.0)
@param {number} far - far distance (default: Infinity) 
@param {number} type - type of query (ATON.NTYPES.SCENE, ATON.NTYPES.SEM). If undefined, all ray casters are set
@example
ATON.setQueryRange(0.0,3.0, ATON.NTYPES.SCENE);
*/
ATON.setQueryRange = (near, far, type)=>{
    if (type === undefined || type === ATON.NTYPES.SCENE){
        ATON._rcScene.near = near;
        ATON._rcScene.far  = far;
    }
    if (type === undefined || type === ATON.NTYPES.SEM){
        ATON._rcSemantics.near = near;
        ATON._rcSemantics.far  = far;
    }
};

// Ray casting semantic-graph
ATON._handleQuerySemantics = ()=>{
    if (ATON.XR.isPresenting()){
        ATON.XR.setupQueryRay(ATON._rcSemantics);
    }
    else 
        ATON._rcSemantics.setFromCamera( ATON._screenPointerCoords, ATON.Nav._camera );

    ATON._hitsSem = [];
    ATON._rcSemantics.intersectObjects( ATON._mainRoot.children, true, ATON._hitsSem );

    //console.log(ATON._hitsSem);

    // Process hits
    const hitsnum = ATON._hitsSem.length;
    if (hitsnum <= 0){
        ATON._queryDataSem = undefined;

        if (ATON._hoveredSemNode){
            ATON.fireEvent("SemanticNodeLeave", ATON._hoveredSemNode);
            let S = ATON.getSemanticNode(ATON._hoveredSemNode);
            if (S && S.onLeave) S.onLeave();
        }
        
        ATON._hoveredSemNode = undefined;
        ATON._tHover = undefined;
        return;
    }

    const h = ATON._hitsSem[0];

    // Occlusion
    if (ATON._bQuerySemOcclusion && ATON._queryDataScene){
        if (ATON._queryDataScene.d < h.distance){

            ATON._queryDataSem = undefined;

            if (ATON._hoveredSemNode){
                ATON.fireEvent("SemanticNodeLeave", ATON._hoveredSemNode);
                let S = ATON.getSemanticNode(ATON._hoveredSemNode);
                if (S && S.onLeave) S.onLeave();
            }

            ATON._hoveredSemNode = undefined;
            ATON._tHover = undefined;
            return;
        }
    }

    ATON._queryDataSem = {};
    ATON._queryDataSem.p = h.point;
    ATON._queryDataSem.d = h.distance;
    ATON._queryDataSem.o = h.object;
    ATON._queryDataSem.list = []; // holds sem-nodes parental list

    // traverse parents
    const L = ATON._queryDataSem.list;
    let sp = h.object.parent;
    while (sp){
        if (sp.nid && sp.nid !== ATON.ROOT_NID) L.push(sp.nid);
        sp = sp.parent;
    }

    const hsn = L[0];
    if (hsn){
        if (ATON._hoveredSemNode !== hsn){
            if (ATON._hoveredSemNode){
                ATON.fireEvent("SemanticNodeLeave", ATON._hoveredSemNode);
                let S = ATON.getSemanticNode(ATON._hoveredSemNode);
                if (S && S.onLeave) S.onLeave();
                
                ATON._tHover = undefined;
            }

            ATON._hoveredSemNode = hsn;
            ATON.fireEvent("SemanticNodeHover", hsn);
            let S = ATON.getSemanticNode(hsn);
            if (S && S.onHover) S.onHover();

            ATON._tHover = ATON._clock.elapsedTime;
        }
    }

    //console.log(L);
};

ATON._handleQueryUI = ()=>{
    if (ATON.XR.isPresenting()){
        ATON.XR.setupQueryRay(ATON._rcUI);
    }
    else 
        ATON._rcUI.setFromCamera( ATON._screenPointerCoords, ATON.Nav._camera );

    ATON._hitsUI = [];
    ATON._rcUI.intersectObjects( ATON._mainRoot.children, true, ATON._hitsUI );

    // Process hits
    const hitsnum = ATON._hitsUI.length;
    if (hitsnum <= 0){
        ATON._queryDataUI = undefined;

        if (ATON._hoveredUI){
            ATON.fireEvent("UINodeLeave", ATON._hoveredUI);
            const S = ATON.getUINode(ATON._hoveredUI);
            if (S && S.onLeave) S.onLeave();
        }
        
        ATON._hoveredUI = undefined;
        ATON._tHover = undefined;
        return;
    }

    const h = ATON._hitsUI[0];

    // Occlusion
    if (ATON._queryDataScene){
        if (ATON._queryDataScene.d < h.distance){

            ATON._queryDataUI = undefined;

            if (ATON._hoveredUI){
                ATON.fireEvent("UINodeLeave", ATON._hoveredUI);
                const S = ATON.getUINode(ATON._hoveredUI);
                if (S && S.onLeave) S.onLeave();
            }

            ATON._hoveredUI = undefined;
            ATON._tHover = undefined;
            return;
        }
    }

    ATON._queryDataUI = {};
    ATON._queryDataUI.p = h.point;
    ATON._queryDataUI.d = h.distance;
    ATON._queryDataUI.o = h.object;
    ATON._queryDataUI.list = []; // holds ui-nodes parental list

    // traverse parents
    const L = ATON._queryDataUI.list;
    let sp = h.object.parent;
    while (sp){
        if (sp.nid && sp.nid !== ATON.ROOT_NID) L.push(sp.nid);
        sp = sp.parent;
    }

    const hui = L[0];
    if (hui){
        if (ATON._hoveredUI !== hui){
            if (ATON._hoveredUI){
                ATON.fireEvent("UINodeLeave", ATON._hoveredUI);
                const S = ATON.getUINode(ATON._hoveredUI);
                if (S && S.onLeave) S.onLeave();
                
                ATON._tHover = undefined;
            }

            ATON._hoveredUI = hui;
            ATON.fireEvent("UINodeHover", hui);
            const S = ATON.getUINode(hui);
            if (S && S.onHover) S.onHover();

            ATON._tHover = ATON._clock.elapsedTime;
        }
    }
};

/**
Get currently hovered semantic node (if any)
@returns {Node}
*/
ATON.getHoveredSemanticNode = ()=>{
    if (ATON._hoveredSemNode === undefined) return undefined;

    let S = ATON.getSemanticNode(ATON._hoveredSemNode);
    return S;
};

// Tokens for external API/services
//=============================================
ATON.setAPIToken = (servicename, tok)=>{
    //ATON._extAPItokens[servicename] = tok;
    window.sessionStorage.setItem("ATON.tokens."+servicename, tok);
};

ATON.getAPIToken = (servicename)=>{
    let tok = window.sessionStorage.getItem("ATON.tokens."+servicename);
    return tok;
};

ATON.clearToken = (servicename)=>{
    window.sessionStorage.removeItem("ATON.tokens."+servicename);
};

/*
    Built-in gizmos
================================================*/
ATON.useGizmo = (b)=>{
    ATON._bGizmo = b;

    ATON._setupGizmo();
};

ATON._setupGizmo = ()=>{
    if (!ATON._bGizmo){
        if (ATON._gizmo) ATON._gizmo.detach();
        return;
    }

    if (ATON.Nav._camera === undefined) return;
    if (ATON._renderer === undefined) return;

    if (ATON._gizmo === undefined){
        ATON._gizmo = new THREE.TransformControls( ATON.Nav._camera, ATON._renderer.domElement );
        ATON._rootUI.add(ATON._gizmo);

        ATON._gizmo.setMode("rotate");

        ATON._gizmo.addEventListener('dragging-changed', function( event ){
            let bDrag = event.value;

            ATON.Nav.setUserControl(!bDrag);
            ATON._bPauseQuery = bDrag;

            if (!bDrag){
                ATON.recomputeSceneBounds();
                ATON.updateLightProbes();
                console.log(ATON._gizmo.object)
            }
        });
    }
    else {
        ATON._gizmo.camera = ATON.Nav._camera;
        ATON._gizmo.detach();
    }
};

export default ATON;


