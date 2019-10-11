import React, { useState, useEffect, useRef } from 'react';
import { Container, Card } from 'semantic-ui-react';


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

      return { h: h, m: m, s: s };
    });
  }

  return [time, countDown];
}



function App() {

  const [time, countDown] = useTimer(1, 0, 3);

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
      <Container>
        <div className="timeblock">
          <Card>
          <h1 className="timer-text">{time.h} : {time.m} : {time.s}</h1>

          </Card>
        </div>
      </Container>
    </div>
  );
}

export default App;
