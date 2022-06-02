class CreateCardBtn extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            archive:[
                {
                    cardType:"Magician",
                    cardTitle:"Example"
                },
            ],
            cardTypes:["Magician", "Hermit"],
            value: "",
            typeValue: "Magician",
            deleteValue:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleDeleteChange = this.handleDeleteChange.bind(this);
        this.typeChange = this.typeChange.bind(this);
        this.addToArchive = this.addToArchive.bind(this);
        this.deleteFromArchive = this.deleteFromArchive.bind(this);
    }

    addToArchive(type, title){
        if (this.state.value != "" && !this.state.value.includes(" ")) {
            this.setState({value:" "})
            const arr = this.state.archive
            arr.push({
                cardType: type,
                cardTitle: title
            })
            this.setState({archive: arr})
            this.createCard
            // console.log(this.state.archive);
        }else{
            return alert('Check the rules!')
        }
    }

    deleteFromArchive(){
        const arr = this.state.archive
        arr.splice(arr.findIndex(card => card.cardTitle === this.state.deleteValue), 1)
        this.setState({
            archive:arr
        })
        // console.log(this.state.archive);
    }

    handleDeleteChange(event){
        // console.log(1);
        this.setState({
            deleteValue: event.target.value
        })
    }

    handleChange(event){
        this.setState({
            value: event.target.value
        })
    }

    typeChange(event){
        this.setState({
            typeValue: event.target.value
        })
    }

    render(){
        // console.log(this.state);
        const typeMap = this.state.cardTypes.map((type)=>{
            return <option value={type} key={type}>{type}</option>
        })
        const existingCards = this.state.archive.map((title)=>{
            return <option value={title.cardTitle} key={title.cardTitle}>{title.cardTitle}</option>
        })
        const creation = this.state.archive.map(card=>{
            if (card.cardType === "Magician") {
                return <ColCard name={card.cardTitle} key={card.cardTitle}/>
            }
            if (card.cardType === "Hermit") {
                return <FatCard name={card.cardTitle} key={card.cardTitle}/>
            }
        })
        // console.log(creation);
        const titleInput = this.state.value
        const typeInput = this.state.typeValue
        // console.log(typeMap);
        return <div id="cards">
            <div className="cardContainer">
                {creation}
            </div>
            <div className="createCardBox">
                <button onClick={()=>this.addToArchive(typeInput, titleInput)} className="createCardBtn">Create Card</button>
                <input onChange={this.handleChange} className="props.nameInput" type="text" placeholder={this.state.value} autoFocus></input>
                <select onChange={this.typeChange} name="cardType" id="createcardType">{typeMap}</select>
                <div className="deleteCard">
                    <button onClick={this.deleteFromArchive} className="deleteCardBtn">Delete Card</button>
                    <select onChange={this.handleDeleteChange} name="deleteCardType" id="deleteCardType">{existingCards}</select>
                </div>
            </div>
        </div>   
    }
}

class ColCard extends React.Component{
    constructor(props){
        console.log(1);
        super(props)
        this.x
        this.y
        this.state = {
            isDragging: false,
            initialPos: {left: 0, top: 0}
        }
    }

    onDragStart = (event) => {
        if (event.type === "mousedown") {
            this.setState({isDragging: true})
        }
    }

    onDrag = (event) => {
        if (this.state.isDragging === true) {
            this.setState({
                initialPos:{
                    left: event.clientX - 55,
                    top: event.clientY - 75
                }
            })  
            // console.log(this.state.isDragging);
            // console.log(event.clientY);
        }
    }

    onDragStop = (event) => {
        if (event.type === "mouseup") {
            if (this.state.isDragging === true) {
                this.setState({isDragging: false})
            }
            // console.log(this.state.isDragging);
        }
    }

    createCard(){
        // console.log(this.props.name);
        return <div className={`cardholder cardholder-${this.props.name}`}>
            <div style={this.state.initialPos} className={`card Mg card-${this.props.name}`} onMouseDown={this.onDragStart} onMouseMove={this.onDrag} onMouseUp={this.onDragStop}>
                <h2 unselectable="on">{this.props.name}</h2>
            </div>
        </div>
    }

    render(){
        return this.createCard()
    }
}

class FatCard extends ColCard{
    createCard(){
        return <div className={`cardholder cardholder-${this.props.name}`}>
            <div style={this.state.initialPos} className={`card Hm card-${this.props.name}`} onMouseDown={this.onDragStart} onMouseMove={this.onDrag} onMouseUp={this.onDragStop}>
                <h2 unselectable="on">{this.props.name}</h2>
            </div>
        </div>
    }
}


const root = ReactDOM.createRoot(document.getElementById('down'));
root.render(<CreateCardBtn />);
