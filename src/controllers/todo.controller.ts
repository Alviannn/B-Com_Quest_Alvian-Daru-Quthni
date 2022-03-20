import { Request, Response } from 'express';
import { Todo } from '../entities/todo.entity';

async function homePage(req: Request, res: Response) {
    try {
        const todoList = await Todo.find();
        const mappedTodoList = todoList.map((todo) => todo.build());

        return res.render('index.ejs', { items: mappedTodoList });
    } catch (err) {
        // TODO: render error
    }
}

function insertPage(req: Request, res: Response) {
    return res.render('insert.ejs');
}

function updatePage(req: Request, res: Response) {
    return res.render('update.ejs');
}

async function addTodo(req: Request, res: Response) {

}

async function removeTodo(req: Request, res: Response) {

}

async function updateTodo(req: Request, res: Response) {

}

async function getTodo(req: Request, res: Response) {

}