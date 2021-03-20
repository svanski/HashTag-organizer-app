import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { ITask } from "./models";

@Injectable({ providedIn: 'root' })
export class TasksRepository {

    private repo: BehaviorSubject<ITask[]> = new BehaviorSubject<ITask[]>([]);


    public insertNewTask(): void {
        this.addTask({
            title: '',
            hashTags: [],
            description: '',
            startDate: undefined,
            dueDate: undefined,
            assignee: [],
            attachements: [],
            comments: [],
            lastModifyUserEmail: "Dachi",
            lastModifyDate: new Date()
        })
    }

    public getTasks(): Observable<ITask[]> { return this.repo; }

    public addTask(task: ITask) { this.repo.next([task, ...this.repo.value]); }


}