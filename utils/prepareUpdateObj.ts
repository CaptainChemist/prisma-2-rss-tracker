import * as _ from 'lodash'

const genNestedItems = (currentItem)=> {
    const tags =
    'tags' in currentItem
      ? {
          tags: {
            connect: currentItem.tags.map(({ id }) => ({ id })).filter(({ id }) => id !== undefined),
            create: currentItem.tags.filter(({ id }) => id === undefined),
          },
        }
      : {};
  const feeds =
    'feeds' in currentItem
      ? {
          feeds: {
            connect: currentItem.feeds.map(({ id }) => ({ id })).filter(({ id }) => id !== undefined),
          },
        }
      : {};

    const {__typename, likes, author, ...cleanedItem} = currentItem

  return { ...cleanedItem, ...tags, ...feeds };

}

const cleanOps = (currentData, items) => {
    items.map(oneItem => {
        ['connect', 'disconnect', 'create'].map(op=> {
            if(op in currentData[oneItem]){
                currentData[oneItem][op].length === 0 ? 
                delete currentData[oneItem][op] : 
                null
            }
        })

        if(_.isEmpty(currentData[oneItem])){
            delete currentData[oneItem]
        }
    })

    return currentData
}


export const prepareNewUpdateObj = (queriedItem, currentItem, isFeed: boolean, isEditing: boolean)=> {
    const currentData = genNestedItems(currentItem);
    
    if(!isEditing){
        return currentData
    }
    const queriedData = genNestedItems(queriedItem)

    const disconnectedTags = _.differenceWith(queriedData.tags.connect, currentData.tags.connect, _.isEqual);
    const connectedTags = _.differenceWith(currentData.tags.connect, queriedData.tags.connect, _.isEqual);
    currentData.tags['connect'] = connectedTags
    currentData.tags['disconnect'] = disconnectedTags

    if(!isFeed){
        const disconnectedFeeds = _.differenceWith(queriedData.feeds.connect, currentData.feeds.connect, _.isEqual);
        const connectedFeeds = _.differenceWith(currentData.feeds.connect, queriedData.feeds.connect, _.isEqual);
        currentData.feeds['connect'] = connectedFeeds
        currentData.feeds['disconnect'] = disconnectedFeeds
        return cleanOps(currentData,['feeds', 'tags'])
    } else {
        return cleanOps(currentData, ['tags'])
    }
}