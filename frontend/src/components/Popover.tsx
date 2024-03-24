import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FilterIcon } from './Icons';

type PopoverProps = {
  children: any;
  clearKey: string;
  getTableData: (clearKey?: string) => void;
  clearFilter?: () => void;
};

const Popover: React.FC<PopoverProps> = ({ children, clearKey, getTableData, clearFilter = () => {} }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
      setIsVisible(false);
    }
  }, []);

  useEffect(() => {
    if (isVisible) {
      document.addEventListener('click', handleClickOutside, true);
    } else {
      document.removeEventListener('click', handleClickOutside, true);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [isVisible, handleClickOutside]);

  return (
    <>
      <div onClick={toggleVisibility} className='cursor-pointer inline-block'>
        <FilterIcon fillColor='white'/>
      </div>
      {isVisible && (
        <div ref={popoverRef} className="popover px-4 py-8">
          {children}
          <div className="flex justify-between mt-8">
            <button
              className="popover-cancel me-3"
              onClick={() => {
                clearFilter();
                getTableData('assetClass');
                setIsVisible(false)
              }}
            >
              Clear
            </button>

            <button
              className="popover-apply"
              onClick={() => {
                getTableData();
                setIsVisible(false);
              }}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Popover;
