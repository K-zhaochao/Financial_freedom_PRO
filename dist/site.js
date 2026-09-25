const extensionBooks=[
 ['纳瓦尔宝典','与《纳瓦尔宝典：财富和幸福指南》主题重合的另一版本'],
 ['怎样选择成长股','成长股研究延伸阅读；该文件为扫描版'],
 ['怎样选择成长股最新全译版','同一主题的另一译版；该文件为扫描版'],
 ['投资最重要的事','投资风险与周期的延伸阅读；该文件为扫描版'],
 ['聪明的投资者','价值投资延伸阅读；该文件为扫描版'],
 ['证券分析','证券估值的进阶参考；该文件未能提取正文'],
 ['资产配置的艺术','组合构建延伸阅读；该文件为扫描版'],
 ['股票作手回忆录','交易心理与市场故事的延伸阅读']
];
const byId=Object.fromEntries(lessons.map((lesson,index)=>[lesson.id,{...lesson,index}]));
const $=selector=>document.querySelector(selector);
let completed=new Set();
try{completed=new Set(JSON.parse(localStorage.getItem('finance-lessons-v1')||'[]'))}catch(_){}
let current=(location.hash||'').replace(/^#/,'');
if(!byId[current])current=lessons[0].id;
let lastFocus=null;
function saveProgress(){
 try{localStorage.setItem('finance-lessons-v1',JSON.stringify([...completed]))}catch(_){}
 $('#progress-text').textContent=`${completed.size} / ${lessons.length} 已学完`;
 $('#progress-fill').style.width=`${completed.size/lessons.length*100}%`;
}
function renderStages(){
 const selected=byId[current].stage;
 $('#lesson-count').textContent=`${lessons.length} 节`;
 $('#stage-nav').innerHTML=stages.map(stage=>{
  const count=lessons.filter(item=>item.stage===stage.id&&completed.has(item.id)).length;
  const total=lessons.filter(item=>item.stage===stage.id).length;
  return `<button class="stage-button ${selected===stage.id?'active':''}" type="button" data-stage="${stage.id}" ${selected===stage.id?'aria-current="step"':''}><span class="stage-number">${stage.icon}</span><strong>${stage.name}</strong><span class="stage-complete">${stage.level} · ${count}/${total}</span></button>`;
 }).join('');
 document.querySelectorAll('[data-stage]').forEach(button=>button.addEventListener('click',()=>selectLesson(lessons.find(item=>item.stage===button.dataset.stage).id)));
}
function renderLessonList(){
 const selected=byId[current],stage=stages.find(item=>item.id===selected.stage),items=lessons.filter(item=>item.stage===stage.id);
 $('#rail-step').textContent=`${stage.level} · 阶段 ${stage.icon}`;
 $('#rail-title').textContent=stage.name;
 $('#rail-subtitle').textContent=stage.subtitle;
 $('#rail-total').textContent=`${items.length} 节短课`;
 $('#lesson-list').innerHTML=items.map((item,index)=>`<button class="lesson-item ${item.id===current?'active':''}" type="button" data-lesson="${item.id}" ${item.id===current?'aria-current="page"':''}><span class="lesson-index">${String(index+1).padStart(2,'0')}</span><span class="lesson-name">${item.title}</span>${completed.has(item.id)?'<span class="lesson-check" aria-label="已学完">✓</span>':''}</button>`).join('');
 document.querySelectorAll('[data-lesson]').forEach(button=>button.addEventListener('click',()=>selectLesson(button.dataset.lesson)));
}
function renderLesson(){
 const lesson=byId[current],stage=stages.find(item=>item.id===lesson.stage),next=lessons[lesson.index+1];
 $('#lesson-panel').innerHTML=`<div class="lesson-meta"><span>${stage.level} · 阶段 ${stage.icon} / 第 ${String(lesson.index+1).padStart(2,'0')} 课</span><span class="tag">${lesson.tag}</span><span class="time">约 ${lesson.minutes} 分钟</span></div>
 <h2>${lesson.title}</h2><p class="lesson-lead">${lesson.lead}</p>${renderIllustration(lesson.id)}<div class="lesson-divider"></div><div class="section-label">这节课要弄明白</div>
 <div class="lesson-points">${lesson.points.map(([title,body],index)=>`<section class="point"><span class="point-number">${index+1}</span><div><h3>${title}</h3><p>${body}</p></div></section>`).join('')}</div>${renderDiagram(lesson.id)}
 <div class="example-box"><strong>用一个例子想清楚</strong><p>${lesson.example}</p></div><div class="task-box"><strong>动手做一遍</strong><p>${lesson.task}</p></div>
 <div class="sources"><h3>本课参考书目与章节</h3><div class="source-list">${lesson.sources.map(([key,chapter])=>`<span class="source-pill">《${books[key].title}》 · ${chapter}</span>`).join('')}</div></div>
 <div class="lesson-actions"><button id="complete-button" class="complete-button ${completed.has(lesson.id)?'done':''}" type="button">${completed.has(lesson.id)?'✓ 已学完 · 点击取消':'标记这节已学完'}</button>${next?'<button id="next-button" class="next-button" type="button">下一课 →</button>':'<span></span>'}</div>`;
 $('#complete-button').addEventListener('click',()=>{completed.has(lesson.id)?completed.delete(lesson.id):completed.add(lesson.id);saveProgress();renderStages();renderLessonList();renderLesson()});
 if(next)$('#next-button').addEventListener('click',()=>selectLesson(next.id,true));
 document.title=`${lesson.title} · 理财从零开始`;
}
function selectLesson(id,scroll=true){
 if(!byId[id])return;
 current=id;history.replaceState(null,'',`#${id}`);
 renderStages();renderLessonList();renderLesson();
 if(scroll)$('#lesson-panel').scrollIntoView({behavior:'smooth',block:'start'});
}
function renderLibrary(){
 $('#library-list').innerHTML=`<div class="library-group-title">课程核心参考 · ${Object.keys(books).length} 本</div>${Object.values(books).map(book=>`<div class="book-row"><div><strong>《${book.title}》</strong><p>${book.note}</p></div><span>${book.author}</span></div>`).join('')}<div class="library-group-title">延伸书目 · ${extensionBooks.length} 本</div>${extensionBooks.map(([title,note])=>`<div class="book-row"><div><strong>《${title}》</strong><p>${note}</p></div><span>延伸阅读</span></div>`).join('')}`;
}
function openLibrary(){lastFocus=document.activeElement;$('#library-modal').hidden=false;document.body.style.overflow='hidden';$('#library-close').focus()}
function closeLibrary(){$('#library-modal').hidden=true;document.body.style.overflow='';lastFocus?.focus()}
$('#library-button').addEventListener('click',openLibrary);
$('#mobile-library-button').addEventListener('click',openLibrary);
$('#library-close').addEventListener('click',closeLibrary);
$('#library-modal').addEventListener('click',event=>{if(event.target.dataset.close)closeLibrary()});
document.addEventListener('keydown',event=>{
 if(event.key==='Escape'&&!$('#library-modal').hidden)closeLibrary();
 if(event.key==='Tab'&&!$('#library-modal').hidden){const focusables=[...$('#library-modal').querySelectorAll('button')],first=focusables[0],last=focusables.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}}
});
window.addEventListener('hashchange',()=>{const id=location.hash.slice(1);if(byId[id]&&id!==current)selectLesson(id,false)});
renderLibrary();saveProgress();selectLesson(current,false);
