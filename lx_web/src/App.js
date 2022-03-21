import styles from './App.module.less';
import { useEffect, useMemo } from 'react';
import ScrollMagic from 'scrollmagic';
import { gsap, TimelineLite, TweenLite } from 'gsap';

let lite = null;

function App() {

    const addLite = (id) => {
        if (id === "6") {
            lite.add(TweenLite.to(document.getElementById(id), 8, { opacity: 1 }))
            return;
        }
        lite.add(TweenLite.to(document.getElementById(id), 8, { opacity: 1 }))
        lite.add(TweenLite.to(document.getElementById(id), 8, { opacity: 0 }))
    }

    const addLite20 = (id) => {
        if (id === "l0") {
            lite.add(TweenLite.to(document.getElementById(id), 1, { opacity: 0 }))
            return;
        }
        lite.add(TweenLite.to(document.getElementById(id), 1, { opacity: 1 }))
        lite.add(TweenLite.to(document.getElementById(id), 1, { opacity: 0 }))
    }

    useMemo(() => document.body.style.overflow = "hidden", [])

    useEffect(() => {
        gsap.registerPlugin(TimelineLite, TweenLite);
        lite = new TimelineLite()

        addLite20('l0')
        addLite20('l1')
        addLite20('l2')
        addLite20('l3')
        addLite20('l4')
        addLite20('l5')
        addLite20('l6')
        addLite("1")
        addLite("2")
        addLite("3")
        addLite("4")
        addLite("5")
        addLite("6")
        lite.pause();

        let i = 0
        let timer = setInterval(() => {
            console.log(i)
            if (i >= 13) {
                lite.seek(21)
                window.clearInterval(timer)
                document.body.style.overflow = ""
                return;
            }
            i += 1
            lite.seek(i);
        }, 50)



        const controller = new ScrollMagic.Controller()
        new ScrollMagic.Scene({
            triggerHook: 0,
            triggerElement: "#scene",
            duration: window.innerHeight * 2.5
        }).setPin('#scene').on("progress", (e) => {
            if (e.progress === 0) {
                return;
            }
            lite.seek((parseInt(e.progress * 80)) + 21)
        }).addTo(controller)

    }, [])

    return (
        <div id="scene" style={{ height: '100vh' }}>
            <div className={styles.main}>
                <div id="l0" style={{ opacity: 1, textAlign: "center" }}>Indlæser</div>
                <div id="l1" style={{ opacity: 0, textAlign: "center" }}>Loading</div>
                <div id="l2" style={{ opacity: 0, textAlign: "center" }}>እፓቫልይል</div>
                <div id="l3" style={{ opacity: 0, textAlign: "center" }}>#%&*@#$</div>
                <div id="l4" style={{ opacity: 0, textAlign: "center" }}>加载中</div>
                <div id="l5" style={{ opacity: 0, textAlign: "center" }}>数据</div>
                <div id="l6" style={{ opacity: 0, textAlign: "center" }}>.......</div>
                <div id="1" style={{ opacity: 0 }}>
                    <p>咳咳，<br />往下滑</p>
                </div>
                <div id="2" style={{ opacity: 0 }}>
                    <p>别太快</p>
                </div>
                <div id="3" style={{ opacity: 0 }}>
                    <p>是不是很神奇</p>
                </div>
                <div id="4" style={{ opacity: 0 }}>
                    <p>好了，上班了</p>
                </div>
                <div id="5" style={{ opacity: 0 }}>
                    <p>抱抱你<br />乖~</p>
                </div>
                <div id="6" style={{ opacity: 0, textAlign: "center" }}>
                    <p>拜拜<br />✨</p>
                </div>
            </div>
        </div>
    );
}

export default App;
