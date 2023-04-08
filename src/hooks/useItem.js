export const useItem = () => {
    const generarId = () => {
        return Math.random()
    }

    const addNewItem = (items,hasTask) => {
        const auxItems = [...items]
        const newId = generarId()
        if(hasTask){
            auxItems.push({ id: newId, name: '', tasks: [] })
        }
        else{
        auxItems.push({ id: newId, title: '' })
        }
        
    return(auxItems)
    }
    const removeItem = (items,id) => {
        let auxItems = [...items]
    
        auxItems = auxItems.filter((item) => item.id != id)
        return(auxItems)
      }

    return {addNewItem,removeItem, generarId}
}