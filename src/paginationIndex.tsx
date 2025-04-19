import { Dispatch, SetStateAction, useState } from 'react';
import { User } from './CodeMirror';

interface PaginationIndexProps {
  totalSize: number;
  setStartPage: Dispatch<SetStateAction<number>>
  totalNumerOfImagesPerRow: number;
  setVisibleItems: Dispatch<SetStateAction<User[]>>
}

const PaginationIndex = ({
  totalSize,
  setStartPage,
  totalNumerOfImagesPerRow,
  setVisibleItems
}: PaginationIndexProps) => {
  const [highlightedNumber, setHighlightedNumber] = useState(1);


  const getVisiblePages = (totalPages: number): (number | "...")[] => {
    const pages: (number | "...")[] = []

    if (totalPages <= 10) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    // First 5 pages
    for (let i = 1; i <= 5; i++) {
      pages.push(i)
    }

    pages.push("...")

    // Last 5 pages
    for (let i = totalPages - 4; i <= totalPages; i++) {
      pages.push(i)
    }

    return pages
  }

  const totalIndex = getVisiblePages(totalSize)

  const handleIndexButtonClick = (pageIndex: number) => {
    setHighlightedNumber(pageIndex);
    setStartPage((pageIndex - 1) * totalNumerOfImagesPerRow + 1);
    setVisibleItems([])
  };

  const handlePrev = () => {
    setHighlightedNumber((prev) => {
      const newVal = prev - 1;
      setStartPage((newVal - 1) * totalNumerOfImagesPerRow + 1);
      return newVal;
    });
    setVisibleItems([])
  };

  const handleNext = () => {
    setHighlightedNumber((prev) => {
      const newVal = prev + 1;
      setStartPage((newVal - 1) * totalNumerOfImagesPerRow + 1);
      return newVal;
    });
    setVisibleItems([])
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '4rem',
      }}
    >
      <button disabled={highlightedNumber === 1} onClick={handlePrev}>
        ⏮
      </button>

      {totalIndex.map((eachNumber) => (
        eachNumber === '...'
        ?
        <span key={`ellipsis`} style={{ margin: '0 10px' }}>...</span>
        :
        <button
          key={eachNumber}
          style={{
            height: '25px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid yellow',
            background: eachNumber === highlightedNumber ? 'black' : 'white',
            color: eachNumber === highlightedNumber ? 'white' : 'black',
            width: '25px',
            margin: '10px',
          }}
          onClick={() => handleIndexButtonClick(eachNumber)}
        >
          {eachNumber}
        </button>
      ))}

      <button disabled={highlightedNumber === totalIndex.length} onClick={handleNext}>
        ⏭
      </button>
    </div>
  );
};

export default PaginationIndex;
