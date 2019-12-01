import { Component } from '@angular/core';
import { Logger } from '../app/logger';
import { interval, fromEvent, merge } from 'rxjs';
import { take, switchMap, concatMap, mergeMap, mapTo, map, exhaustMap, tap } from 'rxjs/operators';
import { getColor } from '../app/color-utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'map';

  logger = new Logger();

  map(i){




    this.logger.clear(document.getElementById('log'));
    let n = 6;
    let m = 6;

    let newMerge$ = merge(interval(1000).pipe(take(n),map(t=>t+1),tap(t=>console.log(`I1:${t}`))),
                          interval(1000).pipe(take(m),map(t=>t+1),tap(t=>console.log(`I2:${t}`))));
    const mapping = (document.querySelector('input[name="mapping"]:checked') as HTMLInputElement).value;
    //console.log(mapping);
    const saveBtn = document.getElementById('save');
    let click$ = fromEvent(saveBtn,'click');
    switch(mapping){
      case 'switch':
        click$.pipe(tap(t=>console.log('click')),
                    switchMap(c=>newMerge$)).subscribe(x=>{
                                                              this.logger.log(document.getElementById('log'),x+1,2);
                                                          });
        break;
      case 'concat':
        click$.pipe(tap(t=>console.log('click')),
                    concatMap(c=>newMerge$)).subscribe(x=>{
                                                              this.logger.log(document.getElementById('log'),x+1,1);
                                                          });
        break;
      case 'merge':
        click$.pipe(tap(t=>console.log('click')),
                    mergeMap(c=>newMerge$)).subscribe(x=>{
                                                              this.logger.log(document.getElementById('log'),x+1,2);
                                                         });
        break;
      case 'exhaust':
        click$.pipe(tap(t=>console.log('click')),
                    exhaustMap(c=>newMerge$)).subscribe(x=>{
                                                              this.logger.log(document.getElementById('log'),x+1,2);
                                                           });
        break;
    }
  }
}
