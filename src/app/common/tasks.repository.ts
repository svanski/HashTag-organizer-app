import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { ITask } from "./models";

@Injectable({ providedIn: 'root' })
export class TasksRepository {

    private repo: BehaviorSubject<ITask[]> = new BehaviorSubject<ITask[]>([]);

    public insertNewTask(): void {
        this.addTask({
            id: new Date().getTime(),
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

    public getById(id: Number): Observable<ITask | undefined> { return this.repo.pipe(map(v => v.find(t => t.id === id))) }

    public getTasks(filterPredicet?: (t: ITask) => boolean): Observable<ITask[]> { return filterPredicet ? this.repo.pipe(map(v => v.filter(filterPredicet))) : this.repo; }

    public addTask(task: ITask) { this.repo.next([task, ...this.repo.value]); }

    // private uuidv4(): string { return (([1e7] as any) + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c: any) => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)); }
}