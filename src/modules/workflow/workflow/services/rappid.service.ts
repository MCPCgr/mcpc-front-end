/*! JointJS+ v3.7.3 - HTML5 Diagramming Framework - TRIAL VERSION

Copyright (c) 2023 client IO

 2023-12-05


This Source Code Form is subject to the terms of the JointJS+ Trial License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at https://www.jointjs.com/license
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


import { Subscription } from 'rxjs';
import { dia, ui } from '@clientio/rappid/rappid';

import { EventBusService } from './event-bus.service';
import { Controller } from '../rappid/controller';
import { createPlugins } from '../rappid/plugins';
import { RappidController, KeyboardController } from '../rappid/controllers';

export class RappidService {

    public controllers: { rappid: Controller, keyboard: Controller };
    public graph: dia.Graph;
    public history: dia.CommandManager;
    public keyboard: ui.Keyboard;
    public paper: dia.Paper;
    public selection: dia.Cell[] = [];
    public scroller: ui.PaperScroller;
    public stencil: ui.Stencil;
    public toolbar: ui.Toolbar;
    public tooltip: ui.Tooltip;

    private subscriptions = new Subscription();

    constructor(
        private scopeElement: Element,
        paperElement: Element,
        stencilElement: Element,
        toolbarElement: Element,
        public readonly eventBusService: EventBusService,
    ) {
        Object.assign(this, createPlugins(scopeElement, paperElement, stencilElement, toolbarElement));
        this.controllers = {
            rappid: new RappidController(this),
            keyboard: new KeyboardController(this)
        };
        this.subscriptions.add(
            // Translate RxJx notifications to Backbone Events
            eventBusService.events().subscribe(({ name, value }) => eventBusService.trigger(name, value))
        );
    }

    public destroy(): void {
        const { paper, scroller, stencil, toolbar, tooltip, controllers, subscriptions } = this;
        paper.remove();
        scroller.remove();
        stencil.remove();
        toolbar.remove();
        tooltip.remove();
        Object.keys(controllers).forEach(name => controllers[name].stopListening());
        subscriptions.unsubscribe();
    }
}

export default RappidService;
