import { animation, animate, style } from '@angular/animations';

export const fadeIn = animation([
  style({opacity: 0}),
  animate('{{ time }} ease-in')
]);
