import { Component, Input } from "@angular/core";

@Component({
    selector:'app-card',
    imports:[],
    template:`
        <div class="card border-0 shadow-sm">
            <h5 class="card-header bg-light p-3">{{feature}}</h5>
            <div class="card-body">
                <ng-content></ng-content>
            </div>
        </div>
    `
})

export class CardComponent{
    @Input() feature = "Feature";
}