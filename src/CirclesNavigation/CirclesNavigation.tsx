import { useRef, useCallback, type RefObject, useEffect } from "react";
import { gsap } from "gsap";
import type { SwiperClass } from "swiper/react";
import styles from "./CirclesNavigation.module.css";
import type { Period } from "../shared-domain";
import { useSwiperActiveIndex } from "../utils/useSwiperActiveIndex";

const circleSize = 530;
const circleRadius = circleSize / 2;
const defaultActivePeriodAngle = 30;

type Circle = {
  angle: number;
  title: string;
};

type CirclesNavigationProps = {
  periods: Period[];
  swiperRef: RefObject<SwiperClass | null>;
};

export function CirclesNavigation({
  periods,
  swiperRef
}: CirclesNavigationProps) {
  const activePeriodIdx = useSwiperActiveIndex(swiperRef);

  const circlesRef = useRef<Map<number, SVGCircleElement>>(new Map());
  const setCircleRef = useCallback(
    (id: number) => (element: SVGCircleElement | null) => {
      if (element) {
        circlesRef.current.set(id, element);
      } else {
        circlesRef.current.delete(id);
      }
    },
    []
  );

  const circles: Circle[] = periods.map((period, idx) => {
    const originalAngle =
      (360 / periods.length) * idx - 90 + defaultActivePeriodAngle;

    return {
      angle: originalAngle,
      title: period.title
    };
  });

  const textRefs = useRef<Map<number, SVGTextElement>>(new Map());
  const setTextRef = useCallback(
    (id: number) => (element: SVGTextElement | null) => {
      if (element) {
        textRefs.current.set(id, element);
      } else {
        textRefs.current.delete(id);
      }
    },
    []
  );

  const rotateToPosition = (targetCircleIdx: number): void => {
    if (targetCircleIdx === undefined || targetCircleIdx === null) return;

    const targetCircle = circles[targetCircleIdx];
    if (!targetCircle) return;

    const firstCircleOriginalAngle = circles[0]?.angle || 0;
    const rotationNeeded = firstCircleOriginalAngle - targetCircle.angle;

    let normalizedRotation = rotationNeeded;
    while (normalizedRotation > 180) normalizedRotation -= 360;
    while (normalizedRotation < -180) normalizedRotation += 360;

    const circleContainer = document.querySelector(
      `.${styles.circleContainer}`
    ) as HTMLElement;

    if (circleContainer) {
      gsap.to(circleContainer, {
        rotation: normalizedRotation,
        duration: 0.8,
        ease: "power2.inOut",
        transformOrigin: "center center"
      });

      textRefs.current.forEach((textElement) => {
        gsap.to(textElement, {
          rotation: -normalizedRotation,
          duration: 0.8,
          ease: "power2.inOut",
          transformOrigin: "center center"
        });
      });
    }
  };

  useEffect(() => {
    if (activePeriodIdx !== undefined && activePeriodIdx !== null) {
      rotateToPosition(activePeriodIdx);
    }
  }, [activePeriodIdx, rotateToPosition]);

  const changePeriod = useCallback(
    (circleIdx: number): void => {
      if (activePeriodIdx === circleIdx) return;

      if (swiperRef.current) {
        swiperRef.current.slideTo(circleIdx);
      }
    },
    [activePeriodIdx, swiperRef]
  );

  return (
    <div aria-hidden className={styles.container}>
      <svg
        className={styles.circleContainer}
        width={circleSize}
        height={circleSize}
        viewBox={`0 0 ${circleSize} ${circleSize}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="265" cy="265" r="265" className={styles.circle} />

        {circles.map((circle, idx) => {
          const cx =
            circleSize / 2 +
            circleRadius * Math.cos((circle.angle * Math.PI) / 180);
          const cy =
            circleSize / 2 +
            circleRadius * Math.sin((circle.angle * Math.PI) / 180);

          return (
            <>
              <circle
                ref={setCircleRef(idx)}
                className={styles.point}
                key={circle.title}
                cx={cx}
                cy={cy}
                r={3}
                onClick={() => changePeriod(idx)}
                data-active={activePeriodIdx === idx}
              />
              <text
                ref={setTextRef(idx)}
                x={cx}
                y={cy}
                className={styles.pointIdx}
                textAnchor="middle"
                dominantBaseline="central"
              >
                {idx + 1}
              </text>
            </>
          );
        })}
      </svg>
      <h3 className={styles.title}>{periods[activePeriodIdx]?.title}</h3>
    </div>
  );
}
