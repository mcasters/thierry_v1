import { useRef, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format, isValid, parse } from 'date-fns';
import { usePopper } from 'react-popper';
import { FaCalendar } from 'react-icons/fa';

import s from './DayPickerComponent.module.css';
import useOnClickOutside from '@/components/hooks/useOnClickOutside';

function DayPickerComponent({ handleDayChange, alreadyDay, fieldName }) {
  const FORMAT = 'dd/MM/yyyy';
  const [inputValue, setInputValue] = useState(format(alreadyDay, FORMAT));
  const [selected, setSelected] = useState(alreadyDay);
  const [isPopperOpen, setIsPopperOpen] = useState(false);

  const popperRef = useRef(null);
  const buttonRef = useRef(null);
  const [popperElement, setPopperElement] = useState(null);
  const popper = usePopper(popperRef.current, popperElement);

  const closePopper = () => {
    setIsPopperOpen(false);
    buttonRef?.current?.focus();
  };

  useOnClickOutside(popperElement, closePopper);

  const handleInputChange = (e) => {
    setInputValue(e.currentTarget.value);
    const date = parse(e.currentTarget.value, FORMAT, new Date());
    if (isValid(date)) {
      setSelected(date);
      handleDayChange(date);
    } else {
      setSelected(undefined);
    }
  };

  const handleDaySelect = (date) => {
    setSelected(date);
    if (date) {
      setInputValue(format(date, FORMAT));
      handleDayChange(date);
      closePopper();
    }
  };

  return (
    <>
      <div ref={popperRef}>
        <input
          className={s.input}
          type="text"
          name={fieldName}
          placeholder={inputValue}
          value={inputValue}
          onChange={handleInputChange}
          required
        />
        <button
          ref={buttonRef}
          className={`${s.command} button`}
          type="button"
          aria-label="Sélectionne une date"
          onClick={() => setIsPopperOpen(!isPopperOpen)}
        >
          <FaCalendar />
        </button>
      </div>
      <div className={s.dayPickerContainer}>
        {isPopperOpen && (
          <div
            tabIndex={-1}
            className={s.popperContainer}
            {...popper.attributes.popper}
            ref={setPopperElement}
            role="dialog"
          >
            <DayPicker
              initialFocus={isPopperOpen}
              mode="single"
              defaultMonth={selected}
              selected={selected}
              onSelect={handleDaySelect}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default DayPickerComponent;
