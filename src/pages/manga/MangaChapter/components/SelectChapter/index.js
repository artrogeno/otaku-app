import React, { useState, useEffect } from 'react'
import { Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Select from 'react-select'

const SelectChapter = ({
  className,
  options: dataOptions,
  chapter,
  routeChapter,
}) => {
  const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'transparent' }),
    option: (styles, { isDisabled, isSelected }) => {
      return {
        ...styles,
        backgroundColor: '#15181f',
        color: '#a8a8a8',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled && (isSelected ? '#163e2a' : 'green'),
        },
        ':hover': {
          ...styles[':hover'],
          backgroundColor: !isDisabled && (isSelected ? '#163e2a' : '#0bbe35'),
          color: '#fff',
        },
      }
    },
    input: (styles, { data }) => {
      return {
        ...styles,
        ':focus': {
          ...styles[':focus'],
          outline: 'none',
          borderColor: 'transparent',
        },
      }
    },
    singleValue: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: '#038120',
        color: '#a8a8a8',
      }
    },
    menu: styles => {
      return {
        ...styles,
        backgroundColor: '#15181f',
        color: '#a8a8a8',
      }
    },
  }
  const [options, setOptions] = useState([])
  const [inputValue, setInputValue] = useState(null)

  const handleChange = ({ value, label }) => {
    setInputValue(value)
    setInputValue({ value, label })
    routeChapter(value)
  }

  const handleInputChange = event => {
    // console.group('Input Changed')
    // // console.log(inputValue);
    // console.log(event)
    // // console.log(`action: ${actionMeta.action}`);
    // console.groupEnd()
  }

  const prevHandler = () => {
    const indexOption = options.findIndex(item => item.value === chapter)
    if (indexOption < options.length) {
      handleChange(options[indexOption + 1])
    }
  }

  const nextHandler = () => {
    const indexOption = options.findIndex(item => item.value === chapter)
    if (indexOption > 0) {
      handleChange(options[indexOption - 1])
    }
  }

  useEffect(() => {
    if (dataOptions && options.length === 0) {
      const updateOptions = []
      dataOptions.forEach(({ chapter, label }) =>
        updateOptions.push({ label, value: chapter })
      )
      const resultFilter = updateOptions.filter(
        ({ value }) => value === chapter
      )[0]
      setInputValue(resultFilter)
      setOptions(updateOptions)
    }
  }, [dataOptions, chapter, options])

  useEffect(() => {
    if (options.length > 0) {
      const resultFilter = options.filter(({ value }) => value === chapter)[0]
      setInputValue(resultFilter)
    }
  }, [chapter, options])

  return (
    <div className={className}>
      <Button color="paginate" onClick={prevHandler}>
        <FontAwesomeIcon icon={['fas', 'chevron-left']} />
      </Button>

      {options.length > 0 ? (
        <Select
          className="select-dark"
          theme={theme => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary25: 'hotpink',
              primary: 'black',
            },
          })}
          styles={colourStyles}
          options={options}
          value={inputValue}
          onChange={handleChange}
          onInputChange={handleInputChange}
        />
      ) : null}

      <Button color="paginate" onClick={nextHandler}>
        <FontAwesomeIcon icon={['fas', 'chevron-right']} />
      </Button>
    </div>
  )
}

export default SelectChapter
