import { useState } from 'react'

const PaginationIndex = ({
  totalSize,
  setStartPage,
  totalNumerOfImagesPerRow
}) => {
  const [highlightedNumber, setHighlightedNumber] = useState(1)
  const totalIndex = Array.from({ length: totalSize }, (_i, i: number) => i + 1)

  const handleIndexButtonClick = (pageIndex: number) => {
    setHighlightedNumber(pageIndex)
    setStartPage((pageIndex - 1) * totalNumerOfImagesPerRow + 1)
  }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '4rem'
      }}
    >
      <button
        disabled={highlightedNumber === 1}
        onClick={() => {
          setHighlightedNumber((prev) => prev - 1)
          setStartPage((prev) => prev - totalNumerOfImagesPerRow)
        }}
      >
        ⏮
      </button>
      {totalIndex.map((eachNumber) => (
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
            margin: '10px'
          }}
          onClick={() => handleIndexButtonClick(eachNumber)}
        >
          {eachNumber}
        </button>
      ))}
      <button
        onClick={() => {
          setHighlightedNumber((prev) => prev + 1)
          setStartPage((prev) => prev + totalNumerOfImagesPerRow)
        }}
        disabled={highlightedNumber === totalIndex.length}
      >
        ⏭
      </button>
    </div>
  )
}

export default PaginationIndex
