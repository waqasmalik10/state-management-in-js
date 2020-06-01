/* 
    This is the main store function to create global store 
*/
function createStore(reducer) {

    let state;
    let listeners = [];

    const getState = () => state;

    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(a => a !== listener);
        }
    }

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    }

    return {
        getState,
        subscribe,
        dispatch
    }
}


/* 
    Below here is the example code showing usage the store 
*/



/* 
    Actions 
*/
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';



/* 
    Action creators 
*/
function addTodoAction(todo) {
    return {
        type: ADD_TODO,
        todo: todo
    }
}

function removeTotoAction(todo) {
    return {
        type: REMOVE_TODO,
        todo: todo
    }
}

function toggleTodoAction(todo) {
    return {
        type: TOGGLE_TODO,
        todo: todo
    }
}

function addGoalAction(goal) {
    return {
        type: ADD_GOAL,
        goal: goal
    }
}

function removeGoalAction(goal) {
    return {
        type: REMOVE_GOAL,
        goal: goal
    }
}



/* 
    Reducers 
*/
function todos(state = [], action) {
    switch(action.type) {
        case ADD_TODO:
            return state.concat(action.todo);
        case REMOVE_TODO:
            return state.filter(todo => todo.id !== action.todo.id);
        case TOGGLE_TODO:
            return state.map(todo => todo.id !== action.todo.id ? todo : Object.assign({}, todo, {complete: !todo.complete}) );
        default:
            return state;
    }
}

function goals(state = [], action) {
    switch(action.type) {
        case ADD_GOAL:
            return state.concat(action.goal);
        case REMOVE_GOAL:
            return state.filter(goal => goal.id !== action.goal.id);
        default:
            return state;
    }
}





const store = createStore(todos);

store.subscribe(() => {
    console.log('state update. updates state = ', store.getState());
});

store.dispatch(addTodoAction({
        id: 1
        , name: 'Do something'
    }
));

store.dispatch(addTodoAction({
        id: 2,
        name: 'Do something Again'
}));

store.dispatch(removeTotoAction({
    id: 2
}));

store.dispatch(toggleTodoAction({
    id: 1
}));

store.dispatch(addGoalAction({
    id: 1,
    name: 'My Goal 1'
}));

store.dispatch(addGoalAction( {
    id: 2,
    name: 'Walk the dog'
}));

store.dispatch(removeGoalAction({
    id: 1
}))