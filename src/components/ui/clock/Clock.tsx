import { useEffect, useRef } from "react";
import "./Clock.css";

function Clock() {
  const secondsRef = useRef<HTMLSpanElement>(null);
  const minutesRef = useRef<HTMLSpanElement>(null);
  const hoursRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    function setTime() {
      const now = new Date();

      const seconds = now.getSeconds();
      const secondsDegrees = (seconds / 60) * 360 + 90;

      if (secondsRef.current) {
        secondsRef.current.style.transform = `rotate(${secondsDegrees}deg)`;
      }

      const minutes = now.getMinutes();
      const minutesDegrees = (minutes / 60) * 360 + (seconds / 60) * 6 + 90;
      if (minutesRef.current) {
        minutesRef.current.style.transform = `rotate(${minutesDegrees}deg)`;
      }

      const hours = now.getHours();
      const hoursDegrees = (hours / 12) * 360 + (minutes / 60) * 30 + 90;
      if (hoursRef.current) {
        hoursRef.current.style.transform = `rotate(${hoursDegrees}deg)`;
      }
    }

    const intervalId = setInterval(setTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <main id="clock">
      <section id="clock-section">
        <span className="hands" ref={secondsRef}></span>
        <span className="hands" ref={minutesRef}></span>
        <span className="hands" ref={hoursRef}></span>
      </section>
    </main>
  );
}

export default Clock;
