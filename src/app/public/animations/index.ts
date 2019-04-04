import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

export const animations = {

	rightIn :trigger('rightIn', [
	  state('in', style({transform: 'translateX(0)'})),
	  state('out', style({transform: 'translateX(100%)'})),
	  transition('out => in', [
		   animate(500, keyframes([
			style({opacity: 0.8, transform: 'translateX(100%)', offset: 0}),
			style({opacity: 0.9, transform: 'translateX(-15px)',  offset: 0.3}),
			style({opacity: 1, transform: 'translateX(0)',     offset: 0.7})
		  ]))
	  ]),
	  transition('in => out', [
			animate(500, keyframes([
			style({opacity: 1, transform: 'translateX(0)',     offset: 0}),
			style({opacity: 0.9, transform: 'translateX(-15px)', offset: 0.5}),
			style({opacity: 0, transform: 'translateX(100%)',  offset: 1.0})
		  ]))
	  ])
	]),

	fadeIn :trigger('fadeIn', [
		state('in', style({opacity: '1','z-index':10})),
		state('out', style({opacity: '0','z-index':-1})),
		transition('out => in', [
			 animate(300, keyframes([
				style({opacity: 0,  offset: 0, 'z-index':10}),
				// style({opacity: 0.2,  offset: 0.2, 'z-index':10}),
				style({opacity: 0.4,  offset: 0.4, 'z-index':10}),
				// style({opacity: 0.6,  offset: 0.6, 'z-index':10}),
				style({opacity: 0.8,  offset: 0.8, 'z-index':10}),
				style({opacity: 1,  offset: 1, 'z-index':10})
			]))
		]),
		transition('in => out', [
			animate(300, keyframes([
				style({opacity: 1,  offset: 0}),
				// style({opacity: 0.8,  offset: 0.2}),
				style({opacity: 0.6,  offset: 0.4}),
				// style({opacity: 0.4,  offset: 0.6}),
				style({opacity: 0.2,  offset: 0.8}),
				style({opacity: 0,  offset: 1})
			]))
		])
	]),

}