const $=s=>document.querySelector(s);
const E=t=>String(t==null?'':t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const pl=(t,c)=>`<span class="tg ${c}">${t}</span>`;
const up=()=>scrollTo(0,0);
const IC={wifi:'<path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.859a10 10 0 0 1 14 0"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/>','wifi-off':'<path d="M12 20h.01"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/><path d="M5 12.859a10 10 0 0 1 5.17-2.69"/><path d="M19 12.859a10 10 0 0 0-2.007-1.523"/><path d="M2 8.82a15 15 0 0 1 4.177-2.643"/><path d="M22 8.82a15 15 0 0 0-11.288-3.764"/><path d="m2 2 20 20"/>','alert':'<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>','check':'<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>'};
const ic=n=>`<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${IC[n]}</svg>`;
const mk=a=>a.map(s=>{const[t,f='']=s.split('|');return{t,c:f.includes('c'),i:f.includes('i'),q:f.includes('q')}});
/* Textos resumidos; el prototipo final usará el texto íntegro de cada formato. «c» = crítico provisional, «i» = inactivo, «q» = duda */
const CT={d:mk(['Inspeccionar el vehículo antes de usarlo|c','Cinturón de seguridad puesto en todo momento|c','Solo manos libres al operar vehículos o equipos','Adaptar la velocidad a clima, camino y luz','Respetar límites de velocidad del sitio|i','No adelantar salvo que esté permitido','Comunicación por radio antes de acercarse a equipos|i','Conducir solo equipos con capacitación y autorización','Capacitación específica para el vehículo','Licencia de conducir válida y portada|c','Lista de Inspección Diaria completada; deficiencias reportadas|c','Prohibido fumar (incluye cigarrillo electrónico)','Prohibido usar teléfonos al conducir; conductor alerta','Prácticas o pruebas de manejo con supervisión directa','Equipo de seguridad vehicular que exige el sitio|i','Estacionar en pendiente con freno de mano o calzos','Estacionar de modo que se pueda salir hacia adelante','Guías (spotters) cuando la visibilidad es limitada|i']),
r:mk(['Plan de respuesta a emergencias creado y verificado antes de salir|c','Equipo de supervivencia y primeros auxilios accesible|c','Comunicación (con respaldo) obtenida y probada antes de movilizar|c','Ropa y EPP adecuados para clima cambiante','Equipo de disuasión de vida silvestre disponible|q','Vehículos aptos, con suministros de seguridad y refugio','Travesías planificadas lejos de acantilados, pantanos y árboles caídos','Cuadrilla cerca de sus compañeros y en contacto por radio','Trabajadores con capacitación y experiencia requeridas','Medios de comunicación, agua y botiquín para el equipo|c','Comunicación operativa y baterías cargadas antes de salir','Prueba de comunicación al llegar y llamadas periódicas|c','Contacto verbal con la base a intervalos predeterminados','Sin contacto: reintentar cada 5 minutos y activar plan de emergencias','Transporte confiable con equipo de remolque (cabrestante)','Depósito accesible con equipo de supervivencia y refugio','Priorizar el trabajo en equipo lejos del campamento','Compartir el plan de emergencias con la Seguridad del Sitio'])};
const NM={d:'Conducción de vehículos (CRP-S-CKL-028)',r:'Condiciones de trabajo remoto'};
const RL={lic:'Licencia MTC',li:'Licencia Interna',sctr:'SCTR',apt:'Aptitud médica',cap:'Capacitación'};
const PE=[{n:'Luis Quispe',r:'Chofer · contratista',lic:'ok',li:'x',sctr:'ok',apt:'ok',cap:'ok'},{n:'Marco Rojas',r:'Conductor · consultor',lic:'ok',li:'ok',sctr:'ok',apt:'ok',cap:'ok',pa:1},{n:'Ana Torres',r:'Geóloga · consultora',sctr:'w',apt:'ok',cap:'ok'},{n:'Diego Vargas',r:'Técnico · contratista',sctr:'ok',apt:'x',cap:'ok'},{n:'Rosa Díaz',r:'Técnica de campo',sctr:'ok',apt:'ok',cap:'ok',pa:1}];
const VE=[{n:'Hilux 4x4 ABC-123 (propia)',d:{'Revisión técnica':'ok',SOAT:'ok'}},{n:'Camioneta XYZ-789 (alquilada)',d:{'Revisión técnica':'ok',SOAT:'x'}}];
const PRE=[['charla','Charla de inicio (riesgos, clima, vías, EPP, acuerdos)'],['permiso','Permiso del propietario del predio o acuerdo con la comunidad confirmado'],['pnp','Notificación a la PNP registrada'],['preuso','Revisión de preuso del vehículo (SST-F-005)'],['com','Prueba de comunicación realizada']];
const STEPS=['Salida','Equipo','Pasos previos','Formularios','Resultados','Resumen'];
const S={step:0,max:0,off:false,q:0,sync:false,tab:'d',err:null,ce:null,
salida:{proy:'El Reducto',act:'Muestreo geológico en superficie',ubi:'Frente 2, El Reducto (Cajamarca)',ruta:'Cajamarca → trocha carrozable → caserío → frente 2',fecha:'2026-11-03',ret:'17:00'},
team:{m:[1,2,4],c:1,v:0},pre:{},ans:{},na:{},acc:{},dr:{},obs:{d:'',r:''},ev:{},val:{}};

function hab(p){const bad=[],warn=[];for(const k in RL){if(p[k]=='x')bad.push(RL[k]+' vencida');if(p[k]=='w')warn.push(RL[k]+' vence en 12 días')}return{bad,warn}}
function calc(){const r={miss:[],crit:[],nc:[],pend:[]};
 for(const f of['d','r'])CT[f].forEach((c,i)=>{if(c.i)return;const k=f+i,a=S.ans[k];
  if(!a||(a=='A'&&!(S.na[k]||'').trim()))r.miss.push(k);
  else if(a=='N'){r.nc.push(k);const x=S.acc[k];if(c.c&&!(x&&x.ver))r.crit.push(k);if(!x)r.pend.push(k)}});
 return r}
function gate(n){const m=[],s=S.salida,t=S.team;
 if(n==0)[['act','la actividad'],['ubi','la ubicación'],['ruta','la ruta']].forEach(([k,l])=>{if(!s[k].trim())m.push('Falta completar '+l+'.')});
 if(n==1){if(!t.m.length)m.push('Selecciona a los integrantes del equipo.');
  t.m.forEach(i=>{const h=hab(PE[i]);if(h.bad.length)m.push(PE[i].n+' está NO HABILITADO: '+h.bad.join(', ')+'.')});
  if(t.m.length&&t.c==null)m.push('Elige al conductor entre los integrantes.');
  if(t.v==null)m.push('Elige el vehículo.');
  else{const b=Object.entries(VE[t.v].d).filter(([,v])=>v=='x').map(([k])=>k);if(b.length)m.push(VE[t.v].n+' no habilitado: '+b.join(', ')+' vencido.')}
  if(t.m.length&&!t.m.some(i=>PE[i].pa))m.push('Falta al menos una persona con primeros auxilios y RCP vigentes.')}
 if(n==2)PRE.forEach(([k,l])=>{if(!S.pre[k])m.push(k=='permiso'?'Salida pendiente: sin permiso del propietario o acuerdo con la comunidad no se sale (informar a Lima y esperar autorización).':'Falta completar: '+l+'.')});
 if(n==4){const r=calc();if(r.miss.length)m.push('Faltan '+r.miss.length+' respuestas por completar en los formularios.');
  if(r.crit.length)m.push(r.crit.length+' control(es) crítico(s) en No conforma sin nueva verificación: la salida está bloqueada.');
  const p=r.pend.filter(k=>!CT[k[0]][k.slice(1)].c).length;if(p)m.push(p+' control(es) no crítico(s) en No conforma sin acción correctiva registrada.')}
 return m}

function hdr(){return `<div class="top"><div><h1>Verificación de salida a campo</h1><div class="mu">Prototipo con datos ficticios · Ilucán y El Reducto</div></div><button class="btn sec" data-a="off">${ic(S.off?'wifi-off':'wifi')} ${S.off?'Sin conexión (simulado)':'En línea (simulado)'}</button></div>`
 +(S.off?`<div class="blk wa">${ic('wifi-off')}Sin conexión: los registros quedan guardados en el teléfono (${S.q} pendientes) y se sincronizan al volver la señal.</div>`:S.sync?`<div class="blk ok">${ic('check')}Sincronizado: se enviaron los registros pendientes.</div>`:'')
 +'<div class="steps">'+STEPS.map((s,i)=>`<button class="st ${i==S.step?'on':i<S.max?'dn':''}" data-a="go" data-v="${i}" ${i>S.max?'disabled':''}>${i+1}. ${s}</button>`).join('')+'</div>'}
function nav(){return `<div class="nav"><button class="btn sec" data-a="pv" ${S.step==0?'disabled':''}>Atrás</button>${S.step==5?'':'<button class="btn" data-a="nx">Siguiente</button>'}</div>`}

function v0(){const s=S.salida,f=(l,k,t='')=>`<label class="lb">${l}</label><input ${t} data-m="salida.${k}" value="${E(s[k])}">`;
 return `<h2>Crear la salida</h2><p class="mu">Usuario de ejemplo: supervisor de campo.</p><div class="card"><label class="lb">Proyecto</label><select data-m="salida.proy">${['Ilucán','El Reducto'].map(p=>`<option ${s.proy==p?'selected':''}>${p}</option>`).join('')}</select>${f('Actividad','act')}${f('Ubicación','ubi')}${f('Ruta','ruta')}<div class="g2"><div>${f('Fecha de salida','fecha','type="date"')}</div><div>${f('Hora prevista de retorno','ret','type="time"')}</div></div></div>`}

function v1(){const t=S.team;
 return `<h2>Equipo, conductor y vehículo</h2><p class="mu">Fichas de ejemplo. Prueba marcar a Luis Quispe o a Diego Vargas, o elegir la camioneta alquilada.</p>`
 +PE.map((p,i)=>{const h=hab(p),on=t.m.includes(i);
  return `<div class="card ${on?'sel':''}"><div class="rw"><label><input type="checkbox" data-a="mem" data-k="${i}" ${on?'checked':''}> <b>${p.n}</b> <span class="mu">${p.r}</span></label>${h.bad.length?pl('NO HABILITADO','rd'):h.warn.length?pl('Habilitado con alerta','am'):pl('Habilitado','gr')}</div><div>${h.bad.map(x=>pl(x,'rd')).join('')}${h.warn.map(x=>pl(x,'am')).join('')}${p.pa?pl('Primeros auxilios y RCP','gr'):''}</div>${on&&p.lic?`<label><input type="radio" name="c" data-a="cond" data-k="${i}" ${t.c===i?'checked':''}> Será el conductor</label>`:''}</div>`}).join('')
 +'<h3>Vehículo</h3>'+VE.map((v,i)=>`<div class="card ${t.v===i?'sel':''}"><label><input type="radio" name="veh" data-a="veh" data-k="${i}" ${t.v===i?'checked':''}> <b>${v.n}</b></label><div>${Object.entries(v.d).map(([k,s])=>pl(k+(s=='x'?' vencido':' vigente'),s=='x'?'rd':'gr')).join('')}</div></div>`).join('')}

function v2(){return `<h2>Pasos previos</h2><p class="mu">Se hacen en este orden. Registrar un paso deja constancia; la app no envía nada por sí sola.</p>`
 +PRE.map(([k,l])=>`<div class="card"><label><input type="checkbox" data-m="pre.${k}" ${S.pre[k]?'checked':''}> <b>${l}</b></label>${k=='preuso'?'<div class="mu">Formato SST-F-005 pendiente de entrega: todavía no se muestran sus controles.</div>':''}${k=='pnp'?'<div class="mu">Se registra aquí; no se envía automáticamente a la PNP.</div>':''}${k=='permiso'&&!S.pre.permiso?`<div>${pl('Salida pendiente','am')}<span class="mu"> Sin permiso o acuerdo no se sale: se informa a Lima y se espera.</span></div>`:''}</div>`).join('')}

function prog(x){const a=CT[x].filter(c=>!c.i);return a.length?CT[x].filter((c,i)=>!c.i&&S.ans[x+i]).length+'/'+a.length:''}
function row(f,i){const c=CT[f][i],k=f+i,a=S.ans[k];
 if(c.i)return `<div class="cr off"><span>${i+1}. ${c.t}</span>${pl('Inactivo hasta perforación','gy')}</div>`;
 const b=(v,l)=>`<button class="sg ${a===v?'on '+v:''}" data-a="ans" data-k="${k}" data-v="${v}" ${v=='A'&&c.c?'disabled title="Un control crítico no admite N/A"':''}>${l}</button>`;
 return `<div class="cr"><div>${i+1}. ${c.t}${c.c?pl('Crítico (provisional)','rd'):''}${c.q?pl('¿Aplica? Duda para SST','am'):''}</div><div class="sgs">${b('C','Conforma')}${b('N','No conforma')}${b('A','N/A')}</div>${a=='A'?`<input style="margin-top:8px" placeholder="Motivo del N/A (obligatorio)" data-m="na.${k}" value="${E(S.na[k])}">`:''}</div>`}
function v3(){const f=S.tab,s=S.salida;
 return `<h2>Formularios de verificación</h2><div class="tabs">${['d','r'].map(x=>`<button class="st ${x==f?'on':''}" data-a="tab" data-v="${x}">${NM[x].split(' (')[0]} <span class="mu">${prog(x)}</span></button>`).join('')}</div>`
 +`<div class="mu">Cabecera tomada de la salida: ${s.fecha} · ${E(s.ubi)} · ${S.team.m.length} personas · ${E(s.act)}</div>`
 +`<div class="card"><span class="mu">Para la demostración:</span> <button class="btn sec" data-a="dok">Todo conforme</button> <button class="btn sec" data-a="dcrit">Incumplimiento crítico</button> <button class="btn sec" data-a="dclr">Borrar respuestas</button></div>`
 +CT[f].map((c,i)=>(i==0?'<h3>Comportamientos que salvan vidas</h3>':i==8?'<h3>Controles operativos</h3>':'')+row(f,i)).join('')
 +(f=='d'?'<p class="mu">Los 4 controles inactivos quedan listos para cuando se active la perforación.</p>':'')
 +`<h3>Observaciones y evidencias</h3><textarea rows="3" data-m="obs.${f}" placeholder="Observaciones">${E(S.obs[f])}</textarea><label class="lb"><input type="checkbox" data-m="ev.${f}" ${S.ev[f]?'checked':''}> Evidencia fotográfica adjunta (simulado)</label>`}

function ncard(k){const c=CT[k[0]][k.slice(1)],a=S.acc[k],d=S.dr[k]||{},nm=NM[k[0]].split(' (')[0]+', control '+(+k.slice(1)+1);let b;
 if(!a)b=`<label class="lb">Acción correctiva</label><input data-m="dr.${k}.a" value="${E(d.a)}"><div class="g2"><div><label class="lb">Responsable</label><input data-m="dr.${k}.r" value="${E(d.r)}"></div><div><label class="lb">Plazo</label><input type="date" data-m="dr.${k}.p" value="${E(d.p)}"></div></div><label class="lb"><input type="checkbox" data-m="dr.${k}.e" ${d.e?'checked':''}> Evidencia adjunta (simulado)</label><button class="btn" data-a="accs" data-k="${k}">Registrar acción</button>${S.ce==k?'<div style="color:var(--no);margin-top:6px">Completa la acción, el responsable y el plazo.</div>':''}`;
 else b=`<div><b>Acción:</b> ${E(a.a)} · <b>Responsable:</b> ${E(a.r)} · <b>Plazo:</b> ${E(a.p)}${a.e?' · con evidencia':''}</div>`+(a.ver?'<div class="blk ok">Nueva verificación: Conforma. El registro «No conforma» original se conserva en el historial.</div>':c.c?`<div class="blk">Acción registrada, pero el bloqueo sigue hasta que el control se verifique de nuevo.</div><button class="btn" data-a="ver" data-k="${k}">Simular corrección y nueva verificación</button>`:'<div class="blk wa">Control no crítico: la salida puede continuar. Quién autoriza esta excepción está pendiente de SST.</div>');
 return `<div class="card ${c.c&&!(a&&a.ver)?'cb':''}"><b>${nm}</b>${c.c?pl('Crítico · bloquea','rd'):pl('No crítico','am')}<div class="mu">${c.t}</div>${b}</div>`}
function v4(){const r=calc();let h='<h2>Resultados y correcciones</h2>';
 if(r.miss.length)h+=`<div class="card"><b>Respuestas faltantes (${r.miss.length})</b><ul>${r.miss.map(k=>`<li>${NM[k[0]].split(' (')[0]}, control ${+k.slice(1)+1}: ${CT[k[0]][k.slice(1)].t}${S.ans[k]=='A'?' <span class="mu">(falta el motivo del N/A)</span>':''}</li>`).join('')}</ul><button class="btn sec" data-a="back">Completar en los formularios</button></div>`;
 [...r.nc].sort((a,b)=>CT[b[0]][b.slice(1)].c-CT[a[0]][a.slice(1)].c).forEach(k=>h+=ncard(k));
 if(!r.miss.length&&!r.nc.length)h+='<div class="blk ok">Todos los controles evaluados cumplen. No hay acciones correctivas.</div>';
 return h}

function v5(){const t=S.team,s=S.salida,cnt={C:0,N:0,A:0};
 for(const f of['d','r'])CT[f].forEach((c,i)=>{if(!c.i&&S.ans[f+i])cnt[S.ans[f+i]]++});
 const ac=Object.values(S.acc),ok=[0,1,2,4].every(n=>!gate(n).length);
 return `<h2>Resumen para revisión final</h2><div class="card"><b>Salida</b><div>${s.proy} · ${E(s.act)}<br>${E(s.ubi)}<br>Ruta: ${E(s.ruta)}<br>Salida ${s.fecha} · retorno previsto ${s.ret}</div></div>`
 +`<div class="card"><b>Habilitación</b><div>${t.m.map(i=>PE[i].n+(i==t.c?' (conductor)':'')).join(', ')||'Sin equipo'}<br>${t.v==null?'':VE[t.v].n}</div>${pl('Equipo y vehículo habilitados',gate(1).length?'rd':'gr')}</div>`
 +`<div class="card"><b>Pasos previos</b><div>${PRE.map(([k])=>S.pre[k]?'✔':'✘').join(' ')} ${pl(gate(2).length?'Salida pendiente':'Completos',gate(2).length?'am':'gr')}</div></div>`
 +`<div class="card"><b>Formularios</b><div>${pl('Conforma '+cnt.C,'gr')}${pl('No conforma '+cnt.N,'rd')}${pl('N/A '+cnt.A,'am')}${pl('Inactivos '+CT.d.filter(c=>c.i).length,'gy')}</div><div class="mu">Acciones correctivas: ${ac.length} registradas · ${ac.filter(x=>x.ver).length} con nueva verificación</div></div>`
 +(ok?'':`<div class="blk">Hay bloqueos o pendientes: revisa los pasos anteriores antes de validar.</div>`)
 +`<div class="card"><b>Validación final</b><p class="mu">Según la sección 4.2: supervisor de campo, con verificación del Consultor SST. Roles por confirmar con SST.</p>`
 +(S.val.c?pl('Validado por el supervisor de campo','gr'):`<button class="btn" data-a="val" data-v="c" ${ok?'':'disabled'}>Validar como supervisor de campo</button>`)+' '
 +(S.val.s?pl('Verificado por el Consultor SST','gr'):`<button class="btn sec" data-a="val" data-v="s" ${ok&&S.val.c?'':'disabled'}>Verificar como Consultor SST</button>`)+'</div>'
 +(S.val.c&&S.val.s?`<div class="blk ok">${ic('check')}Salida lista para iniciar (simulación).</div>`:'')}

function R(){const g=S.err||([1,4].includes(S.step)?gate(S.step):[]);
 $('#app').innerHTML=hdr()+[v0,v1,v2,v3,v4,v5][S.step]()+(g.length?`<div class="blk">${ic('alert')}<b>No se puede continuar:</b><ul>${g.map(x=>`<li>${x}</li>`).join('')}</ul></div>`:'')+nav()}
function fill(){S.ans={};S.na={};S.acc={};S.dr={};for(const f of['d','r'])CT[f].forEach((c,i)=>{if(!c.i)S.ans[f+i]='C'})}
const A={
 go:d=>{S.step=+d.v;up()},pv:()=>{S.step--;up()},back:()=>{S.step=3;up()},
 nx:()=>{const g=gate(S.step);if(g.length){S.err=g;return}S.step++;S.max=Math.max(S.max,S.step);up()},
 off:()=>{S.off=!S.off;if(!S.off&&S.q){S.q=0;S.sync=true}},
 mem:d=>{const i=+d.k;if(S.team.m.includes(i)){S.team.m=S.team.m.filter(x=>x!=i);if(S.team.c==i)S.team.c=null}else S.team.m.push(i)},
 cond:d=>{S.team.c=+d.k},veh:d=>{S.team.v=+d.k},tab:d=>{S.tab=d.v},
 ans:d=>{S.ans[d.k]=d.v;if(d.v!='A')delete S.na[d.k];if(S.off)S.q++},
 dok:fill,dcrit:()=>{fill();S.ans.d1='N'},dclr:()=>{S.ans={};S.na={};S.acc={};S.dr={}},
 accs:d=>{const x=S.dr[d.k]||{};if(!(x.a||'').trim()||!(x.r||'').trim()||!x.p){S.ce=d.k;return}S.acc[d.k]={a:x.a,r:x.r,p:x.p,e:!!x.e,ver:false};if(S.off)S.q++},
 ver:d=>{S.acc[d.k].ver=true;if(S.off)S.q++},
 val:d=>{S.val[d.v]=1}};
document.addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(!b||b.disabled)return;const a=b.dataset.a;S.err=null;S.ce=null;if(a!='off')S.sync=false;A[a](b.dataset);R()});
document.addEventListener('input',e=>{const t=e.target,m=t.dataset.m;if(!m)return;const p=m.split('.');let o=S;for(let i=0;i<p.length-1;i++)o=o[p[i]]=o[p[i]]||{};o[p[p.length-1]]=t.type=='checkbox'?t.checked:t.value;if(t.type=='checkbox')R()});
const DU=['¿Quién autoriza las excepciones no críticas? La sección 3.3 dice el Ing. SST; la 9.1 dice que el Ing. SST propone y la jefatura de Exploración aprueba.','¿Qué controles son críticos? Los formularios no los marcan. Aquí la marca es provisional y sale de lo que nombra la encuesta (comunicación probada, botiquín, cinturones, licencia, inspección del vehículo, plan de emergencia).','N/A frente a «No se discutió» o «No evaluado»: el papel los une en una sola casilla. ¿Se separan?','Controles inactivos hasta perforación (4 en conducción): ¿se muestran como inactivos o se ocultan? ¿Quién los activa?','¿Un control crítico admite N/A? Aquí se bloquea, según la sección 9.1; confirmar.','¿Aplica el control de disuasión de vida silvestre (spray para osos) en Cajamarca?','Roles: Ing. SST, Consultor SST y Coordinador SST aparecen en distintas respuestas. ¿Quién verifica y quién aprueba o bloquea la salida?','El formato SST-F-005 (preuso) sigue pendiente de entrega.','El reporte de comunicación cada 3 horas es la tercera necesidad del MVP para SST, pero este primer sprint lo deja para después.','El formulario de Trabajo Remoto trae un encabezado de «Mobile Equipment», un pie con el código CRP-S-CKL-002 y un «6.2» suelto en un control.'];
$('#dud').innerHTML=`<summary>Dudas para SST (${DU.length})</summary><ol>${DU.map(x=>`<li>${x}</li>`).join('')}</ol>`;
R();
