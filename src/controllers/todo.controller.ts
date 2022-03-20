import { Request, Response } from 'express';
import { Todo } from '../entities/todo.entity';

async function homePage(req: Request, res: Response) {
    try {
        const todoList = await Todo.find();
        const mappedTodoList = todoList.map((todo) => todo.build());

        return res.render('home/index.ejs', { items: mappedTodoList });
    } catch (err) {
        console.error(err);
        // TODO: render error
    }
}

function insertPage(req: Request, res: Response) {
    return res.render('insert/insert.ejs');
}

function updatePage(req: Request, res: Response) {
    return res.render('update/update.ejs');
}

async function addTodo(req: Request, res: Response) {

}

async function removeTodo(req: Request, res: Response) {

}

async function updateTodo(req: Request, res: Response) {

}

async function getTodo(req: Request, res: Response) {

}

export { homePage, insertPage, updatePage };
export { addTodo, removeTodo, updateTodo, getTodo };