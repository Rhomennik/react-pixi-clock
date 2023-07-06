import { FC, useEffect, useRef, useState } from "react";
import { Container, Text, Sprite, useTick } from "@pixi/react";
import * as PIXI from "pixi.js";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { Tween, Easing } from "@tweenjs/tween.js";

import "./App.css";

let tweenHour: any = () => null;
let tweenMinute: any = () => null;
let tweenSecond: any = () => null;
let tweenSecondRange: any = () => null;

let countHour = 0;

function calcRotationToRad(horas: number) {
  const rotate = (horas / 12) * (2 * Math.PI);
  return rotate;
}
function calcRotationToRadHourMinute(horas: number) {
  const rotate = (horas / 60) * (2 * Math.PI);
  return rotate;
}

type ClockProps = {
  input: any;
};

const Clock: FC<ClockProps> = ({ input }) => {
  const [play, setPlay] = useState(false);
  const [color, setColor] = useState(false);

  const spriteHour = useRef(null);
  const spriteMinute = useRef(null);
  const spriteSeconds = useRef(null);

  const spriteRangeHour = useRef(null);

  const handleAnim = () => {
    const durations = {
      hour: 2000,
      minute: 3000,
      second: 4000,
    };

    const completeRotate = 6.28319;
    const baseValueHour = completeRotate * 3;
    const baseValueMinutes = completeRotate * 4;
    const baseValueSeconds = completeRotate * 8;

    const toValueHour = baseValueHour + calcRotationToRad(input.hour);
    const toValueMinute =
      baseValueMinutes + calcRotationToRadHourMinute(input.minute);
    const toValueSeconds =
      baseValueSeconds + calcRotationToRadHourMinute(input.second);

    tweenHour = new Tween(spriteHour.current)
      .to({ rotation: play ? toValueHour : 0 }, durations.hour)
      .easing(Easing.Quadratic.Out)
      .onUpdate((ev: any) => {
        if (ev.rotation <= 0) return;

        // //exact
        // if (
        //   (ev.rotation >= (11 / 12) * 6.28319 &&
        //     ev.rotation <= (13 / 12) * 6.28319) ||
        //   (ev.rotation >= (23 / 12) * 6.28319 &&
        //     ev.rotation <= (1 / 12) * 6.28319)
        // ) {
        //   countHour++;
        //   return setColor(true);
        // }

        // setColor(false);

        //exact
        if (countHour < Math.floor(ev.rotation / 6.28319)) {
          countHour++;
          return setColor(true);

          // tweenSecondRange.start();
        }

        setColor(false);
      })
      .onComplete(() => {
        // setPlay(false);
      })
      .start();

    tweenMinute = new Tween(spriteMinute.current)
      .to({ rotation: play ? toValueMinute : 0 }, durations.minute)
      .easing(Easing.Quadratic.Out)
      .onComplete(() => {
        // setPlay(false);
      })
      .start();

    tweenSecond = new Tween(spriteSeconds.current)
      .to({ rotation: play ? toValueSeconds : 0 }, durations.second)
      .easing(Easing.Quadratic.Out)
      .onComplete(() => {
        // setPlay(false);
      })
      .start();

    // range
    tweenSecondRange = new Tween(spriteRangeHour.current)
      .to({ rotation: 0 }, durations.hour)
      .easing(Easing.Quadratic.Out)
      .onComplete(() => {
        // setPlay(false);
      })
      .start();
  };

  useEffect(() => {
    if (!spriteHour.current) return;
    if (!spriteMinute.current) return;
    if (!spriteSeconds.current) return;
    if (!spriteRangeHour.current) return;

    handleAnim();
  }, [spriteHour, spriteMinute, spriteSeconds, play]);

  useTick(() => {
    if (!spriteHour.current) return;
    if (!spriteMinute.current) return;
    if (!spriteSeconds.current) return;
    if (!spriteRangeHour.current) return;

    if (play) {
      tweenHour.update();
      tweenMinute.update();
      tweenSecond.update();
      tweenSecondRange.update();
    } else {
      countHour = 0;
    }
  });

  return (
    <Container>
      <Sprite
        width={400}
        height={400}
        image="clockbg.png"
        x={200}
        y={100}
        anchor={{ x: 0, y: 0 }}
      />

      <Sprite
        ref={spriteRangeHour}
        image="exact.png"
        visible={!color}
        x={399.5}
        y={305}
        scale={new PIXI.Point(0.29, 0.36)}
        pivot={new PIXI.Point(15.5, 480)}
        rotation={0}
      />

      <Sprite
        ref={spriteRangeHour}
        image="exact-green.png"
        visible={color}
        x={399.5}
        y={305}
        scale={new PIXI.Point(0.29, 0.36)}
        pivot={new PIXI.Point(15.5, 480)}
        rotation={0}
      />

      <Container>
        <Sprite
          width={344}
          height={344}
          image="numbers.png"
          x={228}
          y={129}
          anchor={{ x: 0, y: 0 }}
        />
      </Container>

      <Sprite
        ref={spriteHour}
        width={10}
        rotation={0}
        height={100}
        image="hour.png"
        pivot={new PIXI.Point(12, 200)}
        x={400}
        y={300}
        anchor={{ x: 0, y: 0 }}
      />

      <Sprite
        ref={spriteMinute}
        width={10}
        rotation={2.5}
        height={120}
        image="minute.png"
        pivot={new PIXI.Point(22, 283.95)}
        x={400}
        y={300}
        anchor={{ x: 0, y: 0 }}
      />

      <Sprite
        ref={spriteSeconds}
        rotation={4.5}
        scale={new PIXI.Point(0.02343, 0.03)}
        image="second.png"
        pivot={new PIXI.Point(238, 5200)}
        x={400}
        y={300}
        anchor={{ x: 0, y: 0 }}
      />

      <Text
        text={"Play"}
        x={300}
        y={300}
        interactive={true}
        pointerdown={() => {
          setPlay(!play);
        }}
      />
    </Container>
  );
};

export default Clock;
