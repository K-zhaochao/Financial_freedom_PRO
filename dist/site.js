const byId=Object.fromEntries(lessons.map((lesson,index)=>[lesson.id,{...lesson,index}]));
const $=selector=>document.querySelector(selector);
const stageById=Object.fromEntries(stages.map(item=>[item.id,item]));
let completed=new Set();
try{completed=new Set(JSON.parse(localStorage.getItem('finance-lessons-v1')||'[]'))}catch(_){}
let current=(location.hash||'').replace(/^#/,'');
if(!byId[current])current=lessons[0].id;
let lastFocus=null;
let query='';

function minutesOf(list){return list.reduce((sum,item)=>sum+(item.minutes||0),0)}

function saveProgress(){
 try{localStorage.setItem('finance-lessons-v1',JSON.stringify([...completed]))}catch(_){}
 $('#progress-text').textContent=`${completed.size} / ${lessons.length} 已学完`;
 $('#progress-fill').style.width=`${completed.size/lessons.length*100}%`;
}

function renderStages(){
 const selected=byId[current].stage;
 $('#lesson-count').textContent=`${lessons.length} 节`;
 $('#stage-nav').innerHTML=stages.map(stage=>{
  const inStage=lessons.filter(item=>item.stage===stage.id);
  const count=inStage.filter(item=>completed.has(item.id)).length;
  return `<button class="stage-button ${selected===stage.id?'active':''}" type="button" data-stage="${stage.id}" ${selected===stage.id?'aria-current="step"':''}><span class="stage-number">${stage.icon}</span><strong>${stage.name}</strong><span class="stage-complete">${stage.level} · ${count}/${inStage.length}</span></button>`;
 }).join('');
 document.querySelectorAll('[data-stage]').forEach(button=>button.addEventListener('click',()=>selectLesson(lessons.find(item=>item.stage===button.dataset.stage).id,'none')));
 const activeStage=$('#stage-nav .stage-button.active');
 if(activeStage)$('#stage-nav').scrollLeft=activeStage.offsetLeft-$('#stage-nav').offsetLeft-($('#stage-nav').clientWidth-activeStage.clientWidth)/2;
}

function lessonItem(item,number){
 return `<button class="lesson-item ${item.id===current?'active':''}" type="button" data-lesson="${item.id}" ${item.id===current?'aria-current="page"':''}><span class="lesson-index">${String(number).padStart(2,'0')}</span><span class="lesson-name">${item.title}</span>${completed.has(item.id)?'<span class="lesson-check" aria-label="已学完">✓</span>':''}</button>`;
}

function renderLessonList(){
 const selected=byId[current],stage=stageById[selected.stage],items=lessons.filter(item=>item.stage===stage.id);
 $('#rail-step').textContent=`${stage.level} · 阶段 ${stage.icon}`;
 $('#rail-title').textContent=stage.name;
 $('#rail-subtitle').textContent=stage.subtitle;
 $('#rail-total').textContent=`${items.length} 节 · 约 ${minutesOf(items)} 分钟`;
 const keyword=query.trim();
 if(keyword){
  const hit=lessons.filter(item=>`${item.title} ${item.tag} ${item.lead} ${(item.terms||[]).map(pair=>pair.join(' ')).join(' ')}`.includes(keyword));
  $('#lesson-list').innerHTML=hit.length?hit.map(item=>`<span class="lesson-group">${stageById[item.stage].icon} ${stageById[item.stage].name}</span>${lessonItem(item,item.index+1)}`).join(''):'<p class="lesson-empty">没有匹配的课程，换个词试试。</p>';
 }else{
  $('#lesson-list').innerHTML=items.map((item,index)=>lessonItem(item,index+1)).join('');
 }
 document.querySelectorAll('[data-lesson]').forEach(button=>button.addEventListener('click',()=>selectLesson(button.dataset.lesson,'smart')));
}

function renderPoints(lesson){
 return `<div class="section-label">这节课要弄明白</div><div class="lesson-points">${lesson.points.map(([title,body],index)=>`<section class="point"><span class="point-number">${index+1}</span><div><h3>${title}</h3><p>${body}</p></div></section>`).join('')}</div>`;
}

function renderDeep(lesson){
 if(!lesson.deep||!lesson.deep.length)return '';
 return `<div class="section-label">再往下想一层</div><div class="deep-list">${lesson.deep.map(item=>`<section class="deep-block"><h3>${item.h}</h3>${item.p.map(paragraph=>`<p>${paragraph}</p>`).join('')}</section>`).join('')}</div>`;
}

function renderCase(lesson){
 const item=lesson.case;
 if(!item)return '';
 return `<div class="case-box"><strong>案例拆解 · ${item.title}</strong><p>${item.body}</p><span class="case-takeaway">${item.takeaway}</span></div>`;
}

function renderPitfalls(lesson){
 if(!lesson.pitfalls||!lesson.pitfalls.length)return '';
 return `<div class="section-label">容易走偏的地方</div><div class="pitfall-list">${lesson.pitfalls.map(([wrong,right])=>`<div class="pitfall-row"><div class="pitfall-wrong"><span>常见说法</span><p>${wrong}</p></div><div class="pitfall-right"><span>更接近事实的理解</span><p>${right}</p></div></div>`).join('')}</div>`;
}

function renderNumbers(lesson){
 if(!lesson.numbers||!lesson.numbers.length)return '';
 return `<div class="number-strip"><div class="number-strip-title">关键数字（来自参考书，注意时期与口径）</div><div class="number-grid">${lesson.numbers.map(([value,source])=>`<div class="number-card"><strong>${value}</strong><span>${source}</span></div>`).join('')}</div></div>`;
}

function renderTerms(lesson){
 if(!lesson.terms||!lesson.terms.length)return '';
 return `<div class="section-label">术语卡</div><div class="term-grid">${lesson.terms.map(([term,meaning])=>`<div class="term-card"><strong>${term}</strong><p>${meaning}</p></div>`).join('')}</div>`;
}

function renderTakeaways(lesson){
 if(!lesson.takeaways||!lesson.takeaways.length)return '';
 return `<div class="takeaway-box"><strong>这一课记住这些</strong><ol>${lesson.takeaways.map(line=>`<li>${line}</li>`).join('')}</ol></div>`;
}

function renderPractice(lesson){
 const exercises=lesson.exercises||[];
 return `<div class="task-box"><strong>动手做一遍</strong><p>${lesson.task}</p>${exercises.length?`<ol class="exercise-list">${exercises.map(line=>`<li>${line}</li>`).join('')}</ol>`:''}</div>`;
}

function renderSources(lesson){
 const pills=lesson.sources.map(([key,chapter])=>`<span class="source-pill">《${books[key].title}》 · ${chapter}</span>`).join('');
 const readings=(lesson.readings||[]).length?`<div class="reading-list"><div class="reading-title">回原书怎么读</div>${lesson.readings.map(item=>`<div class="reading-row"><span class="reading-book">《${books[item.book].title}》</span><strong>${item.where}</strong><p>${item.why}</p></div>`).join('')}</div>`:'';
 const resources=(lesson.resources||[]).length?`<div class="official-resources"><h3>官方操作资料</h3>${lesson.resources.map(([label,url])=>`<a href="${url}" target="_blank" rel="noopener noreferrer">${label} ↗</a>`).join('')}</div>`:'';
 return `<div class="sources"><h3>本课参考书目与章节</h3><div class="source-list">${pills}</div>${readings}${resources}</div>`;
}

function renderLesson(){
 const lesson=byId[current],stage=stageById[lesson.stage],next=lessons[lesson.index+1];
 $('#lesson-panel').innerHTML=`<div class="lesson-meta"><span>${stage.level} · 阶段 ${stage.icon} / 第 ${String(lesson.index+1).padStart(2,'0')} 课</span><span class="tag">${lesson.tag}</span><span class="time">约 ${lesson.minutes} 分钟</span></div>
 <h2>${lesson.title}</h2><p class="lesson-lead">${lesson.lead}</p>${renderIllustration(lesson.id)}${renderSoftwareVisual(lesson.id)}<div class="lesson-divider"></div>
 ${renderPoints(lesson)}${renderDiagram(lesson.id)}
 <div class="example-box"><strong>用一个例子想清楚</strong><p>${lesson.example}</p></div>${renderCase(lesson)}
 ${renderDeep(lesson)}${renderPitfalls(lesson)}${renderNumbers(lesson)}${renderTerms(lesson)}${renderTakeaways(lesson)}${renderPractice(lesson)}${renderSources(lesson)}
 <div class="lesson-actions"><button id="complete-button" class="complete-button ${completed.has(lesson.id)?'done':''}" type="button">${completed.has(lesson.id)?'✓ 已学完 · 点击取消':'标记这节已学完'}</button>${next?'<button id="next-button" class="next-button" type="button">下一课 →</button>':'<span></span>'}</div>`;
 $('#complete-button').addEventListener('click',()=>{completed.has(lesson.id)?completed.delete(lesson.id):completed.add(lesson.id);saveProgress();renderStages();renderLessonList();renderLesson()});
 if(next)$('#next-button').addEventListener('click',()=>selectLesson(next.id,'force'));
 document.title=`${lesson.title} · 理财从零开始`;
}

// 只在需要时定位到正文：切换阶段不滚动、点目录时若正文已在视野内也不滚动；一律不使用动画。
function scrollToLesson(mode){
 if(mode==='none')return;
 const panel=$('#lesson-panel');
 if(!panel)return;
 const top=panel.getBoundingClientRect().top;
 if(mode==='smart'&&top>=-8&&top<window.innerHeight*0.5)return;
 panel.scrollIntoView({block:'start'});
}

function selectLesson(id,mode='smart'){
 if(!byId[id])return;
 current=id;history.replaceState(null,'',`#${id}`);
 query='';
 const search=$('#lesson-search');
 if(search)search.value='';
 renderStages();renderLessonList();renderLesson();
 scrollToLesson(mode);
}

function renderSearch(){
 const rail=$('.lesson-rail'),list=$('#lesson-list');
 if(!rail||!list||$('#lesson-search'))return;
 const box=document.createElement('div');
 box.className='rail-search';
 box.innerHTML='<label for="lesson-search">搜索课程与术语</label><input id="lesson-search" type="search" placeholder="例如：回撤、ROE、定投" autocomplete="off">';
 rail.insertBefore(box,list);
 $('#lesson-search').addEventListener('input',event=>{query=event.target.value;renderLessonList()});
}

let pdfList=[];
const filesByKey=(typeof bookFiles!=='undefined'?bookFiles:[]).reduce((map,item)=>{(map[item.key]=map[item.key]||[]).push(item);return map},{});
function readActions(key,title){
 const files=filesByKey[key]||[];
 if(!files.length)return '<span class="book-offline">未收录电子版</span>';
 return `<div class="book-actions">${files.map(item=>{
  const index=pdfList.push({...item,title:item.label||title})-1;
  return `<button class="read-button" type="button" data-idx="${index}">在线阅读 <span>${item.size}</span></button>`;
 }).join('')}</div>`;
}

function renderLibrary(){
 pdfList=[];
 const groups=[['入门',['dog','rich','naval','index']],['进阶',['reports','simple','stocks','charlie','crowd','trader']],['延伸阅读',['grow','important','intelligent','security','asset']]];
 const used=new Set(groups.flatMap(group=>group[1]));
 const rest=Object.keys(books).filter(key=>!used.has(key));
 if(rest.length)groups[2][1].push(...rest);
 $('#library-list').innerHTML=groups.map(([label,keys])=>{
  const list=keys.filter(key=>books[key]);
  return `<div class="library-group-title">${label} · ${list.length} 本</div>${list.map(key=>{const book=books[key];return `<div class="book-row"><div><strong>《${book.title}》</strong><p>${book.note}</p></div><div class="book-side"><span>${book.author}</span>${readActions(key,book.title)}</div></div>`}).join('')}`;
 }).join('');
 $('#library-title').textContent=`参考书架 · ${pdfList.length} 册可在线阅读`;
}

function renderNotices(){
 if(typeof bookNotice==='undefined')return;
 const contacts=[bookNotice.issues?`<a href="${bookNotice.issues}" target="_blank" rel="noopener noreferrer">GitHub Issues</a>`:'',bookNotice.email?`<a href="mailto:${bookNotice.email}">${bookNotice.email}</a>`:''].filter(Boolean).join('、');
 const text=`${bookNotice.text}${contacts?` 侵权联系：${contacts}。`:''}`;
 $('#library-notice').innerHTML=text;
 $('#reader-notice').innerHTML=text;
}

function openReader(item){
 closeLibrary();
 $('#reader-title').textContent=`《${item.title}》`;
 $('#reader-meta').textContent=`${item.file.replace('books/','')} · ${item.size} · 仅供个人学习研究`;
 $('#reader-frame').src=item.file;
 $('#reader-frame').title=`《${item.title}》PDF 在线阅读`;
 $('#reader-new').href=item.file;
 $('#reader').hidden=false;
 document.body.style.overflow='hidden';
 $('#reader-close').focus();
}
function closeReader(){
 $('#reader').hidden=true;
 $('#reader-frame').src='about:blank';
 document.body.style.overflow='';
}
function openLibrary(){lastFocus=document.activeElement;$('#library-modal').hidden=false;document.body.style.overflow='hidden';$('#library-close').focus()}
function closeLibrary(){$('#library-modal').hidden=true;document.body.style.overflow='';lastFocus?.focus()}
$('#library-button').addEventListener('click',openLibrary);
$('#mobile-library-button').addEventListener('click',openLibrary);
$('#library-close').addEventListener('click',closeLibrary);
$('#library-modal').addEventListener('click',event=>{if(event.target.dataset.close)closeLibrary()});
$('#library-list').addEventListener('click',event=>{
 const button=event.target.closest('[data-idx]');
 if(!button)return;
 const item=pdfList[Number(button.dataset.idx)];
 if(item)openReader(item);
});
$('#reader-close').addEventListener('click',closeReader);
document.addEventListener('keydown',event=>{
 if(event.key==='Escape'){
  if(!$('#reader').hidden){closeReader();return;}
  if(!$('#library-modal').hidden){closeLibrary();return;}
 }
 if(event.key==='Tab'&&!$('#library-modal').hidden){const focusables=[...$('#library-modal').querySelectorAll('button')],first=focusables[0],last=focusables.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}}
});
window.addEventListener('hashchange',()=>{const id=location.hash.slice(1);if(byId[id]&&id!==current)selectLesson(id,'smart')});
renderLibrary();renderNotices();renderSearch();saveProgress();selectLesson(current,'none');
