import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { first, map } from "rxjs/operators";
import { AuthService } from "./autho.service";
import { HashTagService } from "./hashtag.service";
import { ITask } from "./models";
import { SessionFacade } from "./session.facade";

@Injectable({ providedIn: 'root' })
export class TasksRepository {
    private readonly repo: BehaviorSubject<ITask[]>;
    private readonly sessionFacade = SessionFacade<ITask[]>('PlannerAppTasks');

    constructor(private authService: AuthService, private hashTagService: HashTagService) {
        const tasks = this.sessionFacade.load() ?? [];
        this.repo = new BehaviorSubject<ITask[]>(tasks);

        this.repo.subscribe(tasks => this.sessionFacade.save(tasks));
    }

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

    public deleteTask(task: ITask): void {
        this.repo.next(this.repo.value.filter(t => t.id !== task.id));
    }

    update(task: ITask): void {
        this.authService.getLoggedInUser().pipe(first()).subscribe(user => {
            task.lastModifyUserEmail = user.email;
            task.lastModifyDate = new Date();

            this.hashTagService.recalculateHashTags(task);

            const newList = this.repo.value.filter(t => t.id !== task.id).slice();
            newList.push(task);
            newList.sort((a, b) => a.id.valueOf() - b.id.valueOf());
            task.busy = false;
            this.repo.next(newList);
        });
    }



    // private uuidv4(): string { return (([1e7] as any) + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c: any) => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)); }
}