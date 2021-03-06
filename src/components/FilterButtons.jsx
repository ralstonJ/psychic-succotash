import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
    background-color: #e7e7e7;
    color: #000000;

    &.active {
        background-color: #555555;
    }
`

const FilterButtons = ({ onClick, items }) => {
    const _onClick = (item) => {
        onClick(item)
    }

    const _getClass = (item) => {
        if (item.isChecked) return 'active'
        return ''
    }

    return (
        <>
            {items.map((item, index) => {
                return (
                    <Button
                        key={item.name}
                        className={_getClass(item)}
                        onClick={() => _onClick(item)}
                    >
                        {item.name}
                    </Button>
                )
            })}
        </>
    )
}

export default FilterButtons
