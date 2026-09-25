const lessonVisuals = {
  goal:{kind:'flow',title:'把目标拆成今天能做的事',items:[['12,000 元','一年后要用'],['3,000 元','已经准备'],['750 元 / 月','接下来每月留出']],note:'忽略收益，仅演示倒推目标的算法。'},
  cashflow:{kind:'stack',title:'月收入 8,000 元去了哪里',items:[['必要支出','4,800 元',60],['可调整支出','2,000 元',25],['结余','1,200 元',15]],note:'先看清流向，再决定调整哪一项。'},
  buffer:{kind:'flow',title:'每笔钱先有自己的位置',items:[['日常开销','随时要用'],['应急储备','突发支出'],['长期投资','允许波动']],note:'应急金的作用，是让长期投资不被短期账单打断。'},
  compounding:{kind:'bars',title:'时间与费用都在参与复利',items:[['起点','10,000',46],['10 年后','16,289',76]],note:'按年化 5% 恒定复利的算术演示；现实收益不会平滑上升。'},
  securities:{kind:'grid',title:'三种工具，三种权利',items:[['股票','持有企业的一部分'],['债券','约定的债权关系'],['基金','按规则持有一篮子资产']],note:'先看底层权利，再看宣传名称。'},
  risk:{kind:'grid',title:'投资风险至少看三层',items:[['价格波动','短期市值可能变化'],['永久损失','企业或债务可能出问题'],['流动性','急用时能否合理退出']],note:'涨跌幅只是风险的一部分。'},
  fees:{kind:'flow',title:'真正拿到手的结果',items:[['产品回报','先看投资本身'],['减去成本','管理、交易等费用'],['实际结果','还受税费与时点影响']],note:'长期持有时，持续费用会重复影响结果。'},
  index:{kind:'basket',title:'指数基金把风险分散到多家公司',items:[['制造','A'],['消费','B'],['医疗','C'],['科技','D'],['服务','E'],['能源','F']],note:'分散单家公司风险，仍要承担整个市场的波动。'},
  fundtypes:{kind:'grid',title:'先按用途给基金分类',items:[['货币基金','重视流动性'],['债券基金','关注利率与信用'],['宽基股票基金','覆盖多个行业'],['行业基金','集中于一个赛道']],note:'同叫“基金”，风险与期限可能差很多。'},
  dca:{kind:'dca',title:'每月投入相同金额，买到的份额会变',items:[['第 1 月','价格 10','50 份',50],['第 2 月','价格 8','62.5 份',63],['第 3 月','价格 12','约 41.7 份',42]],note:'每月投入 500 元的演示；定投不会保证最终盈利。'},
  fundcheck:{kind:'grid',title:'挑基金前，依次核对',items:[['① 目标','投向哪里'],['② 持仓','是否重叠'],['③ 费用','长期成本'],['④ 执行','跟踪与流动性'],['⑤ 适配','期限与承受力']],note:'最近的涨幅不在这五项前面。'},
  business:{kind:'flow',title:'从企业经营追溯到股东回报',items:[['客户需求','谁愿意付钱'],['企业经营','如何提供产品'],['利润与现金','成本后还剩多少']],note:'先弄清生意，再研究股票价格。'},
  balance:{kind:'equation',title:'资产负债表的基本关系',items:[['资产','100'],['负债','60'],['所有者权益','40']],note:'资产的账面金额，不等于能立即取出的现金。'},
  income:{kind:'equation',title:'收入增长，不一定带来更多毛利',items:[['收入','120'],['营业成本','90'],['毛利','30']],note:'与上一期比较，还要看费用和利润是否同步变化。'},
  cashstatement:{kind:'grid',title:'现金流量表的三条线',items:[['经营','主业收付现金'],['投资','购买资产与扩张'],['筹资','借款、还款与分红']],note:'三项要放在一起，解释公司如何运转。'},
  valuation:{kind:'split',title:'价格与价值，都是要检验的判断',items:[['市场价格','今天能看到的报价'],['估计价值','基于假设的范围']],note:'“看起来便宜”时，也要找出可能推翻判断的证据。'},
  allocation:{kind:'flow',title:'期限不同，钱的任务也不同',items:[['近期','优先可取用'],['中期','重视稳定'],['长期','才考虑较大波动']],note:'这是一种分类方法，不是统一的投资比例。'},
  rebalance:{kind:'rebalance',title:'把比例拉回原来的风险计划',items:[['原计划',50,50],['上涨后',60,40],['再平衡',50,50]],note:'比例仅用于示意，实际调整还要考虑成本和目标变化。'},
  psychology:{kind:'split',title:'情绪来时，先让规则说话',items:[['冲动下单','看到涨跌，立刻跟随'],['暂停核对','回看目标、风险和买入理由']],note:'给自己一个检查步骤，降低从众与恐慌的影响。'},
  plan:{kind:'grid',title:'一张规则卡的四个角',items:[['目标','何时用钱'],['金额','每月能投入多少'],['边界','能承受什么损失'],['复盘','何时检查与修改']],note:'还拿不准的格子可以留空，回到对应课程补上。'}
};

const stageIllustrations = {
  goal:['stage-start.png','把日常、应急和长期目标分开，才知道每笔钱该去哪。'],
  securities:['stage-market.png','股票、债券和基金代表不同的权利与风险。'],
  index:['stage-fund.png','指数基金是一篮子资产，定期投入是执行节奏。'],
  business:['stage-stock.png','股票研究要回到真实企业和三张财务报表。'],
  allocation:['stage-portfolio.png','资产配置是为不同目标分配不同的风险。'],
  psychology:['psychology.png','市场热闹时，给自己一段核对规则的时间。']
};

function renderIllustration(id) {
  const illustration=stageIllustrations[id];
  if(!illustration)return '';
  return `<figure class="lesson-illustration"><img src="images/${illustration[0]}" alt="${illustration[1]}" loading="lazy"><figcaption>${illustration[1]}</figcaption></figure>`;
}

function renderDiagram(id) {
  const v=lessonVisuals[id];
  if(!v)return '';
  let body='';
  if(v.kind==='flow')body=`<div class="diagram-flow">${v.items.map(([big,small],i)=>`${i?'<span class="diagram-arrow" aria-hidden="true">→</span>':''}<div class="diagram-node"><strong>${big}</strong><span>${small}</span></div>`).join('')}</div>`;
  if(v.kind==='grid')body=`<div class="diagram-grid">${v.items.map(([big,small])=>`<div class="diagram-node"><strong>${big}</strong><span>${small}</span></div>`).join('')}</div>`;
  if(v.kind==='split')body=`<div class="diagram-split">${v.items.map(([big,small])=>`<div class="diagram-node"><strong>${big}</strong><span>${small}</span></div>`).join('')}</div>`;
  if(v.kind==='stack')body=`<div class="diagram-stack">${v.items.map(([name,value,amount],i)=>`<div style="width:${amount}%;background:var(--stack-${i+1})"><strong>${value}</strong><span>${name}</span></div>`).join('')}</div>`;
  if(v.kind==='bars'||v.kind==='dca')body=`<div class="diagram-bars">${v.items.map(item=>`<div class="diagram-bar-item"><div class="diagram-bar" style="height:${item.at(-1)}%"></div><strong>${item[0]}</strong><span>${v.kind==='dca'?`${item[1]} · ${item[2]}`:item[1]}</span></div>`).join('')}</div>`;
  if(v.kind==='basket')body=`<div class="diagram-basket"><div class="diagram-basket-grid">${v.items.map(([name,letter])=>`<span><b>${letter}</b>${name}</span>`).join('')}</div><div class="diagram-basket-label">一篮子不同企业</div></div>`;
  if(v.kind==='equation')body=`<div class="diagram-equation"><div><span>${v.items[0][0]}</span><strong>${v.items[0][1]}</strong></div><b>${id==='income'?'−':'='}</b><div><span>${v.items[1][0]}</span><strong>${v.items[1][1]}</strong></div><b>${id==='income'?'=':'+'}</b><div><span>${v.items[2][0]}</span><strong>${v.items[2][1]}</strong></div></div>`;
  if(v.kind==='rebalance')body=`<div class="diagram-rebalance">${v.items.map(([name,a,b])=>`<div><strong>${name}</strong><div class="balance-bar"><span style="width:${a}%">${a}%</span><span style="width:${b}%">${b}%</span></div></div>`).join('')}</div>`;
  return `<figure class="lesson-diagram"><div class="diagram-title">图解 · ${v.title}</div>${body}<figcaption>${v.note}</figcaption></figure>`;
}
