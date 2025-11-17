import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Apenas para simular __dirname no Node.js com módulos (type: module)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Armazenamento em memória (sem banco de dados)
let todos = [
    { id: 1, task: "Aprender Express e EJS", completed: true },
    { id: 2, task: "Fazer testes unitários com Jest", completed: false }
];
let nextId = 3;

// --- Configuração ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true })); // Para parsear dados de formulário
app.use(express.static(path.join(__dirname, 'public'))); // Servir arquivos estáticos (CSS)

// --- Rotas ---

// GET / - Renderiza a lista de tarefas
app.get('/', (req, res) => {
    // Passa a lista de tarefas para o template EJS
    res.render('index', { todos });
});

// POST /add - Adiciona uma nova tarefa
app.post('/add', (req, res) => {
    const task = req.body.task.trim();
    if (task) {
        todos.push({
            id: nextId++,
            task: task,
            completed: false
        });
    }
    res.redirect('/'); // Redireciona de volta para a lista
});

// POST /delete/:id - Exclui uma tarefa
app.post('/delete/:id', (req, res) => {
    const idToDelete = parseInt(req.params.id);
    todos = todos.filter(todo => todo.id !== idToDelete);
    res.redirect('/');
});

// POST /toggle/:id - Alterna o status da tarefa (completa/incompleta)
app.post('/toggle/:id', (req, res) => {
    const idToToggle = parseInt(req.params.id);
    const todo = todos.find(t => t.id === idToToggle);
    if (todo) {
        todo.completed = !todo.completed;
    }
    res.redirect('/');
});


app.listen(port, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});