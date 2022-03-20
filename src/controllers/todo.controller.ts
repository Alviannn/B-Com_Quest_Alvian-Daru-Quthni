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

async function insertPage(req: Request, res: Response) {

}

async function updatePage(req: Request, res: Response) {

}

async function addTodo(req: Request, res: Response) {

}

async function removeTodo(req: Request, res: Response) {

}

async function updateTodo(req: Request, res: Response) {

}

async function getTodo(req: Request, res: Response) {

}