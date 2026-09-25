const softwareGuide = {
  'sw-map':{title:'一张图认清看盘界面',active:'chart',notes:['① 搜索：先确认证券代码和市场','② 自选：保存观察对象','③ 行情：读价格与成交字段','④ 图表：看分时 / K 线及周期','⑤ 盘口：区分挂单与成交','⑥ 资料：去公告和财报核实']},
  'sw-watch':{title:'自选清单不是交易指令',active:'watch',notes:['① 按研究问题分组','② 代码、名称和市场一起核对','③ 看数据时间，避免把延迟行情当实时','④ 给每项写一条待验证的问题']},
  'sw-quote':{title:'先读行情字段的单位与比较基准',active:'quote',notes:['① 最新价是最近成交价','② 涨跌幅一般相对昨收','③ 成交量与成交额是两种单位','④ 先核对时间，再比较数字']},
  'sw-orderbook':{title:'五档盘口：可见委托排队示意',active:'book',notes:['① 卖一：当前可见最低卖价','② 买一：当前可见最高买价','③ 两者相差 0.01 元','④ 挂单可撤，成交另行记录']},
  'sw-intraday':{title:'分时图：上方价格，下方成交量',active:'intraday',notes:['① 横轴：交易时间','② 纵轴：价格或相对昨收涨跌','③ 蓝线：示意价格，虚线：示意均价','④ 下方柱形：对应时段成交量']},
  'sw-kline':{title:'一根 K 线包含四个价格',active:'kline',notes:['① 上影线顶端：最高价','② 实体两端：开盘价与收盘价','③ 下影线底端：最低价','④ 每根代表的时间取决于周期设置']},
  'sw-ths':{title:'同花顺功能路线示意',active:'ths',notes:['① 搜索证券并核对代码','② 自选里保存观察对象','③ 分时、K 线与盘口用于读行情','④ F10 和公告用于查公司资料']},
  'sw-east':{title:'东方财富功能路线示意',active:'east',notes:['① 自选整理研究对象','② 公告看披露日期与原文','③ 财务数据注意报告期和单位','④ 基金页核对类型、费用和跟踪标的']},
  'sw-tv':{title:'TradingView 图表工作台示意',active:'tv',notes:['① 搜索后确认交易所','② 先设图表周期和价格坐标','③ 指标与画线帮助描述历史','④ 提醒触发后仍需重新核对信息']},
  'sw-tgb':{title:'淘股吧热帖：三色标注法',active:'forum',notes:['① 蓝色：可回到公告核对的事实','② 黄色：作者对事实的解释','③ 红色：尚未发生的预测','④ 关注发布时间和原始出处']},
  'sw-glossary':{title:'读帖子时，把黑话翻译成普通话',active:'slang',notes:['① “放量”先找成交量数据','② “突破”先问比较区间','③ “吃肉”是情绪口语','④ “明天”之后的结论仍是预测']}
};
function softwarePlot(kind){
  if(kind==='book') return '<div class="sw-book"><div><b>卖三</b><span>10.03</span><small>120 手</small></div><div><b>卖二</b><span>10.02</span><small>90 手</small></div><div class="sw-key"><b>卖一 ①</b><span>10.01</span><small>160 手</small></div><div class="sw-spread">买卖价差 0.01 元 ③</div><div class="sw-key"><b>买一 ②</b><span>10.00</span><small>230 手</small></div><div><b>买二</b><span>9.99</span><small>80 手</small></div><div><b>买三</b><span>9.98</span><small>110 手</small></div></div>';
  if(kind==='kline') return '<div class="sw-kline-demo"><div class="sw-candle"><span class="sw-high">① 高 10.50</span><i></i><em></em><span class="sw-low">③ 低 9.80</span></div><div class="sw-ohlc"><b>日 K（示意）</b><span>开 10.00</span><span>收 10.30</span><span>高 10.50</span><span>低 9.80</span><small>② 实体两端是开 / 收</small></div></div>';
  if(kind==='forum'||kind==='slang') return '<div class="sw-post"><div class="sw-post-head">社区帖子 · 虚构示例 <span>09:35 发布</span></div><p><mark class="fact">公司昨日发布了公告。</mark> <mark class="opinion">我认为市场还没充分理解。</mark> <mark class="guess">明天一定继续涨。</mark></p><div class="sw-post-foot">事实 → 公告原文　观点 → 作者解释　预测 → 等待验证</div></div>';
  let line=kind==='intraday'?'18,83 58,72 96,82 135,48 174,56 215,35 254,52 291,23 330,35 370,18':'18,82 58,73 96,79 135,57 174,65 215,42 254,48 291,31 330,40 370,22';
  return '<div class="sw-chart"><div class="sw-chart-head"><span>示例证券 000000</span><b>10.20</b><small>+2.00%</small></div><svg viewBox="0 0 390 150" role="img" aria-label="虚构价格与成交量示意图"><line x1="15" y1="34" x2="377" y2="34"/><line x1="15" y1="70" x2="377" y2="70"/><line x1="15" y1="106" x2="377" y2="106"/><polyline class="sw-average" points="18,77 100,71 180,62 260,51 370,43"/><polyline class="sw-price" points="'+line+'"/><path class="sw-volume" d="M27 146v-20 M55 146v-13 M84 146v-20 M112 146v-33 M141 146v-23 M169 146v-30 M198 146v-16 M226 146v-36 M255 146v-22 M283 146v-43 M312 146v-31 M340 146v-25 M368 146v-39"/></svg><div class="sw-axis"><span>09:30</span><span>11:30</span><span>15:00</span></div></div>';
}
function softwareMock(kind){
  if(kind==='book'||kind==='kline'||kind==='forum'||kind==='slang') return softwarePlot(kind);
  let labels={
    watch:['自选分组 ①','指数基金','待读财报','已核对公告'],
    quote:['行情字段 ①','最新价','昨收','成交额'],
    intraday:['走势图 ①','分时','日 K','成交量'],
    ths:['同花顺 ①','自选','分时 / K 线','F10 / 公告'],
    east:['东方财富 ①','自选','公告','财务 / 基金'],
    tv:['TradingView ①','观察列表','图表周期','指标 / 提醒'],
    chart:['导航 ①','自选 ②','行情 ③','资料 ⑥']
  }[kind]||['导航','自选','行情','资料'];
  return '<div class="sw-window"><div class="sw-window-bar"><span class="sw-dots">● ● ●</span><span>教学界面 · 虚构数据</span><span>⌕ 搜索证券 / 代码 ①</span></div><div class="sw-window-body"><div class="sw-window-side"><strong>'+labels[0]+'</strong><span>'+labels[1]+'</span><span>'+labels[2]+'</span><span>'+labels[3]+'</span></div><div class="sw-window-main"><div class="sw-tabs"><b>'+((kind==='east')?'公告　财务数据　基金':(kind==='tv')?'图表　指标　提醒':'分时　日 K　周 K　资料')+'</b><span>周期 ▾</span></div>'+softwarePlot(kind)+'</div><div class="sw-window-right"><strong>'+(kind==='ths'?'F10 / 公告 ④':kind==='east'?'资料核对 ②':kind==='tv'?'工具设置 ③':'盘口 / 资料 ⑤')+'</strong><span>卖一　10.01</span><span>买一　10.00</span><span>成交额　示意</span><small>查看原始资料 →</small></div></div></div>';
}
function renderSoftwareVisual(id){
  const guide=softwareGuide[id];
  if(!guide)return '';
  return '<figure class="software-figure"><div class="software-figure-heading"><span>图解 · '+guide.title+'</span><small>教学重绘 / 虚构数据 / 非软件截图</small></div>'+softwareMock(guide.active)+'<figcaption><ol>'+guide.notes.map(note=>'<li>'+note+'</li>').join('')+'</ol><p>实际菜单、颜色和数据权限会因版本、市场与设备不同而变化。</p></figcaption></figure>';
}
