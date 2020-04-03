/*
 index.js - ESP3D WebUI dialog file

 Copyright (c) 2020 Luc Lebosse. All rights reserved.

 This code is free software; you can redistribute it and/or
 modify it under the terms of the GNU Lesser General Public
 License as published by the Free Software Foundation; either
 version 2.1 of the License, or (at your option) any later version.

 This code is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 Lesser General Public License for more details.

 You should have received a copy of the GNU Lesser General Public
 License along with This code; if not, write to the Free Software
 Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

import { h } from "preact"
import { AlertTriangle } from "preact-feather"
import { T } from "../translations"
import { initApp } from "../uisettings"
import { globaldispatch, Action } from "../app"
/*
 *Spin loader
 *
 */
const SpinLoader = ({ color }) => (
    <div class="lds-spinner" style={{ color }}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
)

function close() {}

/*
 * Dialog page
 *
 */
export const DialogPage = ({ currentState }) => {
    if (currentState.showDialog) {
        let classname = "modal d-block"
        let iconTitle, iconMsg
        if (currentState.data.type == "error") {
            iconTitle = <AlertTriangle color="red" />
            if (!currentState.data.title) {
                currentState.data.title = T("S22")
            }
            if (!currentState.data.button1text) {
                currentState.data.button1text = T("S24")
            }
        }
        if (currentState.data.type == "loader") {
            iconMsg = <SpinLoader color="lightblue" />
        }
        if (currentState.data.type == "disconnect") classname += " greybg"
        return (
            <modal tabindex="-1" className={classname}>
                <div class="modal-dialog modal-dialog-centered modal-sm">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div>
                                {iconTitle} {currentState.data.title}
                            </div>
                        </div>
                        <div class="modal-body">
                            <center>
                                <div class="text-center">
                                    {iconMsg}
                                    <div
                                        className={
                                            currentState.data.type == "error"
                                                ? "d-none"
                                                : "d-block"
                                        }
                                    />
                                    <span>{currentState.data.message}</span>
                                </div>
                            </center>
                        </div>
                        <div class="modal-footer">
                            {currentState.data.footer}
                            <button
                                type="button"
                                className={
                                    currentState.data.type == "disconnect"
                                        ? "btn btn-primary d-block"
                                        : "d-none"
                                }
                                onClick={initApp}
                            >
                                {currentState.data.button1text}
                            </button>
                            <button
                                type="button"
                                className={
                                    currentState.data.type == "error"
                                        ? "btn btn-danger d-block"
                                        : "d-none"
                                }
                                onClick={() => {
                                    console.log("close")
                                    if (currentState.data.next)
                                        currentState.data.next()
                                    else
                                        globaldispatch({
                                            type: Action.renderAll,
                                        })
                                }}
                            >
                                {currentState.data.button1text}
                            </button>
                        </div>
                    </div>
                </div>
            </modal>
        )
    }
}
