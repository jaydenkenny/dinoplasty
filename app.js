const app = {
    init(selectors){
        this.dinos = []
        this.max = 0
        this.list = document.querySelector(selectors.listSelector)
        document
        .querySelector(selectors.formSelector)
        .addEventListener('submit',this.addDinoFromForm.bind(this))

        this.template = document.querySelector(selectors.templateSelector)


        // old method of focusing: document
        // .querySelector(selectors.formSelector)
        // .dinoName
        // .focus()
        this.load()
    },

    load(){
        //load JSON from localStorage
        const dinoJSON = localStorage.getItem('dinos')
        //revert JSON back into an array
        const dinoArray = JSON.parse(dinoJSON)
        //set this.dinos with the dinos from that array
        if(dinoArray){
            dinoArray.reverse()
            dinoArray.map(this.addDino.bind(this))
        }
    },


    addDino(dino){
        const listItem = this.renderListItem(dino)
        // listItem.innerHTML = `<span>${dino.name}</span>
        //     <button class="del button delete">${document.textContent ="🗑️"}</button>
        //     <button class="bttnFav button success">${document.textContent ="🌟"}</button>
        //     <button class="bttnUp button secondary">${document.textContent ="☝️"}</button>
        //     <button class="bttnDown button secondary">${document.textContent ="👇"}</button>
        // `
    
        //this.list.append(listItem)
        this.list.insertBefore(listItem,this.list.firstChild)
        this.dinos.unshift(dino) //accesses the array and also changes that
        this.save()

    
        listItem.querySelector('.del').addEventListener('click',this.delDino.bind(this))
        listItem.querySelector('.bttnFav').addEventListener('click',this.favDino.bind(this))
        listItem.querySelector('.bttnEdit').addEventListener('click',this.editDino.bind(this))
        listItem.querySelector('.bttnUp').addEventListener('click',this.upDino.bind(this))
        listItem.querySelector('.bttnDown').addEventListener('click',this.downDino.bind(this))
//add the dino to this.dinos
        //this.dinos.push(dino)
        console.log(dino)
        if(dino.name in this.dinos){
            this.max
        }else{
            ++ this.max
        }
    },

    save(){
            localStorage.setItem('dinos',JSON.stringify(this.dinos))
        },

    addDinoFromForm(ev){
        const dino = {
            id: this.max + 1,
            name: ev.target.dinoName.value,
            eats: ev.target.dinoEats.value
        }
        ev.preventDefault()
        this.addDino(dino)
        //removed stuff
        ev.target.reset() //resets all inputs
        //this.renderListItem(dino)

    },

    delDino(ev){
        ev.preventDefault()
        const delItem = ev.target.closest('.dino')
        //console.log(del.parentNode.parentNode)
        //this.list.removeChild(del.parentNode)
        delItem.remove()
        for(let i=0;i<this.dinos.length;i++){
            const currentId = this.dinos[i].id.toString()
            if(delItem.dataset.id === currentId){
                this.dinos.splice(i, 1)
                break;
            }
        }
        this.save()
    },


    favDino(ev){
        ev.preventDefault()
        const fav = ev.target.closest('.dino')
        
        if(fav){
            if(fav.classList.contains('color')){
                fav.classList.remove('color')
            }
            else{
                fav.classList.add('color')
            }
        }
    },
    
    editDino(ev){
        const edit = ev.target.closest('.dino.name')
        edit.contentEditable ="true"
        edit.style='background-color:yellow;border:dashed;border-color:black;'
        
        dino.name = dino.name.innerHTML
        //this.dinos.update()
        edit.blur()
    },

    upDino(ev){
        ev.preventDefault()
        const up = ev.target
        const listItem = up.closest('li')
        this.list.insertBefore(listItem,listItem.previousElementSibling)
    },

    downDino(ev){
        ev.preventDefault()
        const down = ev.target
        const listItem = down.closest('li')
        this.list.insertBefore(listItem.nextElementSibling,listItem)    
    },

    renderListItem(dino){
        const item = this.template.cloneNode(true)
        item.classList.remove('template')
        item.dataset.id = dino.id
        item.querySelector('.dinoName').textContent = dino.name
        item.querySelector('.dinoEats').textContent = dino.eats
        //item.textContent = dino.name

        return item
    },

}
app.init({
    formSelector:'#dinoForm',
    listSelector:'#dinoList',
    templateSelector:'.dino.template',
})