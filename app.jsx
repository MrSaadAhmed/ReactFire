var ReactFire = React.createClass({

    getInitialState: function(){
        return{
            Todos: [],
            newTodo: ""
        };
    },

    componentWillMount: function() {
        this.firebaseRef = firebase.database().ref('tasks');
        this.firebaseRef.limitToLast(25).on('value', function(dataSnapshot) {
        var items = [];
        dataSnapshot.forEach(function(childSnapshot) {
            var item = childSnapshot.val();
            item['.key'] = childSnapshot.key;
            items.push(item);
        }.bind(this));
        this.setState({
            Todos: items
        });
        }.bind(this));
    },

    _onChange: function(e){
        this.setState({
            newTodo: e.target.value,
        });
    },

     onSubmit: function(e){
         e.preventDefault();
        var newTodo = this.state.newTodo;
        if(newTodo != "" && newTodo.trim().length != 0){
           this.firebaseRef.push({
               newTodo: newTodo,
           });
           this.setState({
               newTodo: "",
           });
        }
    },

    removeTodo: function(key){
        var firebaseRef = firebase.database().ref('tasks');
        firebaseRef.child(key).remove();
    },

    render: function(){
        return(
            <div className="container">
                <h1>ReactFire App</h1><br/>
                <form className="form-inline" id="add" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input type="text" className="form-control" value={this.state.newTodo} onChange={this._onChange} id="task" placeholder="What's on your mind ?" size="50"/>
                    </div>
                </form><br/>
                <ul className="list-group">
                    { this.state.Todos.map(function(todos, idx){
                        return(
                            <li className="list-group-item" key={idx}>
                                {todos.newTodo}
                                <a href="" className="del btn btn-xs btn-danger" onClick={this.removeTodo.bind(null, todos['.key'])}>X</a>
                            </li>
                        );
                    }.bind(this)) }
                </ul>
           </div>
        );
    }
})

ReactDOM.render(<ReactFire />, document.getElementById("app"));