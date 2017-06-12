class App {
    constructor(selectors){
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
    }

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
    }


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

        listItem.querySelector('.dinoName').addEventListener('keypress',this.saveOnEnter.bind(this,dino))

        listItem.querySelector('.del').addEventListener('click',this.delDino.bind(this))
        listItem.querySelector('.bttnFav').addEventListener('click',this.favDino.bind(this,dino))
        listItem.querySelector('.bttnEdit').addEventListener('click',this.editDino.bind(this))
        listItem.querySelector('.bttnUp').addEventListener('click',this.upDino.bind(this,dino))
        listItem.querySelector('.bttnDown').addEventListener('click',this.downDino.bind(this,dino))
        listItem.querySelector('.dinoName').addEventListener('blur',this.updateDino.bind(this))

//add the dino to this.dinos
        //this.dinos.push(dino)
        //console.log(dino)
        if (dino.id > this.max){
            this.max = dino.id
        }
    }

    save(){
        console.log(this.list.children)
        const stuff = this.list.children         
         for(let i=0;i<stuff.length-1;i++){
                console.log(i)
                const listItem = stuff[i]
                this.dinos[i].id = i
                listItem.dataset.id = this.dinos[i].id
            }
            localStorage.setItem('dinos',JSON.stringify(this.dinos))
        }

    saveOnEnter(dino,ev){
        if(ev.key === 'Enter'){
            this.editDino(dino,ev)
        }
    }

    addDinoFromForm(ev){
        const dino = {
            id: this.max + 1,
            name: ev.target.dinoName.value,
            eats: ev.target.dinoEats.value,
            fav: false,
        }
        ev.preventDefault()
        this.addDino(dino)
        //removed stuff
        ev.target.reset() //resets all inputs
        //this.renderListItem(dino)

    }

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
    }


    favDino(dino,ev){
        const fav = ev.target.closest('.dino')
        dino.fav = !dino.fav

        if(dino.fav){
            fav.classList.add('color')
        }else{
            fav.classList.remove('color')
        }
        this.save()
        
        // if(fav){
        //     if(fav.classList.contains('color')){
        //         fav.classList.remove('color')
        //     }
        //     else{
        //         fav.classList.add('color')
        //     }
        // }
    }
    
    editDino(ev){
        //console.log('editDino')
        //ev.preventDefault()
        const edit = ev.target.closest('.dino')
        //console.log(edit)
        const btn = edit.querySelector('.edits.button')
        if(edit){
            const name = edit.querySelector('.dinoName')
            if(edit.classList.contains('edits')){
                edit.classList.remove('edits')
                name.contentEditable="false"
            }
            else{
                edit.classList.add('edits')
                name.contentEditable ="true"
                name.focus()
                this.save()
            }
        }
    }

    updateDino(ev){
        const dinoNameSpan = ev.target
        const newName = dinoNameSpan.textContent
        const listItem = dinoNameSpan.closest('.dino')
        const dinoId = listItem.dataset.id

        //console.log({ dinoNameSpan, newName, listItem, dinoId })
        //let key = ev.which || ev.keyCode
        //if(key == 13){
            
        for(let i=0;i<this.dinos.length;i++){
            if(parseInt(dinoId) === this.dinos[i].id){
                this.dinos[i].name = newName
                this.save()
                }
            }
        //}
    }
//accessing only the name of the object

    upDino(dino,ev){
        ev.preventDefault()
        const listItem = ev.target.closest('.dino')

        const index = this.dinos.findIndex((currentDino, i) => {
        return currentDino.id === dino.id
        })

        if (index > 0) {
        this.list.insertBefore(listItem, listItem.previousElementSibling)

        const previousDino = this.dinos[index - 1]
        this.dinos[index - 1] = dino
        this.dinos[index] = previousDino
        this.save()
            }
    }

    downDino(dino,ev){
        ev.preventDefault()
        const down = ev.target
        const listItem = down.closest('li')
        const index = this.dinos.findIndex((currentDino, i) =>{
            return currentDino.id === dino.id
        })

        if(index < this.dinos.length -1){
            this.list.insertBefore(listItem.nextSibling,listItem)

            const nextDino = this.dinos[index + 1]
            this.dinos[index+1]=dino
            this.dinos[index] = nextDino

            this.save()
        }    
    }

    renderListItem(dino){
        const item = this.template.cloneNode(true)
        item.classList.remove('template')
        item.dataset.id = dino.id
        item.querySelector('.dinoName').textContent = dino.name
        item.querySelector('.dinoEats').textContent = dino.eats
        if(dino.fav){
            item.classList.add('color')
        }
        
        //item.textContent = dino.name

        return item
    }

}

const app = new App({
    formSelector:'#dinoForm',
    listSelector:'#dinoList',
    templateSelector:'.dino.template',
})
// app.init({
//     formSelector:'#dinoForm',
//     listSelector:'#dinoList',
//     templateSelector:'.dino.template',
// })

//enter key not working
//setAttribute