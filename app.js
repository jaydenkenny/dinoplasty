const app = {
    init(selectors){
        this.dinos = []
        this.max = 0
        this.list = document.querySelector(selectors.listSelector)
        document
        .querySelector(selectors.formSelector)
        .addEventListener('submit',this.addDino.bind(this))

        // old method of focusing: document
        // .querySelector(selectors.formSelector)
        // .dinoName
        // .focus()
    },
    addDino(ev){
        ev.preventDefault()
        const dino = {
            id: this.max + 1,
            name: ev.target.dinoName.value,
        }

        const listItem = this.renderListItem(dino)
        listItem.innerHTML = `<span>${dino.name}</span>
            <button class="del button delete">${document.textContent ="🗑️"}</button>
            <button class="bttnFav button success">${document.textContent ="🌟"}</button>
            <button class="bttnUp button secondary">${document.textContent ="☝️"}</button>
            <button class="bttnDown button secondary">${document.textContent ="👇"}</button>
        `
    
        this.list.appendChild(listItem)

        listItem.querySelector('.del').addEventListener('click',this.delDino.bind(this))
        listItem.querySelector('.bttnFav').addEventListener('click',this.editDino.bind(this))
        listItem.querySelector('.bttnUp').addEventListener('click',this.upDino.bind(this))
        listItem.querySelector('.bttnDown').addEventListener('click',this.downDino.bind(this))
//add the dino to this.dinos
        this.dinos.push(`${dino.id}. ${dino.name}`)
        console.log(this.dinos)

        ++ this.max
        ev.target.reset() //resets all inputs
        //this.renderListItem(dino)
    },

    delDino(ev){
        ev.preventDefault()
        const del = ev.target
        //console.log(del.parentNode.parentNode)
        this.list.removeChild(del.parentNode)
    },

    editDino(ev){
        ev.preventDefault()
        const edit = ev.target
        const color = edit.parentNode.style= 'background-color:red;border-style:solid;margin-right:40%;'
    },

    upDino(ev){
        ev.preventDefault()
        const up = ev.target
        this.list.insertBefore(up.parentNode,up.parentNode.previousElementSibling)
    },

    downDino(ev){
        ev.preventDefault()
        const down = ev.target
        this.list.insertBefore(down.parentNode.nextElementSibling,down.parentNode)    
    },

    renderListItem(dino){
        const item = document.createElement('li')
        //item.textContent = dino.name

        return item
    },

}
app.init({
    formSelector:'#dinoForm',
    listSelector:'#dinoList'
},)