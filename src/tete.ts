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

  const toValueHour = baseValueHour + calcRotationToRad(result.hour);
  const toValueMinute =
    baseValueMinutes + calcRotationToRadHourMinute(result.minute);
  const toValueSeconds =
    baseValueSeconds + calcRotationToRadHourMinute(result.second);

  tweenHour = new Tween(spriteHour.current)
    .to({ rotation: play ? toValueHour : 0 }, durations.hour)
    .easing(Easing.Quadratic.Out)
    .onUpdate((ev: any) => {
      if (ev.rotation <= 0) return;

      console.log(countHour);
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
