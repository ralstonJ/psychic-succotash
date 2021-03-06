import { observable } from 'mobx'
import { v4 as uuid } from 'uuid'

export function createTodoStore() {
    const self = observable({
        logs: [],
        items: [
            {
                id: uuid(),
                name: 'Sample item',
                status: 'incomplete',
                tags: [],
            },
        ],

        get activeItems() {
            return self.items.filter((i) => i.status === 'incomplete').reverse()
        },
        get inprogressItems() {
            return self.items.filter((i) => i.status === 'inprogress').reverse()
        },
        get completedItems() {
            return self.items.filter((i) => i.status === 'complete').reverse()
        },

        get allTags() {
            const tagsMap = {}
            self.items.forEach((item) => {
                item.tags.forEach((tag) => {
                    tagsMap[tag] = true
                })
            })

            const ALLTAGS = {
                name: 'All tags',
                value: '',
                isChecked: true,
            }

            const tagsList = Object.keys(tagsMap).map((tag) => {
                return {
                    name: tag,
                    value: tag,
                    isChecked: false,
                }
            })

            return [ALLTAGS, ...tagsList]
        },

        addItem() {
            const itemName = `Item ${self.items.length}`
            self.items.push({
                id: uuid(),
                name: itemName,
                status: 'incomplete',
                tags: [],
            })
            self.logs.push({
                id: uuid(),
                value: `Added item: ${itemName}`,
            })
        },
        removeItem(id) {
            const item = self.items.find((i) => i.id === id)
            self.logs.push({
                id: uuid(),
                value: `Removed item ${item.name}`,
            })
            const itemPos = self.items.findIndex((item) => item.id === id)
            self.items.splice(itemPos, 1)
        },
        updateStatus(id, status) {
            const item = self.items.find((i) => i.id === id)
            item.status = status
            self.logs.push({
                id: uuid(),
                value: `Updated status for item ${item.name} to  ${status}`,
            })
        },
        addTag(id, tag) {
            const item = self.items.find((i) => i.id === id)
            if (!item.tags.includes(tag)) {
                item.tags = [...item.tags, tag]
                self.logs.push({
                    id: uuid(),
                    value: `Added tag for item ${item.name}:  ${tag}`,
                })
            }
        },
        removeTag(id, tag) {
            const itemPos = self.items.findIndex((item) => item.id === id)
            const item = self.items[itemPos]
            const tagPos = item.tags.findIndex((tagItem) => tagItem === tag)
            item.tags.splice(tagPos, 1)
            self.logs.push({
                id: uuid(),
                value: `Removed tag for item ${item.name}:  ${tag}`,
            })
        },
        setItemName(id, name) {
            const item = self.items.find((i) => i.id === id)
            item.name = name
        },
    })

    return self
}
