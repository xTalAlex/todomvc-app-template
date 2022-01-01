window.todosStore = {
    todos : JSON.parse(localStorage.getItem('todos-store')) || [],

    save(todos) {
        localStorage.setItem('todos-store', JSON.stringify(todos));
        console.log('saved');
    }
};

window.todoApp =  fn => {

    return {

        ...todosStore,

        newTodo : '',

        editingTodo : null,

        filter : 'all',

        get active(){
            return this.todos.filter(todo => !todo.completed);
        },

        get completed(){
            return this.todos.filter(todo => todo.completed);
        },

        get filteredTodos(){
            // var todos;
            // switch(this.filter){
            //     case('active'):
            //         return this.active;
            //         break;
            //     case('completed'):
            //         return this.completed;
            //         break;
            //     default:
            //         return this.todos;
            //         break;
            // }

            return {
                all : this.todos,
                active : this.active,
                completed : this.completed
            }[this.filter];
        },

        get allCompleted(){
            return this.todos.length>0 && !this.active.length;
        },

        addTodo(){
            if(this.newTodo.trim()){
                this.todos.push({
                    //id : this.todos.length+1, non funziona perchè si creano duplicati
                    id : Date.now(),
                    body : this.newTodo.trim(),
                    completed : false,
                });
                
                this.newTodo = '';
            }
        },

        deleteTodo(todo){
            this.todos.splice(this.todos.indexOf(todo),1);
        },

        // toggleComplete(todo){
        //     this.todos[this.todos.indexOf(todo)].completed=!this.todos[this.todos.indexOf(todo)].completed;
        // }

        clearCompleted(){
            this.todos=this.active;
        },

        editTodo(todo){
            todo.cachedBody = todo.body;

            this.editingTodo=todo;
        },

        confirmEditing(todo,value){

            //todo.body=todo.body.trim();

            // if(!todo.body){
            //     todo.body=todo.cachedBody;
            // }

            // delete todo.cachedBody;

            if(value.trim()){
                todo.body=value.trim()
            }

            this.editingTodo = null;
        },

        cancelEditing(todo){
            todo.body=todo.cachedBody;

            delete todo.cachedBody;
            this.editingTodo=null;
        },

        toggleStatus(checked){
            this.todos.forEach(todo => todo.completed=checked);
        },

    }

}