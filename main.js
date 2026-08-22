(() => {
  "use strict";
  const boot = () => {
    if (!window.THREE) return;
    const T = window.THREE;
    const canvas = document.getElementById("cv") || document.querySelector("canvas");
    if (!canvas) return;

    /* ---------- cinematic background ---------- */
    const scene = new T.Scene();
    scene.background = new T.Color(0x05050a);
    scene.fog = new T.FogExp2(0x05050a, 0.012);
    const camera = new T.PerspectiveCamera(58, innerWidth / innerHeight, 0.1, 1400);
    camera.position.set(0, 4.8, 17);
    const renderer = new T.WebGLRenderer({canvas, antialias:true, alpha:true, powerPreference:"high-performance"});
    renderer.setPixelRatio(Math.min(devicePixelRatio,1.65));
    renderer.setSize(innerWidth,innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = T.PCFSoftShadowMap;
    renderer.outputEncoding = T.sRGBEncoding;
    scene.add(new T.HemisphereLight(0x9db8ff,0x07070d,1.15));
    const key = new T.DirectionalLight(0xffffff,1.7);
    key.position.set(5,12,10); key.castShadow=true; key.shadow.mapSize.set(1024,1024); scene.add(key);
    const redLight = new T.PointLight(0xe10600,20,90,2); redLight.position.set(-12,4,-35); scene.add(redLight);
    const cyanLight = new T.PointLight(0x00d2be,18,100,2); cyanLight.position.set(15,6,-65); scene.add(cyanLight);
    const road = new T.Mesh(new T.PlaneGeometry(22,900),new T.MeshStandardMaterial({color:0x0b0c12,metalness:.72,roughness:.38}));
    road.rotation.x=-Math.PI/2; road.position.set(0,-.02,-380); road.receiveShadow=true; scene.add(road);
    const shoulderMat = new T.MeshStandardMaterial({color:0x151722,metalness:.35,roughness:.6});
    [-11.2,11.2].forEach(x=>{const s=new T.Mesh(new T.BoxGeometry(.55,.22,900),shoulderMat);s.position.set(x,.08,-380);scene.add(s);});
    const lanes=[]; const laneMat=new T.MeshBasicMaterial({color:0xeaeef5});
    for(let i=0;i<110;i++){
      const z=18-i*8.6;
      [-2.6,2.6].forEach(x=>{const d=new T.Mesh(new T.BoxGeometry(.12,.035,3.8),laneMat);d.position.set(x,.04,z);scene.add(d);lanes.push(d);});
    }
    const wallUnits=[]; const wallMat=new T.MeshStandardMaterial({color:0x161823,metalness:.3,roughness:.65});
    for(let i=0;i<90;i++){
      const z=10-i*9.8;
      [-13,13].forEach((x,side)=>{const u=new T.Mesh(new T.BoxGeometry(1.1,.55,5.8),wallMat.clone());u.position.set(x,.32,z);u.material.emissive=new T.Color(side?0x002a24:0x250000);u.material.emissiveIntensity=1.7;scene.add(u);wallUnits.push(u);});
    }
    const particleCount=950, positions=new Float32Array(particleCount*3);
    for(let i=0;i<particleCount;i++){positions[i*3]=(Math.random()-.5)*75;positions[i*3+1]=Math.random()*18+1;positions[i*3+2]=-Math.random()*520;}
    const particleGeo=new T.BufferGeometry(); particleGeo.setAttribute("position",new T.BufferAttribute(positions,3));
    const particles=new T.Points(particleGeo,new T.PointsMaterial({color:0x8ab5ff,size:.055,transparent:true,opacity:.75})); scene.add(particles);
    const car=new T.Group();
    const bodyMat=new T.MeshPhysicalMaterial({color:0xc40d0d,metalness:.9,roughness:.2,clearcoat:1,clearcoatRoughness:.12});
    const darkMat=new T.MeshPhysicalMaterial({color:0x06070a,metalness:.75,roughness:.23,clearcoat:1});
    const glowMat=new T.MeshBasicMaterial({color:0xff321c});
    const body=new T.Mesh(new T.BoxGeometry(1.8,.34,3.8),bodyMat); body.position.y=.42; body.castShadow=true; car.add(body);
    const nose=new T.Mesh(new T.ConeGeometry(.44,1.6,6),bodyMat); nose.rotation.x=-Math.PI/2; nose.position.set(0,.42,-2.55); car.add(nose);
    const cockpit=new T.Mesh(new T.BoxGeometry(1.05,.3,1.4),darkMat); cockpit.position.set(0,.72,.15); cockpit.rotation.x=-.12; car.add(cockpit);
    const rearWing=new T.Mesh(new T.BoxGeometry(2.25,.09,.28),darkMat); rearWing.position.set(0,.98,1.45); car.add(rearWing);
    const frontWing=new T.Mesh(new T.BoxGeometry(2.45,.08,.28),darkMat); frontWing.position.set(0,.23,-2.48); car.add(frontWing);
    const wheelMat=new T.MeshStandardMaterial({color:0x060606,metalness:.15,roughness:.8});
    [-.92,.92].forEach(x=>[-1.3,1.15].forEach(z=>{const w=new T.Mesh(new T.CylinderGeometry(.34,.34,.22,20),wheelMat);w.rotation.z=Math.PI/2;w.position.set(x,.32,z);w.castShadow=true;car.add(w);}));
    [-.72,.72].forEach(x=>{const g=new T.Mesh(new T.BoxGeometry(.22,.04,.8),glowMat);g.position.set(x,.45,1.88);car.add(g);});
    car.position.set(0,0,10.5); scene.add(car);
    const ring=new T.Mesh(new T.TorusGeometry(3.25,.018,8,140),new T.MeshBasicMaterial({color:0x00d2be,transparent:true,opacity:.6}));
    ring.rotation.x=Math.PI/2.25; ring.position.set(0,1.1,-2.5); scene.add(ring);
    const ring2=ring.clone(); ring2.material=ring.material.clone(); ring2.material.color.setHex(0xe10600); ring2.material.opacity=.35; ring2.rotation.x=Math.PI/1.92; ring2.scale.setScalar(1.28); scene.add(ring2);

    const mouse=new T.Vector2(), smoothMouse=new T.Vector2(); let scrollProgress=0,turbo=false; const clock=new T.Clock();
    addEventListener("pointermove",e=>{mouse.x=e.clientX/innerWidth*2-1;mouse.y=-(e.clientY/innerHeight*2-1);});
    addEventListener("pointerdown",()=>turbo=true); addEventListener("pointerup",()=>turbo=false);
    addEventListener("keydown",e=>{if(e.key==="Shift"||e.code==="Space")turbo=true;}); addEventListener("keyup",e=>{if(e.key==="Shift"||e.code==="Space")turbo=false;});
    addEventListener("scroll",()=>{const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);scrollProgress=Math.min(1,Math.max(0,scrollY/max));},{passive:true});
    const resize=()=>{camera.aspect=innerWidth/innerHeight;camera.fov=innerWidth<700?64:58;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);renderer.setPixelRatio(Math.min(devicePixelRatio,1.65));};
    addEventListener("resize",resize);

    /* ---------- living UI layer ---------- */
    const root=document.documentElement;
    const style=document.createElement("style");
    style.textContent=`
      #um-progress{position:fixed;left:0;top:0;height:2px;width:100%;transform-origin:left;transform:scaleX(0);background:linear-gradient(90deg,#e10600,#ff6b5f 45%,#00d2be);z-index:100;box-shadow:0 0 18px rgba(0,210,190,.45);pointer-events:none}
      #um-command{position:fixed;inset:0;background:rgba(2,3,7,.66);backdrop-filter:blur(18px);z-index:90;display:none;align-items:flex-start;justify-content:center;padding-top:13vh}
      #um-command.open{display:flex}.um-cmd-box{width:min(720px,92vw);background:rgba(12,14,21,.96);border:1px solid rgba(255,255,255,.14);border-radius:22px;box-shadow:0 40px 120px rgba(0,0,0,.65);overflow:hidden}.um-cmd-top{display:flex;align-items:center;gap:12px;padding:18px 20px;border-bottom:1px solid rgba(255,255,255,.08)}.um-cmd-top span{color:#00d2be;font:11px 'Share Tech Mono',monospace}.um-cmd-input{flex:1;background:none;border:0;outline:0;color:#fff;font:16px 'Share Tech Mono',monospace}.um-cmd-list{padding:8px;max-height:55vh;overflow:auto}.um-cmd-item{display:flex;align-items:center;justify-content:space-between;padding:14px 15px;border-radius:12px;color:#b8bdc8;cursor:pointer;font:11px 'Share Tech Mono',monospace}.um-cmd-item:hover,.um-cmd-item.active{background:rgba(255,255,255,.07);color:#fff}.um-cmd-item small{color:#606876}.um-hint{padding:11px 18px;color:#555d6b;border-top:1px solid rgba(255,255,255,.07);font:9px 'Share Tech Mono',monospace;letter-spacing:.08em}
      .format-card,.project,.btn,.nav a{will-change:transform}.um-live{position:fixed;right:20px;bottom:20px;z-index:14;padding:9px 12px;border:1px solid rgba(255,255,255,.1);border-radius:999px;background:rgba(5,5,10,.6);backdrop-filter:blur(12px);font:9px 'Share Tech Mono',monospace;color:#727987;letter-spacing:.12em}.um-live i{display:inline-block;width:5px;height:5px;border-radius:50%;background:#00d2be;box-shadow:0 0 10px #00d2be;margin-right:7px}.um-live b{color:#dce0e8;font-weight:500}
      .um-reveal{opacity:0;transform:translateY(30px);transition:opacity .8s ease,transform .8s cubic-bezier(.2,.7,.2,1)}.um-reveal.in{opacity:1;transform:none}.um-tilt{transform-style:preserve-3d;transition:transform .15s ease}.um-tilt>*{transform:translateZ(10px)}
      .um-toast{position:fixed;left:50%;bottom:28px;transform:translate(-50%,20px);opacity:0;z-index:120;background:#f2f2f4;color:#09090d;border-radius:999px;padding:12px 18px;font:10px 'Share Tech Mono',monospace;box-shadow:0 18px 60px rgba(0,0,0,.45);transition:.3s}.um-toast.show{opacity:1;transform:translate(-50%,0)}
      @media(max-width:700px){.um-live{display:none}.um-cmd-box{border-radius:16px}}
    `;
    document.head.appendChild(style);

    const progress=document.createElement("div"); progress.id="um-progress"; document.body.appendChild(progress);
    const live=document.createElement("div"); live.className="um-live"; live.innerHTML='<i></i> SYSTEM <b>ONLINE</b> · <span id="um-clock">--:--</span>'; document.body.appendChild(live);
    const toast=document.createElement("div"); toast.className="um-toast"; document.body.appendChild(toast);
    const notify=(text)=>{toast.textContent=text;toast.classList.add("show");clearTimeout(notify.t);notify.t=setTimeout(()=>toast.classList.remove("show"),1800)};

    /* command center: press / or cmd/ctrl+k */
    const overlay=document.createElement("div"); overlay.id="um-command"; overlay.innerHTML=`<div class="um-cmd-box"><div class="um-cmd-top"><span>⌘</span><input class="um-cmd-input" placeholder="Search the portfolio…" autocomplete="off"></div><div class="um-cmd-list"></div><div class="um-hint">ESC CLOSE · ↑↓ NAVIGATE · ENTER OPEN</div></div>`; document.body.appendChild(overlay);
    const input=overlay.querySelector("input"), list=overlay.querySelector(".um-cmd-list");
    const commands=[
      ["Work","Jump to selected work","#work"],["Formats","Open the format lab","#formats"],["About","Read the story","#about"],["Stack","See the toolbox","#stack"],["Contact","Start a conversation","#contact"],
      ["LinkedIn","Open professional profile","linkedin.html"],["Instagram","Open visual profile","instagram.html"],["Netflix","Browse project catalogue","netflix.html"],["GitHub","Open repositories","https://github.com/um26"],["UniPool","Open the live product","https://uni-pool-ruddy.vercel.app/"],["Scheme Navigator","Open the live product","https://scheme-navigator-ten.vercel.app/"]
    ];
    let filtered=commands.slice(), active=0;
    const renderCommands=()=>{list.innerHTML=filtered.map((c,i)=>`<div class="um-cmd-item ${i===active?'active':''}" data-i="${i}"><span>${c[0]}</span><small>${c[1]}</small></div>`).join("");list.querySelectorAll(".um-cmd-item").forEach(el=>el.onclick=()=>runCommand(+el.dataset.i));};
    const openCommands=()=>{overlay.classList.add("open");input.value="";filtered=commands.slice();active=0;renderCommands();setTimeout(()=>input.focus(),30)};
    const closeCommands=()=>overlay.classList.remove("open");
    const runCommand=(i)=>{const target=filtered[i]?.[2];if(!target)return;closeCommands();if(target.startsWith("#")){document.querySelector(target)?.scrollIntoView({behavior:"smooth"});}else{window.location.href=target;}};
    input.oninput=()=>{const q=input.value.toLowerCase().trim();filtered=commands.filter(c=>(c[0]+c[1]).toLowerCase().includes(q));active=0;renderCommands();};
    addEventListener("keydown",e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();openCommands();return}if(e.key==="/"&&document.activeElement!==input){e.preventDefault();openCommands();return}if(!overlay.classList.contains("open"))return;if(e.key==="Escape")closeCommands();if(e.key==="ArrowDown"){e.preventDefault();active=Math.min(filtered.length-1,active+1);renderCommands()}if(e.key==="ArrowUp"){e.preventDefault();active=Math.max(0,active-1);renderCommands()}if(e.key==="Enter")runCommand(active)});
    overlay.addEventListener("click",e=>{if(e.target===overlay)closeCommands()});

    /* subtle tilt: cards respond to the cursor rather than behaving like dead rectangles */
    const tiltTargets=[...document.querySelectorAll(".format-card,.project,.hero-card")];
    tiltTargets.forEach(el=>{el.classList.add("um-tilt");el.addEventListener("pointermove",e=>{if(innerWidth<800)return;const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(900px) rotateX(${(-y*5).toFixed(2)}deg) rotateY(${(x*6).toFixed(2)}deg) translateY(-4px)`});el.addEventListener("pointerleave",()=>el.style.transform="")});

    /* reveal sections as the page is explored */
    const reveal=[...document.querySelectorAll(".section,.format-hub,.marquee")]; reveal.forEach(x=>x.classList.add("um-reveal"));
    const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("in")}),{threshold:.12}); reveal.forEach(x=>observer.observe(x));

    /* live clock + telemetry */
    const clockEl=document.getElementById("um-clock");
    setInterval(()=>{if(clockEl)clockEl.textContent=new Intl.DateTimeFormat([], {hour:"2-digit",minute:"2-digit",second:"2-digit"}).format(new Date())},1000);

    /* magnetic CTA feedback */
    document.querySelectorAll(".btn,.nav-cta,.clean-links a").forEach(el=>{el.addEventListener("pointermove",e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${((e.clientX-r.left)/r.width-.5)*7}px,${((e.clientY-r.top)/r.height-.5)*5}px)`});el.addEventListener("pointerleave",()=>el.style.transform="")});

    /* tiny keyboard easter egg */
    let seq=""; addEventListener("keydown",e=>{if(e.key.length===1){seq=(seq+e.key.toLowerCase()).slice(-8);if(seq.endsWith("matrix")){notify("MATRIX MODE: KEEP BUILDING.");document.body.animate([{filter:"brightness(1)"},{filter:"brightness(1.8)"},{filter:"brightness(1)"}],{duration:650});}}});

    const animate=()=>{requestAnimationFrame(animate);const t=clock.getElapsedTime();smoothMouse.lerp(mouse,.065);const boost=turbo?2.2:1,distance=scrollProgress*110;
      progress.style.transform=`scaleX(${scrollProgress})`;
      camera.position.x+=((smoothMouse.x*2.8)-camera.position.x)*.032;
      camera.position.y+=((4.8+smoothMouse.y*1.2+Math.sin(t*.55)*.11)-camera.position.y)*.03;
      camera.position.z+=((17-distance*.14)-camera.position.z)*.05;
      camera.lookAt(0,1.4,-32-distance*.65);
      car.rotation.y=smoothMouse.x*.09+Math.sin(t*.65)*.015; car.rotation.x=smoothMouse.y*.035; car.position.x=smoothMouse.x*.8;
      ring.rotation.z+=.003*boost; ring2.rotation.z-=.002*boost;
      lanes.forEach(d=>{d.position.z+=.34*boost;if(d.position.z>camera.position.z+8)d.position.z-=950;d.scale.z=turbo?1.55:1;});
      wallUnits.forEach((u,i)=>{u.position.z+=.17*boost;if(u.position.z>camera.position.z+6)u.position.z-=900;u.material.emissiveIntensity=1.25+Math.sin(t*2.2+i*.13)*.45;});
      particles.rotation.y=t*.008; particles.position.z=Math.sin(t*.15)*7; redLight.intensity=17+Math.sin(t*1.9)*4+(turbo?14:0); cyanLight.intensity=16+Math.cos(t*1.5)*3+(turbo?9:0);
      renderer.render(scene,camera);
    };
    resize(); animate();
  };
  if(window.THREE) boot(); else {const s=document.createElement("script");s.src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";s.onload=boot;document.head.appendChild(s);}
})();