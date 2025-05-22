import { useCallback, useEffect, useState } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import bgDesktop from '../../../src/Assets/bg-3-w.png'
import bgMobile from '../../../src/Assets/bg-1.png'
const ParticleJsContainer = ({ children }) => {
    const particlesInit = useCallback(async (engine) => {
        console.log(engine);
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async (container) => {
        console.log(container);
    }, []);


    const [background, setBackground] = useState(bgDesktop);

    useEffect(() => {
        const updateBackground = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 768) {
            setBackground(bgMobile);
        } else {
            setBackground(bgDesktop);
        }
        };

        updateBackground();
        window.addEventListener("resize", updateBackground); 
    }, []);

    return (
        <div
            style={{
                position: "fixed",
                width: "100vw",
                height: "100vh",
                // background: "linear-gradient(rgb(0, 0, 0) 0%,  rgb(70, 70, 70) 100%)", // your gradient here
                backgroundImage : `url(${background})`,
                 backgroundSize: "100% 100%",
                zIndex: -1,
                top: 0,
                left: 0,
            }}>
            {/* <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={{
                    background: {
                        color: {
                            value: "transparent"
                        }
                    },
                    fpsLimit: 120,
                    interactivity: {
                        events: {
                            onClick: {
                                enable: true,
                                mode: "push"
                            },
                            onHover: {
                                enable: true,
                                mode: "repulse"
                            },
                            resize: true
                        },
                        modes: {
                            push: {
                                quantity: 4
                            },
                            repulse: {
                                distance: 100,
                                duration: 0.4
                            }
                        }
                    },
                    particles: {
                        color: {
                            value: "#ffffff"
                        },
                        links: {
                            color: "#ffffff",
                            distance: 150,
                            enable: true,
                            opacity: 0.5,
                            width: 1
                        },
                        collisions: {
                            enable: true
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outModes: {
                                default: "bounce"
                            },
                            random: false,
                            speed: 1,
                            straight: false
                        },
                        number: {
                            density: {
                                enable: true,
                                area: 1000
                            },
                            value: 120
                        },
                        opacity: {
                            value: 0.5
                        },
                        shape: {
                            type: "circle"
                        },
                        size: {
                            value: { min: 1, max: 4 }
                        }
                    },
                    detectRetina: true
                }}
            /> */}
        </div>

    );
};

export default ParticleJsContainer;
