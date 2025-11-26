import { useEffect, useRef } from "react";

export default function CloudsBackground() {
  const vantaRef = useRef(null);

  useEffect(() => {
    const effect = window.VANTA.CLOUDS({
      el: vantaRef.current,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      skyColor: 0x1a0f1a,
      cloudColor: 0x0,
      sunColor: 0x0,
      sunGlareColor: 0x0,
      sunlightColor: 0x0,
      speed: 2.6,
    });

    return () => {
      effect.destroy();
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      style={{
        width: "100%",
        height: "100vh",
        zIndex: "-2",
        position: "fixed",
        top: "0",
        left: "0",
        opacity: "0.5",
      }}
    ></div>
  );
}
