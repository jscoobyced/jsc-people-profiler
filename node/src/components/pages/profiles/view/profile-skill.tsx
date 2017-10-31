import * as React from 'react';
import { ProfileDetailProps, Skill } from '../models/profile';
import { Modal } from '../../../../utils/modal';

export class ProfileSkill extends React.Component<ProfileDetailProps, ProfileDetailProps> {

    constructor(props: ProfileDetailProps) {
        super(props);
        this.state = props;
    }

    private createModalContent(): JSX.Element {
        if (!this.props.allSkills) {
            return (<div />);
        }
        const selectedSkill = this.state.selectedSkill ?
            this.state.selectedSkill
            : {
                id: -1,
                name: '',
                score: -1
            };
        return (
            <div>
                <div className='row'>
                    <select id='skills'
                        value={selectedSkill.id}
                        onChange={this.handleAddSkill}
                        className='form-control'>
                        <option value='-1'>Choose a skill</option>
                        {
                            this.props.allSkills.map(function (skill, key) {
                                return <option key={key}
                                    value={skill.id}>{skill.name}</option>;
                            })
                        }
                    </select>
                </div>
                <div className='row'>
                    <select id='score'
                        value={selectedSkill.score}
                        onChange={this.handleAddScore}
                        className='form-control'>
                        <option value='-1'>Choose the score</option>
                        <option value='1'>Low</option>
                        <option value='2'>Medium</option>
                        <option value='3'>Normal</option>
                        <option value='4'>High</option>
                        <option value='5'>Excellent</option>
                    </select>
                </div>
            </div>
        );
    }

    private handleAddSkill = (event: React.ChangeEvent<HTMLSelectElement>) => {
        let skillToAdd: Skill = {
            id: -1,
            name: '',
            score: -1
        };
        if (this.state.selectedSkill) {
            skillToAdd = this.state.selectedSkill;
        }

        if (event.currentTarget.id && parseInt(event.currentTarget.id) !== 0) {
            skillToAdd.id = parseInt(event.currentTarget.options[event.currentTarget.selectedIndex].value);
            skillToAdd.name = event.currentTarget.options[event.currentTarget.selectedIndex].text;
        }

        this.setState({
            selectedSkill: skillToAdd
        });
    }

    private handleAddScore = (event: React.ChangeEvent<HTMLSelectElement>) => {
        let skillToAdd: Skill = {
            id: -1,
            name: '',
            score: 0
        };
        if (this.state.selectedSkill) {
            skillToAdd = this.state.selectedSkill;
        }

        if (event.currentTarget.id && parseInt(event.currentTarget.id) !== 0) {
            skillToAdd.score = parseInt(event.currentTarget.options[event.currentTarget.selectedIndex].value);
        }

        this.setState({
            selectedSkill: skillToAdd
        });
    }

    private openAction = (): React.EventHandler<React.MouseEvent<HTMLButtonElement>> => {
        this.setState({
            showModal: true,
            selectedSkill: {
                id: -1,
                name: '',
                score: 0
            }
        });
        return null;
    }

    private closeAction = (): React.EventHandler<React.MouseEvent<HTMLButtonElement>> => {
        this.setState({
            showModal: false
        });
        return null;
    }

    private removeSkill = (event: any): void => {
        const id = parseInt(event.target.getAttribute('data-id'));
        const profile = this.state.profile;
        const newSkills: Array<Skill> = [];
        profile.skills.forEach(skill => {
            if (skill.id !== id) {
                newSkills.push(skill);
            }
        });
        profile.skills = newSkills;
        this.setState({
            profile: profile
        });
    }

    private doAction = (): React.EventHandler<React.MouseEvent<HTMLButtonElement>> => {
        if (this.state.selectedSkill && this.state.selectedSkill.score > 0) {
            const profile = this.state.profile;
            let found: boolean = false;
            profile.skills.forEach(skill => {
                if (skill.id === this.state.selectedSkill.id) {
                    found = true;
                    return;
                }
            });
            if (!found) {
                profile.skills.push(this.state.selectedSkill);
            }
            this.setState({
                profile: profile
            });
        }
        return this.closeAction();
    }

    render(): JSX.Element {
        const addSkillElement = this.createModalContent();
        const addButton = (
            <button className='btn btn-default'
                onClick={this.openAction}
                title='Add'>
                <span className='glyphicon glyphicon-plus'></span>
                Add
                </button>
        );

        const modal = (
            <Modal close='Close' do='Add'
                closeAction={this.closeAction}
                doAction={this.doAction}
                title='Add Skill'
                name='skillModal'
                content={addSkillElement} />
        );
        return (
            <div className='row'>
                {
                    this.state.showModal ?
                        <div className='row'>
                            {modal}
                        </div> : null
                }
                <div className='row'>
                    <div className='col-md-7'>
                        <span className='big'>Skills</span>
                    </div>
                    <div className='col-md-3'>
                        {addButton}
                    </div>
                </div>
                <div className='row'>
                    {this.state.profile.skills.map((skill, key) => {
                        const maxScore = 5;
                        const percent = (100 * skill.score / 5);
                        const style = {
                            width: percent + '%'
                        };
                        const status = ['success', 'danger', 'warning', 'info', 'success'];
                        const progressCurrentClass = status[skill.score % maxScore];
                        const progressClass = 'progress-bar progress-bar-' + progressCurrentClass;
                        return (
                            <div className='progress' key={key}>
                                <div className={progressClass}
                                    role='progressbar' aria-valuenow={skill.score}
                                    style={style}
                                    aria-valuemin='0' aria-valuemax={maxScore}>
                                    {skill.name}: {skill.score}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}