import React, { useState, useEffect, useRef } from 'react';
import { Container, Card , Input } from 'semantic-ui-react';


const useTimer = (h, m, s) => {
  const [time, setTime] = useState({ h: h, m: m, s: s });

  const countDown = () => {
    setTime(cur => {
      let h, m, s;
      s = cur.s - 1;
      m = cur.m;
      h = cur.h;

      if (s < 0 && (h > 0 || m > 0)) {
        if (m > 0) m -= 1;
        else {
          h -= 1;
          m = 59;
        }
        s = 59;
      }

      if(m<0 && h>0){
        m = 59 ;
        h-=1 ; 
      }
      h = Math.max(h,0) ; 
      if(h<=0 && m<=0 && s<=0) h=m=s = 0 ;

      return { h: h, m: m, s: s };
    });
  }

  return [time, countDown , setTime];
}


const Controller = (props)=>{
  const {time , setTime} = props ; 
  return (
  <div style={{display:'flex' , position:'absolute'  }}>
    <Input label='Hour' value={time.h} onChange={e=>setTime({...time , h:e.target.value })} />
    <Input label = 'Minute' value={time.m} onChange={e=>setTime({...time , m : e.target.value })} />
    <Input label='Second' value={time.s} onChange={e=>setTime({...time , s :e.target.value })} />
  </div>
  );
}


function App() {

  const [time, countDown , setTime] = useTimer(12,0,0);
  const [showController , setShowController] = useState(false) ; 

  useEffect(() => {
    const id_ = setInterval(() => {
      countDown();
      console.log(time);
    }, 1000);

    return () => {
      clearInterval(id_);
    }
  }, []);

  return (
    <div className="App">
      {
          showController &&
          <Controller time={time} setTime={setTime} />
        }
      <Container>
        
        <span onMouseOver={()=>setShowController(true)} onMouseLeave={()=>setShowController(false)} className="timer-text">{time.h<10?'0'+time.h:time.h} : {time.m<10?'0'+time.m:time.m} : {time.s<10?'0'+time.s:time.s}</span>

      </Container>
 
    </div>
  );
}

export default App;
