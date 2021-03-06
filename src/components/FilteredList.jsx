import React from 'react'
import { useTransition } from 'react-spring'
import styled from 'styled-components'

const UL = styled.ul`
    padding: 0px;
    list-style-type: none;
`

const FilteredList = ({ list, filter, children }) => {
    const items = list.filter((item) => {
        if (filter === '') {
            return true
        }

        return item.tags.includes(filter)
    })

    const itemsTransition = useTransition(items, (item) => item.id, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    })

    return (
        <UL>
            {itemsTransition.map(({ item, key, props }) =>
                children(item, props)
            )}
        </UL>
    )
}

export default FilteredList
