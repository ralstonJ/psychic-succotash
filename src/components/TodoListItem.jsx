import React, { useState } from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import { animated } from 'react-spring'

const FirstSection = styled.div`
    margin-top: 15px;
    margin-bottom: 4px;
`

const ItemSection = styled.div`
    margin-top: 4px;
    margin-bottom: 4px;
`

const UL = styled.ul`
    display: flex;
    padding: 0px;
    list-style-type: none;
    margin-top: 4px;
    margin-bottom: 4px;

    & > li {
        margin-left: 10px;
    }

    & > li:first-child {
        margin-left: 0px;
    }
`

function TodoListItem({
    className,
    item,
    style,
    nextStep,
    prevStep,
    onChange,
    onAddTag,
    onRemoveTag,
    onRemoveItem,
}) {
    const { id, name, tags, status } = item
    const [tag, setTag] = useState('')

    const _onAddTag = () => {
        setTag('')
        onAddTag(tag)
    }

    return (
        <animated.li className={className} style={style}>
            <FirstSection>
                <input onChange={onChange} value={name} />
                <button onClick={() => onRemoveItem(id)}>x</button>
            </FirstSection>
            <ItemSection>
                <input
                    onChange={(event) => setTag(event.target.value)}
                    value={tag}
                />
                <button onClick={_onAddTag}>add tag</button>
            </ItemSection>
            <ItemSection>
                <UL>
                    {tags.map((t) => {
                        return (
                            <li key={t}>
                                {t}
                                <button onClick={() => onRemoveTag(id, t)}>
                                    x
                                </button>
                            </li>
                        )
                    })}
                </UL>
            </ItemSection>
            <ItemSection>
                {nextStep && <button onClick={nextStep}>Next Step</button>}
                {prevStep && <button onClick={prevStep}>Previous Step </button>}
            </ItemSection>
        </animated.li>
    )
}

export default styled(observer(TodoListItem))`
    color: red;
`
