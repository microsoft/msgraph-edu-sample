/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import * as microsoftTeams from "@microsoft/teams-js";
import { Providers, TeamsProvider, MsalProvider, MgtPeople } from '@microsoft/mgt';
import {ConfigHelper } from '.';


export class ProvidersHelper {

    private static _scopes = [
        'user.read',
        'people.read',
        'user.readbasic.all',
        'contacts.read',
        'calendars.read',
        'files.read',
        'group.read.all',
        'tasks.readwrite',
        'Group.ReadWrite.All',
        'EduRoster.ReadBasic',
        'User.Read.All',
        'User.ReadWrite.All'
    ];

    
    /**
     * Handles authentication for various providers 
     *
     * @memberof ProvidersHelper
     */
    public static initGlobalProvider(){

        const clientId = ConfigHelper.CLIENT_ID;
        if (!clientId) {
            throw new Error('Missing clientId value in env');
        }

        if (TeamsProvider.isAvailable) {
            
            TeamsProvider.microsoftTeamsLib = microsoftTeams;
            
            Providers.globalProvider = new TeamsProvider({
                clientId: clientId,
                authPopupUrl: 'auth.html', // TODO: fix this
                scopes: this._scopes
            });
            
        } else {

            Providers.globalProvider = new MsalProvider({
                clientId: clientId,
                scopes: this._scopes
            });
        }
    }

}