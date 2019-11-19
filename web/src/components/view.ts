/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { Component } from './component';

export abstract class View extends Component {
    
    load(data: any): void {
        
    }    
    
    unload(): void {
        
    }
}