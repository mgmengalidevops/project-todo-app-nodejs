// Simula a lógica de dados do index.js para teste

let todos = [];
let nextId = 1;

function addTodo(task) {
    if (task.trim()) {
        todos.push({
            id: nextId++,
            task: task.trim(),
            completed: false
        });
        return true;
    }
    return false;
}

function deleteTodo(id) {
    const initialLength = todos.length;
    todos = todos.filter(todo => todo.id !== id);
    return todos.length < initialLength;
}

function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        return true;
    }
    return false;
}

describe('To-Do List Data Logic', () => {

    beforeEach(() => {
        // Limpa a lista antes de cada teste
        todos = [];
        nextId = 1;
    });

    test('deve adicionar uma nova tarefa', () => {
        addTodo('Comprar leite');
        expect(todos.length).toBe(1);
        expect(todos[0].task).toBe('Comprar leite');
        expect(todos[0].completed).toBe(false);
    });

    test('não deve adicionar tarefa vazia', () => {
        addTodo('');
        expect(todos.length).toBe(0);
    });

    test('deve deletar uma tarefa por ID', () => {
        addTodo('Tarefa A');
        const idToDelete = todos[0].id;
        
        expect(todos.length).toBe(1);
        deleteTodo(idToDelete);
        
        expect(todos.length).toBe(0);
    });

    test('deve alternar o status de uma tarefa', () => {
        addTodo('Tarefa para toggle');
        const idToToggle = todos[0].id;

        // Completa
        toggleTodo(idToToggle);
        expect(todos[0].completed).toBe(true);

        // Desfaz
        toggleTodo(idToToggle);
        expect(todos[0].completed).toBe(false);
    });

    test('deve retornar false ao tentar deletar um ID inexistente', () => {
        addTodo('Teste');
        expect(deleteTodo(999)).toBe(false);
    });
});