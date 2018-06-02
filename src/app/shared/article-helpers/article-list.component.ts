import { Component, Input } from '@angular/core';

import { Article, ArticleListConfig } from '../../core';

@Component({
    selector: 'app-article-list',
    templateUrl: "./article-list.component.html"
})
export class ArticleListComponent {
    query: ArticleListConfig;
    results: Article[];
    loading = false;
    currentPage = 1;
    totalPages: Array<number> = [1];

    constructor(){

    }

    @Input() limit: number;
    @Input()
    set config(config: ArticleListConfig){
        if(config){
            this.query = config;
            console.log('config', this.query);
            this.currentPage = 1;
            this.runQuery();
        }
    }

    setPageTo(pageNumber){
        this.currentPage = this.currentPage;
        this.runQuery();
    }

    runQuery(){
        this.loading = true;
        this.results = [];

        if(this.limit){
            this.query.filters.limit = this.limit;
            this.query.filters.offset =(this.limit * (this.currentPage - 1));
            console.log('offset', this.query.filters.offset);
        }
    }
}