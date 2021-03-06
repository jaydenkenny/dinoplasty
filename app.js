class App {
    constructor(selectors){
        this.dinos = []
        this.max = 0
        this.faves = []
        this.list = document.querySelector(selectors.listSelector)
        document
        .querySelector(selectors.formSelector)
        .addEventListener('submit',this.addDinoFromForm.bind(this))

        document.querySelector('.searchDino').addEventListener('keyup',this.searchOnEnter.bind(this))

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

        const faveJSON = localStorage.getItem('faves')
        const faveArray = JSON.parse(faveJSON)
        if(faveArray){
            faveArray.reverse()
            faveArray.map(this.addDino.bind(this))
        }
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
        listItem.querySelector('.dinoEats').addEventListener('submit',this.searchDino.bind(this,dino))

        listItem.querySelector('.del').addEventListener('click',this.delDino.bind(this))
        listItem.querySelector('.bttnFav').addEventListener('click',this.favDino.bind(this,dino))
        listItem.querySelector('.bttnEdit').addEventListener('click',this.editDino.bind(this,dino))
        listItem.querySelector('.bttnUp').addEventListener('click',this.upDino.bind(this,dino))
        listItem.querySelector('.bttnDown').addEventListener('click',this.downDino.bind(this,dino))
        //listItem.querySelector('.faves').addEventListener('click',this.faves.bind(this,dino))
        // listItem.querySelector('.dinoName').addEventListener('blur',this.updateDino.bind(this))

//add the dino to this.dinos
        //this.dinos.push(dino)
        //console.log(dino)
        if (dino.id > this.max){
            this.max = dino.id
        }
    }

    save(){
            localStorage.setItem('dinos',JSON.stringify(this.dinos))
            localStorage.setItem('faves',JSON.stringify(this.faves))
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
        //removed stuff        ev.target.reset() //resets all inputs
        //this.renderListItem(dino)
        

    }

 searchDino(ev) {
    const q = ev.currentTarget.value
    const prevMatches = Array.from(document.querySelectorAll('.dino-name strong'))
    this.removeElements(prevMatches)

    Array.from(document.querySelectorAll('.dino')).map(listItem => {
      const nameField = listItem.querySelector('.dino-name')
      const pattern = new RegExp(q, 'gi')
      if (nameField.textContent.match(pattern)) {
        listItem.classList.remove('hide')
        nameField.innerHTML = nameField.innerHTML.replace(pattern, '<strong>$&</strong>')
      } else {
        listItem.classList.add('hide')
      }
    })
  }

    searchOnEnter(ev){
        if(ev.key === 'Enter'){
            this.searchDino(ev)
        }
    }

    delDino(ev){
        ev.preventDefault()
        const delItem = ev.target.closest('.dino')
        
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
         const faveList = document.querySelector('.faveList')
         console.log(dino.fav)
        if(dino.fav){
                fav.classList.add("color")
                this.faves.push(dino)
                const item = fav.cloneNode(true)
                item.querySelector('span.button-group').remove()
                faveList.insertBefore(item,faveList.firstChild)
        }else{
            fav.classList.remove('color')
            const faveChild = faveList.children
           for(let i=0;i<faveChild.length;i++){
                if(faveChild[i].dataset.id === fav.dataset.id){
                    faveChild[i].remove()
                }

            }
            for(let i=0;i<this.faves.length;i++){
                this.faves.splice(i,1)
            }
        }
        console.log(this.faves)
        this.save()
    }
    
    editDino(dino,ev){
        //console.log('editDino')
        //ev.preventDefault()
        const edit = ev.target.closest('.dino')
        //console.log(edit)
        if(edit){
            const name = edit.querySelector('.dinoName')
            if(edit.classList.contains('edits')){
                edit.classList.remove('edits')
                name.contentEditable="false"
                this.updateDino(ev)
            }
            else{
                const btn = edit.querySelector('.button.bttnEdit')
                edit.classList.add('edits')
                name.contentEditable ="true"
                name.focus()
            }
        }
    }

    updateDino(ev){
        const listItem = ev.target.closest('.dino')
        const dinoNameSpan = listItem.querySelector('.dinoName')
        const newName = dinoNameSpan.textContent
        const dinoId = listItem.dataset.id
        dinoNameSpan.setAttribute('title', newName)

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
        
        const dinoNameSpan = item.querySelector('.dinoName')
        dinoNameSpan.setAttribute('title', dino.name)

        if(dino.fav){
            item.classList.add('color')
        }

        if(dino.dinoEats){
            item.querySelector('.dinoEats')
            .textContent = dino.eats
        }
        
        //item.textContent = dino.name
        //console.log(item)
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