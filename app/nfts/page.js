'use client';
import { useState } from 'react';
import { useAccount, useConnect } from 'wagmi';
import { injected } from 'wagmi/connectors';
import Link from 'next/link';

const GENERALS = [
  { tier:'Common',    color:'#94a3b8', glow:'rgba(148,163,184,.4)', img:'/nfts/common.png',    supply:'5,000', cost:'100 $DMX',   boost:'+5% ATK',   power:10,  desc:'Battle-worn soldiers. The backbone of every army. Easy to recruit, easy to replace.' },
  { tier:'Rare',      color:'#3b82f6', glow:'rgba(59,130,246,.5)',  img:'/nfts/rare.png',      supply:'3,000', cost:'500 $DMX',   boost:'+15% ATK',  power:30,  desc:'Elite commanders with electric-enhanced armor. Turn the tide in small skirmishes.' },
  { tier:'Epic',      color:'#8b5cf6', glow:'rgba(139,92,246,.5)',  img:'/nfts/epic.png',      supply:'1,500', cost:'2,000 $DMX', boost:'+30% ATK',  power:70,  desc:'Ancient warlords empowered by dark runes. Fear them on the battlefield.' },
  { tier:'Legendary', color:'#f59e0b', glow:'rgba(245,158,11,.6)',  img:'/nfts/legendary.png', supply:'450',   cost:'10,000 $DMX',boost:'+60% ATK',  power:120, desc:'God-warriors with divine flaming blades. Whole clans fall before a single Legendary.' },
  { tier:'Mythic',    color:'#ef4444', glow:'rgba(239,68,68,.6)',   img:'/nfts/mythic.png',    supply:'50',    cost:'50,000 $DMX',boost:'+100% ATK', power:200, desc:'Supreme cosmic beings. The rarest force in all of Dominex. You will be feared.' },
];

export default function NFTsPage() {
  const [selected, setSelected] = useState(GENERALS[4]); // default Mythic
  const { isConnected } = useAccount();
  const { connect } = useConnect();

  return (
    <div style={{ minHeight:'100vh', background:'#030308', color:'#f1f5f9', fontFamily:'Inter,sans-serif' }}>
      {/* Nav */}
      <nav style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 28px', borderBottom:'1px solid rgba(255,255,255,.07)', background:'rgba(3,3,8,.85)', backdropFilter:'blur(20px)', position:'sticky', top:0, zIndex:50 }}>
        <Link href="/" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none', color:'inherit' }}>
          <div style={{ width:34, height:34, borderRadius:9, background:'linear-gradient(135deg,#f59e0b,#ef4444)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900, fontSize:17, color:'#000' }}>D</div>
          <span style={{ fontFamily:'Rajdhani,sans-serif', fontSize:20, fontWeight:700, letterSpacing:1 }}>DOMINEX</span>
        </Link>
        <div style={{ display:'flex', gap:12 }}>
          <Link href="/game" style={{ padding:'9px 20px', borderRadius:10, background:'linear-gradient(135deg,#f59e0b,#ef4444)', textDecoration:'none', color:'#000', fontWeight:800, fontSize:14 }}>⚔️ Play</Link>
        </div>
      </nav>

      {/* Header */}
      <div style={{ textAlign:'center', padding:'64px 24px 40px', background:'radial-gradient(ellipse at center, rgba(239,68,68,.08) 0%, transparent 70%)' }}>
        <div style={{ fontSize:12, fontWeight:700, letterSpacing:2, textTransform:'uppercase', color:'#f59e0b', marginBottom:12 }}>NFT Collection</div>
        <h1 style={{ fontSize:'clamp(32px,6vw,64px)', fontFamily:'Rajdhani,sans-serif', fontWeight:700, letterSpacing:-1, marginBottom:16 }}>10,000 General NFTs</h1>
        <p style={{ color:'#64748b', fontSize:16, maxWidth:500, margin:'0 auto' }}>
          Mint a General and unleash power in battle. Rarer generals carry game-changing abilities. Burn $DMX to mint.
        </p>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 24px 80px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:40, alignItems:'start' }}>

        {/* Left — Selected NFT big preview */}
        <div style={{ position:'sticky', top:90 }}>
          <div style={{
            borderRadius:24, overflow:'hidden', border:'2px solid',
            borderColor: selected.color + '60',
            boxShadow: '0 0 60px ' + selected.glow,
            background:'rgba(255,255,255,.03)',
            transition:'all .4s ease',
          }}>
            <img src={selected.img} alt={selected.tier} style={{ width:'100%', display:'block' }} />
            <div style={{ padding:'24px 28px' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
                <div style={{ fontSize:24, fontWeight:900, fontFamily:'Rajdhani,sans-serif', color:selected.color }}>{selected.tier} General</div>
                <div style={{ padding:'4px 14px', borderRadius:20, background:selected.color + '20', border:'1px solid ' + selected.color + '50', fontSize:13, fontWeight:700, color:selected.color }}>
                  {selected.boost}
                </div>
              </div>
              <p style={{ color:'#64748b', fontSize:14, lineHeight:1.7, marginBottom:20 }}>{selected.desc}</p>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10, marginBottom:24 }}>
                {[{k:'Supply',v:selected.supply},{k:'Power',v:selected.power},{k:'Mint Cost',v:selected.cost}].map(d=>(
                  <div key={d.k} style={{ background:'rgba(255,255,255,.04)', borderRadius:12, padding:'12px 14px', textAlign:'center' }}>
                    <div style={{ fontSize:11, color:'#475569', fontWeight:600, marginBottom:4 }}>{d.k}</div>
                    <div style={{ fontWeight:800, color:'#f1f5f9', fontSize:15 }}>{d.v}</div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => isConnected ? null : connect({ connector: injected() })}
                style={{ width:'100%', padding:'16px', borderRadius:14, background:'linear-gradient(135deg,'+selected.color+','+selected.color+'99)', border:'none', color: selected.tier==='Common'?'#1e293b':'#000', fontWeight:900, fontSize:16, cursor:'pointer', letterSpacing:.5 }}
              >
                {isConnected ? '🎯 Mint ' + selected.tier + ' — ' + selected.cost : '🔗 Connect Wallet to Mint'}
              </button>
            </div>
          </div>
        </div>

        {/* Right — Tier cards */}
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <div style={{ fontSize:13, fontWeight:700, color:'#475569', textTransform:'uppercase', letterSpacing:1, marginBottom:4 }}>Select Tier</div>
          {GENERALS.map(g => (
            <div key={g.tier}
              onClick={() => setSelected(g)}
              style={{
                display:'flex', alignItems:'center', gap:16, padding:'16px 20px',
                borderRadius:18, border:'1.5px solid',
                borderColor: selected.tier===g.tier ? g.color : 'rgba(255,255,255,.07)',
                background: selected.tier===g.tier ? g.color+'12' : 'rgba(255,255,255,.02)',
                cursor:'pointer', transition:'all .25s',
                boxShadow: selected.tier===g.tier ? '0 0 20px '+g.glow : 'none',
              }}
            >
              <img src={g.img} alt={g.tier} style={{ width:64, height:64, borderRadius:12, objectFit:'cover', border:'2px solid '+g.color+'50' }} />
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:800, fontSize:16, color:g.color, fontFamily:'Rajdhani,sans-serif' }}>{g.tier}</div>
                <div style={{ fontSize:12, color:'#475569', marginTop:2 }}>{g.supply} supply · {g.boost}</div>
              </div>
              <div style={{ textAlign:'right' }}>
                <div style={{ fontWeight:700, fontSize:14, color:'#f1f5f9' }}>{g.cost}</div>
                <div style={{ fontSize:11, color:'#475569' }}>Power {g.power}</div>
              </div>
            </div>
          ))}

          {/* Stats box */}
          <div style={{ marginTop:8, background:'rgba(245,158,11,.06)', border:'1px solid rgba(245,158,11,.2)', borderRadius:16, padding:'20px 24px' }}>
            <div style={{ fontWeight:700, marginBottom:12, fontSize:14, color:'#f59e0b' }}>📊 Collection Stats</div>
            {[{k:'Total Supply',v:'10,000'},{k:'Burn on Mint',v:'100% of cost'},{k:'ATK Boost Range',v:'+5% to +100%'},{k:'Chain',v:'Base Chain'}].map(s=>(
              <div key={s.k} style={{ display:'flex', justifyContent:'space-between', fontSize:13, marginBottom:8 }}>
                <span style={{ color:'#64748b' }}>{s.k}</span>
                <span style={{ fontWeight:700 }}>{s.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
