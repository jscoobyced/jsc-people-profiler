import * as React from 'react';
import { match } from 'react-router-dom';

export interface PageProps {
    name: string;
    url: string;
    match?: match<IdParam>;
}

export interface IdParam {
    id: number;
}

declare global {
    interface System {
        import(request: string): Promise<any>;
    }
    var System: System;
}