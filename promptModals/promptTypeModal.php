<div id="promptTypeModal" class="modal hide fade" tabindex="-1" aria-labelledby="promptTypeModal" aria-hidden="true">
    <div class="modal-header">
        <!--<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>-->
        <h3 class="centered">Prompt Type</h3> </br>
        <div class="centered">
            <span class="centered">Choose a prompt type from the dropdown list: </span>
            <select id="groupPromptType" class="promptType">
                <option value="">Please choose a prompt type</option>
                <option value="audio">Audio</option>
                <option value="multi_choice">Multiple Choice</option>
                <option value="multi_choice_custom">Multiple Choice Custom</option>
                <option value="number">Number</option>
                <option value="photo">Photo</option>
                <option value="remote_activity">Remote Activity</option>
                <option value="single_choice">Single Choice</option>
                <option value="single_choice_custom">Single Choice Custom</option>
                <option value="text">Text</option>
                <option value="timestamp">Timestamp</option>
                <option value="video">Video</option>
            </select> 
        </div>
    </div>
    <div class="modal-body centered">
        <div class="container">
            <div class="control-group">
                <div class="controls">

                </div>
                <div class="controls" id="promptData">
                    <div class="audioModal hide">
                        <div class="modal-body centered">
                            <p>What is the maximum length of the audio the user can upload?</p>
                            <table id="audioTable" align="center">
                                <tr>
                                    <th>Key</th>
                                    <th>Label</th>
                                </tr>
                                <tr>
                                    <td><span>Maximum Length</span></td>
                                    <td><input type="text" class="maxAudioLength" id="maxAudioLength" value="180"/></td>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <div class="multiChoiceModal hide">
                        <div class="centered">
                            <input type="hidden" id="multiCounter" value="1"/>
                            <table id="multiChoiceTable" align="center">
                              <tr>
                                <th>Move Up</th>
                                <th>Move Down</th>
                                <th>Option #</th>
                                <th>Label</th>
                                <th>Value</th>
                                <th>Add</th>
                                <th>Remove</th>
                              </tr>
                              <tr>
                                <td><button class="btn btn-primary upMulti"><i class="icon-arrow-up icon-white"></i></button></td>
                                <td><button class="btn btn-primary downMulti"><i class="icon-arrow-down icon-white"></i></button></td>
                                <td><input type="text" class="multiOptionNum span1" value="0" readonly/></td>
                                <td><input type="text" class="multiLabel" /></td>
                                <td><input type="text" class="multiValue" /></td>
                                <td><button class="btn btn-primary addMulti"><i class="icon-plus icon-white"></i></button></td>
                                <td><button class="btn btn-primary deleteMulti"><i class="icon-remove icon-white"></i></button></td>
                                <td><input type="hidden" class="isDefault" value="0"></td>
                              </tr>
                            </table>
                        </div>
                        <div class="centered">
                            </br>
                            <span>Default: </span>
                            <select multiple id="multiChoiceDefault">
                                <option value=-1>None</option>
                            </select>
                            <i class="help-icon icon-question-sign" data-original-title="The default value for this prompt. This is type-dependent." rel="tooltip" data-placement="right"></i></br>
                            <span>Hold down the Ctrl (windows) / Command (Mac) button to select multiple default options.</span>         
                        </div>
                    </div>

                    <div class="singleChoiceModal hide">
                        <div class="centered">
                            <input type="hidden" id="singleCounter" value="1"/>
                            <table id="singleChoiceTable" align="center">
                              <tr>
                                <th>Move Up</th>
                                <th>Move Down</th>
                                <th>Option #</th>
                                <th>Label</th>
                                <th>Value</th>
                                <th>Add</th>
                                <th>Remove</th>
                              </tr>
                              <tr>
                                <td><button class='btn btn-primary up'><i class="icon-arrow-up icon-white"></i></button></td>
                                <td><button class='btn btn-primary down'><i class="icon-arrow-down icon-white"></i></button></td>
                                <td><input type="text" class="singleOptionNum span1" value="0" readonly/></td>
                                <td><input type="text" class="singleLabel" /></td>
                                <td><input type="text" class="singleValue" /></td>
                                <td><button class='btn btn-primary add'><i class="icon-plus icon-white"></i></button></td>
                                <td><button class='btn btn-primary delete'><i class="icon-remove icon-white"></i></button></td>
                                <td><input type="hidden" class="isDefault" value='0'></td>
                              </tr>
                            </table>
                        </div>
                        <div class="centered">
                            <span>Default</span>
                            <select id="singleChoiceDefault">
                                <option value=-1>None</option>
                            </select>
                            <i class="help-icon icon-question-sign" data-original-title="The default value for this prompt. This is type-dependent." rel="tooltip" data-placement="right"></i>         
                        </div> 
                    </div>

                    <div class="numberModal hide">
                        <div class="modal-body centered">
                            <p>Enter the minimum and maximum number the user can input.</p>
                            <table id="numberTable" align="center">
                                <tr>
                                    <th>Key</th>
                                    <th>Label</th>
                                </tr>
                                <tr>
                                    <td><span> Min: </span></td>
                                    <td><input type="text" class="minNum" id="minNumber" value="0"/></td>
                                </tr>
                                <tr>
                                    <td><span> Max: </span></td>
                                    <td><input type="text" class="maxNum" id="maxNumber" value="10"/></td>
                                </tr>
                                <tr>
                                    <td><span> Default: </span></td>
                                    <td>
                                        <input type="text" class="numberDefault" id="numberDefault"/>
                                        <i class="help-icon icon-question-sign" data-original-title="The default value for this prompt. This is type-dependent." rel="tooltip" data-placement="right"></i>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <div class="textModal hide">
                        <div class="modal-body centered">
                            <p>What is the minimum and maximum character count you wish to allow</p>
                            <table id="textTable" align="center">
                                <tr>
                                    <th>Key</th>
                                    <th>Label</th>
                                </tr>
                                <tr>
                                    <td><span> Min: </span></td>
                                    <td><input type="text" class="minTextLength" id="minTextLength" value="0"/></td>
                                </tr>
                                <tr>
                                    <td><span> Max: </span></td>
                                    <td><input type="text" class="maxTextLength" id="maxTextLength" value="10"/></td>
                                </tr>
                                <tr>
                                    <td><span> Default: </span></td>
                                    <td>
                                        <input type="text" class="textDefault" id="textDefault"/>
                                        <i class="help-icon icon-question-sign" data-original-title="The default value for this prompt. This is type-dependent." rel="tooltip" data-placement="right"></i>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    
                    <div class="photoModal hide">
                        <div class="modal-body centered">
                            <p>What is the maximum vertical resolution the user can upload?</p>
                            <table id="photoTable" align="center">
                                <tr>
                                    <th>Key</th>
                                    <th>Label</th>
                                </tr>
                                <tr>
                                    <td><span>Maximum Resolution</span></td>
                                    <td><input type="text" class="maxRes" id="maxRes" value="100"/></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    
                    <div class="remoteModal hide">
                        <div class="modal-body">
                            <p>
                                All field are required except the Input field
                            </p>
                            <table id="remoteActivityTable" align="center">
                                <tr>
                                    <th>Key</th>
                                    <th>Label</th>
                                </tr>
                                <tr>
                                    <td><span> Package </span></td>
                                    <td><input type="text" class="packageRemote" id="packageRemote" placeholder="Package"/></td>
                                </tr>
                                <tr>
                                    <td><span> Activity </span></td>
                                    <td><input type="text" class="activityRemote" id="activityRemote" placeholder="Activity"/></td>
                                </tr>
                                <tr>
                                    <td><span> Action </span></td>
                                    <td><input type="text" class="actionRemote" id="actionRemote" placeholder="Action"/></td>
                                </tr>
                                <tr>
                                    <td><span> Auto Launch </span></td>
                                    <td>
                                        <select class="span2 autolaunch" id="autoLaunchRemote">
                                            <option value="true">True</option>
                                            <option value="false">False</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td><span> Retries </span></td>
                                    <td><input type="text" class="retriesRemote" id="retriesRemote" placeholder="Retries"/></td>
                                </tr>
                                <tr>
                                    <td><span> Min Run </span></td>
                                    <td><input type="text" class="minrunRemote" id="minrunRemote" placeholder="Min Run"/></td>
                                </tr>
                                <tr>
                                    <td><span> Input (Optional)</span></td>
                                    <td><input type="text" class="inputRemote" id="inputRemote" placeholder="Input"/></td>
                                </tr>
                            </table>
                        </div> 
                    </div>

                    <div class="timeStampModal hide">
                        <div class="modal-body centered">
                            <p>Timestamp does not need any information</p>
                        </div>
                    </div>
                    
                    <div class="videoModal hide">
                        <div class="modal-body centered">
                            <p>What is the maximum length of the video the user can upload?</p>
                            <table id="videoTable" align="center">
                                <tr>
                                    <th>Key</th>
                                    <th>Label</th>
                                </tr>
                                <tr>
                                    <td><span>Maximum Length</span></td>
                                    <td><input type="text" class="maxVideoLength" id="maxVideoLength" value="180"/></td>
                                </tr>
                            </table>
                        </div>
                    </div>

                </div>

                
            </div>    
        </div>                 
    </div>
    <div class="modal-footer">
        <button class="btn btn-primary submit" id="promptTypeSubmit">Save changes</button>
        <!--<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>-->
    </div>
</div>