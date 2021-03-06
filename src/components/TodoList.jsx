import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'

import FilteredList from './FilteredList'
import FilterButtons from './FilterButtons'
import TodoListItem from './TodoListItem'
import { createTodoStore } from '../store'

const ListContainer = styled.div`
    display: flex;

    & section {
        width: 33.33%;
    }
`

function TodoList({ className }) {
    const [store] = useState(createTodoStore)
    const [filter, setFilter] = useState('')
    const [allTags, setAllTags] = useState([])

    useEffect(() => {
        setAllTags(store.allTags)
    }, [store.allTags])

    return (
        <div className={className}>
            <header>
                <h1 className="title">TODO List Example</h1>
            </header>
            <button
                onClick={() => {
                    setFilter('')
                    store.addItem()
                }}
            >
                Add New Item
            </button>
            <ListContainer>
                <section>
                    <h2>Incomplete Items</h2>
                    <FilteredList list={store.activeItems} filter={filter}>
                        {(item, props) => (
                            <TodoListItem
                                key={item.id}
                                item={item}
                                nextStep={() => {
                                    store.updateStatus(item.id, 'inprogress')
                                }}
                                onChange={(e) =>
                                    store.setItemName(item.id, e.target.value)
                                }
                                onAddTag={(v) => store.addTag(item.id, v)}
                                onRemoveTag={(id, tag) =>
                                    store.removeTag(id, tag)
                                }
                                onRemoveItem={() => store.removeItem(item.id)}
                                style={props}
                            />
                        )}
                    </FilteredList>
                </section>
                <section>
                    <h2>In-progress Items</h2>
                    <FilteredList list={store.inprogressItems} filter={filter}>
                        {(item, props) => (
                            <TodoListItem
                                key={item.id}
                                item={item}
                                nextStep={() =>
                                    store.updateStatus(item.id, 'complete')
                                }
                                prevStep={() =>
                                    store.updateStatus(item.id, 'incomplete')
                                }
                                onChange={(e) =>
                                    store.setItemName(item.id, e.target.value)
                                }
                                onAddTag={(v) => store.addTag(item.id, v)}
                                onRemoveTag={(id, tag) =>
                                    store.removeTag(id, tag)
                                }
                                onRemoveItem={() => store.removeItem(item.id)}
                                style={props}
                            />
                        )}
                    </FilteredList>
                </section>
                <section>
                    <h2 className="completedTitle">Completed Items</h2>
                    <FilteredList list={store.completedItems} filter={filter}>
                        {(item, props) => (
                            <TodoListItem
                                key={item.id}
                                item={item}
                                prevStep={() =>
                                    store.updateStatus(item.id, 'inprogress')
                                }
                                onChange={(e) =>
                                    store.setItemName(item.id, e.target.value)
                                }
                                onAddTag={(v) => store.addTag(item.id, v)}
                                onRemoveTag={(id, tag) =>
                                    store.removeTag(id, tag)
                                }
                                onRemoveItem={() => store.removeItem(item.id)}
                                style={props}
                            />
                        )}
                    </FilteredList>
                </section>
            </ListContainer>
            <footer>
                <div>
                    <h2>Filter by: </h2>
                    <FilterButtons
                        onClick={(item) => {
                            const newTags = allTags.map((tag) => {
                                if (tag.isChecked) {
                                    tag.isChecked = false
                                }

                                if (tag.value === item.value) {
                                    tag.isChecked = true
                                }

                                return tag
                            })

                            setFilter(item.value)
                            setAllTags(newTags)
                        }}
                        items={allTags}
                    />
                </div>
                <div>
                    <h2>Log</h2>
                    <ul>
                        {store.logs.map((log) => {
                            return <li key={log.id}>{log.value}</li>
                        })}
                    </ul>
                </div>
            </footer>
        </div>
    )
}

export default styled(observer(TodoList))`
    background-color: lightgray;

    .title {
        color: orange;
    }
`
