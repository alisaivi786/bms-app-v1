import classnames from 'classnames';
import { DebouncedFunc, throttle } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import './multiRangeSliderStyle.scss';

const sliderThumbWidth = 30;

export interface IMultiRangeSlider {
  /** The minimum value of the slider. */
  min: number;
  /** The maximum value of the slider.  */
  max: number;
  /** The value of the min part of the Slider added by the user.*/
  minValue: number;
  /** The value of the max part of the Slider added by the user.*/
  maxValue: number;
  /** `Callback` function that is fired when the slider's value changed. */
  onChange: ({ min, max }: { min: number; max: number }) => void;
  /** Is the minimum limit you can exceed when sliding from the min or the max. */
  minRangeLimit?: number;
  /** The prefix added after the slider min and max values, `example:` 'AED' */
  prefixData?: string;
  /** The label of the slider. */
  label?: string;
  /** Override or extend the styles applied to the component */
  className?: string;
  /** Give a static duration to call the onChange function, while the user is changing the slider value */
  throttleDuration?: number;
  /** If true, the component is disabled. */
  disabled?: boolean;
}

const isDiffAllow = (min: number, max: number, minRangeLimit: number) => {
  let min_max_diff = max - min;

  if (min_max_diff < 0) min_max_diff *= -1;

  return min_max_diff > minRangeLimit - 1;
};

const formatNumbers = (value: number) => {
  const numFormat = new Intl.NumberFormat('en', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(value);

  return numFormat;
};

export const MultiRangeSlider = ({
  disabled = false,
  min,
  max,
  minValue,
  maxValue,
  onChange,
  className = '',
  minRangeLimit = 0,
  prefixData = '',
  label,
  throttleDuration = 0,
}: IMultiRangeSlider) => {
  const [stepWidthValue, setStepWidthValue] = useState(0);
  const range = useRef<HTMLDivElement>(null);
  const rangeParent = useRef<HTMLDivElement>(null);
  const lastUpdatedVales = useRef({ min: minValue, max: maxValue });
  const [minState, setMinState] = useState(minValue);
  const [maxState, setMaxState] = useState(maxValue);
  const throttleHandler = useRef<DebouncedFunc<(newValues: { min: number; max: number }) => void>>();

  useEffect(() => {
		// set throttle and remove in unmount
    throttleHandler.current = throttle((newValues: { min: number; max: number }) => {
      onChange(newValues);
    }, throttleDuration);

    return () => throttleHandler.current?.cancel();
  }, [throttleDuration]);

  useEffect(() => {
    // Calculate the step width when the min and max change
    const resizedObserver = new ResizeObserver(() => {
      if (rangeParent.current && max != min) {
        const stepWidth = (rangeParent.current.clientWidth - sliderThumbWidth) / (max - min);
        
				setStepWidthValue(stepWidth);
      }
    });

    if (rangeParent.current) {
      resizedObserver.observe(rangeParent.current);
    }

    return () => {
      resizedObserver.disconnect();
    };
  }, [rangeParent.current, min, max]);

  useEffect(() => {
    // Adjust slider range position and width
    if (range.current) {
      range.current.style.left = `${stepWidthValue * (minState - min + sliderThumbWidth)}px`;
      
			range.current.style.width = `${stepWidthValue * (maxState - minState) + sliderThumbWidth}px`;
    }
  }, [stepWidthValue, min, max, maxState, minState, range.current]);

  useEffect(() => {
    // Update the minState and maxState when the minValue or maxValue changes externally
    const newMinValue = minValue < min ? min : minValue;
    const newMaxValue = maxValue > max ? max : maxValue;

    if (newMinValue !== lastUpdatedVales.current.min || newMaxValue !== lastUpdatedVales.current.max) {
      //to avoid infinite loop if the state not set correctly after change
			lastUpdatedVales.current = { min: newMinValue, max: newMaxValue };
      setMinState(newMinValue);
      setMaxState(newMaxValue);
      throttleHandler.current?.({ min: newMinValue, max: newMaxValue });
    }
  }, [minValue, maxValue, min, max]);

  const maxRangeHandler = (event: { target: { value: string } }) => {
    const value = Math.max(+event.target.value, minState + 1);
    const allowedValue = isDiffAllow(minState, value, minRangeLimit) ? value : minState + minRangeLimit;

    setMaxState(allowedValue);
    throttleHandler.current?.({ min: minState, max: allowedValue });
    event.target.value = value.toString();
  };

  const minRangeHandler = (event: { target: { value: string } }) => {
    const value = Math.min(+event.target.value, maxState - 1);
    const allowedValue = isDiffAllow(value, maxState, minRangeLimit) ? value : maxState - minRangeLimit;

    setMinState(allowedValue);
    throttleHandler.current?.({ min: allowedValue, max: maxState });
    
		event.target.value = value.toString();
  };

  return (
    <section className={`w-full ${className} ${disabled ? 'opacity-30' : ''}`}>
      <div className="flex items-center justify-between pb-0.5">
        <div className="text-paragraph font-medium leading-none">
          {prefixData} {formatNumbers(min)}
        </div>
        <div className="text-caption1 font-normal leading-none text-gray-700">{label}</div>
        <div className="text-paragraph font-medium leading-none">
          {prefixData} {formatNumbers(max)}
        </div>
      </div>
      <div className="relative thumb_container" ref={rangeParent}>
        <input
          disabled={disabled}
          type="range"
          min={min}
          max={max}
          value={minState}
          onChange={minRangeHandler}
          className={
            'pointer-events-none absolute h-0 w-full outline-none ' +
            classnames('thumb  thumb--zindex-3 ', {
              'thumb--zindex-5': minState > max - 100,
            })
          }
        />
        <input
          disabled={disabled}
          type="range"
          min={min}
          max={max}
          value={maxState}
          onChange={maxRangeHandler}
          className="thumb thumb--zindex-4 pointer-events-none absolute h-0 w-full outline-none"
        />

        <div className="relative max-w-full">
          <div className="slider__track h-5 w-full rounded-md bg-gray-50" />
          <div
            ref={range}
            className="slider__range absolute top-0 h-full max-w-full select-none rounded-md nj-bg-brand"
          >
            <div className="slider__left-value absolute left-2 text-paragraph font-bold leading-5 text-white">
              {formatNumbers(minState)}
            </div>
            <div className="slider__right-value absolute right-2 text-paragraph font-bold leading-5 text-white">
              {formatNumbers(maxState)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
