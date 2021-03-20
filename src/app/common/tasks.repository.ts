import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { ITask } from "./models";

@Injectable({ providedIn: 'root' })
export class TasksRepository {

    private repo: BehaviorSubject<ITask[]> = new BehaviorSubject<ITask[]>([]);


    public insertNewTask(): void {
        this.addTask({
            id: this.uuidv4(),
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

    private uuidv4() { return (([1e7] as any) + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c: any) => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)); }
}